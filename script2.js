const apiKey = "519fcca42d573027b800505d42cd4b55";
navigator.geolocation.getCurrentPosition((position) => {
  try{
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude ,"...", longitude);

    if(latitude && longitude){
       const obtions  = {
           Method : 'POST',
                  
      }

       async function getCurrentWeather(){
           const api = 'http://api.openweathermap.org/geo/1.0/reverse?lat='
               + latitude +"&lon=" + longitude + '&appid='
               + apiKey;
           const response = await fetch(api,obtions)
           const data = await response.json();
           const name = data[0].name;
           console.log(data);
           console.log(name);
           
           

           const response2 = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
           + name 
           + "&units=metric&appid=" 
           + apiKey); 
           const data2 = await response2.json();
        //    const dataObject =JSON.parse(data2);
           console.log(data2);
            const temp = data2.main.temp;
            const humidity = data2.main.humidity;
           console.log(temp); 
           
           
               const {icon, description } = data2.weather[0];
            //    const { temp } = data2.main.temp;
            //    const {humidity} = data2.main.humidity;
               const{ speed } = data2.wind;
               console.log(name , icon, description , temp ,humidity , speed)


           document.getElementById("city").innerHTML = "Weather in " + name;
           document.getElementById('icon').src = 
           "https://openweathermap.org/img/wn/" + icon + ".png";
           document.getElementById('description').innerHTML = description;
           document.getElementById('temp').innerHTML = temp + "°C";
           document.getElementById('humidity').innerHTML =" humidity :"+ humidity + "%";
           document.getElementById('wind').innerHTML ="Wind speed:"+ speed + "km/h";
       }

       getCurrentWeather()
   }
  }catch(error){

  } 


})

let search= "";
async function fetchData(city){
    try{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city 
        + "&units=metric&appid=" 
        + apiKey);
        const data = await response.json();
        displayWeather(data);
        console.log(data);


        function displayWeather(data){
            const { name } = data;
            const {icon, description } = data.weather[0];
            const { temp , humidity } = data.main;
            const{ speed } = data.wind;
            document.getElementById("city").innerHTML = "Weather in " + name;
            document.getElementById('icon').src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
            document.getElementById('description').innerHTML = description;
            document.getElementById('temp').innerHTML = temp + "°C";
            document.getElementById('humidity').innerHTML =" humidity :"+ humidity + "%";
            document.getElementById('wind').innerHTML ="Wind speed:"+ speed + "km/h";
            console.log(name , icon, description , temp ,humidity , speed);

        }
    
       

   
    } catch(err){
        // console.log(err)
    
    
    }

    
  
}

document.querySelector('.search button')
        .addEventListener("click", function(){
            fetchData(document.querySelector(".search-bar").value) ;
        });

        document.querySelector('.search-bar').addEventListener("keypress", function(){
           if(event.key === 'Enter'){
            fetchData(document.querySelector(".search-bar").value) ;
           }
        } )





