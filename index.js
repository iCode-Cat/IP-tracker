const button = document.querySelector('button');
const input = document.querySelector('input');
let map;
let popup;

//Call as soon as page loaded. 
getIP('')

// mapboxgl.accessToken = 'pk.eyJ1IjoiYmtiazEyMyIsImEiOiJja2k4dmQxbjcwOWx5MnhtejhtNzJ2ZnJrIn0.vODwxQzamjtWx24uc-OeSw';
//     var maps = new mapboxgl.Map({
//      container: 'mapid',
//      style: 'mapbox://styles/mapbox/streets-v11'
//     });

//Find the ip location
button.onclick = () => getIP(input.value);

//Fetch the ip location, and geo.
async function getIP(ip) {
    const url = `https://geo.ipify.org/api/v1?apiKey=at_wvDYSltg3COI2ci3zlxUYZ5G6kNSf&ipAddress=${ip}`;

    //remove the map and generate new one 
    if(document.querySelector('.leaflet-pane'))  {
        map.remove()
        
    }
        

    const get = await fetch(url)
        .then((res) => res.json())
        .then((data) => {

            //IP information DOM
            const locationName = document.querySelector('.location').innerHTML = data.location.city;
            const ip = document.querySelector('.ip').innerHTML = data.ip;
            const utc = document.querySelector('.utc').innerHTML = data.location.timezone;
            const isp = document.querySelector('.isp').innerHTML = data.isp;
            console.log(data);
            
            maps(data.location.lat , data.location.lng)
        })
        .catch((err)=>{
            console.log('Please enter a valid IP adress.')
            alert('Please enter a valid IP adress.')
            getIP('')
        })
        
}

function maps(x , y) {

    
    
    map = L.map('mapid').setView([x, y], 13);

    

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmtiazEyMyIsImEiOiJja2k4dmQxbjcwOWx5MnhtejhtNzJ2ZnJrIn0.vODwxQzamjtWx24uc-OeSw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    //Icon settings 
   let svg = L.icon({
        iconUrl: './images/icon-location.svg',
        

        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    L.marker([x, y], {icon: svg}).addTo(map);
}
