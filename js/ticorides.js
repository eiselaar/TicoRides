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

        if (!validarnombreride (name_ride)){
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

//Validar que el nombre del ride registrado sea unico, y que no exista
function validarnombreride(name_ride) {

    const ridesDB = JSON.parse(localStorage.getItem('rides'));
    if (ridesDB) {
        let ride_name = ridesDB.find(rides => rides.name === name_ride);

        if (ride_name) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
//funcion modificar ride
function modify(){

}

//////////////////////////////////////////////////////////////////////

// ********************* JS DE CONFIGURACIONES   *********

//validar campos de html CONFIGURACIONES.

function VCC(namecomplet, speed, descrip,) {
    if (namecomplet.length == 0 || speed.length ==0 ||  descrip.length == 0 ) {
        return true;
    } else {
        return false;
    }
}

//Añadir configuraciones
function addConfig(){

      //obtener rides
      const name_complet = document.getElementById('nombrecomp_car').value;
      const speed_car = document.getElementById('VelocidadMed_car').value;
      const descrip_car = document.getElementById('descip_car').value;
    
  
  
      //crear un objeto
  
      let ridesreg = localStorage.getItem('rides');
      let configrideDB = JSON.parse(localStorage.getItem('configride'));
      if (!configrideDB) {
        configrideDB = [];
      }
      if (!VCC(name_complet,speed_car,descrip_car)) {
        const config = {
            name_complet: name_complet,
            speed_car: speed_car,
            descrip_car: descrip_car,
            nameride:ridesreg

        }
        configrideDB.push(config);
        localStorage.setItem('configride', JSON.stringify(configrideDB));
        window.alert('Configuraciones agregadas con exito al ride!');
        window.location = 'Tablero.html';
    } else {
        window.alert('Algunos espacios quedaron en blanco, por favor verificar!');
    }
    

}



