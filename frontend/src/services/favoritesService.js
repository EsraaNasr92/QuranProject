// favoritesService.js

const FAVORITE_CHAPTERS_KEY = "favoriteChapters";

export function getFavoriteChapters() {
    const saved = localStorage.getItem(FAVORITE_CHAPTERS_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function isChapterFavorite(chapterId) {
    const favorites = getFavoriteChapters();
    return favorites.includes(chapterId);
}

export function addFavoriteChapter(chapterId) {
    const favorites = getFavoriteChapters();
    if (!favorites.includes(chapterId)) {
        favorites.push(chapterId);
        localStorage.setItem(FAVORITE_CHAPTERS_KEY, JSON.stringify(favorites));
    }
}

export function removeFavoriteChapter(chapterId) {
    const favorites = getFavoriteChapters().filter((id) => id !== chapterId);
    localStorage.setItem(FAVORITE_CHAPTERS_KEY, JSON.stringify(favorites));
}
