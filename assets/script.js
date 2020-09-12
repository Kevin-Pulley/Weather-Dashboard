


let cityList = [];
let cityName;
let APIKey = "301339bb021118c7cbc90eb9f34609ff";

let searchBar = $("#search-bar");
let searchButton = $("#search-button");
let history = $("#city-history");
let currentForecast = $("#current");
let fiveDay = ("#forecast");


//localStorage.clear();

initCityList();

//searchBar.value = localStorage.getItem("cityList");

function callAPI() {

    let cityText = $("#search-bar").val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityText + "&appid=301339bb021118c7cbc90eb9f34609ff"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let str = `
        <div class="card">
  <div class="card-body">
  <h2>${cityText}</h2>
  Current windspeed is <p>${response.wind.speed}</p>
  </div>
  </div>`;
  currentForecast.html(str)
});

let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&appid=301339bb021118c7cbc90eb9f34609ff"


$.ajax({
    url: queryURLForecast,
    method: "GET"
}).then(function (response) {
    console.log(response)

    for (i = 0; i < response.list.length; i++) {
        if(i % 8 === 0){
            console.log(i)
            let template = `  <div class="card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Wind Speed:${response.list[i].wind.speed}</p>
            
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>`
            
            $("#forecast").append(template);
        }
        
        //template.empty();
            
        }
    });

}






$("#search-button").click("submit", function (event) {
    event.preventDefault();
    let cityText = $("#search-bar").val();


    if (cityText === "") {
        return;
    }
    cityList.push(cityText)
    //console.log(cityText)
    callAPI();
    saveCity();
    renderCities();
});

function renderCities() {

    //$("#city-history").empty();
    //let b = $("#search-bar").val();
    //console.log(cityList)
    for (i = 0; i < localStorage.length; i++) {
        let a = $("<a>");
        let b = $("#search-bar").val();
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
        a.text(b);
        $("#city-history").prepend(a)
    }
};


function initCityList() {
    let storedCities = JSON.parse(localStorage.getItem(cityList));
    if (storedCities !== null) {
        cityList = storedCities;
    }
    //localStorage.setItem("cityList", JSON.parse(cityList))
    renderCities();
};


function saveCity() {
    let cityText = $("#search-bar").attr("id");
    localStorage.setItem(cityText, JSON.stringify(cityList));
    //console.log(localStorage)

};


$("#clear").click(function () {
    localStorage.clear();
    location.reload()
});


//let city = $("#search-bar").val();


