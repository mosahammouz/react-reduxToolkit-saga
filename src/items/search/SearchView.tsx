// SearchView.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../search/SearchSlice';

const SearchView: React.FC = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default SearchView;
