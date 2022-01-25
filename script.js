
//Variables
let inputMonto = document.querySelector(".input-monto");
let inputText = document.querySelector(".input-text");
let addBtn = document.querySelector(".btn-add");
let ul = document.querySelector("ul");
let li = document.querySelector(".li-gastos-container")
let empty = document.querySelector(".empty");
let emptyBtn = document.querySelector(".btn-empty");
let totalGastos = document.querySelector (".total-gastos");
let formulario = document.querySelector("#formGastos");

//array de los montos
let gastos = [];

//agregar evento al boton de agregar gastos 
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    
    let monto = parseInt(inputMonto.value); //capturo el valor y lo convierto en numero
    let description = inputText.value;

    gastos.push(monto)//envio solo el monto al array
    localStorage.setItem('montos', JSON.stringify(gastos)); //lo guardo en el LS

    if (monto !== "") {
        let liGastos = document.createElement ("li");
        let pMonto = document.createElement ("p");
        pMonto.textContent = monto;

        let pText = document.createElement ("p");
        pText.textContent = description

        liGastos.appendChild(pMonto);
        liGastos.appendChild(pText);
        liGastos.appendChild(deleteBtn());
        ul.appendChild(liGastos);

        inputMonto.value = "";
        inputText.value = "";
        empty.style.display = "none";
        emptyBtn.style.display = "flex";

    }
    
    sumaMontos();
})

//FUNCIONES
//suma de del array de gastos
function sumaMontos () {
    let gastosArray = JSON.parse(localStorage.getItem('montos'));
    let suma = (valor1, valor2) => valor1 + valor2;
    // console.log(gastosArray.reduce(suma));
    return gastosArray.reduce(suma);
};

//funcion para mostrar el total
function mostrarTotal () {
    addBtn.addEventListener('click', () => {
        let h4 = document.createElement("h4");
        totalGastos.innerHTML = "";
        h4.innerHTML += `
            <h3 class="total"> Total: $${sumaMontos()} <h3>
        `
        totalGastos.appendChild(h4);
    });
};
mostrarTotal();

//funcion para eliminar gasto individual 
function deleteBtn () {
    let deleteButton = document.createElement("button");

    deleteButton.textContent = "X";
    deleteButton.className = "btn-delete";

    deleteButton.addEventListener('click', (e) => {
        let itemGasto = e.target.parentElement; //meto el elemento del DOM en una variable
        ul.removeChild(itemGasto);//lo elimino del DOM

        let arrayLocal = JSON.parse(localStorage.getItem('montos'))
        console.log(arrayLocal)

    });
    return deleteButton;
};

