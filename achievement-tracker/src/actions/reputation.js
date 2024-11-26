// src/actions/reputation.js

// Environment configurations
import ENV from './../config.js';
const API_HOST = ENV.api_host;

// Get the reputation of the current user
export const getReputation = (component) => {
    const url = `${API_HOST}/reputation`;

    fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Could not get reputation');
            }
        })
        .then(json => {
            component.setState({ reputation: json.reputation });
        })
        .catch(error => {
            console.log('Error fetching reputation:', error);
            // Optionally, you can display an alert or handle the error in the UI
        });
};

// Update the reputation of a user
export const updateReputation = (component, reputation) => {
    const url = `${API_HOST}/reputation`;
    const data = { reputation: reputation };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                console.log('Reputation updated');
            } else {
                console.log('Error: Cannot update reputation');
            }
        })
        .catch(error => {
            console.log('Error updating reputation:', error);
        });
};