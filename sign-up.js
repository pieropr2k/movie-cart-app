import { DBManager } from "./model/localStorageManager.js";
import { UsableClass } from "./usableFunctions/usableClass.js";
	class User{
		constructor(name, password, movies){
			this.name = name;
			this.password = password;
			this.movies = movies;
		}
	}
	// Only the people that are not logged yet can access to this page/part
	if(JSON.parse(localStorage.getItem('practice-onLogin'))!=null){
		window.location.href='movie-searcher.html';
	}

	// We submit the new user in the localstorage
	const form = document.querySelector('#imputs');
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let user = document.querySelector('.user').value;
		let password = document.querySelector('.password').value;
		if(user && password){
			const newUser = new User(user, password, []);
			console.log(newUser);
			//createCard('practice-users', newUser);
			const usersArray = JSON.parse(localStorage.getItem('practice-users'));
			//if(noRepeat('practice-users', newUser, ['name', 'password'])){
			if(DBManager.noRepeat(usersArray, newUser, ['name', 'password'], false)){
				DBManager.createCard('practice-users', newUser);
				UsableClass.showMessage("Listo, su cuenta esta creada", 'checked');
			} else {
				UsableClass.showMessage("Este usuario ya esta creado, ponga otro por favor", 'complete');
			}
			form.reset();
		} else {
			UsableClass.showMessage("Complete los campos por favor", 'complete');
		}
	});