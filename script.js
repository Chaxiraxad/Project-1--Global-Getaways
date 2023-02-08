const history = JSON.parse(localStorage.getItem('history')) || [];

const innerCarousel = $('#carousel-inner')


function searchForLocation(location) {
    const locationIdSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${location}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "7f8d90c41emsh83bb1582f24d1f5p1217cbjsna7b88f62114b",
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
                "X-RapidAPI-Key": "7f8d90c41emsh83bb1582f24d1f5p1217cbjsna7b88f62114b",
                "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
            }
        };

        $.ajax(cityDataSettings).done(function (response) {
            console.log("hotelResponse:", response);
    //everything for HTML needs to be here
    
       var hotel = response.result[0];
          console.log("Hotel_Name:", hotel.hotel_name);
          console.log("Max_Photo_Url:", hotel.max_photo_url)
          console.log("url:", hotel.url)
          console.log("Review_Score:", hotel.review_score)

          renderHotelResponse(response.result)
    
      
       
    
        //   console.log()
        //   console.log("Location:", hotel.location);
        //   console.log("main_photo_url:", hotel.images[0].url);
        //   $("body").append("<div><h2>" + hotel.name + "</h2><img src='" + hotel.images[0].url + "'><p>" + hotel.address + "</p><p>" + hotel.location + "</p></div>");
    
        });

    });

}

function searchGoatApi(location) {
    const password = "9e9842149ceb8e48994993e87033adfa"
    //  "dc38f503468fbfe583685f34c7ef9bf8"
    const username = "45d548e50e6c111e8563b76c441ad12b"
    // "a6e4bde77fc583f9c3ab4c3b0c372aad"
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

                    // var to store API info
                    const cityList = citygoatResponse.data
                    var goatCity = cityList.attributes.short_name
                    var goatRating = cityList.attributes.average_rating
                    var countryBudget = Object.values(cityList.attributes.budget)[0]
                    var countrySubtext = countryBudget.subText
                    var countryText = countryBudget.text
                    var countryValue = countryBudget.value
                    var countryBudget = Object.values(cityList.attributes.budget)[0]
                    var countrySubtext = countryBudget.subText
                    var countryText = countryBudget.text
                    var countryValue = countryBudget.value
                    console.log(countrySubtext)
                    console.log(countryText)
                    console.log(countryValue)                    


                    // Tour guide information/Logic
                    const cityGuide = cityList.attributes.getyourguide_url
                    console.log(cityGuide);
                    $('.city-tour').attr('href', cityGuide)

                    //city name
                    $(".city-name").text("City Name: " + goatCity)

                    //carusel img
                    const responseArray = citygoatResponse.included
                    // carosuelLogic(responseArray)
                   var locationImages = responseArray.filter((item) => {
                    return item.type === "photo"
                   })
                    // for (let index = 0; index < responseArray.length; index++) {
                    //     if (responseArray[index].type === 'photo') {
                    //         let carouselElement

                    //         // index is not gonna be zero most times
                    //         // figure out how to add the active class on the first item of the array (no matter the index)
                    //         if (index === 0) {
                    //             // whatever is in backticks below is called a template literal (template string)
                    //             carouselElement = $(`<div class="carousel-item active">
                    //     <img src="${responseArray[index].attributes.image.full}" class="d-block w-100" alt="...">
                    //   </div>`)

                    //         } else {
                    //             carouselElement = $(`<div class="carousel-item">
                    //     <img src="${responseArray[index].attributes.image.full}" class="d-block w-100" alt="...">
                    //   </div>`)

                    //         }
                    //         innerCarousel.append(carouselElement)
                    //     }
                    // }
                    $(".location-image").each(function(index){
                        $(this).attr("src" , locationImages[index].attributes.image.full)
                    })
                    $('#carouselExampleControls').removeClass('d-none')

                    // city rating
                    if (goatRating === 0) {
                        $(".city-rate").text("City Rating: " + "Rating not available")
                    }
                    else {
                        $(".city-rate").text("City Rating: " + goatRating.toFixed(1))
                    }

                    //city budget

                    $(".city-budget").text("City Budget: " + countryText + ". " + countrySubtext + "!")

                    // console log to test data from API
                    console.log("city data:", citygoatResponse.data)
                    console.log("city name:", cityList.attributes.short_name)
                    console.log("city rating:", cityList.attributes.average_rating)
                    console.log("city tour:", cityList.attributes.getyourguide_url)
                    console.log("img:", citygoatResponse.included[1].attributes.image.full)
                    //console.log("img2:", citygoatResponse.included[3].attributes.image.full)
                

                    var budget = cityList.attributes.budget
                    Object.values(budget)[0]
                    // from TA
                    console.log(Object.values(budget)[0].text)
                    console.log(Object.values(budget)[0].subText)
                    console.log(countrySubtext)
                    console.log(countryText)
                    console.log(countryValue)

                    searchForLocation(goatCity)

                    // var x = cityList.attributes.budget Object.values(budget)[0]
                })

        })



}
function renderHotelResponse(hotels) {
    let hotelCont = document.querySelector("#hotel-container")
    $("#hotel-container").removeClass("d-none")
    console.log ("RENDER HOTELS:",hotels)
  

    $(".hotel-card").each(function(index){
        console.log("card-images", $(this))
        $(this).children(".hotel-image").attr("src", hotels[index].max_photo_url)

    })
    
    
    for (i = 0; i <= 2; i++) {
        console.log (hotels[i].hotel_name)
        let hotelCardEl = document.createElement("div") 
        let hotelNameEl = document.createElement("h3")
        hotelNameEl.textContent = hotels[i].hotel_name
        let hotelImageEl = document.createElement("img") 
        hotelImageEl.setAttribute("src", hotels[i].max_photo_url)
        hotelCardEl.append(hotelNameEl)
        hotelCardEl.append(hotelImageEl)
        hotelCont.appendChild(hotelCardEl)





    }
    
}

function carosuelLogic(responseData) {

    for (var item of responseData) {
        if (item.type === 'photo') {
            var imagePath = item.attributes.image.full
            console.log(imagePath);
            var newDiv = document.createElement('div')
            newDiv.setAttribute('class', 'carousel-item active')
            newDiv.innerHTML = `<img
            style="height: 60vh; object-fit: contain"
            src="${imagePath}"
            class="carousel-image d-block w-100"
            alt=""
          />`
            document.querySelector('.carousel-inner').append(newDiv)
        }
    }

    
}
$('.form-inline').on('submit', function (event) {
    event.preventDefault();
    // getCity()
    const userInput = $('.form-control').val();
    $("#clear-button").removeClass("d-none")

    searchGoatApi(userInput)
    // searchForLocation(userInput)
    if (history.includes(userInput)) {
        return
    } else {
        history.push(userInput);
        localStorage.setItem('history', JSON.stringify(history));
    }

})
console.log(history);
// History variable is an array of all the cities
// You can loop over that variable and attach them to buttons and then append them to the page
// for (let index = 0; index < history.length; index++) {
//     const city
//     city = $("#cityList")
//     citylist.append($('<td>' + city))
// }







