import { UsableClass } from "../usableFunctions/usableClass.js";

//DBManager = {
export const DBManager = {
	// To add a new movie to the favorites list
	addMovie: (login, allUsers, obj) => {
		const arrCopy = [...allUsers];
		//let added = arrCopy.filter(el=>el.name===login.name && el.password===login.password)[0];
		const added = UsableClass.thisUser(arrCopy, login);
		added.movies.push(obj);
		localStorage.setItem('practice-users', JSON.stringify(arrCopy));
	},

	// It adds an object to the localstorage-item
	// If there's no a localstorage-item, we create a new one
	createCard: (name, obj) => {
		if (localStorage.getItem(name) === null) {
			localStorage.setItem(name, JSON.stringify([obj]));
		} else {
			localStorage.setItem(name, JSON.stringify([...JSON.parse(localStorage.getItem(name)), obj]));
		}
	},

	// This boolean method evaluates if the object is already in the array.
	// If it's there, this method returns false but true
	// We check if the user exists
	noRepeat: (array, obj_repeated, attrs, isLogin) => {
		//let array = JSON.parse(localStorage.getItem(`${ls_name}`));
		if (!array) {
			return true;
		}
		if (array.length > 0) {
			if (isLogin) {
				for (let i = 0; i < array.length; i++) {
					//if(array[i].name === obj_repeated.name && array[i].password === obj_repeated.password){
					if (array[i][attrs[0]] === obj_repeated[attrs[0]] &&
						array[i][attrs[1]] === obj_repeated[attrs[1]]) {
						return false;
					}
				}
			} else {
				for (let i = 0; i < array.length; i++) {
					// This prevents to register another account with the same username
					if (array[i][attrs[0]] === obj_repeated[attrs[0]]) {
						return false;
					}
				}
			}
		}
		return true;
	},

	// To delete a movie from the favorites list
	deleteCard: (array_name, login, obj) => {
		const allUsers = JSON.parse(localStorage.getItem(`${array_name}`));
		console.log(allUsers);
		//let tasks = allUsers.filter(el=>el.name===login.name && el.password===login.password)[0].movies;
		const tasks = UsableClass.thisUser(allUsers, login).movies;
		//let tasks = thisUser('practice-users', 'practice-onLogin').movies;
		console.log(tasks);
		for (let i = 0; i < tasks.length; i++) {
			/*if(tasks[i].title === obj.title && 
				tasks[i].year === obj.year &&
				tasks[i].actors === tasks[i].actors){
				tasks.splice(i, 1);
			}*/
			if (tasks[i]._id === obj._id &&
				tasks[i].title === obj.title) {
				tasks.splice(i, 1);
			}
		}
		console.log(tasks);
		console.log(allUsers);
		localStorage.setItem(`${array_name}`, JSON.stringify(allUsers));
	}
}
