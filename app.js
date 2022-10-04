'use strict';

console.log("Let's get this party started!");

/** Function receives an AJAX data object linking to a gif url.
 * appends the new gif to the DOM.
 * returns undefined.
 */
  function addGIF(gifObj){

    let gif = gifObj.images.preview_gif.url;
    $('<img class = gif>')
      .attr('src', gif)
      .appendTo($('.gifGallery'));
  }


/** Function handles click on 'submit' button. Queries the GIPHY API with the
 * search input. Selects a random GIF from the matched items.
 * returns a promise, and calls addGIF();
  */
  async function handleSubmit(e) {
    e.preventDefault();

    let response = await axios.get(getURL());
    let reponseLength = response.data.data.length;
    let randomIndex = ((reponseLength) => Math.floor(Math.random() * reponseLength));

    addGIF(response.data.data[randomIndex(reponseLength)]);

  }


  /** function generates a URL string with the search term inputs.
   * uses giphy API
   * returns the url as a string.
   */
  function getURL(){
    let searchTerm = $('#searchInput').val();
    let url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}` +
      `&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`

    return url;
  }


  $('#inputForm').submit(handleSubmit)

  $('#removeGifs').on('click', function() {
    $('.gifGallery').empty();
  })


