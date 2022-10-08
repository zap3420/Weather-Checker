let city = document.querySelector('.location .city');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low');
let wind = document.querySelector('.current .wind');
let humidity = document.querySelector('.current .humidity');
let pressure = document.querySelector('.current .pressure');
let logo = document.querySelector('.logo');
const newYork = 'New York';
let ytemps =[];
let xtemps = ['Today','Tomorow', 'In 2 days','In 3 days','In 4 days','In 5 days','In 6 days'];

// let weatherIcon = document.querySelector('.ikonica');
// <img class="ikonica" src="" width="50" height="50" alt="icon"></img>
let locate = document.querySelector('#geolocation');
let yourDate = new Date();
let newDate = yourDate.toISOString().split('T')[0];
let kmh = 3.6;

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

// Canvas
let posColour = 'rgba(0, 255, 0, .1)';
let  negColour = 'rgba(255, 0, 0, .1)';

let myChart = document.getElementById('myChart').getContext('2d');
let massPopChart = new Chart(myChart, {
    type: 'line',
    data:{
        labels: xtemps,
        datasets:[{
            label:'Temperature',
            backgroundColor:'rgb(5,195,221)',
            data: ytemps,
            borderWidth: 1,
            borderColor:'#FFFFFF',
        }],
        chartArea: {
            backgroundColor: 'rgba(251, 85, 85, 0.4)'
        }
    },
    options:{}
})

function updateData(){
    massPopChart.data.datasets.data.push(ytemps);
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ceb98900dfmsh73c475ad3e22f43p1f9775jsn721040f2e91c',
		'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
	}
};

let api ={
    key: "f07b0f692267738658e7b8388c2216da",
    base:"https://api.openweathermap.org/data/2.5/"
}

let apiNews = {
    key:"kaiOEmpxHgRz1sosUVop05QEqmhHk6",
    base:"https://newsapi.org/v2/everything"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode == 13 ){
        getResults(searchBox.value);
    } 
}

async function getResults(query){
    await fetch(`${api.base}/forecast?q=${query}&appid=${api.key}&cnt=7&units=metric`) // forecast
    .then(response =>{
        return response.json();
      })
    .then(displayResults);
}

async function displayResults(response){
    console.log(response);
    city.innerHTML = `${response.city.name}, ${response.city.country}`;
    let now = new Date();   
    let date = document.querySelector('.location .date');
    date.innerText = getDate(now);
    temp.innerHTML = `${Math.round(response.list[0].main.temp)}<span>°C</span>`; 
    weather_el.innerText = response.list[0].weather[0].main;
    hilow.innerText =`Feels like: ${Math.round(response.list[0].main.feels_like)}°C`;
    wind.innerHTML = `Wind: ${Math.round(Number(response.list[0].wind.speed) * kmh)}km/h`;
    humidity.innerHTML =`Humidity: ${response.list[0].main.humidity}%`;
    pressure.innerHTML =`Barometer: ${response.list[0].main.pressure} mb`;
    ytemps.splice(0, ytemps.length);
    ytemps.push( Math.round(response.list[0].main.temp), Math.round(response.list[1].main.temp), Math.round(response.list[2].main.temp), Math.round(response.list[3].main.temp),Math.round(response.list[4].main.temp), Math.round(response.list[5].main.temp), Math.round(response.list[6].main.temp));
    addClass();
    massPopChart.update();
}   
function addClass(){
    city.classList.add('fade-in-text');
    temp.classList.add('fade-in-text');
    weather_el.classList.add('fade-in-text');
    hilow.classList.add('fade-in-text');
    wind.classList.add('fade-in-text');
    humidity.classList.add('fade-in-text');
    pressure.classList.add('fade-in-text');
    setTimeout(() => {
        city.classList.remove('fade-in-text');
        temp.classList.remove('fade-in-text');
        weather_el.classList.remove('fade-in-text');
        hilow.classList.remove('fade-in-text');
        wind.classList.remove('fade-in-text');
        humidity.classList.remove('fade-in-text');
        pressure.classList.remove('fade-in-text');
      }, 2500);
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
async function getGeoResults(coordinates){
    const { latitude, longitude } = coordinates.coords;

    await fetch(`${api.base}/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&cnt=7&units=metric`)
    .then(response =>{
        return response.json();
      })
    .then(displayResults);
}

async function getNews(){
    await fetch('https://weather338.p.rapidapi.com/news/list?offset=0&limit=10', options)
	.then(response =>{
        const myJson = response.json();
        return myJson;
      })
	.catch(err => console.error(err))
    .then(displayNews);
}

function displayNews(response){
    //1 
    title1.innerHTML = `${response[0].title}`;
    link1.href = `https://${response[0].providername}${response[0].assetName}`;
    description1.innerHTML = `${response[0].description}`;
    image1.src = `${response[0].variants[400]}`;
    publishedDate1.innerHTML = moment(`${response[0].publishdate}`).fromNow();
    //2
    title2.innerHTML = `${response[1].title}`;
    link2.href = `https://${response[1].providername}${response[1].assetName}`;
    description2.innerHTML = `${response[1].description}`;
    image2.src = `${response[1].variants[400]}`;
    publishedDate2.innerHTML = moment(`${response[1].publishdate}`).fromNow();
    //3
    title3.innerHTML = `${response[2].title}`;
    link3.href = `https://${response[2].providername}${response[2].assetName}`;
    description3.innerHTML = `${response[2].description}`;
    image3.src = `${response[2].variants[400]}`;
    publishedDate3.innerHTML = moment(`${response[2].publishdate}`).fromNow();
    //4
    title4.innerHTML = `${response[3].title}`;
    link4.href = `https://${response[3].providername}${response[3].assetName}`;
    description4.innerHTML = `${response[3].description}`;
    image4.src = `${response[3].variants[400]}`;
    publishedDate4.innerHTML = moment(`${response[3].publishdate}`).fromNow();
}

function getEverything() {
    getNews();
}

//run 

if(window.attachEvent) {
    window.attachEvent('onload', getEverything());
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            getEverything(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = getEverything();
    }
}

