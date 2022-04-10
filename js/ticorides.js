//validar campos --- VALIRDAR CHECKCHBOX
function validarcampos(name, startride, endride,descrip, existtime,arrivaltime ) {
    if (name.length == 0 ||startride.length == 0 ||endride.length == 0 || descrip.length == 0 || existtime.length == 0 || arrivaltime.length == 0) {
        return false;
    } else {
        return true;
    }
}

function goEdit() {
    window.location = "EditarRide.html";
}

function addRide() {
    //obtener rides
    const name_ride = document.getElementById('nombreride').value;
    const startride = document.getElementById('ComienzoRide').value;
    const endride = document.getElementById('FinRide').value;
    const descrip = document.getElementById('descip').value;
    const existtime = document.getElementById('salirride').value;
    const arrivaltime = document.getElementById('llegarride').value;
    // agregar los checkbox

    //create an object
    let ridesDB = JSON.parse(localStorage.getItem('rides'));

    //read articles log.

    let userlog = JSON.parse(localStorage.getItem('userlog'));

    if (!ridesDB) {
        ridesDB = [];
    }

    if (validarcampos(name_ride, startride, endride,descrip, existtime,arrivaltime)) {
        const rides = {
            id_ride: autoincremental(),
            name: name_ride,
            startride:startride,
            endride:endride,
            descrip: descrip,
            existtime:existtime,
            arrivaltime:arrivaltime, 
            id_user: userlog[0],
            
        }
        ridesDB.push(rides);
        localStorage.setItem('products', JSON.stringify(ridesDB));
        window.alert('Ride creado con exito!');
        window.location = 'Tablero.html';
    } else {
        window.alert('Algunos campos requeridos se encuentran vacíos');
    }

}

//create an autoincremental ID
function autoincremental() {
    //leer los datos de los usuarios del local storage
    const viajesDB = localStorage.getItem('rides');
    //compobar que haya datos existentes
    let id = 0;
    // id = 1, id = 2, id = 3
    let viajes = JSON.parse(viajesDB);
    //recorrer el arreglo para saber por cual id vamos
    if (articles) {
        for (let i = 0; i < articles.length; i++) {
            if (id < viajes[i].id_ride) {
                id = viajes[i].id_ride;
            }
        }
    }
    return id + 1;
}