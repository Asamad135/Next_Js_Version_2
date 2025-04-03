import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  phone: string;
  address: string;
  email: string;
  isSubmitted: boolean;
}

const initialState: FormState = {
  name: '',
  phone: '',
  address: '',
  email: '',
  isSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<{name: string; phone: string; address: string; email: string}>) => {
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        address: action.payload.address,
        email: action.payload.email,
      };
    },
    submitForm: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const { setFormData, submitForm } = formSlice.actions;
export default formSlice.reducer;
