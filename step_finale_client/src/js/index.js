import dataService from './data.service.js'
import {userGridTemplate, emptyTemplate} from './templates.service.js'
const serverClientApplication = {};

serverClientApplication.init = () => {

    // 'Toast' element for server messages.
    let toast = document.querySelector('.toast');

    // Form Fields
    let userCreateForm = document.querySelector('#userCreateForm');
    let userUpdateForm = document.querySelector('#userUpdateForm');
    let deleteAllBtn = document.querySelector('.common-action-delete-all');

    // Event Handler til navn i grid.
    const renameChangeHandler = (formGridName) => {

        // Form Elementer
        let inpGridUserOldName = formGridName.elements['inpGridUserOldName'];
        let inpGridUserNewName = formGridName.elements['inpGridUserNewName'];

        dataService.updateUser(inpGridUserOldName.value.trim(), inpGridUserNewName.value.trim()).then( (response) => {

            renderServerResponse(response);
            renderUsers();
            
        });
    }

    // Event Handler til billede change.
    const imageChangeHandler = async (formProfileImage, user) => {

        // Opretter FormData
        const formData = new FormData();
        const fileInput = formProfileImage.elements['image'];
        const fileName = user._id + '_' + Date.now();

        // Tildeler værdier til FormData
        formData.append("profile", fileInput.files[0], fileName, 'png');
        formData.append('username', user.username);
        formData.append('id', user._id);
        formData.append('fileName', fileName);

        // En Try/Catch blok for at fange eventuelle server fejl i forbindelse med upload.
        try {
            
            // Uploader Billede
            await dataService.uploadProfileImage(formData);

            // Opdatere Profilen.
            await dataService.updateProfile(user.username, user._id, fileName + '.png').then( (response) => {
                renderServerResponse(response);
                renderUsers();
            });

        } catch (error) {

            renderServerResponse(error);

        };

    }

    // Udskriver vores brugere.
    const renderUsers = () => {

         // 'UserList' Container for users
        let userListContainer = document.querySelector('#userList');

        dataService.getusers().then( (users) => {

            // Tømmer Listen
            userList.innerHTML = '';

            // Undersøger hvorvidt der er nogle brugere.
            if(users.length === 0){
                
                userListContainer.insertAdjacentHTML('afterbegin', emptyTemplate);

            }
          
            // Indsætter "Users" i listen.
            users.map( (user) => {

                userListContainer.insertAdjacentHTML('afterbegin', userGridTemplate(user))

            });


            /* 
            
                Efter vi har indsat vores elementer kan vi binde EVENTS til dem.

            */

            // Finder Alle Delete Action
            let buttons = userListContainer.querySelectorAll('.delete-action');

            // Binder en "click event" til alle delete knapper.
            buttons.forEach( (btn) => {
                btn.addEventListener('click', deleteUser);
            });

            // Opretter 'Events' for hver "User" i vores Array af Users..
            users.forEach( (user) => {

                let formProfileImage = userListContainer.querySelector(`#profile-image-${user._id}`);
                let formGridName = userListContainer.querySelector(`#profile-name-${user._id}`);

                // En 'Change event' til navn form elementet
                formGridName.addEventListener('change', () => renameChangeHandler(formGridName));

                // En 'Change event' til profilbillede form elementet.
                formProfileImage.addEventListener('change', () => imageChangeHandler(formProfileImage, user))

            });

        }).catch( (e) => {
            console.log(e)
            renderServerResponse({'message' : `Der skete en fejl i forsøget på at tilgå serveren. Er den startet?`})

        } );
    
    }

    // Udskriver vores brugere.
    const deleteUser = (event) => {

        /* 
            Vi binder brugernavne via data attributten 
            og kalder 'deleteUserByUserName' via vores data service.
        */

        if(event.target.dataset.actionDelete)
        {

            dataService.deleteUserByUserName(event.target.dataset.actionDelete).then( (response) => {

                renderServerResponse(response);
                renderUsers();
            
            });

        }
     
    }

    // Udskriv respons fra serveren, eller lokalt.
    const renderServerResponse = (response) => {

        toast.textContent = '';
        toast.classList.add('active');
        toast.textContent = response.message;

        let showToast = setTimeout(() => {

            toast.classList.remove('active');
            clearTimeout(showToast);

        }, 2000);

    }

    const deleteAll = () => {

        dataService.deleteAll().then( (response) => {

            renderServerResponse(response);
            renderUsers();
        
        });

    }

    /*
    
        Tilføjer EventListeners for formene uden for listen.
    
    */

    // Opret Ny Bruger.
    userCreateForm.addEventListener('submit', (event) => {

        // Vi fortæller javascript motoren at vi har ansvaret herfra, stop med det du plejer at gøre. preventDefault();
        event.preventDefault();
        
        let nameInput = event.currentTarget.elements['inpUserName'];
      
        // Vi kalder vores service. Og forsøger at oprette en ny bruger. 
        dataService.createUser(nameInput.value).then( (response) => {

            // Her rendere/udskriver vi serverens svar besked.
            renderServerResponse(response);

            // Henter liste efter vi har oprettet en ny bruger.
            // Vi kunne også have valgt, at sende vores liste med som resultat på createUser.
            // Og det er en dejlig diskussion værdigt.!
         
            renderUsers();

            nameInput.value = '';
            
        });
    });

    // Opdatér bruger navnet.
    userUpdateForm.addEventListener('submit', (event) => {

        // Overskriver den normale redirect på submit.
        event.preventDefault();
        
        let nameInputOld = event.currentTarget.elements['inpUserOldName'];
        let nameInput = event.currentTarget.elements['inpUserNewName'];

        // Vi kalder vores service. Og forsøger at opdatere en bruger. 
        dataService.updateUser(nameInputOld.value, nameInput.value).then( (response) => {

            renderServerResponse(response);
            renderUsers();

            nameInputOld.value = '';
            nameInput.value = '';
            
        });
        
    });


    deleteAllBtn.addEventListener('click', deleteAll)

    // Henter liste af bruger og udskriver dem ved opstart.
    renderUsers()
    

}

serverClientApplication.init();