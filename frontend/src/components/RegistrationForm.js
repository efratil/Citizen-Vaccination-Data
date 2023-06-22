import React, { useState } from 'react';
import './RegistrationForm.css';
import background from '../covidLogo.jpg';
import {Button, Container} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from './AdressOptions.js';
import {Link} from "react-router-dom";

/**
 * RegistrationForm component represents a form for user registration.
 */
const RegistrationForm = () => {
    // State variables
    const [form, setForm] = useState({
        firstName: '', lastName: '', birthDate: null, address: '', selectedCountry: '',
        city: '', zipCode: '', landLine: '', cellPhone: '', infected: false,
        conditions: { diabetes: false, cardiovascular: false, allergies: false, other: '' },
        cities: [],
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [, setAddedSuccessfully] = useState(false);
    const [, setAddedFailed] = useState(false);


    /**
     * Handles the change event for input fields and updates the form state accordingly.
     * @param {Object} e - Event object
     */
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    /**
     * Handles the change event for the country selection and updates the form state with the selected country and its cities.
     * @param {Object} e - Event object
     */
    const handleCountryChange = (e) => {
        const selectedCountryData = data.find((item) => item.country === e.target.value);
        setForm({
            ...form,
            selectedCountry: e.target.value,
            cities: selectedCountryData ? selectedCountryData.cities : [],
        });
    };

    /**
     * Handles the change event for checkboxes and updates the form state accordingly.
     * @param {Object} e - Event object
     */
    const handleCheckboxChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.checked,
        });
    };

    /**
     * Handles the change event for condition checkboxes and updates the form state accordingly.
     * @param {Object} e - Event object
     */
    const handleConditionsChange = (e) => {
        setForm({
            ...form,
            conditions: {
                ...form.conditions,
                [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            },
        });
    };

    /**
     * Handles the change event for the birth date and updates the form state accordingly.
     * @param {Date} date - Selected date
     */
    const handleBirthDateChange = (date) => {
        setForm({
            ...form,
            birthDate: date,
        });
    };

    /**
     * Handles the form submission.
     * @param {Object} e - Event object
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        // Check first and last name
        if (!/^[a-zA-Z]*$/.test(form.firstName) || !/^[a-zA-Z]*$/.test(form.lastName)) {
            setErrorMessage('First and last name can contain only English letters.');
            return;
        }

        // Check address
        const addressParts = form.address.split('/');
        if (addressParts.length !== 2 || addressParts[0].trim() === '' || isNaN(addressParts[1].trim())) {
            setErrorMessage('Address needs to be in the format of "Street / Home Number".');
            return;
        }

        // Check zip code
        if (isNaN(form.zipCode)) {
            setErrorMessage('Zip code can only contain digits.');
            return;
        }

        // Check land line
        if (isNaN(form.landLine)) {
            setErrorMessage('Landline number can only contain digits.');
            return;
        }

        // Check cellular phone number
        const phoneParts = form.cellPhone.split(' ');
        if (phoneParts.length !== 5 || phoneParts[0] !== '05' || isNaN(phoneParts[1]) || isNaN(phoneParts[2]) || isNaN(phoneParts[3])|| isNaN(phoneParts[4])) {
            setErrorMessage('Cellular phone number needs to be in the format of "05 XX XX XX XX".');
            return;
        }

        // If all checks pass, submit form
        console.log('Form submitted successfully!');

        fetch('http://localhost:8080/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data === 'Added Successfully') {
                    clearForm();
                    setAddedSuccessfully(true);
                } else {
                    setAddedFailed(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setAddedFailed(true);
                setErrorMessage(error.message);
            });

    };
    /**
     * clear the form
     */

    const clearForm = () => {
        setForm({
            firstName: '', lastName: '', birthDate: null, address: '', selectedCountry: '',
            city: '', zipCode: '', landLine: '', cellPhone: '', infected: false,
            conditions: {diabetes: false, cardiovascular: false, allergies: false, other: '',},
            cities: [],
        });
    };
    return (
        <Container className="registration-container">
            <h1 className="form-title">Citizen Vaccination Data</h1>
            <h1 className="details">Nadav Atias & Efrat Ilouz</h1>
            <div className="form-image-container">
                <div className="image-wrapper">
                    <img src={background} alt="Background" className="form-image" />
                </div>
                <h1 className="form-text">Please Fill This Registration Page</h1>
            </div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Enter your last name"
                        value={form.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <DatePicker
                        id="birthDate"
                        className="form-control"
                        selected={form.birthDate}
                        onChange={handleBirthDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select your birth date"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        placeholder="Enter your address"
                        value={form.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        id="country"
                        className="form-control"
                        value={form.selectedCountry}
                        onChange={handleCountryChange}
                        required
                    >
                        <option value="">Select your country</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.country}>
                                {item.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select
                        id="city"
                        className="form-control"
                        value={form.city}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select your city</option>
                        {form.cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="zipCode"
                        className="form-control"
                        placeholder="Enter your zip code (optional)"
                        value={form.zipCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        id="landLine"
                        className="form-control"
                        placeholder="Enter your landline number"
                        value={form.landLine}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        id="cellPhone"
                        className="form-control"
                        placeholder="Enter your cellular phone number"
                        value={form.cellPhone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            id="infected"
                            checked={form.infected}
                            onChange={handleCheckboxChange}
                        />
                        {' '}Have you been infected by COVID-19 before?
                    </label>
                </div>
                <div className="form-group">
                    <label>Previous Conditions:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="diabetes"
                                checked={form.conditions.diabetes}
                                onChange={handleConditionsChange}
                            />
                            {' '}Diabetes
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="cardiovascular"
                                checked={form.conditions.cardiovascular}
                                onChange={handleConditionsChange}
                            />
                            {' '}Cardio-Vascular problems
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="allergies"
                                checked={form.conditions.allergies}
                                onChange={handleConditionsChange}
                            />
                            {' '}Allergies
                        </label>
                    </div>
                    <div>
                        <br/>
                        <label htmlFor="other">Other: </label>
                        <input
                            type="text"
                            id="other"
                            name="other"
                            className="form-control"
                            placeholder="Enter other conditions"
                            value={form.conditions.other}
                            onChange={handleConditionsChange}
                        />
                    </div>
                    <br/>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <br/>
                    <button
                        type="submit"
                        style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '7px',marginRight: '80px' }}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                    <Button variant="outline-success" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '7px'}}>
                        <Link to="/summary" style={{ textDecoration: 'none', color: 'white' }}>Summary</Link>
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default RegistrationForm;

