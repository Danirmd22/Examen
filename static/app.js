
import { haversineDistance } from "./utils.js";

var map;
var p = [];

var template = document.querySelector('template').content;
var aside = document.querySelector("aside");
// Inicialización del mapa
function initMap(){
    map = L.map('mapa').setView([36.719332, -4.423457], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
};


function addToMap(data){
    if (data.geometry && data.geometry.coordinates && data.geometry.coordinates.length >= 2) {
        let latitud = data.geometry.coordinates[1]; 
        let longitud = data.geometry.coordinates[0]; 
        let marker = L.marker([latitud, longitud]).addTo(map);
        marker.bindPopup(
            `<h3>${data.properties.DESCRIPCION}</h3>
             <p>${data.properties.NOMBRE}</p>
            `);
        marker.addEventListener("click",()=>{

            updateInfo(data.properties);
        });
       
    } 
}

 



function updateInfo(element, position){
 
    let clone = template.cloneNode(true);
    

    clone.querySelector('#nombre').textContent = element.NOMBRE;
    clone.querySelector('#descripcion').textContent = element.DESCRIPCION;
    clone.querySelector("button").dataset.pos=position;



    clone.querySelector("button").addEventListener("click",(event)=>{
        let pos = event.target.dataset.pos;
        showInfo(pos);
    });

    
    aside.appendChild(clone);
}




function showInfo(pos){

    document.querySelector("dialog h3").textContent = p[pos].DESCRIPCION;
    document.querySelector("dialog p").textContent = p[pos].DESCRIPCION;
    
    document.querySelector("dialog").showModal();
    
    

}






initMap();

fetch("static/da_transporte_paradasTaxi-4326.json")
.then( (res) => res.json() )
.then( (data) => {
    data.features.forEach(element => {
        console.log(element);
        addToMap(element);
    });
} )
.catch( (err)=>{
    console.log("Error en el fetch");
    console.log(err);
});










