
import React from "react";
import "./Header.css";
import Searcher from "../Searcher/Searcher";


interface HeaderProps {
    searchState: {
      searchQuery: string;
      setSearchQuery: (query: string) => void;
    };
  }

function Header({ searchState }: HeaderProps) {
    
    const { searchQuery, setSearchQuery } = searchState;

    return (
    <div className="header">
      <div className="header__logo"></div>
      <div className="header__searcher">
        <Searcher searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    </div>
  );
}

export default Header;
