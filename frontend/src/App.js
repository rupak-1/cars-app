import React, { useState, useEffect } from 'react';
import './App.css';

function Cars() {
  /**
   * Fields required for the car
        "id",
        "brand",
        "name",
        "releaseYear",
        "color"
   */
  const carFormInitialData = {
    id: 0,
    name: '',
    brand: '',
    releaseYear: '',
    color: '',
  }
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [carsData, setCarsData] = useState([])
  const [refresh, setRefresh] = useState([true])
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/cars')
      .then(res => res.json())
      .then((result) => {
        setCarsData(result)
      });
  }, [refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuccessMessage('');
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
    event.preventDefault();
    console.log(carFormData);
    fetch("http://localhost:8000/cars", {
      method: "POST",
      body: JSON.stringify(carFormData),
      headers: { 'Content-Type': 'application/json' },  
    }).then(res => res.json()).then(car => {
      if (car.status === 'success'){
        setSuccessMessage(car.message);
        setRefresh(!refresh);
      }
    });
  }

  const handleDelete = (id) => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
     fetch("http://localhost:8000/cars", {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: { 'Content-Type': 'application/json' },  
    }).then(res => res.json()).then(car => {
      console.log(car)
      if (car.status === 'success'){
        setSuccessMessage(car.message);
        setRefresh(!refresh);
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
        {/** 
           * TODO: Update the form fields with inputs for 
           *    ID, Brand, Name, ReleaseYear and Color
           * Make required changes to  const carFormInitialData
           * */}
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
        <p>{successMessage}</p>
      </form>
      {/** 
           * TODO: Update the code below to see any new proprties added to carFormData
           * */}
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
          {/** 
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}

          {carsData.map((car) => {
            return <tr id={car.id}>
              <td id={car.id}>{car.id} </td>
              <td id={car.id}>{car.brand} </td>
              <td id={car.id}>{car.name} </td>
              <td id={car.id}>{car.releaseYear} </td>
              <td id={car.id}>{car.color} </td>
              <td id={car.id}>✎</td>
              <td id={car.id} className='delete-button' onClick={() => handleDelete(car.id)}>🗑</td>
            </tr>
          })}
          {/* <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            <td>✎</td>
            <td>🗑</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            <td>✎</td>
            <td>🗑</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;