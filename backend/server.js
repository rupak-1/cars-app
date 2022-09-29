
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
// const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// To support cors. 
app.use(cors())
app.use(bodyParser.json())


let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/
app.get('/cars', (req, res) => {
    res.send(carsMockData);
});

app.post("/cars", (req, res) => {
    const {id, name, brand, releaseYear, color} = req.body;
    const car = {
        id: parseInt(id),
        name: name,
        brand: brand,
        releaseYear: releaseYear,
        color: color,
    }
    carWithId = carsMockData.filter(car => car.id === id);
    if (carWithId.length > 0){
        res.status(500).json({
            status: 'fail',
            message: 'Car already exists!'
        })
    }
    else{
        console.log('Adding car...')
        carsMockData = [...carsMockData,car]
    console.log(carsMockData);
    res.status(200).json({
        status: 'success',
        message: 'Car added!',
        data: carsMockData
    })
    }
    
});

app.delete('/cars', (req,res) => {
    const {id} = req.body;
    const carWithId = carsMockData.filter(car => car.id === id);
    if (carWithId.length > 0){
        const newCars = carsMockData.filter(car => car.id !== id);
        carsMockData = [...newCars]
        res.status(200).json({
            status: 'success',
            message: 'Car deleted!'
        })
    }
    else{
        res.status(500).json({
            status: 'fail',
            message: 'No car with given id exists'
        })
    }

})





/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */





/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */




/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.listen(8000);