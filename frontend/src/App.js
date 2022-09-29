import React, { useState, useEffect } from 'react';
import './App.css';

function Cars() {
  const carFormInitialData = {
    id: '',
    name: '',
    brand: '',
    releaseYear: '',
    color: '',
  }

  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [carsData, setCarsData] = useState([])
  const [fetchMessage, setFetchMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/cars')
      .then(res => res.json())
      .then((result) => {
        setCarsData(result)
      });
  }, []);

  //helper functions

  //function to setCarFormData based on input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
    event.preventDefault();
    await fetch("http://localhost:8000/cars", {
      method: "POST",
      body: JSON.stringify(carFormData),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(car => {
      if (car.status === 'success') {
        setCarsData([...car.data]);
        setFetchMessage(car.message);
        setTimeout(() => {
          setFetchMessage('')
        }, 1500);
      }
      else {
        setFetchMessage(car.message);
        setTimeout(() => {
          setFetchMessage('')
        }, 1500);
      }
      setCarFormData(carFormInitialData);
    });
  }

  const handleDelete = async (id) => {
    /**
     * When clicked on a delete button, gets the id of the car's delete button clicked
     * Then uses javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */

    await fetch("http://localhost:8000/cars", {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
      .then(car => {
        if (car.status === 'success') {
          setCarsData([...car.data]);
          setFetchMessage(car.message);
          setTimeout(() => {
            setFetchMessage('')
          }, 1500);
        }
        else {
          setFetchMessage(car.message);
          setTimeout(() => {
            setFetchMessage('')
          }, 1500);
        }
      });

  }

  /** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = () => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  }



  return (
    <div className='cars-from-wrapper'>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          ID:
          <input name='id' type="text" value={carFormData.id} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input name='name' type="text" value={carFormData.name} onChange={handleInputChange} />
        </label>
        <label>
          Brand:
          <input name='brand' type="text" value={carFormData.brand} onChange={handleInputChange} />
        </label>
        <label>
          Release Year:
          <input name='releaseYear' type="text" value={carFormData.releaseYear} onChange={handleInputChange} />
        </label>
        <label>
          Color:
          <input name='color' type="text" value={carFormData.color} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
        <p>{fetchMessage}</p>
      </form>
      <p>ID:{carFormData.id}, name:{carFormData.name}</p>
      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Release Year</th>
            <th>Color</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {carsData.map((car) => {
            return <tr key={car.id}>
              <td>{car.id} </td>
              <td>{car.brand} </td>
              <td>{car.name} </td>
              <td>{car.releaseYear} </td>
              <td>{car.color} </td>
              <td>✎</td>
              <td className='delete-button' onClick={() => handleDelete(car.id)}>🗑</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;