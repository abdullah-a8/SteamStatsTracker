// reactAuth.js

// Functions to help with user authentication

// Environment configurations
import ENV from '../config.js';
const API_HOST = ENV.api_host;

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/current`;
    fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials to send cookies
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log('Error checking session:', error);
        });
};

// A function to send a POST request with the user to be logged in
export const login = (loginParams, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "POST",
        body: JSON.stringify(loginParams),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include', // Include credentials to send cookies
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401 || res.status === 404) {
                alert('Username or password incorrect');
                return null;
            } else {
                alert('An error occurred during login');
                return null;
            }
        })
        .then(json => {
            if (json && json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
                localStorage.setItem('currentUser', json.currentUser);
                // Optionally, redirect to dashboard
            }
        })
        .catch(error => {
            console.log('Error during login:', error);
        });
};

// Changes the current user's password
export const changePassword = (newPassword) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/changepassword`, {
        method: "POST",
        body: JSON.stringify({ "newPassword": newPassword }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include', // Include credentials
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 201) {
                alert("Password changed successfully");
            } else {
                alert('Password change failed');
            }
        })
        .catch(error => {
            console.log('Error changing password:', error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" },
            });
            localStorage.clear();
        })
        .catch(error => {
            console.log('Error during logout:', error);
        });
};
