const express = require('express');
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

/** GET API to return  const carsMockData*/
app.get('/cars', (req, res) => {
    res.send(carsMockData);
});

/*  POST API to get the new car data from react. 
    Checks if car with id exists. If Yes returns 500. With message 'Car already exists'
    If there is no car with the id, adds the new car to  carsMockData and returns carsMockData as response 
*/


app.post("/cars", (req, res) => {
    const req_car = Object.assign({}, req.body);

    if (isNaN(req_car.id)) {
        res.status(500).json({
            status: 'fail',
            message: 'Please enter a valid number'
        })
    }

    else {
        req_car.id = parseInt(req_car.id)
        const carWithId = carsMockData.filter(car => car.id === req_car.id);

        if (carWithId.length > 0) {
            res.status(500).json({
                status: 'fail',
                message: 'Car already exists!'
            })
        }
        else {
            carsMockData = [...carsMockData, req_car]
            res.status(200).json({
                status: 'success',
                message: 'Car added!',
                data: carsMockData
            })
        }
    }

});

/*  Delete API. 
    Checks if car with id exists. If No return 500. With message 'No car with give id exists'
    If there is car with the requested id. Deletes that car from 'carsMockData' and return 'carsMockData'
*/

app.delete('/cars', (req, res) => {
    const id = req.body.id;
    const carWithId = carsMockData.filter(car => car.id === id);

    if (carWithId.length > 0) {
        const newCars = carsMockData.filter(car => car.id !== id);
        carsMockData = [...newCars]
        res.status(200).json({
            status: 'success',
            message: 'Car deleted!',
            data: carsMockData
        })
    }
    else {
        res.status(500).json({
            status: 'fail',
            message: 'No car with given id exists'
        })
    }

})


/* PUT api
    Checks if car with id exists. If No return 500 with error 'No car with given id exist'. 
    If there is car with the requested id, updates that car's data in 'carsMockData' and return 'carsMockData' 
*/


app.put('/cars', (req, res) => {
    const id = req.body.id;
    const carWithId = carsMockData.filter(car => car.id === id);
    console.log(carWithId);
    if (carWithId.length > 0) {
        const newCars = carsMockData.map((car) => car.id === id ? req.body : car);
        carsMockData = [...newCars]
        res.status(200).json({
            status: 'success',
            message: 'Car updated!',
            data: carsMockData
        })
    }
    else {
        res.status(500).json({
            status: 'fail',
            message: 'No car with given id exists'
        })
    }

})

app.listen(8000);