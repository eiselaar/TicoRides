
///////////************ VALIDACIONES ************************////////////

//// VALIDAR LOS CAMPOS DE LAS PAG AÑADIR Y MODIFICAR
function validarcampos(name, startride, endride, descrip, existtime, arrivaltime) {
    if (name.length == 0 || startride.length == 0 || endride.length == 0 || descrip.length == 0 || existtime.length == 0 || arrivaltime.length == 0) {
        return true;
    } else {
        return false;
    }
}

//// VALIDAR QUE EL NOMBRE DEL RIDE REGISTRADO SEA UNICO, Y QUE NO EXISTAN MAS USUARIOS CON ESE NOMBRE
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

//// VALIDAR CAMPOS DE LA PAGINA DE CONFIGURACIONES

function VCC(namecomplet, speed, descrip,) {
    if (namecomplet.length == 0 || speed.length == 0 || descrip.length == 0) {
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------------------------------//

//********* * JS DE AÑADIR RIDE - MODIFICAR -ELIMINAR - CONFIGURACIONES ´ ***************

//// AÑADIR RIDE
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


////MOFIFICAR LOS DATOS DEL RIDE
function moficarinfo() {
    modirconfi = window.confirm('¿Está seguro que desea editar el ride seleccionado?');
    if (modirconfi) {
        const name_ride = document.getElementById('Nombre_Ride').value;
        const startride = document.getElementById('Comienzo_Ride').value;
        const endride = document.getElementById('Fin_Ride').value;
        const descrip = document.getElementById('descip_info').value;
        const existtime = document.getElementById('tiemsali').value;
        const arrivaltime = document.getElementById('tiemlleg').value;
        //  checkbox
        let Lunes = document.getElementById('chbLunes').checked;
        let Martes = document.getElementById('chbMartes').checked;
        let Miercoles = document.getElementById('chbMiercoles').checked;
        let Jueves = document.getElementById('chbJueves').checked;
        let Viernes = document.getElementById('chbViernes').checked;
        let Sabado = document.getElementById('chbSabado').checked;
        let Domingo = document.getElementById('chbDomingo').checked;

        let userlog = localStorage.getItem('userlog');
        let ridesDB = JSON.parse(localStorage.getItem('rides'));
        let name_rideedit = localStorage.getItem('RideEditar');
        if (!ridesDB) {
            ridesDB = [];
        }

        if (!validarcampos(name_ride, startride, endride, descrip, existtime, arrivaltime)) {

            if (!validarnombreride(name_ride, userlog)) {
                //validar los checkbox
                if (Lunes || Martes || Miercoles || Jueves || Viernes || Sabado || Domingo) {

                    let rideModi = ridesDB.find(rides => rides.name === name_rideedit && rides.usernameride === userlog);
                    if (rideModi) {
                        rideModi.name = name_ride;
                        rideModi.startride = startride;
                        rideModi.endride = endride;
                        rideModi.descrip = descrip;
                        rideModi.existtime = existtime;
                        rideModi.arrivaltime = arrivaltime;
                        rideModi.Lunes = Lunes;
                        rideModi.Martes = Martes;
                        rideModi.Miercoles = Miercoles;
                        rideModi.Jueves = Jueves;
                        rideModi.Viernes = Viernes;
                        rideModi.Sabado = Sabado;
                        rideModi.Domingo = Domingo;
                        localStorage.setItem('rides', JSON.stringify(ridesDB));
                        window.alert('Ride Modificado con exito!');
                        window.location = 'Tablero.html';
                    }

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

}

//// ELIMINAR RIDES
function eliminarride(ElimiRide) {

    eliminarconfi = window.confirm('¿Está seguro que desea eliminar el ride seleccionado?');
    if (eliminarconfi) {
        let userlog = localStorage.getItem('userlog');
        let ridesDB = JSON.parse(localStorage.getItem('rides'));

        let rideElimi = ridesDB.find(rides => rides.name === ElimiRide && rides.usernameride === userlog);

        ridesDB.splice(rideElimi, 1);

        localStorage.setItem('rides', JSON.stringify(ridesDB));
        window.alert('Ride Eliminado con exito!');
    }



}


//// AÑADIR LOS DATOS DE LAS CONFIGURACIONES DEL RIDE AL USUARIO SOLAMENTE SE HACE UNA VEZ
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
    ///Para buscar si este usario ya tiene datos guardados en las configuraciones
    let Confiuser = configrideDB.find(user => user.username === userlog);

    // Este if actualiza los datos ya registrado y si no tiene los crea nuevos
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


//------------------------------------------------------------------------------------------------------//

///////////************ JS CARGA DE  DATOS ************************////////////

//// CARGAR LA INFORMACION DE LOS RIDES EN LA PAGINA DE EDITAR
function CargarEditarInfo() {
    let name_ride = localStorage.getItem('RideEditar');
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

            //Checkbox
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


//// CARGAR LOS DATOS DEL RIDE DEL USUARIO LOGEADO EN LA TABLA DEL DASHORD

function CargarTableInfo() {

    let ridesDB = JSON.parse(localStorage.getItem('rides'));
    let userlog = localStorage.getItem('userlog');
    if (!ridesDB) {
        window.alert('Aun no se han registrado ride, por favor crear un ride en su cuenta!'); //QUITAR solo es de comprobacion
    } else {
        let Tablero = document.getElementById('tableroPri');
        ///recorrer la tabla
        for (let i = 0; i < ridesDB.length; i++) {

            if (ridesDB[i].usernameride === userlog) {

                let newRideRowRef = Tablero.insertRow(-1);

                newRideRowRef.setAttribute("nombreride", ridesDB[i].name);

                ///nombre ride
                let newCellRef = newRideRowRef.insertCell(0);
                newCellRef.textContent = ridesDB[i].name;

                ///salida ride
                newCellRef = newRideRowRef.insertCell(1);
                newCellRef.textContent = ridesDB[i].startride;

                ///llegada ride
                newCellRef = newRideRowRef.insertCell(2);
                newCellRef.textContent = ridesDB[i].endride;

                ///botones editar y borrar
                let newbuttonAcc = newRideRowRef.insertCell(3);

                let editionBu = document.createElement("button");
                editionBu.textContent = "Editar";

                let deleteBu = document.createElement("button");
                deleteBu.textContent = "Eliminar";

                newbuttonAcc.appendChild(editionBu);
                newbuttonAcc.appendChild(deleteBu);

                editionBu.addEventListener("click", (event) => {
                    let rideRow = event.target.parentNode.parentNode;
                    let tabla_rideName = rideRow.getAttribute("nombreride");
                    localStorage.setItem('RideEditar', tabla_rideName);
                    window.location = 'EditarRide.html';



                });


                deleteBu.addEventListener("click", (event) => {
                    let rideRow = event.target.parentNode.parentNode;
                    let tabla_rideName = rideRow.getAttribute("nombreride");
                    rideRow.remove();
                    eliminarride(tabla_rideName);

                });

            }
        }
    }
}

//// CARGAR INFORMACION DE LAS CONFIGURACIONES
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


//// CARGAR LOS RIDES DE TODOS LOS USUARIO EN LA TABLA DEL LA PAGINA PRINCIPAL (INDEX)

function mostrarTablaInforIndex() {
    let ridesDB = JSON.parse(localStorage.getItem('rides'));

    if (!ridesDB) {

    } else {
        let Tableroindex = document.getElementById('tablaindex');

        for (let i = 0; i < ridesDB.length; i++) {
            let newRideRowRef = Tableroindex.insertRow(-1);

            // Nombre Usuario
            let newCellRef = newRideRowRef.insertCell(0);
            newCellRef.textContent = ridesDB[i].usernameride;

            // Nombre Ride
            newCellRef = newRideRowRef.insertCell(1);
            newCellRef.textContent = ridesDB[i].name;

            //Descripsion
            newCellRef = newRideRowRef.insertCell(2);
            newCellRef.textContent = ridesDB[i].descrip;

            // Salidad
            newCellRef = newRideRowRef.insertCell(3);
            newCellRef.textContent = ridesDB[i].startride;

            // Destino
            newCellRef = newRideRowRef.insertCell(4);
            newCellRef.textContent = ridesDB[i].endride;

            //Hora de Salida
            newCellRef = newRideRowRef.insertCell(5);
            newCellRef.textContent = ridesDB[i].existtime;

            //Hora de Llegada
            newCellRef = newRideRowRef.insertCell(6);
            newCellRef.textContent = ridesDB[i].arrivaltime;

            let HD = ' ';

            if (ridesDB[i].Lunes) {
                HD = 'Lunes  '
            } if (ridesDB[i].Martes) {
                HD = HD + 'Martes  '
            } if (ridesDB[i].Miercoles) {
                HD = HD + 'Miércoles  '
            } if (ridesDB[i].Jueves) {
                HD = HD + 'Jueves  '
            } if (ridesDB[i].Viernes) {
                HD = HD + 'Viernes  '
            } if (ridesDB[i].Sabado) {
                HD = HD + 'Sábado  '
            } if (ridesDB[i].Domingo) {
                HD = HD + 'Domingo  '
            }
            //Dias
            newCellRef = newRideRowRef.insertCell(7);
            newCellRef.textContent = HD;




        }
    }
}

//------------------------------------------------------------------------------------------------------//

///////////************ JS BUSQUEDA DE RIDES POR UBICACION ************************////////////

////BUSCAR POR PUNTO DE PARTIDA Y DESTINO UN RIDE EN EL TABLERO DE LA PAGINA PRINCIPAL

function buscarrides() {
    
    const puntopartida = document.getElementById('puntopartida').value;
    const destinollegada = document.getElementById('destinollegada').value;

    if (puntopartida.length == 0 || destinollegada == 0) {
        window.alert('Un campo se encuentra vacio, por favor verificar!');
    } else {
        let ridesDB = JSON.parse(localStorage.getItem('rides'));

        if (!ridesDB) {

        } else {
            //Recuperar el numero de filas
            let Filas = document.getElementById('tablaindex').getElementsByTagName('tr').length;
            let Tableroindex = document.getElementById('tablaindex');
            //Esta funcion esta para eliminar los las filas de la tabla que no estan dentro de la busqueda del usuario
            for (let i = 1; i <= Filas; i++) {
                document.getElementById('tablaindex').deleteRow(1);
            }
            //Contador es para verficar los regitro , si segue en 0 vuelve a nostar los rides y encontro.
            let contador = 0;
            for (let i = 0; i < ridesDB.length; i++) {
                // tolower es para poner toda la cadena de texto en minuscula
                if (ridesDB[i].startride.toLowerCase() === puntopartida.toLowerCase() && ridesDB[i].endride.toLowerCase() === destinollegada.toLowerCase()) {
                    let newRideRowRef = Tableroindex.insertRow(-1);

                    // Nombre Usuario
                    let newCellRef = newRideRowRef.insertCell(0);
                    newCellRef.textContent = ridesDB[i].usernameride;

                    // Nombre Ride
                    newCellRef = newRideRowRef.insertCell(1);
                    newCellRef.textContent = ridesDB[i].name;

                    //Descripsion
                    newCellRef = newRideRowRef.insertCell(2);
                    newCellRef.textContent = ridesDB[i].descrip;

                    // Salidad
                    newCellRef = newRideRowRef.insertCell(3);
                    newCellRef.textContent = ridesDB[i].startride;

                    // Destino
                    newCellRef = newRideRowRef.insertCell(4);
                    newCellRef.textContent = ridesDB[i].endride;

                    //Hora de Salida
                    newCellRef = newRideRowRef.insertCell(5);
                    newCellRef.textContent = ridesDB[i].existtime;

                    //Hora de Llegada
                    newCellRef = newRideRowRef.insertCell(6);
                    newCellRef.textContent = ridesDB[i].arrivaltime;

                    let HD = ' ';

                    if (ridesDB[i].Lunes) {
                        HD = 'Lunes  '
                    } if (ridesDB[i].Martes) {
                        HD = HD + 'Martes  '
                    } if (ridesDB[i].Miercoles) {
                        HD = HD + 'Miércoles  '
                    } if (ridesDB[i].Jueves) {
                        HD = HD + 'Jueves  '
                    } if (ridesDB[i].Viernes) {
                        HD = HD + 'Viernes  '
                    } if (ridesDB[i].Sabado) {
                        HD = HD + 'Sábado  '
                    } if (ridesDB[i].Domingo) {
                        HD = HD + 'Domingo  '
                    }
                    //Dias
                    newCellRef = newRideRowRef.insertCell(7);
                    newCellRef.textContent = HD;
                    contador = contador + 1;
                } else {

                }
            }

            if (contador === 0) {
                window.alert('No hay ride hacia estos destinos!');
                mostrarTablaInforIndex();
            }
        }
    }

}

