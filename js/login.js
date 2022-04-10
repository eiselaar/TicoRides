//validar campos vacios
function validarcampos(firstname, lastname, phone, user, password, newpassword) {
    if (firstname.length == 0 || lastname.length == 0 || phone.length == 0 || user.length == 0 || password.length == 0 || newpassword.length == 0) {
        return false;
    } else {
        return true;
    }
}

//Fuction to add users
function addUser() {
    //obtener los valores de cada input
    const firstname = document.getElementById('inputFirstName').value;
    const lastname = document.getElementById('inputLastName').value;
    const phone = document.getElementById('inputPhone').value;
    const username = document.getElementById('inputUserName').value;
    const password = document.getElementById('password').value;
    const newpassword = document.getElementById('newpassword').value;
    const id = autoincremental();
    //insertar los datos en el localstorage
    if (password===newpassword)
    {
        let usersDB = JSON.parse(localStorage.getItem('users'))
        if (!usersDB) {
            usersDB = [];
        }
    
        if (validarcampos(firstname, lastname, phone, username, password, newpassword)) {
       
            const user =
            {
                id: id,
                name: firstname,
                lastname: lastname,
                phone: phone,
                username: username,
                password: password,
                newpassword: newpassword
            }
            //validar que el nombre no exista para insertar los datos
            if (!validarUsuario(username)) {
                usersDB.push(user);
                localStorage.setItem('users', JSON.stringify(usersDB));
                document.getElementById('invalid').hidden = true;
                saveLogUser(id);
                window.location = "PaginadeAutenticación.html";
            } else {
                document.getElementById('invalid').hidden = false;
            }
    
    
        } else {
            window.alert('Algunos campos requeridos se encuentran vacíos');
        }

    } else{
        
        window.alert('Las contraseñas son diferentes , por favor veriquen que sean iguales');
    }
  
}

function autoincremental() {
    //leer los datos de los usuarios del local storage
    const users = JSON.parse(localStorage.getItem('users'));
    //compobar que haya datos existentes
    let id = 0;
    // id = 1, id = 2, id = 3
    //let users = JSON.parse(usersDB);
    //recorrer el arreglo para saber por cual id vamos
    if (users) {
        for (let i = 0; i < users.length; i++) {
            if (id < users[i].id) {
                id = users[i].id;
            }
        }
    }
    return id + 1;
}

//Validar que el usuario registrado sea unico, y que no exista
function validarUsuario(username) {

    const usersDB = JSON.parse(localStorage.getItem('users'));
    if (usersDB) {
        let u_sername = usersDB.find(user => user.username === username);

        if (u_sername) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

function validarpass(newpassword){
    const usersDB = JSON.parse(localStorage.getItem('users'));
    if (usersDB) {
        let passs = usersDB.find(user => user.passs === newpassword);

        if (passs) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


//funcion para validar que el usuario se encuentra registrado
function validarusuario() {
    //obtner los datos ingresados por el usuario
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    //leer el  array de usuarios
    const usersDB = JSON.parse(localStorage.getItem('users'));

    if (usersDB) {
        let finduser = usersDB.find(user => user.username === username && user.password === password);
        if (finduser) {
            saveLogUser(finduser.id);
            sessionStorage.setItem('logerUser',username);
            window.location = "Tablero.html";
        } else {
            window.alert('Datos Incorrectos, vuelva a Intentarlo');
        }
    } else {
        window.alert('No se encuentran usuarios registrados');
    }

}



//funcion para saber que usario esta loggeado.
function saveLogUser(id_user) {
    //leer los usuarios loggeados
    let logs = JSON.parse(localStorage.getItem('userlog'))
    if (!logs) {
        logs = [];
    }
    logs.push(id_user);
    localStorage.setItem('userlog', JSON.stringify(logs));
}

// Presentar el nombre del usuario en en la bienvenida
function Nameloger() {
    document.getElementById('user_name').innerHTML=sessionStorage.getItem('logerUser');
}


