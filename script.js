function searchForLocation(location){
    const locationIdSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${location}`,
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

}

function searchGoatApi (location){
    const password = "dc38f503468fbfe583685f34c7ef9bf8";
    const username = "a6e4bde77fc583f9c3ab4c3b0c372aad"
    const searchgoatUrl = `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${location}`
    
    
    // Call Search city API when search form is submitted to find city id
    $.ajax({
        url: searchgoatUrl,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        },
    })
        .then(function (searchgoatresponse) {
            // console.log(searchgoatresponse)
          
            const parsedResult = JSON.parse(searchgoatresponse)
            console.log(parsedResult.data[0].id)
            const goatId = parsedResult.data[0].id
            const citygoatUrl =  `https://api.roadgoat.com/api/v2/destinations/${goatId}`
            $.ajax({
                url: citygoatUrl,
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
                },
            })
                .then(function (citygoatResponse) {
                    console.log(citygoatResponse)
                   
                    //add code for goat API here
    // const cityList = citygoatResponse.data
    // var cityName = cityList.attributes.long_name
    // var cityRate = cityList.attributes.average_rating
    // var cityBudget = cityList.attributes.budget[0][1]
    // var budgetText = cityList.attributes.budget[0][0]
      
                })
            
        })
    


}

searchForLocation("Birmingham")
searchGoatApi("Birmingham")
    // Call City details after retrieving the city id from Search city API call

















   
    
  
  