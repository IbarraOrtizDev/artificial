let tipos;
let aleatorio;
let error = 0;
let total = 0;

function marcador(){
    document.getElementById("marcador").textContent = total-error + "/" + total
}

async function buscarTipos() {
    tipos = await (await fetch('http://localhost:8000/tipos')).json()
    buscarAleatorio()
}

async function buscarAleatorio() {
    aleatorio = await (await fetch('http://localhost:8000/aleatorio/')).json()
    agregarPantalla(aleatorio)
}

function agregarPantalla(data) {
    
    let d = /*html*/`<div class="card" style="max-width: 25rem; width: 100%; margin: auto;">
    <img src="./${data.ruta}" class="card-img-top" alt="...">
    <div class="card-body">
        <h6 class="card-title">Selecciona la respuesta correcta</h6>
        <div class="form-check">
            <ul class="list-group">
                ${tipos.map(ele => /*html*/`<li class="list-group-item">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id="${ele.nombre.split(" ").join("")}">
                        <label class="form-check-label" for="${ele.nombre.split(" ").join("")}">
                            ${ele.nombre}
                        </label>
                    </li>`).join("")
        }
            </ul>
        </div>
        <hr>
        <div style="text-align: center;" id="cont-btn">
            <button href="#" class="btn btn-primary btn-lg" onClick="validar()">Validar</button>
        </div>
    </div>
    </div>`

    document.getElementById('nav-home').innerHTML = d
}

function validar() {
    let selected = document.querySelector("input[name=flexRadioDefault]:checked")
    if (selected != null) {
        total = total+1
        let tipoElegido = tipos.find(ele => ele.id === aleatorio.tipo)
        let elegir = tipoElegido.nombre.split(" ").join("")

        if (elegir !== selected.getAttribute("id")){
            selected.classList.add('error')
            error =error+1
        }

        document.getElementById(elegir).classList.add("success")
        document.getElementById('cont-btn').innerHTML = `<button href="#" class="btn btn-primary btn-lg" onClick="buscarAleatorio()">Continuar</button>`
        marcador()
    }
}

buscarTipos()