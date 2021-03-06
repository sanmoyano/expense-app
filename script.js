//OBJETO
class Gasto {
    constructor(monto, nombre) {
        this.monto = monto;
        this.nombre = nombre;
    };
    devolverDatos () {
        return (`${this.monto} - ${this.nombre}`);
    };
};

//VARIABLES
let gastos = [];
let mapGastos = [];
let formulario = document.querySelector("#form-gastos");
let divGastos = document.querySelector(".li-gastos-container");
let empty = document.querySelector(".empty");
let emptyBtn = document.querySelector(".btn-empty");
let totalGastos = document.querySelector(".total-gastos");


//EVENTOS
//cargar datos al formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    reloadLocal();

    let datForm = new FormData(e.target);//e.target accedo al formulario
    let gasto = new Gasto (datForm.get('monto'), datForm.get('nombre'));//creo el objeto con las propiedades de la clase
    gastos.push(gasto);//mando al array

    localStorage.setItem('gastos', JSON.stringify(gastos));//array al LS
    formulario.reset();
    // console.log(gastos)

    cargarGastosDom();
    mostrarTotal ();
});

//eliminar historial
emptyBtn.addEventListener('click', () => {
    localStorage.clear('gastos');
    localStorage.clear('montos');
    divGastos.innerHTML = "";
    totalGastos.innerHTML = "";
    empty.style.display = "block";
});

//FUNCIONES
//cargar gastos al dom
function cargarGastosDom () {
    let gastosParseados = JSON.parse(localStorage.getItem('gastos'));
    divGastos.innerHTML = "";
    if (gastosParseados !== "") {
        gastosParseados.forEach((gasto, indice) => {
            divGastos.innerHTML += `
                <li id="gastos ${indice + 1}" class="li-gastos-row"> 
                        <p> &#128184 ${gasto.monto} </p>
                        <p> ${gasto.nombre} </p>
                        <button class="btn-delete" id="boton ${indice + 1}">&#9940</button>
                    </div>
                </li>
            `
        });
        empty.style.display = "none";
        emptyBtn.style.display = "flex";
    }

    //leer montos de los objetos
    if(gastosParseados !== "") {
        mapGastos = gastosParseados.map(gasto => {
            return parseInt(gasto.monto);//creo un nuevo array con los montos 
        });
        localStorage.setItem('montos', JSON.stringify(mapGastos));//envio el array al LS
    };

    //eliminar gastos individuales
    gastosParseados.forEach((gasto, indice) => {
        document.getElementById(`boton ${indice + 1}`).addEventListener('click', () => {
            divGastos.removeChild(document.getElementById(`gastos ${indice +1}`));//elimina la tarea del dom
            gastos.splice(indice, 1); //elimina la tarea del array
            localStorage.setItem('gastos', JSON.stringify(gastos));//actualiza el LS gastos

            mapGastos.splice(indice, 1);//elimino el monto del array
            localStorage.setItem('montos', JSON.stringify(mapGastos));//actualizo el LS montos
        
            mostrarTotal();//actualizo el total
        });
    });
    
};

//mostrar total en DOM 
function mostrarTotal () {
    totalGastos.innerHTML = "";
    totalGastos.innerHTML += `
        <h3 class="total"> TOTAL: $${sumarMontos()}</h3> 
    `
};

//sumar montos de los objetos
function sumarMontos () {
    let montosArray = JSON.parse(localStorage.getItem('montos'));
    let suma = (valor1, valor2) => valor1 + valor2
    return montosArray.reduce(suma)
};

//recargar elementos del LS
function reloadLocal () {
    let gastosLocal = localStorage.getItem('gastos') //obtengo los objetos del LS
    console.log(gastosLocal)
    if(gastosLocal == null) { //si no hay datos en el LS
        gastos = []; //entonces es igual a datos vacios
    } else { //si hay datos
        gastos = JSON.parse(gastosLocal);//el array gastos es igual al array en LS
    }
    // console.log(gastos)
    return gastos; //retornar array gastos
}

cargarGastosDom ();
mostrarTotal();

