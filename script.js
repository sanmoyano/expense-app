class Gasto {
    constructor(monto, nombre) {
        this.monto = monto;
        this.nombre = nombre;
    };
    devolverDatos () {
        return (`${this.monto} - ${this.nombre}`);
    };
};

let gastos = [];
let formulario = document.querySelector("#form-gastos");
let divGastos = document.querySelector(".li-gastos-container");
let empty = document.querySelector(".empty");
let emptyBtn = document.querySelector(".btn-empty");
let totalGastos = document.querySelector(".total-gastos")

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let datForm = new FormData(e.target);//e.target accedo al formulario
    let gasto = new Gasto (datForm.get('monto'), datForm.get('nombre'));//creo el objeto con las propiedades de la clase
    gastos.push(gasto);//mando al array

    localStorage.setItem('gastos', JSON.stringify(gastos));//array al LS
    formulario.reset();

    cargarGastosDom();
    mostrarTotal ();

});

//EVENTOS
//eliminar historial
emptyBtn.addEventListener('click', () => {
    localStorage.clear('gastos');
    divGastos.innerHTML = "";
    totalGastos.innerHTML = "";
    empty.style.display = "block";
})

//FUNCIONES
//cargar gastos al dom
function cargarGastosDom () {
    let gastosParseados = JSON.parse(localStorage.getItem('gastos'));
    divGastos.innerHTML = "";
    if (gastosParseados !== "") {
        gastosParseados.forEach((gasto, indice) => {
            divGastos.innerHTML += `
                <li id="gastos ${indice + 1}" class="li-gastos-row"> 
                        <p> $${gasto.monto} </p>
                        <p> ${gasto.nombre} </p>
                        <button class="btn-delete" id="boton ${indice + 1}"> X </button>
                    </div>
                </li>
            `
        });
        empty.style.display = "none";
        emptyBtn.style.display = "flex";
    };
    
    //eliminar gastos individuales
    gastosParseados.forEach((gasto, indice) => {
        document.getElementById(`boton ${indice + 1}`).addEventListener('click', () => {
            divGastos.removeChild(document.getElementById(`gastos ${indice +1}`))
        })
    })
}

//mostrar total en DOM 
function mostrarTotal () {
    totalGastos.innerHTML = "";
    totalGastos.innerHTML += `
        <h3 class="total"> Total: $$$ </h3> 
    `
}