import axios from 'axios';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar';
import './index.css';
import { FavoritePage } from './pages/FavoritePage';
import { Home } from './pages/Home';
import VersesByChapter from './pages/VersesByChapter';

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
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/verses" element={<VersesByChapter />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
