import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { LOGIN } from 'queries/authQueries';
import AuthForm from './shared/AuthForm';

export default function LoginPage({ refetch }) {
  const [login] = useMutation(LOGIN);
  const [errors, setErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const {
          data: { login: data },
        } = await login({ variables: { input: values } });

        if (data?.errors) {
          setErrors(data.errors);
          return;
        }

        if (data?.token) {
          localStorage.setItem('token', data.token);

          // Calling refetch throws a warning https://github.com/apollographql/apollo-client/issues/6209
          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <AuthForm
      formik={formik}
      errors={errors}
      title="Login to your account"
      subtitle={
        <p className="text-center mt-2">
          Need an account?{' '}
          <Link className="text-blue-800" to="/register">
            Register
          </Link>
        </p>
      }
      actionText="Login"
    />
  );
}
