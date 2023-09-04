const displayMovies = function displayMovies() {
  const searchTerm = document.getElementById('search-box').value;

  fetch(`https://www.omdbapi.com/?apikey=12a9c0ff&s=${searchTerm}`)
    .then((response) => response.json())
    .then((movies) => {
      if (document.querySelector('.movies-grid')) {
        document.querySelector('.movies-grid').remove();
      }

      const moviesGrid = document.createElement('div');
      moviesGrid.classList.add('movies-grid');
      document.querySelector('body').append(moviesGrid);

      movies.Search.forEach((movie) => {
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = movie.Title;
        img.id = movie.imdbID;
        img.classList.add('movies-grid-image');
        img.addEventListener('click', displayMovieDetails);
        moviesGrid.append(img); 
      });

    document.getElementById('search-box').value = '';
  });
}

document.getElementById('search-button').addEventListener('click', displayMovies);

const displayMovieDetails = function displayMovieDetails(e) {
  const movieID = e.target.id;
  
  fetch(`https://www.omdbapi.com/?apikey=12a9c0ff&i=${movieID}`)
    .then((response) => response.json())
    .then((movie) => {
      const body = document.querySelector('body');

      const modal = document.createElement('div');
      modal.classList.add('modal');
      body.append(modal);

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modal.append(modalContent);

      const modalCloseButton = document.createElement('button');
      modalCloseButton.classList.add('modal-close-button', 'icon-button');
      modalCloseButton.addEventListener('click', closeMovieDetails);
      modalContent.append(modalCloseButton);

      const modalCloseIcon = document.createElement('span');
      modalCloseIcon.textContent = 'close';
      modalCloseIcon.classList.add('material-icons-round');
      modalCloseButton.append(modalCloseIcon);

      const modalImage = document.createElement('img');
      modalImage.src = movie.Poster;
      modalImage.alt = '';
      modalContent.append(modalImage);

      const modalText = document.createElement('div');
      modalText.classList.add('modal-text');
      modalContent.append(modalText);

      const modalHeading = document.createElement('h2');
      modalHeading.textContent = `${movie.Title} (${movie.Year})`;
      modalHeading.classList.add('modal-heading');
      modalText.append(modalHeading);

      const imdbRating = document.createElement('p');

      if (movie.imdbRating === 'N/A') {
        imdbRating.textContent = 'N/A';
      } else {
        imdbRating.textContent = `${movie.imdbRating}/10`;
      }
      
      imdbRating.classList.add('imdb-rating');
      modalText.append(imdbRating);

      const rated = document.createElement('p');
      rated.textContent = movie.Rated;
      rated.classList.add('rated');
      modalText.append(rated);

      const runtime = document.createElement('p');
      runtime.textContent = movie.Runtime;
      runtime.classList.add('runtime');
      modalText.append(runtime);

      const plot = document.createElement('p');
      plot.textContent = movie.Plot;
      plot.classList.add('plot');
      modalText.append(plot);

      const genre = document.createElement('p');
      genre.textContent = `Genre: ${movie.Genre}`;
      genre.classList.add('genre');
      modalText.append(genre);

      const actors = document.createElement('p');
      actors.textContent = `Cast: ${movie.Actors}`;
      actors.classList.add('actors');
      modalText.append(actors);

      const language = document.createElement('p');
      language.textContent = `Language: ${movie.Language}`;
      language.classList.add('language');
      modalText.append(language);

      const country = document.createElement('p');
      country.textContent = `Country: ${movie.Country}`;
      country.classList.add('country');
      modalText.append(country);
    });
}

const closeMovieDetails = function closeMovieDetails() {
  document.querySelector('.modal').remove();
}