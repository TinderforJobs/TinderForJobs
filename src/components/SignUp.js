import React, { Component } from 'react';


import Button from '@material-ui/core/Button';
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export class SignUp extends React.Component {
  render() {
    return (
      <div className="form-group">

        <FormGroup controlId="fname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"

          />
        </FormGroup>
        <FormGroup controlId="lname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"

          />
        </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"

            />
          </FormGroup>
        </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Purpose</ControlLabel>
            <input type="radio" name="candidate" value="male">Employer<br>
            <input type="radio" name="employer" value="male">Candidate<br>
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
