import React, { useState } from 'react'
// import SearchBar from "material-ui-search-bar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBarComponent = ({ updatedSearch }) => {
    const [searchText, setSearchText] = useState('');
    const handleSearchInputChange = (searchValue) => {
        setSearchText(searchValue);
        updatedSearch(searchValue);
    }
    return (
        <div style={{ marginLeft: '15px' }}>
            {/* <SearchBar
                type="text"
                value={searchText}
                id="medicalrecord-search"
                autoComplete='off'
                onChange={(value) => handleSearchInputChange(value)}
                onCancelSearch={() => handleSearchInputChange("")}
            /> */}
            <TextField
                id="search-bar"
                className="medicalrecord-search"
                onInput={(e) => {
                    handleSearchInputChange(e.target.value);
                }}
                // onChange={(value) => handleSearchInputChange(value)}
                // label="Enter Doctor's name"
                variant="outlined"
                placeholder="Search..."
                size="small"
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </div>
    )
}

export default SearchBarComponent