export interface RawBookmark {
  /** Vimeo Only ? */
  upload_date?: string;
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

export interface Bookmark {
  /** photo */
  thumbnail: string;
  url: string;
  title: string;
  author: string;
  creation: Date;
  upload?: Date;
  provider: string;
  duration?: number;
  dimensions?: {
    height: number;
    width: number;
  };
}
