// src/actions/friend.js

// Environment configurations
import ENV from './../config.js';
const API_HOST = ENV.api_host;

// Get the current user's friends list
export const getFriend = (friendList) => {
    const url = `${API_HOST}/api/friends/${friendList.state.userName}`;

    fetch(url, {
        method: 'GET',
        credentials: 'include', // Include credentials for session
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Could not fetch friend list');
            }
        })
        .then(json => {
            const list = [
                ...json.friendList.map(friend => ({ name: friend.name, onPending: false })),
                ...json.pendingList.map(request => ({ name: request.sender, onPending: true })),
            ];
            friendList.setState({ friendList: list });
        })
        .catch(error => {
            console.error('Error fetching friend list:', error);
            alert('Cannot get friends list');
        });
};

// Add a new friend
export const addFriends = async (dashboardComp) => {
    const url = `${API_HOST}/api/friends/${dashboardComp.state.userName}`;
    const friendName = dashboardComp.state.addFriendName;

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify({ friendName }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                getFriend(dashboardComp);
            } else {
                throw new Error('Friend does not exist or request is pending');
            }
        })
        .catch(error => {
            console.error('Error adding friend:', error);
            alert('Error adding friend');
        });
};

// Delete a friend
export const deleteFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/delete`;

    const request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify({ userName: dashboardComp.state.userName, friendName }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                const updatedList = dashboardComp.state.friendList.filter(friend => friend.name !== friendName);
                dashboardComp.setState({ friendList: updatedList });
            } else {
                throw new Error('Error deleting friend');
            }
        })
        .catch(error => {
            console.error('Error deleting friend:', error);
            alert('Error deleting friend');
        });
};

// Accept a friend request
export const acceptFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/accept`;

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify({ userName: dashboardComp.state.userName, friendName }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                const updatedList = dashboardComp.state.friendList.map(friend => {
                    if (friend.name === friendName) friend.onPending = false;
                    return friend;
                });
                dashboardComp.setState({ friendList: updatedList });
            } else {
                throw new Error('Error accepting friend request');
            }
        })
        .catch(error => {
            console.error('Error accepting friend request:', error);
            alert('Error accepting friend request');
        });
};

// Decline a friend request
export const declineFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/decline`;

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify({ userName: dashboardComp.state.userName, friendName }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                const updatedList = dashboardComp.state.friendList.filter(friend => friend.name !== friendName);
                dashboardComp.setState({ friendList: updatedList });
            } else {
                throw new Error('Error declining friend request');
            }
        })
        .catch(error => {
            console.error('Error declining friend request:', error);
            alert('Error declining friend request');
        });
};