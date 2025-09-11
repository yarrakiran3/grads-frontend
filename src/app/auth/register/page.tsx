'use client';

import React from 'react';
import { RegisterForm } from '@/app/components/forms/RegisterForm';
// import Layout from '@/components/Layout';

const RegisterPage: React.FC = () => {
  return (
    // <Layout showSidebar={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <RegisterForm />
        </div>
      </div>
    // </Layout>
  );
};

export default RegisterPage;