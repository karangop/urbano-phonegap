var coordenadas;
var myCenter;
var geocoder;
var map;
var markers = Array();
var infos = Array();

coordenadas = {
	Lat: 0,
	Lng: 0
};

/*		
function initialize2() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(40.7143528,-74.0059731);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('mapa'), myOptions);
}*/

function iniciar() {
			
		function localizacion (posicion) {
			coordenadas = {
				Lat: posicion.coords.latitude,
				Lng: posicion.coords.longitude
			};
			
			informacion(coordenadas);
			
			myCenter=new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng);
			
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng),
				disableDefaultUI: false,
				navigationControlOptions: {
    			style: google.maps.NavigationControlStyle.SMALL},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
			
			marker=new google.maps.Marker({
			  position:myCenter,
			  animation:google.maps.Animation.BOUNCE
			  });
			
			marker.setMap(map);
			
			/*
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng),
				content: 'Tu ubicaci�n (geolocation) usando HTML5 y Google Maps.'
            });
            */
		}
		
		function errores (error) {
			alert('Ha ocurrido un error al intentar obtener la informaci�n');
		}
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(localizacion,errores);
		} else {
			alert("Tu navegador no soporta o no tiene habilitada la 'Geolocalizacion'");
		}

}

// clear overlays function
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}

// Hospital
function findPlacesHospital() {

	    // prepare variables (filter)
	    //var type = document.getElementById('valores').value;
	    //var radius = document.getElementById('gmap_radius').value;
	    //var keyword = document.getElementById('gmap_keyword').value;
	    
	    var type='hospital';
	    var radius=5000;
	
	    //var lat = document.getElementById('lat').value;
	    //var lng = document.getElementById('lng').value;
	    //var cur_location = new google.maps.LatLng(lat, lng);
	    var cur_location = myCenter;
	
	    // prepare request to Places
	    var request = {
	        location: cur_location,
	        radius: radius,
	        types: [type]
	    };
	    /*
	    if (keyword) {
	        request.keyword = [keyword];
	    }*/
	
	    // send request
	    service = new google.maps.places.PlacesService(map);
	    service.search(request, createMarkers);
}

// Supermercados
function findPlacesBancos() {

	    // prepare variables (filter)
	    //var type = document.getElementById('valores').value;
	    //var radius = document.getElementById('gmap_radius').value;
	    //var keyword = document.getElementById('gmap_keyword').value;
	    
	    var type='bank';
	    var radius=5000;
	
	    //var lat = document.getElementById('lat').value;
	    //var lng = document.getElementById('lng').value;
	    //var cur_location = new google.maps.LatLng(lat, lng);
	    var cur_location = myCenter;
	
	    // prepare request to Places
	    var request = {
	        location: cur_location,
	        radius: radius,
	        types: [type]
	    };
	    /*
	    if (keyword) {
	        request.keyword = [keyword];
	    }*/
	
	    // send request
	    service = new google.maps.places.PlacesService(map);
	    service.search(request, createMarkers);
}

// Farmacia
function findPlacesFarmacias() {

	    // prepare variables (filter)
	    //var type = document.getElementById('valores').value;
	    //var radius = document.getElementById('gmap_radius').value;
	    //var keyword = document.getElementById('gmap_keyword').value;
	    
	    var type='pharmacy';
	    var radius=5000;
	
	    //var lat = document.getElementById('lat').value;
	    //var lng = document.getElementById('lng').value;
	    //var cur_location = new google.maps.LatLng(lat, lng);
	    var cur_location = myCenter;
	
	    // prepare request to Places
	    var request = {
	        location: cur_location,
	        radius: radius,
	        types: [type]
	    };
	    /*
	    if (keyword) {
	        request.keyword = [keyword];
	    }*/
	
	    // send request
	    service = new google.maps.places.PlacesService(map);
	    service.search(request, createMarkers);
}

// Comisaria
function findPlacesComisaria() {

	    // prepare variables (filter)
	    //var type = document.getElementById('valores').value;
	    //var radius = document.getElementById('gmap_radius').value;
	    //var keyword = document.getElementById('gmap_keyword').value;
	    
	    var type='police';
	    var radius=5000;
	
	    //var lat = document.getElementById('lat').value;
	    //var lng = document.getElementById('lng').value;
	    //var cur_location = new google.maps.LatLng(lat, lng);
	    var cur_location = myCenter;
	
	    // prepare request to Places
	    var request = {
	        location: cur_location,
	        radius: radius,
	        types: [type]
	    };
	    /*
	    if (keyword) {
	        request.keyword = [keyword];
	    }*/
	
	    // send request
	    service = new google.maps.places.PlacesService(map);
	    service.search(request, createMarkers);
}


// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // if we have found something - clear map (overlays)
        clearOverlays();

        // and create new markers by search result
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('No se encuentran lugares');
    }
}

// creare single marker function
function createMarker(obj) {

    // prepare new Marker object
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });
    markers.push(mark);

    // prepare info window
    //<img src="' + obj.icon + '" />
    //'<br />Rating: ' + obj.rating + 
    var infowindow = new google.maps.InfoWindow({
        content: '<font style="color:#000;">' + obj.name + 
        '<br />Dirección: ' + obj.vicinity + '</font>'
    });
	
    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });
    infos.push(infowindow);
    
}

// initialization
google.maps.event.addDomListener(window, 'load', iniciar);



