const history = JSON.parse(localStorage.getItem('history')) || [];
history.forEach((item) => {
    $(".previous-search-container").append(`<button type="button"  class="btn btn-info previous-search-button">${item}</button>`)
})


    const innerCarousel = $('#carousel-inner')
    // Location API
    function searchForLocation(location) {
    const locationIdSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${location}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "574ca1516cmsh0d07b82923411dap1de1cdjsn0887d34a2209",
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

        // CityId
        console.log(destinationId);
        const cityDataSettings = {
            "async": true,
            "crossDomain": true,
            "url": `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=${destinationId}&order_by=popularity&filter_by_currency=GBP&adults_number=2&room_number=1&checkout_date=2023-07-16&units=metric&checkin_date=2023-07-15&dest_type=city&locale=en-gb&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true&children_number=2`,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "574ca1516cmsh0d07b82923411dap1de1cdjsn0887d34a2209",
                "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
            }
        };

        $.ajax(cityDataSettings).done(function (response) {
            console.log(response);
  

            var hotel = response.result[0];
            console.log("Hotel_Name:", hotel.hotel_name);
            console.log("Max_Photo_Url:", hotel.max_photo_url)
            console.log("url:", hotel.url)
            console.log("Review_Score:", hotel.review_score)

            renderHotelResponse(response.result)
        });

    });

}

    function searchGoatApi(location) {
    const password = "9e9842149ceb8e48994993e87033adfa"
    const username = "45d548e50e6c111e8563b76c441ad12b"
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

                    //carousel img
                    const responseArray = citygoatResponse.included
                    // carosuelLogic(responseArray)
                    var locationImages = responseArray.filter((item) => {
                        return item.type === "photo"
                    })
                    $(".location-image").each(function (index) {
                        if (locationImages[index] !== undefined && locationImages[index].attributes !== undefined) {
                            $(this).attr("src", locationImages[index].attributes.image.full || "")
                        }

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

                    var budget = cityList.attributes.budget
                    Object.values(budget)[0]

                    console.log(Object.values(budget)[0].text)
                    console.log(Object.values(budget)[0].subText)
                    console.log(countrySubtext)
                    console.log(countryText)
                    console.log(countryValue)

                    searchForLocation(goatCity)
                })

        })
}
    // Booking API
    function renderHotelResponse(hotels) {
    let hotelCont = document.querySelector("#hotel-container")
    $("#hotel-container").removeClass("d-none")
    console.log("RENDER HOTELS:", hotels)

    $(".hotel-card").each(function (index) {
        console.log("card-images", $(this))
        $(this).children(".hotel-image").attr("src", hotels[index].max_photo_url)
        $(this).children(".card-body").children(".card-title").text(hotels[index].hotel_name)
        $(this).children(".card-body").children(".hotel-review").text(`Review Score: ${hotels[index].review_score} - "${hotels[index].review_score_word}"`)
        $(this).children(".card-body").children(".hotel-button").attr("href", hotels[index].url)

    })
    $("#hotel-container").removeClass("d-none")
}
    // Carousel function
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

    const userInput = $('.form-control').val();
    $(".previous-search-container").removeClass("d-none")
    $("#tour-guide").removeClass("d-none")
    searchGoatApi(userInput)

    // searchForLocation(userInput)
    if (history.includes(userInput)) {
        return
    } else {
        history.push(userInput);
        localStorage.setItem('history', JSON.stringify(history));
        $(".previous-search-container").append(`<button type="button"  class="btn btn-info previous-search-button ">${userInput}</button>`)
    }
})
console.log(history);

//removes city search
$("#clear-button").on('click', function (event) {
    console.log(event, "clear event")
    localStorage.removeItem("history");
    $(".previous-search-button").remove()

})

$("body").on("click", ".previous-search-button", function () {
    const userInput = $(this).html()
    searchGoatApi(userInput)
})

