import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () =>{

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterLoading, setChapterLoading] = useState(false);
    const [favorites, setFavorites] = useState(getFavorites());

    // Add favorite feature
    function getFavorites() {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    }

    function saveFavorites(favs) {
        localStorage.setItem("favorites", JSON.stringify(favs));
    }

    function toggleFavorite(chapterId) {
        let updatedFavorites;
        if (favorites.includes(chapterId)) {
        updatedFavorites = favorites.filter((id) => id !== chapterId);
        } else {
        updatedFavorites = [...favorites, chapterId];
        }
        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/chapters") // Call backend
        .then(res => {
            setChapters(res.data.chapters);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    // Fetch single chapter by ID
    const fetchChapterDetails = (id) => {
        setChapterLoading(true);
        axios
        .get(`http://localhost:5000/chapters/${id}?language=en`)
        .then((res) => {
            setSelectedChapter(res.data.chapter);
            setChapterLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setChapterLoading(false);
        });
    };

    if (loading){
        return <p className="text-center text-gray-500">Loading chapters…</p>
    }
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
                Welcome to Quran Verse Explorer
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Quran Chapters
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-4 py-2 text-left border-b">ID</th>
                    <th className="px-4 py-2 text-left border-b">Name (English)</th>
                    <th className="px-4 py-2 text-left border-b">Name (Arabic)</th>
                    <th className="px-4 py-2 text-left border-b">Verses</th>
                    <th className="px-4 py-2 text-left border-b">Revelation Place</th>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((ch) => (
                    <tr
                        key={ch.id}
                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => fetchChapterDetails(ch.id)}
                    >
                        <td className="px-4 py-2 border-b">{ch.id}</td>
                        <td className="px-4 py-2 border-b">{ch.name_simple}</td>
                        <td className="px-4 py-2 border-b font-arabic text-lg">
                        {ch.name_arabic}
                        </td>
                        <td className="px-4 py-2 border-b">{ch.verses_count}</td>
                        <td className="px-4 py-2 border-b capitalize">
                            {ch.revelation_place}
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                            <button
                                onClick={() => toggleFavorite(ch.id)}
                                className="text-yellow-500 text-xl"
                            >
                                {favorites.includes(ch.id) ? "★" : "☆"}
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {/* Selected chapter details */}
            {chapterLoading && <p className="text-gray-500">Loading chapter details…</p>}
            {selectedChapter && !chapterLoading && (
                <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h2 className="text-2xl font-bold mb-2">
                    {selectedChapter.name_simple} ({selectedChapter.name_arabic})
                </h2>
                <p>
                    <strong>Revelation Place:</strong> {selectedChapter.revelation_place}
                </p>
                <p>
                    <strong>Revelation Order:</strong> {selectedChapter.revelation_order}
                </p>
                <p>
                    <strong>Bismillah Pre:</strong> {selectedChapter.bismillah_pre ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Verses Count:</strong> {selectedChapter.verses_count}
                </p>
                <p>
                    <strong>Pages:</strong>{" "}
                    {selectedChapter.pages?.length ? selectedChapter.pages.join(", ") : "N/A"}
                </p>
                <p>
                    <strong>Translated Name:</strong> {selectedChapter.translated_name?.name} (
                    {selectedChapter.translated_name?.language_name})
                </p>
                </div>
            )}
        </div>
    )
}