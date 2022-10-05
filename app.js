"use strict";

console.log("const's get this party started!");

const BASE_URL = "http://api.giphy.com/v1/gifs/search";
const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

/** Function receives an AJAX data object linking to a gif url.
 * appends the new gif to the DOM.
 * returns undefined.
 */
function addGIF(gif) {
  $("<img class = gif>").attr("src", gif).appendTo($(".gifGallery"));
}

/** Function handles click on 'submit' button. Queries the GIPHY API with the
 * search input. Selects a random GIF from the matched items.
 * returns a promise, and calls addGIF();
 */
async function handleSubmit(e) {
  e.preventDefault();

  const {
    data: { data },
  } = await axios.get(BASE_URL, getURL());

  const {
    images: {
      preview_gif: { url },
    },
  } = findRandomGif(data);

  addGIF(url);
}

/**
 * findRandomGif: gets a random gif
 */
function findRandomGif(gifs) {
  const len = gifs.length;
  const randomIdx = Math.floor(Math.random() * len);
  return gifs[randomIdx];
}

/** function generates a URL string with the search term inputs.
 * uses giphy API
 * returns the url as a string.
 */
function getURL() {
  const searchTerm = $("#searchInput").val();
  return {
    params: {
      q: searchTerm,
      api_key: API_KEY,
    },
  };
}

$("#inputForm").submit(handleSubmit);

$("#removeGifs").on("click", function () {
  $(".gifGallery").empty();
});
