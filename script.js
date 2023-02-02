const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?locale=en-gb&currency=AED",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "8dcbfe436fmsh89904f43e1016cfp1f95fbjsn4e38770a886a",
		"X-RapidAPI-Host": "booking-com.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

function displayHotelImages(hotelId) {
    getHotelData(hotelId).done(function(hotelData) {
      const imagesContainer = $('#images-container');
      $.each(hotelData.images, function(index, imageUrl) {
        const imageElement = $('<img>').attr('src', imageUrl);
        imagesContainer.append(imageElement);
      });
    });
  }
  
  displayHotelImages(12345);