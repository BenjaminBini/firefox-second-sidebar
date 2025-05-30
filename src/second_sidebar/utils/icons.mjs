import { FaviconsWrapper } from "../wrappers/favicons.mjs";
import { NetUtilWrapper } from "../wrappers/net_utils.mjs";

const PREDEFINED_ICONS = {
  "about:newtab": "chrome://browser/skin/tab.svg",
  "about:debugging": "chrome://global/skin/icons/developer.svg",
  "about:config": "chrome://global/skin/icons/settings.svg",
  "about:processes": "chrome://global/skin/icons/performance.svg",
  "about:addons": "chrome://mozapps/skin/extensions/extension.svg",
  "about:settings": "chrome://global/skin/icons/settings.svg",
  "about:preferences": "chrome://global/skin/icons/settings.svg",
  "chrome://browser/content/preferences/preferences.xhtml":
    "chrome://global/skin/icons/settings.svg",
  "chrome://browser/content/places/bookmarksSidebar.xhtml":
    "chrome://browser/skin/bookmark.svg",
  "about:downloads": "chrome://browser/skin/downloads/downloads.svg",
  "chrome://browser/content/downloads/contentAreaDownloadsView.xhtml":
    "chrome://browser/skin/downloads/downloads.svg",
  "chrome://browser/content/places/places.xhtml":
    "chrome://browser/skin/library.svg",
};

export const FALLBACK_ICON =
  "chrome://devtools/skin/images/browsers/firefox.svg";

/**
 *
 * @param {string} url
 * @returns {Promise<string>}
 */
export function fetchIconURL(url) {
  return new Promise((resolve) => {
    let uri;
    try {
      uri = NetUtilWrapper.newURI(url);
    } catch (e) {
      console.warn(`Invalid URL passed to fetchIconURL: ${url}`, e);
      resolve(FALLBACK_ICON);
      return;
    }
    if (uri.specIgnoringRef in PREDEFINED_ICONS) {
      resolve(PREDEFINED_ICONS[uri.specIgnoringRef]);
      return;
    }
    FaviconsWrapper.setDefaultIconURIPreferredSize(128);
    FaviconsWrapper.getFaviconURLForPage(uri, async (faviconURI) => {
      let provider = "browser";
      let faviconURL = faviconURI?.spec;
      try {
        if (!faviconURL) {
          provider = "google";
          faviconURL = `https://www.google.com/s2/favicons?domain=${uri.host}&sz=128`;
          const response = await fetch(faviconURL);
          if (response.status !== 200) {
            throw Error(`Got ${response.status} from google`);
          }
        } else {
          const response = await fetch(faviconURL);
          if (response.status !== 200) {
            throw Error(`Got ${response.status} from the favicon URL`);
          }
        }
        // Extra validation: ensure faviconURL is a valid, non-empty string and fetchable
        if (
          !faviconURL ||
          typeof faviconURL !== "string" ||
          !/^https?:|^chrome:|^resource:/.test(faviconURL)
        ) {
          throw Error("Favicon URL is invalid or empty");
        }
      } catch (error) {
        console.log("Failed to fetch icon:", error);
        provider = "fallback";
        faviconURL = FALLBACK_ICON;
      }
      // Final check: if faviconURL is still invalid, use fallback
      if (
        !faviconURL ||
        typeof faviconURL !== "string" ||
        faviconURL.trim() === ""
      ) {
        faviconURL = FALLBACK_ICON;
      }
      console.log(`Got favicon for ${url} from ${provider}`);
      resolve(faviconURL);
    });
  });
}

/**
 *
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export async function isIconAvailable(url) {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    console.log(`Failed to fetch icon ${url}:`, error);
    return false;
  }
}

/**
 *
 * @param {string} url
 * @param {string} urlAlt
 * @returns {Promise<string>}
 */
export async function useAvailableIcon(url, urlAlt) {
  return (await isIconAvailable(url)) ? url : urlAlt;
}
