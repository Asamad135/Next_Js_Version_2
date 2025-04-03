'use client'
import { TextInput as CarbonTextInput } from '@carbon/react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  readonly labelText: string;
  readonly placeholder?: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
  readonly id?: string;
}

export default function TextInput({ 
  labelText, 
  placeholder, 
  onChange, 
  value,
  id = "text-input" 
}: TextInputProps) {
  return (
    <div className={styles.textInputWrapper}>
      <CarbonTextInput
        id={id}
        labelText={labelText}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
