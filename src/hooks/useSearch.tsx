import { useState } from 'react';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return {
    searchQuery,
    setSearchQuery,
  };
};

export default useSearch;