
import { emptyTemplate2, userTemplate2 } from "./templates.js";

const app = {};

const emptyTemplate = `<span>-</span>
    <span>-</span>
    <span>-</span>
    <span>-</span>`;

const userTemplate = (user) => `<span>${user._id}</span>
    <span>${user.profile}</span>
    <span>${user.username}</span>
    <span>-</span>`

app.init = function() {

    // Application Intialisering.
    console.log('Application Init');
    let createUserForm = document.querySelector('#userCreateForm')
    createUserForm.addEventListener('submit', app.createUser)

    app.renderUsers();
}

app.renderToast = (response) => {

    let toast = document.querySelector('.toast');

    toast.classList.add('active');
    toast.textContent = response;

    let showToast = setTimeout( () => {

        toast.classList.remove('active');

    }, 2000)



} 

app.renderUsers = function() {
    //Udskriver Brugere
    console.log('Udskriver Brugere');
    let usersContainer = document.querySelector('#userList')

    app.getUsers().then( (response) => {

        console.log(response)
        // Vi tømmer container for resultater.
        usersContainer.innerHTML = '';

        if(response.length === 0) {
            // Uskriv ingen brugere.
            usersContainer.insertAdjacentHTML('beforeend', emptyTemplate2);

        } else {
            // Vi udskriver alle brugere i vores Array.
            response.map( (user) => {
    
                usersContainer.insertAdjacentHTML('beforeend', userTemplate2(user));
           
            })
        }
    })
}

app.getUsers = function() {

    return fetch('http://localhost:3000/users').then((response) => response.json())
   
}

app.postNewUser = function(name) {

    let postBodyObj = {
        username : name
    }

    return fetch('http://localhost:3000/users', {
        'method' : 'POST',
        'headers' : {
            'content-type' : 'application/json',
        },
        'body' : JSON.stringify(postBodyObj)
    }).then((response) => response.json())

}

app.createUser = function(e) {

    // Stopper normal opførsel
    e.preventDefault();

    let username = document.querySelector('#inpUserName');
    console.log('username', username.value);

    app.postNewUser(username.value).then( (response) => {

        //alert(response.message);
        app.renderToast(response.message) 
        username.value = '';

        app.renderUsers();

    } )

}

// Starter Application
app.init();