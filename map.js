var mymap = L.map('map').setView([35.6811673, 139.7670516], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
}).addTo(mymap);

var latlng = new L.LatLng(35.6811673, 139.7670516);

var marker = L.marker(latlng).addTo(mymap);

marker.bindPopup("指定位置").openPopup();

mymap.panTo(latlng);

document.getElementById("move-button").addEventListener("click", function() {
    latlng.lat += 0.0001;
    marker.setLatLng(latlng);
    marker.update();
    mymap.panTo(latlng);
  });