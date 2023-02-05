
function searchForLocation(location) {
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
        if (response[0].city_ufi) {
            destinationId = response[0].city_ufi
        } else {
            destinationId = response[0].dest_id
        }


        console.log(destinationId);
        const cityDataSettings = {
            "async": true,
            "crossDomain": true,
            "url": `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=${destinationId}&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date=2023-07-16&units=metric&checkin_date=2023-07-15&dest_type=city&locale=en-gb&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true&children_number=2`,
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

function searchGoatApi(location) {
    const password = "dc38f503468fbfe583685f34c7ef9bf8";
    const username = "a6e4bde77fc583f9c3ab4c3b0c372aad"
    const searchgoatUrl = `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${location}`


    // Call Search city API when search form is submitted to find city id
    $.ajax({
        url: searchgoatUrl,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
    })
        .then(function (searchgoatresponse) {
            // console.log(searchgoatresponse)

            const parsedResult = JSON.parse(searchgoatresponse)
            console.log(parsedResult.data[0].id)
            const goatId = parsedResult.data[0].id
            const citygoatUrl = `https://api.roadgoat.com/api/v2/destinations/${goatId}`
            $.ajax({
                url: citygoatUrl,
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                },
            })
                .then(function (citygoatResponse) {
                    console.log(citygoatResponse)

                    //add code for goat API here
                    const cityList = citygoatResponse.data
                
                    var goatCity = cityList.attributes.short_name
                    var goatRating = cityList.attributes.average_rating
                    var goatTour = cityList.attributes.getyourguide_url
                    // var goatImg1 = citygoatResponse.included[1].attributes.image.full
                    // var goatImg2 = citygoatResponse.included[3].attributes.image.full
                    // var goatBudget = Object.values(budget)[0].text
                    // var goatBudgettext = Object.values(budget)[0].subText

                  $(".city-name").text("City Name: " +  goatCity)
                  $(".city-rate").text("City Rating: " +  goatRating)
                //   $(".city-budget").text("City Budget: " + goatBudget)
                //   $(".city-budgettext").text("Budget: " +  goatBudgettext)
                  
                    // // $(".d-block w-100").(goatImg1)

                    // // $(".d-block w-100").html(<img src= goatImg1={ } alt='image'>)

                    //     // $(".d-block w-100").html(
                    //     // `<img src="${Img1}">`)
                    //     // $('#theDiv').prepend(goatImg1)

                    //     $("#theDiv").prepend("<img src='" + goatImg1 + "alt='image'>");


                    

                    console.log("city data:", citygoatResponse.data)
                    console.log("city name:", cityList.attributes.short_name)
                    console.log("city rating:", cityList.attributes.average_rating)
                    console.log("city tour:", cityList.attributes.getyourguide_url)
                    console.log("img:", citygoatResponse.included[1].attributes.image.full)
                    console.log("img2:", citygoatResponse.included[3].attributes.image.full)
                    var budget = cityList.attributes.budget
                     Object.values(budget)[0]
            // var x = cityList.attributes.budget Object.values(budget)[0]

                    console.log(Object.values(budget)[0].text)
                    console.log(Object.values(budget)[0].subText)
                })

        })



}
$('.form-inline').on('submit', function (event) {
    event.preventDefault();
    // getCity()
    const userInput = $('.form-control').val();
    searchGoatApi(userInput)
    searchForLocation(userInput)
})

// testing area here
// var text = "Testing"

//       $(".city-descrip").text("City Name: " + text)

    // Call City details after retrieving the city id from Search city API call
    // $(".city-tour").text("Hello");
    // $(".city-tour").link(goatTour);

















