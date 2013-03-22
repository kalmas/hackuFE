var map;

$(document).ready(function () {

	function initializeMap() {
		var mapOptions = {
			center: new google.maps.LatLng(36.88, -76.25),
			zoom: 11,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// Pop a map on the page
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}


	function getLatLong(locationString)	{
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({address:locationString}, function(results, status){
				locate = results[0];
				var latlongObject = {};
				latlongObject.lat = locate.geometry.location.lat();
				latlongObject.lng = locate.geometry.location.lng();
				map.setCenter(new google.maps.LatLng(latlongObject.lat, latlongObject.lng));
		
				$.ajax({
				   type: "GET",
				   url: "http://atorres-hacku.dev/index.php",
				   data: latlongObject,
				   cache: false,
				   dataType: 'jsonp',
				   error: function () {
					console.log('error');
				   },
				   success: function(response) {
					var results = response.results;
					for(var idx in results){
						var result = results[idx];
						console.log(result);
						var marker = new google.maps.Marker({'position': new google.maps.LatLng(result.latitude, result.longitude), 'map':map});
					}
						
					console.log(response);
				   }
				 });
				 });	
	}

	$('#map-page').live('pageshow', initializeMap);

	$('#sbutton').click(function (){
		if (map == null) initializeMap();
		var sval = $('#searchfield').val();
		getLatLong(sval);
	});
});

