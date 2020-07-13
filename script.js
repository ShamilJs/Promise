document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getOutput = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-Type', 'application/json');
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                } 
                if (request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                } else {
                    reject(request.statusText);
                }
            });
            request.send();
        });
    };

    const outputData = (data) => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
    };

    select.addEventListener('change', () => {
        getOutput()
        .then(outputData)
        .catch(error => output.innerHTML = 'Произошла ошибка');
    });

});