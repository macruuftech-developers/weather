let search = document.querySelector("#search");
let list = document.querySelector(".list");
let nameC = document.querySelector("#name");
let weather = document.querySelector("#weather");
let deg = document.querySelector("#deg");
let img = document.querySelector("img");

let key = "cA8Kr2kbzDeJgu5t38AAO7UOcZTKsuhp";

const getSearch = async (city) => {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
  let query = `?apikey=${key}&q=${city}`;
  let api = await fetch(url + query);
  let data = await api.json();
  let html = "";
  data.map((item) => {
    html += `<span>${item.LocalizedName}</span>`;
  });

  list.innerHTML = html;
  list.classList.add("active");
};

search.addEventListener("keyup", () => {
  let value = search.value;
  if (!value.length == 0) {
    getSearch(value);
  }
});

list.addEventListener("click", (e) => {
  weathers(e.target.innerText.toLowerCase());
  list.classList.remove("active");
  search.value = "";
});
const weathers = async (cityName) => {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search`;
  const query = `?apikey=${key}&q=${cityName}`;
  let api = await fetch(url + query);
  let data = await api.json();
  nameC.innerHTML = `${data[0].EnglishName},${data[0].Country.EnglishName}`;
  getKey(data[0].Key);
};

const getKey = async (cityKey) => {
  const url = `http://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${cityKey}?apikey=${key}`;
  let api = await fetch(url + query);
  let data = await api.json();
  weather.innerHTML = data[0].WeatherText;
  deg.innerHTML = `${data[0].Temperature.Metric.Value} &deg;C`;
  if (data[0].IsDayTime) {
    img.setAttribute("src", "./sunshine.jpg");
  } else {
    img.setAttribute("src", "./night.jpg");
  }
};
