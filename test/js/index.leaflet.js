 var ctrlBtn = document.getElementById('ctrlBtn');
 var crtStepBtn = document.getElementById('crtStepBtn');
 var spaceInp = document.getElementById('spaceInp');
 var stepRotate = document.getElementById('stepRotate');
 var stepRotateBox = document.getElementById('stepRotateBox');
 var stepRotateValue = document.getElementById('stepRotateValue');
 var map = L.map('app').setView([23.13184566463993, 113.25901150703432], 22);
 var state = {
     isReadyDrawPolygon: false,
     isBeginDraw: false
 }
 var polygon = {
     layer: L.polygon([], {
         color: '#f00',
         fillColor: '#f5f5f5',
         weight: 1,
         fillOpacity: 0.5,
         opacity: 1
     }).addTo(map),
     latlngs: [],
 };
 var polyline = {
     layer: L.polyline([], {
         color: '#0f0',
         weight: 2,
         opacity: 1
     }).addTo(map),
     latlngs: []
 }
 cpRPA.setDistanceFn(distance);

 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 stepRotate.addEventListener('change', function() {
     stepRotateValue.innerText = this.value;
 });
 stepRotate.addEventListener('input', function() {
     stepRotateValue.innerText = this.value;
     renderPolyline();
 })

 ctrlBtn.addEventListener('click', function() {
     state.isReadyDrawPolygon = !state.isReadyDrawPolygon;
     if (state.isReadyDrawPolygon) {
         this.innerText = "清除";
     } else {
         this.innerText = "绘制凸多边形地块"
         initDraw();
     }
 });

 crtStepBtn.addEventListener('click', function() {
     renderPolyline();
 })

 map.on('click', function(e) {
     if (state.isReadyDrawPolygon) {
         polygon.latlngs.push(e.latlng);
         polygon.layer.setLatLngs(polygon.latlngs);
     }
     if (polygon.latlngs.length > 2) {
         crtStepBtn.className = spaceInp.className = stepRotateBox.className = "";
     }
 });


 function initDraw() {
     polygon.latlngs = polyline.latlngs = [];
     polygon.layer.setLatLngs(polygon.latlngs);
     polyline.layer.setLatLngs(polyline.latlngs);
     crtStepBtn.className = spaceInp.className = stepRotateBox.className = "hide";
 }


 function renderPolyline() {
     polyline.latlngs = cpRPA.setOptions({
         polygon: polygon.latlngs,
         stepRotate: parseFloat(stepRotate.value) || 0,
         space: parseFloat(spaceInp.value) || 5
     });
     polyline.layer.setLatLngs(polyline.latlngs)
 }



 function distance(p1, p2) {
     return L.latLng(p1.lat, p1.lng).distanceTo(L.latLng(p2.lat, p2.lng))
 }