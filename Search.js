// Search.js

async function fetchFlights(source, destination, departureDate, passengers) {
    const apiKey = '0372a705284fdee2847fb6429c749f4e'; // Replace with your AviationStack API key
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${source}&arr_iata=${destination}&flight_date=${departureDate}&limit=${passengers}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.success) {
        displayFlightData(data.data);
      } else {
        console.error('Error fetching flight data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }
  
  function displayFlightData(flights) {
    const flightList = document.getElementById('flightList');
    flightList.innerHTML = ''; // Clear previous flight data
  
    flights.forEach((flight) => {
      const flightInfo = document.createElement('div');
      flightInfo.classList.add('flight');
      flightInfo.innerHTML = `
        <p><strong>Flight Number:</strong> ${flight.flight.number}</p>
        <p><strong>Airline:</strong> ${flight.airline.name}</p>
        <p><strong>Departure Airport:</strong> ${flight.departure.airport}</p>
        <p><strong>Departure Time:</strong> ${flight.departure.estimated}</p>
        <p><strong>Arrival Airport:</strong> ${flight.arrival.airport}</p>
        <p><strong>Arrival Time:</strong> ${flight.arrival.estimated}</p>
      `;
      flightList.appendChild(flightInfo);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      const source = document.getElementById('source').value;
      const destination = document.getElementById('destination').value;
      const departureDate = document.getElementById('departureDate').value;
      const passengers = document.getElementById('passengers').value;
  
      fetchFlights(source, destination, departureDate, passengers);
    });
  });
  