import classes from "./SearchBar.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SearchBar = ({ onSearchBarChange, inputValue }) => {
  const [isVisible, setIsVisible] = useState(true);

  const onFocus = () => {
    setIsVisible(false);
  };

  const onBlur = () => {
    setIsVisible(true);
  };

  const onInputChange = (e) => {
    onSearchBarChange(e.target.value);
  };

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.placeHolderContainer}>
        <div className={classes.placeHolder}>
          {isVisible && inputValue.length < 1 && (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={classes.icon}
            />
          )}
          {inputValue.length < 1 ? <p className={classes.p}>Search</p> : null}
        </div>
      </div>
      <input
        className={classes.searchBar}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        name="search"
      />
    </div>
  );
};

export default SearchBar;
