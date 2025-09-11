'use client';

import React from 'react';
import { LoginForm } from '@/app/components/forms/LoginForm';
// import Layout from '@/app/components/Layout';

const LoginPage: React.FC = () => {
  console.log("Rendering LoginPage");
  return (
    // <Layout showSidebar={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <LoginForm />
        </div>
      </div>
    // </Layout>
  );
};

export default LoginPage;
