// src/actions/profilePic.js

// Environment configurations
import ENV from './../config.js';
const API_HOST = ENV.api_host;

// Update the profile image for the current user
export const storeImage = async (component) => {
    const url = `${API_HOST}/profilePic`;
    const imageData = component.state.uploadImage;
    const data = { profilePic: imageData };

    await fetch(url, {
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
                component.setState({ image: imageData, uploadImage: '' });
                alert('Profile picture updated successfully');
            } else {
                alert('Could not update profile picture');
            }
        })
        .catch(error => {
            console.log('Error updating profile picture:', error);
            alert('Error updating profile picture');
        });
};

// Get the profile image for a user
export const getImage = async (username, component) => {
    const url = `${API_HOST}/profilePic/${encodeURIComponent(username)}`;

    await fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Cannot get profile image');
            }
        })
        .then(json => {
            component.setState({ image: json.profilePic });
        })
        .catch(error => {
            console.log('Error fetching profile image:', error);
            alert('Cannot get profile image');
        });
};