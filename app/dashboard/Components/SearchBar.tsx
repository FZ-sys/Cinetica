import React from 'react';
import styles from '../styles/searchBar.module.css'; 

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search movies or TV shows..."
        value={value}
        onChange={onChange} 
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
