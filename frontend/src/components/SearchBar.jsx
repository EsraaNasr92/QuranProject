import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const SearchBar = ({onSearch}) =>{

    const [query, setQuery] = useState("") // For tracking what the user type
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault(); // Stop page reload
        if(query.trim()){
            onSearch(query); // pass search term up to parent page
            navigate("/search"); //redirect to serach page
        }
    }

    return(
        <form className="searchBar" onSubmit={handleSubmit}>
            <input
                type="text"
                name="search"
                value={query} placeholder="Looking for Ayah…"
                onChange={(e) => setQuery(e.target.value)}/>
        </form>

    )
}