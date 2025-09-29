import axios from 'axios';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import './index.css';
import { FavoritePage } from './pages/FavoritePage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Search } from './pages/Search';

function App() {

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) =>{
    try{
        const res = await axios.get(`https://api.quran.foundation/v1/quran/ayah/search?q=${query}`);
        setResults(res.data.data);
    }catch(err){
      setError("Something went wrong. try again!");
    }finally{
      setLoading(false);
    }
    }

  return (
    
    <Router>
      <NavBar onSearch={handleSearch}/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="Search"
            element={
              <Search
                results={results}
                loading={loading}
                error={error}
                onSearch={handleSearch}
              />
            }/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
