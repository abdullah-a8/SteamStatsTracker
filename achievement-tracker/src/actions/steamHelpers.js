// src/actions/steamHelpers.js

// Functions to help with accessing the Steam API

// Environment configurations
import ENV from '../config.js';
const API_HOST = ENV.api_host;
const STEAM_KEY = ENV.steam_key;

// Returns the game stats for a user
export const getGameStats = () => {
    const url = `${API_HOST}/steamapi/usergames/?key=${STEAM_KEY}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials to send cookies
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(`Server responded with status ${res.status}`);
            }
        })
        .then(json => {
            return json.response;
        })
        .catch(error => {
            console.log('Error fetching game stats:', error);
            throw error; // Rethrow the error to be caught in the calling function
        });
};

// Returns the achievement stats for a specific game
export const getAchievementStats = (appid) => {
    const url = `${API_HOST}/steamapi/games/?key=${STEAM_KEY}&appid=${appid}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(`Server responded with status ${res.status}`);
            }
        })
        .then(json => {
            return json.playerstats;
        })
        .catch(error => {
            console.log('Error fetching achievement stats:', error);
            throw error;
        });
};

// Returns the game achievement schema for a specific game
export const getGameSchema = (appid) => {
    const url = `${API_HOST}/steamapi/game/?key=${STEAM_KEY}&appid=${appid}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(`Server responded with status ${res.status}`);
            }
        })
        .then(json => {
            return json.game.availableGameStats.achievements;
        })
        .catch(error => {
            console.log('Error fetching game schema:', error);
            throw error;
        });
};
