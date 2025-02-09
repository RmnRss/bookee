export interface RawBookmark {
  upload_date: string;
  author_name: string;
  url: string;
  title: string;
  thumbnail_url: string;
  provider_name: "Flickr" | "Vimeo";
  width: number;
  height: number;
  /** Vimeo only */
  thumbnail_url_with_play_button?: string;
  /** Vimeo only */
  duration?: number;
}

export interface VimeoBookmark {
  /** video */
  thumbnail?: string;
  url: string;
  title: string;
  author: string;
  creation: Date;
  upload: Date;
  duration: number;
}

export interface FlickrBookmark {
  /** photo */
  thumbnail: string;
  url: string;
  title: string;
  author: string;
  creation: Date;
  upload: Date;
  dimensions: {
    height: number;
    width: number;
  };
}

export type Bookmark = VimeoBookmark | FlickrBookmark;

export const isFlickrBookmark = (
  bookmark: Bookmark
): bookmark is FlickrBookmark => {
  return "dimensions" in bookmark;
};
