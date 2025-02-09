import { useCallback, useState } from "react";
import "./App.css";
import BookmarkItem from "./components/BookmarkItem";
import { FLICKR_DOMAIN, VIMEO_DOMAIN } from "./constants";
import useEmbedFetch from "./hooks/useEmbedFetch";
import { Bookmark } from "./types";
import { parseBookmark } from "./utils";

function App() {
  // could also be local storage
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const { fetchEmbed, error, loading } = useEmbedFetch();

  /**
   * Used a callback because it might be used a bunch
   * But for the app usage it's probably overdoing it
   */
  const addBookmark = useCallback(
    (newBookmark: Bookmark) => {
      if (bookmarks.find((bm) => bm.url === newBookmark.url) === undefined) {
        setBookmarks([...bookmarks, newBookmark]);
      } else {
        alert("This bookmark already exist");
      }
    },
    [bookmarks]
  );

  /**
   * Used a callback because it might be used a bunch
   * But for the app usage it's probably overdoing it
   */
  const deleteBookmark = useCallback(
    (url: string) => {
      setBookmarks(bookmarks.filter((aBookmark) => url !== aBookmark.url));
    },
    [bookmarks]
  );

  /**
   * Used a callback because it might be used a bunch
   * But for the app usage it's probably overdoing it
   */
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const link = formData.get("url") as string;

      if (link !== undefined && link !== "" && link.startsWith("https://")) {
        if (link.includes(FLICKR_DOMAIN) || link.includes(VIMEO_DOMAIN)) {
          const data = await fetchEmbed(link);

          const newBookmark = parseBookmark(data);

          addBookmark(newBookmark);
        } else {
          alert("Link not supported. Please enter a Flickr or a Vimeo link");
        }
      } else {
        alert("Please enter a valid url");
      }
    },
    [addBookmark, fetchEmbed]
  );

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
