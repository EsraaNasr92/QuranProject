
export const Search = ({ results, loading, error}) => {

    
    return(
        <div>
            <h1>Search Quran</h1>
        

            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            <ul>
                {results.map((ayah, index) => (
                    <li key={index}>
                        <strong>{ayah.surah?.name} - {ayah.text}</strong>
                    </li>
                ))

                }

            </ul>
        </div>
    )
}