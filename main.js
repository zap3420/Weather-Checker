let city = document.querySelector('.location .city');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low');
let locate = document.querySelector('#geolocation');
let yourDate = new Date();
let newDate = yourDate.toISOString().split('T')[0];
// 1
let image1 = document.querySelector('.image1');
let title1 = document.querySelector('.title1');
let description1 = document.querySelector('.description1');
let publishedDate1 = document.querySelector('.published1');
let link1 = document.querySelector('.link1');
// 2
let image2 = document.querySelector('.image2');
let title2 = document.querySelector('.title2');
let description2 = document.querySelector('.description2');
let publishedDate2 = document.querySelector('.published2');
let link2 = document.querySelector('.link2');
// 3
let image3 = document.querySelector('.image3');
let title3 = document.querySelector('.title3');
let description3 = document.querySelector('.description3');
let publishedDate3 = document.querySelector('.published3');
let link3 = document.querySelector('.link3');
// 4
let image4 = document.querySelector('.image4');
let title4 = document.querySelector('.title4');
let description4 = document.querySelector('.description4');
let publishedDate4 = document.querySelector('.published4');
let link4 = document.querySelector('.link4');


let api ={
    key: "f07b0f692267738658e7b8388c2216da",
    base:"https://api.openweathermap.org/data/2.5/"
}

let apiNews = {
    key:"7dae0e877e40493da8cf8d4634564d39",
    base:"https://newsapi.org/v2/everything"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode == 13 ){
        getResults(searchBox.value);
    }
}
function getResults(query){
    fetch(`${api.base}/weather?q=${query}&appid=${api.key}&cnt=7&units=metric`) // forecast
    .then(response =>{
        return response.json();
      })
    .then(displayResults);
}

function displayResults(response){
    console.log(response);
    city.innerHTML = `${response.name}, ${response.sys.country}`;
    let now = new Date();   
    let date = document.querySelector('.location .date');
    date.innerText = getDate(now);
    temp.innerHTML = `${Math.round(response.main.temp)}<span>°C</span>`;
    weather_el.innerText = response.weather[0].main;
    hilow.innerText =`${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

    city.classList.add('fade-in-text');
    date.classList.add('fade-in-text');
    temp.classList.add('fade-in-text');
    weather_el.classList.add('fade-in-text');
    hilow.classList.add('fade-in-text');
}   
function getDate(e){
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();
    return `${day} ${date}, ${month} ${year}`;
}

locate.addEventListener("click", () =>{
    console.log('it works');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getGeoResults, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function onError(error){
    console.log(error);
}
function getGeoResults(coordinates){
    const { latitude, longitude } = coordinates.coords;

    fetch(`${api.base}/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&cnt=7&units=metric`)
    .then(response =>{
        return response.json();
      })
    .then(displayResults);
}

function getNews(){
    fetch(`${apiNews.base}?q=weather&from=${newDate}&sortBy=popularity&apiKey=${apiNews.key}`)
    .then(response =>{
        const myJson = response.json();
        // newsDataArray.push(myJson);
        return myJson;
      })
    .then(displayNews);
}

function displayNews(response){
    //1 
    title1.innerHTML = `${response.articles[0].title}`;
    link1.href = `${response.articles[0].url}`;
    description1.innerHTML = `${response.articles[0].description}`;
    image1.src = `${response.articles[0].urlToImage}`;
    publishedDate1.innerHTML = moment(`${response.articles[0].publishedAt}`).fromNow();


    //2
    title2.innerHTML = `${response.articles[1].title}`;
    link2.href = `${response.articles[1].url}`;
    description2.innerHTML = `${response.articles[1].description}`;
    image2.src = `${response.articles[1].urlToImage}`;
    publishedDate2.innerHTML = moment(`${response.articles[1].publishedAt}`).fromNow();
    //3
    title3.innerHTML = `${response.articles[2].title}`;
    link3.href = `${response.articles[2].url}`;
    description3.innerHTML = `${response.articles[2].description}`;
    image3.src = `${response.articles[2].urlToImage}`;
    publishedDate3.innerHTML = moment(`${response.articles[2].publishedAt}`).fromNow();
    //4
    title4.innerHTML = `${response.articles[3].title}`;
    link4.href = `${response.articles[3].url}`;
    description4.innerHTML = `${response.articles[3].description}`;
    image4.src = `${response.articles[3].urlToImage}`;
    publishedDate4.innerHTML = moment(`${response.articles[3].publishedAt}`).fromNow();
}
//run 

// if(window.attachEvent) {
//     window.attachEvent('onload', getNews());
// } else {
//     if(window.onload) {
//         var curronload = window.onload;
//         var newonload = function(evt) {
//             curronload(evt);
//             yourFunctionName(evt);
//         };
//         window.onload = newonload;
//     } else {
//         window.onload = getNews();
//     }
// }