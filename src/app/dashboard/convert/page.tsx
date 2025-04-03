'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFormData, submitForm } from '@/redux/slices/formSlice';
import { TextInput, Button, Form, Stack } from '@carbon/react';

const ConvertPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formData = useSelector((state: RootState) => state.form);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    if (formData.isSubmitted) {
      setForm(formData); // Pre-fill form when revisiting
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      email: form.email
    };
    dispatch(setFormData(formDataToSubmit));
    dispatch(submitForm());
    router.push('/dashboard'); // Redirect to home
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Convert Form</h2>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <TextInput
            id="name"
            labelText="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={formData.isSubmitted} // Make non-editable after submission
            required
          />
          <TextInput
            id="phone"
            labelText="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={formData.isSubmitted}
            required
          />
          <TextInput
            id="address"
            labelText="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={formData.isSubmitted}
            required
          />
          <TextInput
            id="email"
            labelText="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={formData.isSubmitted}
            required
          />
          {!formData.isSubmitted && (
            <Button type="submit">Submit</Button>
          )}
        </Stack>
      </Form>
    </div>
  );
};

export default ConvertPage;
