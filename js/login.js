//// VALIDAR CAMPOS VACIOS
function validarcampos(firstname, lastname, phone, user, password, newpassword) {
    if (firstname.length == 0 || lastname.length == 0 || phone.length == 0 || user.length == 0 || password.length == 0 || newpassword.length == 0) {
        return false;
    } else {
        return true;
    }
}

//// AÑADIR USUARIOS
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

        //obtener informacion de la lista
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

//// ID DE LOS USUARIOS
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

//// VALIDAR QUE EL USUARIO SEA UNICO, Y QUE NO ALLA OTRO REGISTRADO CON ESE NOMVRE
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

//// VALIDAR QUE AMBAS CONTRASEÑAS SEAN IGUALES
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


//// VALIDAR QUE EL USUARIO SE ENCUENTRE RESGITRADO EN EL LOCALSTORE
function validarusuario() {
    //obtner los datos ingresados por el usuario
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    //leer el  array de usuarios
    const usersDB = JSON.parse(localStorage.getItem('users'));

    if (usersDB) {
        let finduser = usersDB.find(user => user.username === username && user.password === password);
        if (finduser) {
            saveLogUser(username);
            window.location = "Tablero.html";
        } else {
            window.alert('Datos Incorrectos, vuelva a Intentarlo');
        }
    } else {
        window.alert('No se encuentran usuarios registrados');
    }

}



////PARA SABER SI EL USUARIO SE ENCUENTRA LOGEADO
function saveLogUser(user_name) {
    localStorage.setItem('userlog', user_name);
}

////PRESENTAR EL NOMBRE DEL USUARIO LOEGADO EN TABLERO, RIDE Y CONFIG
function Nameloger() {
    document.getElementById('user_name').innerHTML=localStorage.getItem('userlog');
}

////CERRAR SECION
function singout(){
    response = window.confirm('¿Está seguro que desea cerrar la sesión?');
    if(response){
        localStorage.removeItem("userlog");
        window.location = "index.html";
    }
  
};

