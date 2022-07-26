import { showPosition, showError } from './geo.js';
import content from './content.js';
import weather from './weather.js'
import paises from '../../Countries/JS/Data/AllCountries.js';


const container = document.querySelector('.center');
// const divCurrent = document.querySelector('#current');
const divAdd = document.querySelector('#add');
const divForm = document.querySelector('#addCity');
const form = document.querySelector('#formCity');
const listaCapitais = document.querySelector('ul')
const divCidades = document.querySelectorAll('.current');
const previsoes = document.querySelector('.center');
var listaCidades =[];


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    console.log('Geolocation is not supported by this browser.')
}

const colocarCapitais = () => {
    paises()
        .then(data =>
            data.forEach(pais => {
                if (pais.region == 'Europe') {
                    const newCapital = document.createElement('li');
                    let id = pais.capital[0] + ', ' + pais.name.common
                    newCapital.setAttribute('id', id);
                    newCapital.innerHTML = id;
                    newCapital.draggable = true;
                    listaCapitais.appendChild(newCapital);

                    // listaCapitais.innerHTML += `<li id='${pais.capital[0]}'>${pais.capital[0]}, ${pais.name.common}</li>`
                } 
            })    
        )
        .catch( err => { //em caso de erro
            console.log('Promise com erro',err.message);
        })
}

const gravarLS = () => {
    divCidades.forEach (cidade => {
        if (cidade.hasAttribute('id') != 'current'){
            listaCidades.push(cidade.getAttribute('id'))
        }    
    })
    localStorage.setItem('cidades', JSON.stringify(listaCidades));
}

const novaCidade = (nome) => {
    weather(nome)
        .then(weatherData => {
            const newCity = document.createElement('div');
            newCity.classList.add('gradient-border');
            newCity.classList.add('current');
            newCity.setAttribute('id', nome);
            newCity.innerHTML = content(weatherData)+'<div id="close">X</div>';
            container.insertBefore(newCity, divAdd)
        })
        .catch( err => { //em caso de erro
            console.log('Promise com erro',err.message);
        })
    
}

colocarCapitais()

listaCapitais.ondragstart = e => {
    if (e.target.tagName == 'LI') {
        e.dataTransfer.setData('item-id',e.target.id);
    }
}

divAdd.ondragover = e => e.preventDefault();
divAdd.ondrop = e => {
    const id = e.dataTransfer.getData('item-id');
    novaCidade(id);
    gravarLS();
}

divAdd.addEventListener('click', e => {
    divForm.classList.remove('hide');
})

window.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        divForm.classList.add('hide');
    }
})

form.addEventListener('submit', e => {
    e.preventDefault();
    divForm.classList.add('hide');
    novaCidade(form.city.value.trim());
    gravarLS()

    form.reset();
})

previsoes.addEventListener('click', e => {
    if (e.target.getAttribute('id') == 'close') {
        let filtro = e.target.parentElement.getAttribute('id');
        listaCidades = listaCidades.filter(cidade => cidade != filtro);
        localStorage.setItem('cidades', JSON.stringify(listaCidades));
        e.target.parentElement.remove()
    }
})

window.addEventListener('load', e => {
    listaCidades = JSON.parse(localStorage.getItem('cidades'));
    if (listaCidades != null) {
        listaCidades.forEach(cidade => {
            novaCidade(cidade);
        })
    } else {
        listaCidades = [];
    }
})