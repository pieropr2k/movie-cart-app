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
		window.location.href = 'movie-searcher.html';
	}
	/*const checkUser = (user, name) => {
		const local = JSON.parse(localStorage.getItem(name));
		for(let i = 0; i < local.length; i++) {
			if(local[i].name === user.name && local[i].password === user.password){
				return true;
		    }
		}
		return false;
	}*/

	// We submit the new user in the localstorage
	const form = document.querySelector('#imputs');
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let user = document.querySelector('.user').value;
		let password = document.querySelector('.password').value;
		if(user && password){
			const newUser = new User(user, password);
			const usersArray = JSON.parse(localStorage.getItem('practice-users'));
			console.log(newUser);
			form.reset();
			//if(checkUser(newUser, 'practice-users')){
			// We check if the user exists
			if (!DBManager.noRepeat(usersArray, newUser, ['name', 'password'])) {
				localStorage.setItem('practice-onLogin', JSON.stringify(newUser));
				window.location.href='movie-searcher.html';
			} else {
				UsableClass.showMessage("No existe este usuario, ingrese bien sus datos por favor", 'complete');
			}
		} else {
			UsableClass.showMessage("Complete los campos por favor", 'complete');
		}
	});