import { DBManager } from "./model/localStorageManager.js";
import { UsableClass } from "./usableFunctions/usableClass.js";

	class Movie{
		constructor(id, title, year, type, country, production, plot, actors, writer, director, genre, imageurl){
			this._id = id;
			this.title = title;
			this.year = year;
			this.type = type;
			this.country = country;
			this.production = production;
			this.plot = plot;
			this.actors = actors;
			this.writer = writer;
			this.director = director;
			this.genre = genre;
			this.imageurl = imageurl;
		}
	}
	// We check if there's someone logged yet, if not he'll be redirected to the login window
	const login = JSON.parse(localStorage.getItem('practice-onLogin'));
	const allUsers = JSON.parse(localStorage.getItem('practice-users'));
	if(login == null){
	 	window.location.href='index.html';
	}
	document.querySelector('.user-name').innerHTML=login.name;

	// This event log out the session if we click the 'Salir de la Cuenta' button
	document.querySelector('#log-out').addEventListener('click', (e)=>{
		e.preventDefault();
		localStorage.removeItem('practice-onLogin');
		window.location.href='index.html';
	});

	// This function analizes before adding movies if it's repeated or not
	const checkAdderMovie = (allUsers, userNow, obj) => {
		const added = UsableClass.thisUser(allUsers, userNow)
		//if(noRepeat(userNow, users, obj, ['_id', 'year'])){
		if(DBManager.noRepeat(added.movies, obj, ['_id', 'year'])){
			DBManager.addMovie(userNow, allUsers, obj);
		}
		console.log(obj);
	}

	// OMDB functions are to use the OMDB API in this app
	// We fetch only one movie or serie
	const omdbID = async (id) => {
		let url = 'https://www.omdbapi.com/?apikey=c5f89a89&i=' + id;
		const res = await fetch(url);
		const el = await res.json();
		console.log(el.Type);
		//const movies = document.querySelector('#movies-list');
		return (el.Type=='movie' || el.Type=='series')
		? `<div class="box" data-movie_id="${id}">
				<div class="imgBx">
					<img src="${UsableClass.imgOMDB(el.Poster)}">
				</div>
				<div class="content">
					<h3>Title: ${el.Title}</h3>
					<p>Year: ${el.Year}</p>
					<p>Type: ${el.Type}</p>
					<p>Country: ${el.Country}</p>
					<p>Production: ${el.Production}</p>
					<p>Description: ${el.Plot}</p>
					<p>Actors: ${el.Actors}</p>
					<p>Writers: ${el.Writer}</p>
					<p>Director: ${el.Director}</p>
					<p>Genre: ${el.Genre}</p>
					<button class="add-favorites">Add to favorites</button>
				</div>
			</div>`
		: undefined
		        //<button class="add-favorites" onclick='addMovie(${JSON.stringify(el)})'>Add to favorites</button>
		        //console.log(HTMLcode);
		        //movies.innerHTML+= HTMLcode;
	}

	// We fetch all the data in the app 
	const omdb = async (movie) => {
		let url = 'https://www.omdbapi.com/?apikey=c5f89a89&s='+movie;
		const res = await fetch(url);
		const json = await res.json();
		const results = await json.Search;
		const movies_html = document.querySelector('#movies-list');
		//movies_html.innerHTML="";
		let all_movies = '';
		movies_html.innerHTML = all_movies;
		if (!results) {
			movies_html.innerHTML = 'No se encuentran resultados en su busqueda';
		} else {
			for(let result of results){
				console.log(result.imdbID);
				//omdbID(result.imdbID);
				const movie = await omdbID(result.imdbID)
				if(movie){
					all_movies += movie;
				}
				//const moviecode = omdbID(allMovieCode, result.imdbID);
				//allMovieCode= moviecode;
			}
			movies_html.innerHTML = all_movies;
		}
	}
	// This event is for the searcher input
	document.querySelector('#movie-name').addEventListener('submit', (e)=>{
		//e.preventDefault();
		let name = document.querySelector('#inputSearch').value;
		omdb(UsableClass.textOMDB(name));
		e.preventDefault();
	});

	// We'll add a movie to the favorites list, by the 'add-favorites' button in each movie-card
	document.querySelector('#movies-list').addEventListener('click', (e)=>{
		if([...document.querySelectorAll('.add-favorites')].includes(e.target)){
		//if(e.target==document.querySelector('.delete-work')){
		    //let srcImage = document.querySelector('.add-favorites').parentElement.previousElementSibling.firstElementChild.src;
		    let movieID = e.target.parentElement.parentElement.dataset.movie_id;
			let srcImage = e.target.parentElement.previousElementSibling.firstElementChild.src;
			let movieTitle = UsableClass.previousBro(e.target, 10).textContent.slice(7);
			let movieYear = UsableClass.previousBro(e.target, 9).textContent.slice(6);
			let movieType = UsableClass.previousBro(e.target, 8).textContent.slice(6);
			let movieCountry = UsableClass.previousBro(e.target, 7).textContent.slice(9);
			let movieProduction = UsableClass.previousBro(e.target, 6).textContent.slice(12);
			let movieDescription = UsableClass.previousBro(e.target, 5).textContent.slice(13);
			let movieActors = UsableClass.previousBro(e.target, 4).textContent.slice(8);
			let movieWriters = UsableClass.previousBro(e.target, 3).textContent.slice(9);
			let movieDirector = UsableClass.previousBro(e.target, 2).textContent.slice(10);
			let movieGenre = UsableClass.previousBro(e.target, 1).textContent.slice(7);
			const objMovie = new Movie(
				movieID,
				movieTitle, 
				movieYear, 
				movieType, 
				movieCountry, 
				movieProduction,
				movieDescription, 
				movieActors, 
				movieWriters, 
				movieDirector, 
				movieGenre, 
				srcImage)
			checkAdderMovie(allUsers, login, objMovie);
			e.preventDefault();
		}
	});