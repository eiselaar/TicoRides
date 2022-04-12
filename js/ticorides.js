//********* * JS DE AÑADIR RIDE´ ***************

//validar campos de html añadir.

function validarcampos(name, startride, endride, descrip, existtime, arrivaltime) {
    if (name.length == 0 || startride.length == 0 || endride.length == 0 || descrip.length == 0 || existtime.length == 0 || arrivaltime.length == 0) {
        return true;
    } else {
        return false;
    }
}

//Añadir rides
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


    //crear un objeto

    let userlog = localStorage.getItem('userlog');
    let ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (!ridesDB) {
        ridesDB = [];
    }

    if (!validarcampos(name_ride, startride, endride, descrip, existtime, arrivaltime)) {

        if (!validarnombreride(name_ride, userlog)) {
            //validar los checkbox
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
        } else {
            window.alert('Este Nombre del Ride ya existe!, por favor ingresa uno diferente.');
        }


    } else {
        window.alert('Algunos campos requeridos se encuentran vacíos');
    }


}

//Validar que el nombre del ride registrado sea unico, y que no exista solomente en usuario logeado
function validarnombreride(name_ride, username) {

    const ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (ridesDB) {
        let ride_name = ridesDB.find(rides => rides.name === name_ride && rides.usernameride === username);

        if (ride_name) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

//funcion para carga info en editar ides
function CargarEditarInfo(name_ride) {

    let userlog = localStorage.getItem('userlog');
    const ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (ridesDB) {
        let ridesadd = ridesDB.find(rides => rides.name === name_ride && rides.usernameride === userlog);

        if (ridesadd) {
            document.getElementById('Nombre_Ride').value = ridesadd.name;
            document.getElementById('Comienzo_Ride').value = ridesadd.startride;
            document.getElementById('Fin_Ride').value = ridesadd.endride;
            document.getElementById('descip_info').value = ridesadd.descrip;
            document.getElementById('tiemsali').value = ridesadd.existtime;
            document.getElementById('tiemlleg').value = ridesadd.arrivaltime;
            document.getElementById('tiemsali').value = ridesadd.existtime;
            document.getElementById('chbLunes').checked = ridesadd.Lunes;
            document.getElementById('chbMartes').checked = ridesadd.Martes;
            document.getElementById('chbMiercoles').checked = ridesadd.Miercoles;
            document.getElementById('chbJueves').checked = ridesadd.Jueves;
            document.getElementById('chbViernes').checked = ridesadd.Viernes;
            document.getElementById('chbSabado').checked = ridesadd.Sabado;
            document.getElementById('chbDomingo').checked = ridesadd.Domingo;

        } else {
            window.alert('No hay informacion resgistrada!');
        }
    }

}

//////////////////////////////////////////////////////////////////////

// ********************* JS DE CONFIGURACIONES   *********

//validar campos de html CONFIGURACIONES.

function VCC(namecomplet, speed, descrip,) {
    if (namecomplet.length == 0 || speed.length == 0 || descrip.length == 0) {
        return true;
    } else {
        return false;
    }
}

//Añadir configuraciones
function addConfig() {

    //obtener rides
    const name_complet = document.getElementById('nombrecomp_car').value;
    const speed_car = document.getElementById('VelocidadMed_car').value;
    const descrip_car = document.getElementById('descip_car').value;


    //crear un objeto

    let userlog = localStorage.getItem('userlog');
    let configrideDB = JSON.parse(localStorage.getItem('configride'));
    if (!configrideDB) {
        configrideDB = [];
    }
    ///Apara buscar si este usario ya tiene datos guardados
    let Confiuser = configrideDB.find(user => user.username === userlog);

    // este if Actualiza sus datos ya tiene registrado datos y si no tiene los crea nuevos
    if (Confiuser) {
        Confiuser.name_complet = name_complet;
        Confiuser.speed_car = speed_car;
        Confiuser.descrip_car = descrip_car;
        // el nombre usario no se actualiza
        localStorage.setItem('configride', JSON.stringify(configrideDB));
        window.alert('Datos de configuracion actualizados exitosamente!!');
        window.location = 'Tablero.html';

    } else {
        if (!VCC(name_complet, speed_car, descrip_car)) {
            const config = {
                name_complet: name_complet,
                speed_car: speed_car,
                descrip_car: descrip_car,
                username: userlog

            }
            configrideDB.push(config);
            localStorage.setItem('configride', JSON.stringify(configrideDB));
            window.alert('Datos de configuraciones agregados con exito al usuario!');
            window.location = 'Tablero.html';
        } else {
            window.alert('Algunos espacios quedaron en blanco, por favor verificar!');
        }
    }

}




//////Cargar infromacion
function ConfigCarg() {
    let userlog = localStorage.getItem('userlog');

    let configrideDB = JSON.parse(localStorage.getItem('configride'));
    if (!configrideDB) {
        configrideDB = [];
    }

    let Confiuseg = configrideDB.find(user => user.username === userlog);

    if (Confiuseg) {
        document.getElementById('nombrecomp_car').value = Confiuseg.name_complet;
        document.getElementById('VelocidadMed_car').value = Confiuseg.speed_car;
        document.getElementById('descip_car').value = Confiuseg.descrip_car;

    } else {
        window.alert('Este usuario no tiene información guardada');
    }
}



