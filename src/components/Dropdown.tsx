'use client'
import { Select, SelectItem } from '@carbon/react';

interface DropdownProps {
  readonly items: readonly string[];
  readonly onChange: (value: string) => void;
  readonly label?: string;
}

export default function Dropdown({ items, onChange, label = "Select an option" }: DropdownProps) {
  return (
    <Select 
      id="dropdown"
      labelText={label}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      <SelectItem value="" text="Choose an option" />
      {items.map((item) => (
        <SelectItem key={item} value={item} text={item} />
      ))}
    </Select>
  );
}
