const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationEl = document.getElementById('location');
const weatherInfoEl = document.getElementById('w-info');

const func = (e) => {
    e.preventDefault();
    let location = search.value;

    fetch(`/weather?address=${location}`).then((res) =>
        res.json().then((data) => {
            search.value = '';
            if (data.error) {
                p1.textContent = `${data.error}`;
                p2.textContent = '';
            } else {
                // console.log(data);
                locationEl.textContent = data.location;
                weatherInfoEl.innerHTML = `
                    <div class='w-temp'>
                        <i class="fas fa-temperature-low"></i>
                        <p>Current Temperature: ${data.forecast.temperature}F</p>
                        <p>Feels Like: ${data.forecast.feelslike}F</p>
                    </div>
                    <div class='w-other'>
                        <i class="fas fa-percent"></i>
                        <p>Humidity: ${data.forecast.humidity}</p>
                        <p>Visibility: ${data.forecast.visibility}</p>
                    </div>`;
                p1.textContent = `Location: ${data.location}`;
                p2.textContent = `The current temperature is ${data.forecast.temperature} and it feels like ${data.forecast.feelslike}`;
            }
        })
    );
};

weatherForm.addEventListener('submit', func);
