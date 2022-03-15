const dataService = {};

dataService.serverPath = 'http://localhost:3000';
dataService.userPath = dataService.serverPath + '/users';
dataService.userProfilePath = dataService.serverPath + '/profile';

dataService.createUser = async (username) => {

    let postObj = {
        username: username
    }

    const response = await fetch(dataService.userPath, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postObj) 
    });
        
    return response.json();

};

dataService.updateUser = async (oldUserName, newUserName) => {

    let postObj = {
        username: oldUserName,
        newUserName: newUserName
    }

    return await fetch(dataService.userPath, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postObj) 
    }).then((response) => response.json())
        
};

dataService.deleteAll = async () => {

    return await fetch(dataService.userPath, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({'deleteAll' : true}),
        mode: 'cors'
    }).then((response) => response.json())

}

dataService.deleteUserByUserName = async (username) => {

    let postObj = {
        username: username
    }

    return await fetch(dataService.userPath, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postObj),
        mode: 'cors'
    }).then((response) => response.json())

};

dataService.getusers = async () => {

    let getUrl = dataService.userPath;
    
    const users = await fetch(getUrl).then(response => response.json());

    return users;

};

dataService.updateProfile = async (username, userid, image) => {

    let postObj = {
        id : userid,
        username: username,
        profile: image
    }

    const response = await fetch(dataService.userProfilePath, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postObj) 
    });
        

    return response.json();

};

dataService.uploadProfileImage = async (formData) => {

    const response = await fetch('http://localhost:3000/profileimage',  
    {
        method: 'POST',
        body: formData
    })

    if(!response.ok){

        throw new Error(`Der skete en fejl: ${response.status}`);

    }else {

        return true;
    }

    
}

export default dataService;