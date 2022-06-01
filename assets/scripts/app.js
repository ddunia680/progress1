class MovieItem {
    Movies = [];

    constructor() {
        const AddMovieBtn = document.getElementById('add-movie-button');
        AddMovieBtn.addEventListener('click', this.AddMovie);

        const filterHandler = new MoviesFiltering(this.Movies);
    }

    AddMovie = () => {
        const title = document.getElementById('title').value;
        const extraName = document.getElementById('extra-name').value;
        const extraValue = document.getElementById('extra-value').value;

       if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
           return;
        }

        const movie = {
            id: Math.random(),
            title: title,
            extraName: extraName,
            extraValue: extraValue
        }
        // console.log(this);
        this.Movies.push(movie);
        this.PushToAddedMovies(movie.id);
        this.clearInputs();
    }

    clearInputs() {
        document.getElementById('title').value = '';
        document.getElementById('extra-name').value = '';
        document.getElementById('extra-value').value = '';
    }

    PushToAddedMovies(movieId) {
        const el = this.Movies.find(p => p.id === movieId);
        console.log(this.Movies);
        this.createElementHandler(el);
    }

    createElementHandler(newEl) {
        const list = document.getElementById('movie-list');
        const theMovie = document.createElement('li');
        theMovie.innerHTML = 
        `
        <div class="card">
        <div class="first-container">
            <div class="picture-div">
                <img class="image-itm" src="assets/img/Best-Winter-Photos.jpeg"/>
            </div>
            <div>
                 <label id="h2">${newEl.title}</label>
                 <p>${newEl.extraName}: &nbsp ${newEl.extraValue} #</p>
            </div>
        </div>
        </div>
        `;

        list.append(theMovie);
    }
}

class MoviesFiltering {

    constructor(Movies) {
        this.Movies = Movies;
        const filterBtn = document.getElementById('search-btn');
        
        
        // filterBtn.removeEventListener('click', this.filterHandlerFunction.bind(null, this.Movies));
        filterBtn.addEventListener('click', this.filterHandlerFunction.bind(null, this.Movies));

    }

    filterHandlerFunction(movies) {
        const filterInput = document.getElementById('filter-title').value;
                
        const movieToDisplay = movies.find(
            p => p.title.includes(filterInput));
                
        console.log(movieToDisplay);
        const element = new MovieItem();
        document.getElementById('movie-list').innerHTML = '';
        element.createElementHandler(movieToDisplay);

    }
}

class App {
    static init() {
        const mov = new MovieItem();
    }
}

App.init();