//validar campos --- VALIRDAR CHECKCHBOX

function validarcampos(name, startride, endride, descrip, existtime, arrivaltime) {
    if (name.length == 0 || startride.length == 0 || endride.length == 0 || descrip.length == 0 || existtime.length == 0 || arrivaltime.length == 0) {
        return true;
    } else {
        return false;
    }
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
    let Lunes = document.getElementById('chbLunes').checked;
    let Martes = document.getElementById('chbMartes').checked;
    let Miercoles = document.getElementById('chbMiercoles').checked;
    let Jueves = document.getElementById('chbJueves').checked;
    let Viernes = document.getElementById('chbViernes').checked;
    let Sabado = document.getElementById('chbSabado').checked;
    let Domingo = document.getElementById('chbDomingo').checked;


    //create an object

    let userlog = localStorage.getItem('userlog');
    let ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (!ridesDB) {
        ridesDB = [];
    }

    if (!validarcampos(name_ride, startride, endride, descrip, existtime, arrivaltime)) {
        if (!validarnombreride (name_ride)){
            if (Lunes || Martes || Miercoles || Jueves || Viernes || Sabado || Domingo) {
                const rides = {
                    name: name_ride,
                    startride: startride,
                    endride: endride,
                    descrip: descrip,
                    existtime: existtime,
                    arrivaltime: arrivaltime,
                    Lunes: Lunes,
                    Martes: Martes,
                    Miercoles: Miercoles,
                    Jueves: Jueves,
                    Viernes: Viernes,
                    Sabado: Sabado,
                    Domingo: Domingo,
                    usernameride: userlog
    
                }
                ridesDB.push(rides);
                localStorage.setItem('rides', JSON.stringify(ridesDB));
                window.alert('Ride creado con exito!');
                window.location = 'Tablero.html';
            } else {
                window.alert('Debe seleccionar al menos un dia!');
            }
        } else{
            window.alert('Este Nombre del Ride ya existe!, por favor ingresa uno diferente.');
        }
        

    } else {
        window.alert('Algunos campos requeridos se encuentran vacíos');
    }


}

//Validar que el nombre del ride registrado sea unico, y que no exista
function validarnombreride(name_ride) {

    const ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (ridesDB) {
        let ride_name = usersDB.find(rides => rides.name === name_ride);

        if (ride_name) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
function modify(){
    
}


