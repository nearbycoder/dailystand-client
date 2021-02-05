import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import AuthForm from './shared/AuthForm';
import { REGISTER } from 'queries/authQueries';

export default function RegisterPage({ refetch }) {
  const [register] = useMutation(REGISTER);
  const [errors, setErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const {
        data: { register: data },
      } = await register({ variables: { input: values } });

      if (data?.errors) {
        setErrors(data.errors);
        return;
      }

      if (data?.token) {
        localStorage.setItem('token', data.token);

        refetch();
      }
    },
  });

  return (
    <AuthForm
      formik={formik}
      errors={errors}
      title="Register for an Account"
      subtitle={
        <p className="text-center mt-2">
          Already have an account?{' '}
          <Link className="text-blue-800" to="/login">
            Login
          </Link>
        </p>
      }
      actionText="Register"
    />
  );
}
