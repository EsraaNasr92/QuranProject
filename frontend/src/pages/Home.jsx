import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () =>{

    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        className="hover:bg-gray-50 transition-colors duration-150"
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
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
    )
}