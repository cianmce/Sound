var customMapType = null;
var map = null;
var customMapTypeId = null;
var buoy_coords = [
  [53.127, -11.200],
  [53.480, -5.425],
  [51.217, -10.550],
  [55.000, -10.000],
  [51.690, -6.704],
  [53.190, -15.770]
];
var current_buoy = 0;

function initMap() {
  var styles =   [
        {
          featureType: "water",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" }
          ]
        },
        {
            stylers: [
              {visibility: 'simplified'},
            ]
        }
      ];

    var mapOptions = {
          zoom: 7,
          center: new google.maps.LatLng(buoy_coords[0][0], buoy_coords[0][1]),
          disableDefaultUI: true,
          styles: styles
        };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Place 6 buoys
    var image = 'img/buoy.png';
    for(var i=0; i<buoy_coords.length; i++){
      var beachMarker = new google.maps.Marker({
        position: new google.maps.LatLng(buoy_coords[i][0],buoy_coords[i][1]),
        map: map,
        icon: image
      });
    }
}

function update_map(color, buoy_index) {
    mapOptions = {styles: [
                    {
                      featureType: "water",
                      stylers: [
                        { visibility: "on" },
                        { color: color}
                      ]
                    }
                ],
                center: new google.maps.LatLng(buoy_coords[buoy_index][0], buoy_coords[buoy_index][1])
            };
    map.setOptions(mapOptions);
}