// Function to fetch flight data from the AviationStack API
async function fetchFlightData() {
    const accessKey = '0372a705284fdee2847fb6429c749f4e'; // Replace this with your actual API key
    const url = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        displayFlightData(data.data);
      } else {
        console.error('Error fetching flight data:', data.error.info);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }

  // Function to display flight data in the HTML page
  function displayFlightData(flights) {
    const flightList = document.getElementById('flightList');

    flights.forEach((flight) => {
      const flightBox = createFlightBox(flight);
      flightList.appendChild(flightBox);
    });
  }

  // Function to create a flight box element
  function createFlightBox(flight) {
    const flightBox = document.createElement('div');
    flightBox.classList.add('flight');

    const flightNumber = document.createElement('p');
    flightNumber.innerHTML = `<strong>Flight Number:</strong> ${flight.flight.number}`;
    flightBox.appendChild(flightNumber);

    const airlineName = document.createElement('p');
    airlineName.innerHTML = `<strong>Airline:</strong> ${flight.airline.name}`;
    flightBox.appendChild(airlineName);

    const departureAirport = document.createElement('p');
    departureAirport.innerHTML = `<strong>Departure Airport:</strong> ${flight.departure.airport}`;
    flightBox.appendChild(departureAirport);

    const arrivalAirport = document.createElement('p');
    arrivalAirport.innerHTML = `<strong>Arrival Airport:</strong> ${flight.arrival.airport}`;
    flightBox.appendChild(arrivalAirport);

    const departureTime = document.createElement('p');
    departureTime.innerHTML = `<strong>Departure Time:</strong> ${flight.departure.scheduled}`;
    flightBox.appendChild(departureTime);

    const arrivalTime = document.createElement('p');
    arrivalTime.innerHTML = `<strong>Arrival Time:</strong> ${flight.arrival.scheduled}`;
    flightBox.appendChild(arrivalTime);

    return flightBox;
  }

  // Call the fetchFlightData function when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchFlightData();
  });
