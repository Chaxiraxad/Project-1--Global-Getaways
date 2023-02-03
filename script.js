const password = "dc38f503468fbfe583685f34c7ef9bf8";
const username = "a6e4bde77fc583f9c3ab4c3b0c372aad"
let userSearch = "Berlin"
const searchgoatUrl = `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${userSearch}`


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

    // Call City details after retrieving the city id from Search city API call
