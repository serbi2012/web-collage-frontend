import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

const HEADERS_TO_STRIP_LOWERCASE = [
  "content-security-policy",
  "x-frame-options",
];

chrome.webRequest.onHeadersReceived.addListener(
  (details) => ({
    responseHeaders: details.responseHeaders.filter(
      (header) =>
        !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase())
    ),
  }),
  {
    urls: ["<all_urls>"],
  },
  ["blocking", "responseHeaders", "extraHeaders"]
);