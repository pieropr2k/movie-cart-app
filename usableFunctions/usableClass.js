export const UsableClass = {
	// Returns the previous-element sibling of someone
    previousBro: (element, number) => {
        let momentum;
        for (let i = 0; i < number; i++) {
            momentum = element.previousElementSibling;
            element = momentum;
        }
        return element;
    },

	// Returns the user that is logged at that moment
    thisUser: (allUsers, onLogin) => {
		return allUsers.filter(el=>el.name===onLogin.name && el.password===onLogin.password)[0];
	},
	/*function thisUser(allUsers, onLogin){
		//let login = JSON.parse(localStorage.getItem(onLogin));
		//let login = JSON.parse(localStorage.getItem('practice-onLogin'));
		//let allUsers = JSON.parse(localStorage.getItem(users));
		//let allUsers = JSON.parse(localStorage.getItem('practice-users'));
		//return allUsers.filter(el=>el.name===login.name && el.password===login.password)[0];
		return allUsers.filter(el=>el.name===onLogin.name && el.password===onLogin.password)[0];
	},*/

	// This funcion will shape the text-string inserted in the searcher form
	// to a string that are able to add to a OMDB url
    textOMDB: (text) => {
		let letters = text.trim().split("");
		for (let i=0; i<letters.length; i++) {
			if(letters[i]===" "){
				letters[i]="-";
			}
		}
		return letters.join("");
	},
	// Evaluates if a image exists, if not it'll return a red circle image 
    imgOMDB: (url) => {
		if(url==='N/A'){
			return 'https://i3.wp.com/simpleandseasonal.com/wp-content/uploads/2018/02/Crockpot-Express-E6-Error-Code.png';	
		}
		return url;
	},
	// This is an event that'll happen in the login and sign-up forms
	// it'll throw an advertisement to the DOM app
	showMessage: (message, classname) => {
		if(document.querySelectorAll(`#${classname}`).length==0){
			const alert = document.querySelector('#alert');
			const item = `<p class="${classname}">${message}</p>`;
			alert.innerHTML = item;
				setTimeout(() => alert.removeChild(document.querySelector(`.${classname}`)), 1500);
		}		
	}
}