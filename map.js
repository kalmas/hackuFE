function initializeMap() {
	var mapOptions = {
    	center: new google.maps.LatLng(36.88, -76.25),
    	zoom: 8,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
	// Pop a map on the page
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	// Place a marker
 	var marker = new google.maps.Marker({'position': new google.maps.LatLng(36.88, -76.25), 'map':map});
}

$('#map-page').live('pageshow', initializeMap);

$('sbutton').click(function (){
				var sval = $('#searchfield').val();
				getLatLong(sval);
			});