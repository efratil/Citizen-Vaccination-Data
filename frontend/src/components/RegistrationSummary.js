import React, { useState, useEffect } from 'react';
import './RegistrationSummary.css';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

/**
 * RegistrationSummary component represents a summary of user registrations.
 */
const RegistrationSummary = () => {
    const [registrations, setRegistrations] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [city, setCity] = useState('');

    /**
     * Fetches the registration summary data.
     */
    useEffect(() => {
        fetchRegistrationSummary();
    }, []);

    /**
     * Fetches the registration summary data from the server.
     */
    const fetchRegistrationSummary = () => {
        fetch('http://localhost:8080/registration/summary')
            .then((response) => response.json())
            .then((data) => {
                setRegistrations(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    /**
     * Handles the change event for the start date input.
     * @param {Object} date - Selected date
     */
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    /**
     * Handles the change event for the end date input.
     * @param {Object} date - Selected date
     */
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };


    /**
     * Handles the change event for the city input.
     * @param {Object} e - Event object
     */
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    /**
     * Filters the registrations based on the selected filters (start date, end date, city).
     * @returns {Array} - Filtered registrations
     */
    const filterRegistrations = () => {
        let filteredRegistrations = [...registrations];
        if (startDate && endDate) {
            let sDate = new Date(startDate);
            sDate.setHours(0, 0, 0, 0);
            let eDate = new Date(endDate);
            eDate.setHours(23, 59, 59, 999);

            filteredRegistrations = filteredRegistrations.filter((registration) => {
                const birthDate = new Date(registration.birthDate);
                return birthDate >= sDate && birthDate <= eDate;
            });
        }
        if (city) {
            filteredRegistrations = filteredRegistrations.filter((registration) => {
                return registration.city.toLowerCase() === city.toLowerCase();
            });
        }
        return filteredRegistrations;
    };


    /**
     * Handles the form submission for filtering registrations.
     * @param {Object} e - Event object
     */
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredRegistrations = filterRegistrations();
        setRegistrations(filteredRegistrations);
    };
    /**
     * Resets the filters and fetches the registration summary.
     */
    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setCity('');
       fetchRegistrationSummary();
    };


    return (
        <div className="registration-summary">
            <Button style={{ marginTop: '30px' }} variant="outline-success" as={Link} to="/" className="back-button">
                <IoArrowBackCircleOutline className="bi bi-arrow-left-circle-fill" style={{ fontSize: '40px' }} />
            </Button>


            <h1 style={{color: "white"}}>Registration Summary</h1>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => handleEndDateChange(e.target.value)} />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" value={city} onChange={handleCityChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '7px' }}
                        className="btn btn-primary"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{ backgroundColor: 'gray', color: 'white', borderRadius: '5px', padding: '7px' }}
                        className="btn btn-primary"
                    >
                        Reset
                    </button>
                </div>

            </form>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birth Date</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Land Line</th>
                    <th>Cell Phone</th>
                    <th>Infected</th>
                </tr>
                </thead>
                <tbody>
                {registrations.map((registration) => (
                    <tr key={registration.id}>
                        <td>{registration.firstName}</td>
                        <td>{registration.lastName}</td>
                        <td>{registration.birthDate}</td>
                        <td>{registration.address}</td>
                        <td>{registration.country}</td>
                        <td>{registration.city}</td>
                        <td>{registration.zipCode}</td>
                        <td>{registration.landLine}</td>
                        <td>{registration.cellPhone}</td>
                        <td>{registration.infected ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationSummary;
