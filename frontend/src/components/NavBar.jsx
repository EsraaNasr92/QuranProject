import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const NavBar = ({onSearch}) =>{
    return(
        <div className="header">
            <nav className='menu'>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </nav>
            <div className="search">
                <SearchBar onSearch={onSearch}/>
            </div>
        </div>
    )
}