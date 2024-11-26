// src/actions/reputation.js

// Environment configurations
import ENV from './../config.js';
const API_HOST = ENV.api_host;

// Get the reputation of the current user
export const getReputation = (component) => {
    const userName = component.state.userName; // Ensure userName is available
    const url = `${API_HOST}/api/user/reputation/${encodeURIComponent(userName)}`;

    fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                res.text().then(text => {
                    console.log(`Error fetching reputation: ${text}`);
                    throw new Error('Could not get reputation');
                });
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
    const userName = component.state.userName; // Ensure userName is available
    const url = `${API_HOST}/api/user/updatereputation/${encodeURIComponent(userName)}`;
    const data = { reputation: reputation }; // Server expects 'reputation' in the body

    fetch(url, {
        method: 'PATCH', // Changed from POST to PATCH
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                console.log('Reputation updated');
            } else {
                res.text().then(text => {
                    console.log(`Error updating reputation: ${text}`);
                });
            }
        })
        .catch(error => {
            console.log('Error updating reputation:', error);
        });
};