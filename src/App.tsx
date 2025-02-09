import { useState } from "react";
import "./App.css";
import BookmarkItem from "./components/BookmarkItem";
import useEmbedFetch from "./hooks/useEmbedFetch";
import { Bookmark } from "./types";
import { parseBookmark } from "./utils";

function App() {
  // could also be local storage
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const { fetchEmbed, error, loading } = useEmbedFetch();

  /** Add a bookmark if it doesn't already exists */
  const addBookmark = (b: Bookmark) => {
    if (bookmarks.find((bm) => bm.url === b.url) === undefined) {
      const current = [...bookmarks];
      current.push(b);
      setBookmarks(current);
    } else {
      alert("This bookmark already exist");
    }
  };

  // Remove from state
  const deleteBookmark = (url: string) => {
    const newArray = [...bookmarks].filter(
      (aBookmark) => url !== aBookmark.url
    );

    setBookmarks(newArray);
  };

  // Fetch
  // Parse
  // Add
  const handleSubmit = async (formData: FormData) => {
    const link = formData.get("url") as string;

    if (link !== undefined && link !== "" && link.startsWith("https://")) {
      console.log(link);

      const data = await fetchEmbed(link);

      console.log(data);

      const newBookmark = parseBookmark(data);

      addBookmark(newBookmark);
    } else {
      alert("Please enter a valid url");
    }
  };

  console.log(bookmarks);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bookee</h1>
      {/* FORM */}
      <form action={handleSubmit} className="bookmark-form">
        <input
          type="text"
          placeholder="Enter a Vimeo or a Flicker url"
          id="url"
          name="url"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Bookmark!"}
        </button>
        {error !== null ? <p className="error">{error}</p> : null}
      </form>

      {/* LIST */}
      <div className="list">
        {bookmarks.length < 1 ? (
          <p>{`No Bookmarks :(`}</p>
        ) : (
          bookmarks.map((bm) => (
            <BookmarkItem
              key={bm.url}
              bookmark={bm}
              onRemove={deleteBookmark}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
