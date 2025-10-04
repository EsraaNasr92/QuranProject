import { Link } from 'react-router-dom';

export const NavBar = () =>{
    return(
        <div className="header">
            <nav className='menu'>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/verses">Verses</Link>
            </nav>
        </div>
    )
}