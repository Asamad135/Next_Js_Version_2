'use client';
import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { Stack, Button, Grid, Column, TextInput, PasswordInput, ToastNotification, InlineLoading } from '@carbon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import LanguageSelector from '@/components/LanguageSelector';
import styles from './login.module.scss';

interface FormData {
  username: string;
  password: string;
}

const Login: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .email(t('login.invalidEmail'))
      .required(t('Email.required')),
    password: Yup.string()
      .min(3, t('login.passwordMin')) // Minimum password length updated to 3
      .required(t('Password.required')),
  });

  const handleSubmit = async (values: FormData, { setSubmitting, setErrors, setStatus }: any) => {
    try {
      setError(null);
      setIsLoading(true);
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        if (data === "Login successful!") {
          setShowSuccess(true);
          setStatus({ success: true });
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          throw new Error(data);
        }
      } else {
        const errorData = await response.text();
        throw new Error(errorData || t('login.errorMessage'));
      }
    } catch (error: any) {
      setError(error.message);
      setErrors({ password: error.message });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.languageSelector}>
        <LanguageSelector />
      </div>

      <div className={styles.notificationContainer}>
        {showSuccess && (
          <ToastNotification
            kind="success"
            title="Success"
            subtitle="Login successful! Redirecting..."
            timeout={2000}
            onClose={() => setShowSuccess(false)}
          />
        )}
        {error && (
          <ToastNotification
            kind="error"
            title="Error"
            subtitle={error}
            timeout={5000}
            onClose={() => setError(null)}
          />
        )}
      </div>

      <Grid className={styles.loginPage} fullWidth>
        <Column sm={4} md={8} lg={12} xlg={12} max={12} className={styles.loginColumn}>
          <div className={styles.authContainer}>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                <Form className={styles.authForm}>
                  <Stack gap={6}>
                    <div className={styles.headerContainer}>
                      <div className={styles.logoSection}>
                        <div className={styles.logoWrapper}>
                          <Image
                            src="/IBM_logo.svg"
                            alt="IBM Logo"
                            width={70}
                            height={30}
                            priority
                          />
                        </div>
                        <div className={styles.loginText}>
                          <span>{t('login.title')}</span>
                        </div>
                      </div>
                      <h2 className={styles.welcomeText}>{t('login.welcomeMessage')}</h2>
                    </div>

                    <div className={styles.formFields}>
                      <TextInput
                        id="username"
                        name="username"
                        labelText={t('login.email')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.username && Boolean(errors.username)}
                        invalidText={errors.username}
                      />

                      <PasswordInput
                        id="password"
                        name="password"
                        labelText={t('login.password')}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.password && Boolean(errors.password)}
                        invalidText={errors.password}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={isLoading || isSubmitting}
                    >
                      {isLoading ? (
                        <InlineLoading description="Logging in..." status="active" />
                      ) : (
                        t('login.submit')
                      )}
                    </Button>

                    <div className={styles.authLinks}>
                      {t("login.createAccount")} <Link href="/auth/signup">{t("login.createAccount")}</Link>
                    </div>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default Login;
