var latitu  = 0;
var longitu = 0;
var tempK = 0;

$(document).ready(function() {
  $('.getWeath').hide();
  $('.ProgressBar').show();  //must hide the prograss bar once the GPS coordinates for your current 
                            //location have been caputred
  
  $('#tempSelect .btn').click(function() {
    $('#tempSelect .btn.active').removeClass('active');
    $(this).addClass('active')
  });

  navigator.geolocation.getCurrentPosition(function(pos) {
    getWeath(pos);
  }, error, {
    timeout: 2000
  });

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  function getWeath(pos) {
    latitu = pos.coords.latitu;
    longitu = pos.coords.longitu;
    //For the current location, capturing GPS coordinates can be delayed because of your location
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitu + "&lon=" + longitu, function(data) {
      tempK = data.main.temp;
      $('#coordinates').text("Coordinates are: " + latitu  + " " + latitu );
      $('#main').text(data.weather[0].main);
      $('#city').text(data.name);
      $('#temperature').text(Math.round(((tempK - 273.15) * 1.8) + 32) + "°F"/*SI Unit*/);
      changeBackground();
      $('.getWeath').show().addClass('animated fadeInLeft');
      $('.ProgressBar').hide();
    })
  }

  function changeBackground() {
    switch ($('#main').text()) {
      case 'Clouds':
        $('#icon').html('<img src="http://openweathermap.org/img/w/03d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/113/sky-clouds-cloudy-weather-large.jpg") no-repeat center center fixed';
        break;
      case 'Clear':
        $('#icon').html('<img src="http://openweathermap.org/img/w/01d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/180/wood-sea-landscape-nature-large.jpg") no-repeat center center fixed';
        break;
      case 'Rain':
        $('#icon').html('<img src="http://openweathermap.org/img/w/09d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/1553/glass-rainy-car-rain-large.jpg") no-repeat center center fixed';
        break;
      case 'Snow':
        $('#icon').html('<img src="http://openweathermap.org/img/w/13d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/6672/snow-forest-trees-winter-large.jpeg") no-repeat center center fixed';
        break;
      case 'Haze':
        $('#icon').html('<img src="http://openweathermap.org/img/w/50d.png">')
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/4827/nature-forest-trees-fog-large.jpeg") no-repeat center center fixed';
        break;
    }
  }
})