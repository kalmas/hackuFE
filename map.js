function initialize() {
	var mapOptions = {
			center: new google.maps.LatLng(36.8857, -76.2599),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);