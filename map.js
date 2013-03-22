

$(document).ready(function () {
	var map, count, markers=[], listings=[];
var infoWindow = new google.maps.InfoWindow;

	function initializeMap() {
		var mapOptions = {
			center: new google.maps.LatLng(36.88, -76.25),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// Pop a map on the page
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		google.maps.event.trigger(map, 'resize');
	}

	function getLatLong(locationString)	{
				
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({address:locationString}, function(results, status){
				locate = results[0];
				var latlongObject = {};
				latlongObject.lat = locate.geometry.location.lat();
				latlongObject.lng = locate.geometry.location.lng();
				google.maps.event.trigger(map, 'resize');
				map.setCenter(new google.maps.LatLng(latlongObject.lat, latlongObject.lng));
				$.ajax({
				   type: "GET",
				   url: "http://204.154.41.98/hackuFE/index.php",
				   data: latlongObject,
				   cache: false,
				   dataType: 'jsonp',
				   error: function () {
					console.log('error');
				   },
				   success: function(response) {
					for (var i = 0; i < markers.length; i++ ) {
						markers[i].setMap(null);
					}
					var results = response.results, listings = [];
					for(var idx in results){
						var result = results[idx];
						var marker = new google.maps.Marker({'position': new google.maps.LatLng(result.latitude, result.longitude), 'map':map});
						listings.push(result);
						markers.push(marker);
						google.maps.event.addListener(marker, 'click', function () {
							var idx = markers.indexOf(this), listing = listings[idx];			
							infoWindow.setOptions({"position": this.position, "content": "<img src=\"" + listing.images.url[0] + '" style="width:50px;height:50px;float:left;" /></br>' + listing.name + '</br>' + listing.phone}); 
							infoWindow.open(map, this);
						});
						
					}
					console.log(markers.length);
				   }
				 });
				 });	
	}

	$('#map-page').live('pageinit', initializeMap);

	$('#sbutton').bind("click", function (){
		var sval = $('#searchfield').val();
		getLatLong(sval);
		map.setZoom(12);
	});
	
	$('#mapSearchBox').bind("click change", function (){
		var sval = $(this).val();
		getLatLong(sval);
		map.setZoom(12);
	});
	
	initializeMap();
});

