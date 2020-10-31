const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

const func = (e) => {
    e.preventDefault();
    let location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) =>
        res.json().then((data) => {
            search.value = '';
            if (data.error) {
                p1.textContent = `${data.error}`;
                p2.textContent = '';
            } else {
                // console.log(data);
                p1.textContent = `Location: ${data.location}`;
                p2.textContent = `The current temperature is ${data.forecast.temperature} and it feels like ${data.forecast.feelslike}`;
            }
        })
    );
};

weatherForm.addEventListener('submit', func);
