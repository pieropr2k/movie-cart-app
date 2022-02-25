import { DBManager } from "./model/localStorageManager.js";
import { UsableClass } from "./usableFunctions/usableClass.js";

	class Movie{
		constructor(id, title, year, actors){
			this._id = id;
			this.title = title;
			this.year = year;
			this.actors = actors;
		}
	}
	// We check if there's someone logged yet
	const allUsers = JSON.parse(localStorage.getItem('practice-users'));
	const login = JSON.parse(localStorage.getItem('practice-onLogin'));
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

	// This function is to render all the favorites-movie list in the app
	const getCards = (allUsers, login) => {
		const moviesList = document.querySelector('#movies-list');
		moviesList.innerHTML = '';
		//if(thisUser('practice-users', 'practice-onLogin').movies.length != 0){
		if(UsableClass.thisUser(allUsers, login).movies.length != 0){
			let HTMLcode = "";
			UsableClass.thisUser(allUsers, login).movies.forEach(obj => {
				HTMLcode += 
				`<div class="box" data-movie_id="${obj._id}">
		            <div class="imgBx">
		              <img src="${obj.imageurl}">
		            </div>
		            <div class="content">
		                <h3>Title: ${obj.title}</h3>
		                <p>Year: ${obj.year}</p>
		                <p>Type: ${obj.type}</p>
		                <p>Country: ${obj.country}</p>
		                <p>Production: ${obj.production}</p>
		                <p>Description: ${obj.plot}</p>
		                <p>Actors: ${obj.actors}</p>
		                <p>Writers: ${obj.writer}</p>
		                <p>Director: ${obj.director}</p>
		                <p>Genre: ${obj.genre}</p>
		                <button class="remove-movie">Remove</button>
		            </div>
		        </div>`;
				//<button class="delete_work" onclick="deleteCard('${obj.title}', '${obj.description}')">Eliminar tarea</button>`;
				//cartas.appendChild(item);
			});
			moviesList.innerHTML = HTMLcode;
		} else {
			moviesList.innerHTML = 'No hay peliculas favoritas, vaya al buscador y añada las que les gusten';
		}
	}

	// We'll delete a movie from the favorites list, by the 'remove-movie' button in each movie-card
	document.querySelector('#movies-list').addEventListener('click', (e)=>{
		if([...document.querySelectorAll('.remove-movie')].includes(e.target)){
		//if(e.target==document.querySelector('.delete-work')){
			//const login = JSON.parse(localStorage.getItem('practice-onLogin'));
			let movieID = e.target.parentElement.parentElement.dataset.movie_id;
			let movieTitle = UsableClass.previousBro(e.target, 10).textContent.slice(7);
			let movieYear = UsableClass.previousBro(e.target, 9).textContent.slice(6);
			let movieActors = UsableClass.previousBro(e.target, 4).textContent.slice(8);
			const objMovie = new Movie(movieID, movieTitle, movieYear, movieActors);
			console.log(objMovie);
			DBManager.deleteCard('practice-users', login, objMovie);
			// We refresh the users list here
			getCards(JSON.parse(localStorage.getItem('practice-users')), login);
			e.preventDefault();
		}
	});
	getCards(allUsers, login);