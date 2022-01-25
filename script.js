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
let divGastos = document.querySelector(".li-gastos-cotainer");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let datForm = new FormData(e.target);//e.target accedo al formulario
    let gasto = new Gasto (datForm.get('monto'), datForm.get('nombre'));
    gastos.push(gasto);

    localStorage.setItem('gastos', JSON.stringify(gastos));
    formulario.reset();

    cargarDom();

});


function cargarDom () {
    let gastosParseados = JSON.parse(localStorage.getItem('monots'));

    gastosParseados.forEach((gasto, indice) => {
        divGastos.innerHTML += `
            
        `
    });
}

