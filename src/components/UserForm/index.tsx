// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { submitForm } from "@/redux/slices/formSlice";
// import { Form, TextInput, TextArea, Button, Stack } from "@carbon/react";
// import { RootState } from "@/redux/store";
// import styles from "./UserForm.module.scss";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// const UserForm = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { formData, isSubmitted } = useSelector((state: RootState) => state.form);

//   const [form, setForm] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   // Load form data from Redux when the component mounts
//   useEffect(() => {
//     if (formData) {
//       setForm(formData);
//     }
//   }, [formData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(submitForm(form));
//     router.push("/dashboard"); // Redirect after submitting
//   };

//   // If form is already submitted, show read-only form
//   if (isSubmitted && formData) {
//     return (
//       <div className={styles.viewMode}>
//         <Stack gap={5}>
//           <h3>Form Data (Read Only)</h3>
//           {Object.entries(formData).map(([key, value]) => (
//             <TextInput
//               id={key}
//               key={key}
//               labelText={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={value || ""}
//               readOnly
//               disabled
//             />
//           ))}
//         </Stack>
//       </div>
//     );
//   }

//   return (
//     <Form onSubmit={handleSubmit} className={styles.form}>
//       <Stack gap={7}>
//         <TextInput id="name" name="name" labelText="Name" value={form.name} onChange={handleChange} required />
//         <TextInput id="email" name="email" labelText="Email" type="email" value={form.email} onChange={handleChange} required />
//         <TextInput id="phone" name="phone" labelText="Phone" type="tel" value={form.phone} onChange={handleChange} required />
//         <TextArea id="address" name="address" labelText="Address" value={form.address} onChange={handleChange} required />
//         <Button type="submit" kind="primary">
//           Submit
//         </Button>
//       </Stack>
//     </Form>
//   );
// };

// export default UserForm;
