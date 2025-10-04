import axios from 'axios';
import { useState } from 'react';

export default function VersesByChapter() {
    const [chapterNumber, setChapterNumber] = useState(1);
    const [verses, setVerses] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchVerses = async () => {
        try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/verses/by_chapter/${chapterNumber}`);
        setVerses(response.data.verses || []);
        setPagination(response.data.pagination || {});
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            Quran Verses by Chapter
        </h2>

        <div className="flex justify-center mb-6">
            <input
            type="number"
            min="1"
            max="114"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
            className="border p-2 mr-3 rounded w-24 text-center"
            />
            <button
            onClick={fetchVerses}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
            Fetch Verses
            </button>
        </div>

        {loading ? (
            <p className="text-center text-gray-600">Loading verses...</p>
        ) : (
            <div>
            {verses.map((v) => (
                <div key={v.id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Verse {v.verse_key}</span>
                    <span className="text-gray-500">Page: {v.page_number}</span>
                </div>

                <div className="text-right text-2xl font-quran mb-3">
                    {v.words.map((w) => w.text).join(' ')}
                </div>

                <div className="space-y-1">
                    {v.words
                    .filter((w) => w.char_type_name === 'word')
                    .map((w) => (
                        <div key={w.id} className="flex flex-col md:flex-row md:items-center md:gap-3">
                        <p className="text-lg text-right font-arabic flex-1">{w.text}</p>
                        <p className="text-gray-700 flex-1">
                            <strong>Transliteration:</strong> {w.transliteration?.text}
                        </p>
                        <p className="text-gray-700 flex-1">
                            <strong>Translation:</strong> {w.translation?.text}
                        </p>
                        {w.audio_url && (
                            <audio controls className="mt-2 md:mt-0">
                            <source src={`https://audio.qurancdn.com/${w.audio_url}`} type="audio/mp3" />
                            Your browser does not support audio playback.
                            </audio>
                        )}
                        </div>
                    ))}
                </div>
                </div>
            ))}

            {/* Pagination info */}
            {pagination.total_records && (
                <div className="mt-6 text-center text-gray-600">
                Showing {pagination.per_page} per page — Total: {pagination.total_records}
                </div>
            )}
            </div>
        )}
        </div>
    );
}
