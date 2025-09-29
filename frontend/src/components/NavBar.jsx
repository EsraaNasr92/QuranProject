import { Link } from 'react-router-dom';

export const NavBar = () =>{
    return(
        <div>
            <nav className='menu'>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/favorites">Favorites</Link>
            </nav>
        </div>
    )
}