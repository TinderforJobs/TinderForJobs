import React, { Component } from 'react';

import './App.css';
import {SignIn} from './components/SignIn.js'
import {SignUp} from './components/SignUp.js'
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import {
  getFromStorage,
  setInStorage
} from './utils/storage.js';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signupError:'',
      singinError: '',

    };
  }

  componentDidMount() {
    const token = getFromStorage ('the_main_app');
    if (token) {
      fetch('api/account/verify?token='+token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });


    } else {
      this.setState({
        isLoading: false
      })
    }
  }
  render() {
    const {
      isLoading,
      token
    } = this.state;

    if(isLoading) {
      return (<div><p>Loading...</p></div>)
    }
    if(!token) {
      return (
        <div>
          <AppBar title="My App">
        <Tabs>
          <Tab label="Job or Nah?" />
        </Tabs>
      </AppBar>
    <br/>
    <br/>
    <br/>


        <div className="App">


          <SignIn/>
          <SignUp/>




        </div>

      </div>
    )}

  }
}

export default App;
