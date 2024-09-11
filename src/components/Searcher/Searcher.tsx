import React from 'react';



interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Searcher({ searchQuery, setSearchQuery }:SearchBarProps){
  return (
    <div className="search-bar">
    <input
      type="text"
      placeholder="Search images..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  );
};

export default Searcher;
