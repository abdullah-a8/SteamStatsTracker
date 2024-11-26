import React from 'react'
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

import { CurrentHeaderButton, HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import logo from './../../steamIcon2.png'
import checkmark from './imgs/checkmark.jpg'
import cross from './imgs/cross.jpg'
import help from './imgs/help.png'

import ENV from '../../config'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css';

const log = console.log

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      passWord2: '',
      steamName: '',
      valid_username: false,
      valid_steamID: false,
      valid_pw1: false,
      valid_pw2: false,
      showHelp: false,
      redirect: null
    };
    this.usernameCheckTimeout = null;
    this.steamIDCheckTimeout = null;
  }

  componentWillUnmount() {
    // Clear any pending timeouts when the component unmounts
    if (this.usernameCheckTimeout) {
      clearTimeout(this.usernameCheckTimeout);
    }
    if (this.steamIDCheckTimeout) {
      clearTimeout(this.steamIDCheckTimeout);
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })

    // Debounce the username validation
    if (name === 'userName') {
      if (this.usernameCheckTimeout) {
        clearTimeout(this.usernameCheckTimeout);
      }
      this.usernameCheckTimeout = setTimeout(() => {
        if (value.length > 0) {
          fetch(`/usernames/${encodeURIComponent(value)}`)
            .then(res => {
              if (res.status === 404) {
                if (value.toLowerCase().startsWith('admin')) {
                  this.setState({ valid_username: false });
                } else {
                  this.setState({ valid_username: true });
                }
              } else if (res.status === 200) {
                this.setState({ valid_username: false });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.setState({ valid_username: false });
        }
      }, 500); // Adjust the delay (in milliseconds) as needed
    }

    // Debounce the Steam ID validation
    if (name === 'steamName') {
      if (this.steamIDCheckTimeout) {
        clearTimeout(this.steamIDCheckTimeout);
      }
      this.steamIDCheckTimeout = setTimeout(() => {
        if (value.length > 0) {
          fetch(`/steamapi/userinfo/?key=${ENV.steam_key}&steamids=${encodeURIComponent(value)}`)
            .then(res => res.json())
            .then(json => {
              if (json.response && json.response.players && json.response.players.length > 0 && json.response.players[0].communityvisibilitystate === 3) {
                this.setState({ valid_steamID: true });
              } else {
                this.setState({ valid_steamID: false });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.setState({ valid_steamID: false });
        }
      }, 500); // Adjust the delay as needed
    }

    // Validate password fields
    if (name === 'passWord') {
      if (value.length >= 4) {
        this.setState({ valid_pw1: true });
      } else {
        this.setState({ valid_pw1: false });
      }
      if (value === this.state.passWord2) {
        this.setState({ valid_pw2: true });
      } else {
        this.setState({ valid_pw2: false });
      }
    }
    if (name === 'passWord2') {
      if (value === this.state.passWord) {
        this.setState({ valid_pw2: true });
      } else {
        this.setState({ valid_pw2: false });
      }
    }
  }

  // Handle the signup action
  handleSignup = () => {
    if (this.state.userName === '' ||
      this.state.passWord === '' ||
      this.state.steamName === '') {
      alert('Some input fields are empty');
      return;
    }
    if (this.state.passWord !== this.state.passWord2) {
      alert('Passwords do not match');
      return;
    }
    if (this.state.passWord.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.passWord,
        steamName: this.state.steamName
      })
    };
    // Post the request to the backend to create an account
    fetch('/users', requestOptions)
      .then(res => {
        if (res.status === 400) {
          alert('Server error: Account not created');
        } else if (res.status === 200) {
          alert('Account creation successful! Please proceed to log in.');
          this.setState({ redirect: '/Login' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div id='LoginPage'>
        <HeadContainer bgId={"dashboard"}>
          <HeaderNavBar>
            <HeaderImage to='/' src={logo} />
            <div className='group'>
              <HeaderButton path='/reviewForum'>Forum</HeaderButton>
              <HeaderButton path='/login'>Login</HeaderButton>
              <span className="slash">/</span>
              <CurrentHeaderButton path="/Signup">Sign Up</CurrentHeaderButton>
            </div>
          </HeaderNavBar>
        </HeadContainer>
        <div id="SignupContainer">
          <p className='loginText'>Please enter your details:</p>

          <div>
            <div className="FieldContainer">
              <input className="SignupField"
                value={this.state.userName}
                onChange={this.handleInputChange}
                type='text'
                name='userName'
                placeholder='Create a username'
                autoFocus></input>
            </div>
            <div className="imgValidityCheck">
              <img src={this.state.valid_username ? checkmark : cross} alt="Username validity" />
            </div>
          </div>

          <div>
            <div className="FieldContainer">
              <input className="SignupField"
                value={this.state.passWord}
                onChange={this.handleInputChange}
                type='password'
                name='passWord'
                placeholder='Create a password'></input>
            </div>
            <div className="imgValidityCheck">
              <img src={this.state.valid_pw1 ? checkmark : cross} alt="Password validity" />
            </div>
          </div>

          <div>
            <div className="FieldContainer">
              <input className="SignupField"
                value={this.state.passWord2}
                onChange={this.handleInputChange}
                type='password'
                name='passWord2'
                placeholder='Confirm password'></input>
            </div>
            <div className="imgValidityCheck">
              <img src={this.state.valid_pw1 && this.state.valid_pw2 ? checkmark : cross} alt="Password match validity" />
            </div>
          </div>

          <div id="inputField4">
            <div className="helpIcon">
              <img src={help}
                onMouseEnter={() => { this.setState({ showHelp: true }) }}
                onMouseOut={() => { this.setState({ showHelp: false }) }}
                onClick={() => { window.open("/SteamInfo") }}
                name="helpIcon" alt="Help icon" />
            </div>
            <div className="FieldContainer">
              <input className="SignupField"
                value={this.state.steamName}
                onChange={this.handleInputChange}
                type='text'
                name='steamName'
                placeholder='Enter Steam ID'></input>
            </div>
            <div className="imgValidityCheck">
              <img src={this.state.valid_steamID ? checkmark : cross} alt="Steam ID validity" />
            </div>
          </div>

          {!(this.state.showHelp) || <div>
            <span id="helpText">Don't know your Steam ID? Click here to find out how to get it!</span>
          </div>}

          <Button className="SignUpButton"
            variant="primary"
            disabled={!(this.state.valid_username && this.state.valid_steamID &&
              this.state.valid_pw1 && this.state.valid_pw2)}
            onClick={this.handleSignup}>Sign Up
          </Button>
        </div>
      </div>
    )
  }
}

export default Signup;