'use client'
import { Search } from '@carbon/react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  readonly onSearch: (searchTerm: string) => void;
  readonly button?: React.ReactNode;
}

export default function SearchInput({ onSearch, button }: SearchInputProps) {
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('key' in e && e.key === 'Enter' && (e.target as HTMLInputElement).value) {
      const value = (e.target as HTMLInputElement).value;
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
      {button}
    </div>
  );
}
