import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import './index.css';
import { FavoritePage } from './pages/FavoritePage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Search } from './pages/Search';

function App() {
  return (
    
    <Router>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
