'use client'
import React from 'react';
import { Form, Stack, TextInput, Button } from '@carbon/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Auth.module.scss';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

export default function Signup() {
  const router = useRouter();
  const [error, setError] = React.useState<string>('');

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.name,
            password: values.password
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          router.push('/auth/login');
        } else {
          setError(data.message || 'Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        setError('Connection error. Please try again.');
      }
    },
  });

  return (
    <div className={styles.authContainer}>
      <Form className={`${styles.authForm} ${styles.signupForm}`} onSubmit={formik.handleSubmit}>
        <Stack gap={7}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <Image
                src="/IBM_logo.svg"
                alt="IBM Logo"
                width={70}
                height={30}
                priority
              />
              <div className={styles.rightContent}>
                <span className={styles.loginText}>Sign Up</span>
              </div>
            </div>
            <h2>Welcome to IBM InfoSphere</h2>
          </div>
          <TextInput
            id="name"
            labelText="Full Name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.touched.name && Boolean(formik.errors.name)}
            invalidText={formik.touched.name && formik.errors.name}
          />
          <TextInput
            id="password"
            labelText="Password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.touched.password && Boolean(formik.errors.password)}
            invalidText={formik.touched.password && formik.errors.password}
          />
          <TextInput
            id="confirmPassword"
            labelText="Confirm Password"
            type="password"
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            invalidText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
          <Button type="submit" className={styles.authSubmit}>
            Create Account
          </Button>
          <div className={styles.authLinks}>
            Already have an account?{' '}
            <Link href="/auth/login">Login</Link>
          </div>
        </Stack>
      </Form>
    </div>
  );
}