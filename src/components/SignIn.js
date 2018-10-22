import React, { Component } from 'react';


import Button from '@material-ui/core/Button';
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class SignIn extends React.Component {
  render() {
    return (
      <div className="form-group">

          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"

            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl

              type="password"
            />
          </FormGroup>
          <Button
          >
            Login
          </Button>
        
      </div>

    )
  }
}
