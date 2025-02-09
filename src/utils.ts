import { Bookmark, RawBookmark } from "./types";

/** parse a response from embed into a Bookmark */
export function parseBookmark(raw: RawBookmark): Bookmark {
  const provider = raw.provider_name;
  const creation = new Date();
  const author = raw.author_name;
  const title = raw.title;
  const url = raw.url;
  const thumbnail = raw.thumbnail_url_with_play_button ?? raw.thumbnail_url;
  const upload =
    raw.upload_date !== undefined ? new Date(raw.upload_date) : undefined;

  if (provider === "Vimeo") {
    return {
      provider,
      author,
      creation,
      title,
      upload,
      url,
      thumbnail,
      duration: raw.duration,
    };
  } else {
    return {
      provider,
      author,
      creation,
      title,
      upload,
      url,
      thumbnail,
      dimensions: {
        width: raw.width,
        height: raw.height,
      },
    };
  }
}

const LOCALE = "fr";

const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = SECONDS_IN_AN_HOUR * 24;
// Lowest amount of time to consider a month since it's indicative and precision is not that important
const SECONDS_IN_A_MONTH = 28 * SECONDS_IN_A_DAY;
const SECONDS_IN_A_YEAR = 12 * SECONDS_IN_A_MONTH;

const rtf = new Intl.RelativeTimeFormat(LOCALE, { style: "long" });

/**
 * Computes differences from now to the given dates and displays the rtf
 */
export function formatCreationDate(date: Date): string {
  const now = new Date(Date.now()).getTime();
  const ms = date.getTime();

  // left negative on purpose
  const diff = Math.round((ms - now) / 1000);
  // for algorithm purposes
  const absoluteDiff = Math.abs(diff);

  if (absoluteDiff < SECONDS_IN_A_MINUTE - 1) {
    return rtf.format(diff, "seconds");
  } else if (absoluteDiff < SECONDS_IN_AN_HOUR - 1) {
    const minutes = Math.round(diff / SECONDS_IN_A_MINUTE);
    return rtf.format(minutes, "minutes");
  } else if (absoluteDiff < SECONDS_IN_A_DAY) {
    const hours = Math.round(diff / SECONDS_IN_AN_HOUR);
    return rtf.format(hours, "hours");
  } else if (absoluteDiff < SECONDS_IN_A_MONTH) {
    const days = Math.round(diff / SECONDS_IN_A_DAY);
    return rtf.format(days, "days");
  } else if (absoluteDiff < SECONDS_IN_A_YEAR) {
    const months = Math.round(diff / SECONDS_IN_A_MONTH);
    return rtf.format(months, "months");
  } else {
    const years = Math.round(diff / SECONDS_IN_A_YEAR);
    return rtf.format(years, "years");
  }
}

const dtf = new Intl.DateTimeFormat(LOCALE, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatUploadDate(date: Date): string {
  return dtf.format(date);
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

/**
 * given a duration in secondes returns the following templates "HH:MM:SS"
 */
export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / SECONDS_IN_AN_HOUR);
  const secondsInRemainingHour = duration % SECONDS_IN_AN_HOUR;
  const minutes = Math.floor(secondsInRemainingHour / SECONDS_IN_A_MINUTE);
  const seconds = duration % SECONDS_IN_A_MINUTE;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
