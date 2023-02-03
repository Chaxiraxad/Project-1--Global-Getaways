let city = "London"
const locationIdSettings = {
	"async": true,
	"crossDomain": true,
	"url": `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${city}`,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "8dcbfe436fmsh89904f43e1016cfp1f95fbjsn4e38770a886a",
		"X-RapidAPI-Host": "booking-com.p.rapidapi.com"
	}
};

$.ajax(locationIdSettings).done(function (response) {
	console.log(response);
    let destinationId = ""
    if(response[0].city_ufi){
        destinationId = response[0].city_ufi
    } else{
        destinationId = response[0].dest_id
    }
    
    
    console.log(destinationId);
    const cityDataSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=${destinationId}&order_by=popularity&filter_by_currency=AED&adults_number=2&room_number=1&checkout_date=2023-07-16&units=metric&checkin_date=2023-07-15&dest_type=city&locale=en-gb&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true&children_number=2`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "8dcbfe436fmsh89904f43e1016cfp1f95fbjsn4e38770a886a",
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
        }
    };
    
    $.ajax(cityDataSettings).done(function (response) {
        console.log(response);
//everything for HTML needs to be here

   var hotel = response.result[0];
      console.log("Hotel_Name:", hotel.hotel_name);
      console.log("Max_Photo_Url:", hotel.max_photo_url)
      console.log("url:", hotel.url)
      console.log("Review_Score:", hotel.review_score)

  
   

    //   console.log()
    //   console.log("Location:", hotel.location);
    //   console.log("main_photo_url:", hotel.images[0].url);
    //   $("body").append("<div><h2>" + hotel.name + "</h2><img src='" + hotel.images[0].url + "'><p>" + hotel.address + "</p><p>" + hotel.location + "</p></div>");

    });

});























   
    
  
  