import { FC } from "react";
import { Bookmark } from "../types";
import { formatCreationDate, formatDuration, formatUploadDate } from "../utils";

interface BookmarkProps {
  bookmark: Bookmark;
  onRemove: (url: string) => void;
}

/**
 * Bookmark list items
 * Vimeo or Flickr bookmark
 * With a Delete button
 */
const BookmarkItem: FC<BookmarkProps> = ({ bookmark, onRemove }) => {
  console.log({ bookmark });

  return (
    <div className="bookmark-item">
      {/* Preview */}
      <img src={bookmark.thumbnail} />

      <div className="bookmark-content">
        {/* Title */}
        <b>{bookmark.title}</b>
        {/* Author */}
        <p>{`Auteur : ${bookmark.author}`}</p>
        {/* Duration of Dimensions */}
        {"duration" in bookmark && bookmark.duration !== undefined ? (
          <p>{`Durée : ${formatDuration(bookmark.duration)}`}</p>
        ) : null}
        {"dimensions" in bookmark && bookmark.dimensions !== undefined ? (
          <p>{`Dimensions : ${bookmark.dimensions.width}x${bookmark.dimensions.height}
        `}</p>
        ) : null}
        {/* URL */}
        <p>{`Lien : ${bookmark.url}`}</p>
        {/* In App Creation */}
        <p>{`Création : ${formatCreationDate(bookmark.creation)}`}</p>
        {/** Publishing */}
        <p>
          {`Publication : ${
            bookmark.upload !== undefined
              ? formatUploadDate(bookmark.upload)
              : "Non renseignée"
          }`}
        </p>
      </div>
      {/* Delete Button */}
      <div className="bookmark-footer">
        <p>{bookmark.provider}</p>

        <button onClick={() => onRemove(bookmark.url)} className="bg-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;
