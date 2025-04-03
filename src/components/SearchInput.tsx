'use client'
import { Search, Button } from '@carbon/react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  readonly onSearch: (searchTerm: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (
      (e.type === 'click') || 
      ('key' in e && e.key === 'Enter' && (e.target as HTMLInputElement).value)
    ) {
      const value = e.type === 'click' 
        ? (document.querySelector('input[type="text"]') as HTMLInputElement)?.value
        : (e.target as HTMLInputElement).value;
      onSearch(value || '');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Search
        size="lg"
        placeholder="Search..."
        labelText="Search"
        onKeyDown={handleSearch}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
