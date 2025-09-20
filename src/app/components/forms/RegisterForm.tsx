// src/components/forms/RegisterForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Alert } from '@/app/components/ui/Alert';
import { useAuth } from '@/app/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/app/lib/validations/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  redirectTo = '/' 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState:{errors, isSubmitting },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password for real-time confirmation validation
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError(); // Clear any previous errors
      await registerUser(data.email, data.password, data.firstName, data.lastName);
      
      // Success callback
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (error: any) {
      // Handle specific validation errors from backend
      if (error.status === 422) {
        setError('email', { message: 'Email is already registered' });
      } else if (error.status === 409) {
        setError('email', { message: 'An account with this email already exists' });
      }
      // General error is handled by AuthContext
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our learning community</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6" dismissible onDismiss={clearError}>
            {error.status}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              error={errors.firstName?.message}
              startIcon={<User />}
              {...register('firstName')}
              autoComplete="given-name"
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              error={errors.lastName?.message}
              startIcon={<User />}
              {...register('lastName')}
              autoComplete="family-name"
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            error={errors.email?.message}
            startIcon={<Mail />}
            {...register('email')}
            autoComplete="email"
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            error={errors.password?.message}
            helperText="Must be at least 6 characters long"
            startIcon={<Lock />}
            endIcon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
            {...register('password')}
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            startIcon={<Lock />}
            endIcon={
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="cursor-pointer hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            }
            {...register('confirmPassword')}
            autoComplete="new-password"
          />

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-500 hover:underline"
                target="_blank"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500 hover:underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};