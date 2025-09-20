// src/components/forms/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Alert } from '@/app/components/ui/Alert';
import { useAuth } from '@/app/hooks/useAuth';
import { loginSchema, LoginFormData } from '@/app/lib/validations/auth';

import { toast } from 'react-hot-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (
    { 
  onSuccess, 
  redirectTo = '/' 
}) => 
    {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading,error, clearError,updateError} = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>(
    {
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError(); // Clear any previous errors
      await login(data.email, data.password);
      
      // Success callback
      if (onSuccess) {
        onSuccess();
      } else {
        // toast.success("Account Loggedin successfully!");
        router.push(redirectTo);
      }
    } catch (e: any) {
      console.log("Error from login from")
      console.log(e)
      
      updateError(e.status,e.message);
      // Handle specific validation errors from backend
      if (e.status === 421) {
        setError('email', { message: 'Invalid email' });
      } else if (e.status === 423) {
        setError('password', { message: 'Invalid password' });
      }
      // General error is handled by AuthContext
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6" dismissible onDismiss={clearError}>
            {error.message || 'An unexpected error occurred. Please try again.'}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            startIcon={<Mail />}
            {...register('email')}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              error={errors.password?.message}
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
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <Link
              href="/auth/forgot"
              className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};