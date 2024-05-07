const city = "";
let weather = {
    "apiKey": "519fcca42d573027b800505d42cd4b55",
    fetchWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather : function(data){
        const {name} = data;
        const {  icon , description } = data.weather[0];
        const { temp , humidity } = data.main;
        const{ speed } = data.wind;
        console.log(name , icon, description , temp ,humidity , speed);
        document.getElementById("city").innerHTML = "Weather in " + name;
        document.getElementById('icon').src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementById('description').innerHTML = description;
        document.getElementById('temp').innerHTML = temp + "°C";
        document.getElementById('humidity').innerHTML = humidity + "%";
        document.getElementById('wind').innerHTML = speed + "km/h";

    },

    search : function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector('.search button')
.addEventListener("click", function(){
    weather.search();
});

document.querySelector('.search-bar').addEventListener("keyup", function(){
    weather.search();
} )