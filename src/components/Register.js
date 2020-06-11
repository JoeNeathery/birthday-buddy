import React from 'react';
import DatePicker from 'react-datepicker';
import { Button, Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
var config = require('../../src/config')[process.env.NODE_ENV];

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            errorDisplayList: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }


    handleDateChange = date => {
        this.setState({
            birthDate: date
        });
    };

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleValidation() {
        var valid = true;

        //firstName
        if (!this.state["firstName"] || this.state["firstName"].trim() === "") {
            this.state.errorDisplayList.push("First Name is Required.");
            valid = false;
        }

        //lastName
        if (!this.state["lastName"] || this.state["lastName"].trim() === "") {
            this.state.errorDisplayList.push("Last Name is Required.");
            valid = false;
        }

        //birthDate
        if (!this.state["birthDate"]) {
            this.state.errorDisplayList.push("Birth Date is Required.");
            valid = false;
        }

        //email
        if (!this.state["email"] || this.state["email"].trim() === "") {
            this.state.errorDisplayList.push("Email is Required.");
            valid = false;
        }

        //password
        if (!this.state["password"] || this.state["password"].trim() === "") {
            this.state.errorDisplayList.push("Password is Required.");
            valid = false;
        }

        //confirmPassword
        if (!this.state["confirmPassword"] || this.state["confirmPassword"].trim() === "") {
            this.state.errorDisplayList.push("Confirm Password is Required.");
            valid = false;
        }

        if(this.state["password"] && this.state["confirmPassword"]){
            if(this.state["password"] !== this.state["confirmPassword"]){
                this.state.errorDisplayList.push("Passwords must Match.");
                valid = false;
            }

            if(this.state["password"].length < 8 || this.state["confirmPassword"] < 8){
                this.state.errorDisplayList.push("Password must be at least 8 characters.")
                valid = false;
            }

        }

        return valid;
    }

    handleClose(){
        this.setState({show: false, errorDisplayList: []});
    }

    handleShow(){
        this.setState({show: true});
    }

    handleSubmit() {

        var valid = this.handleValidation();
        //not valid
        if (!valid) {
            this.handleShow();
            return;
        }

        var data = {
            "firstName": this.state["firstName"],
            "lastName": this.state["lastName"],
            "dateOfBirth": this.state["birthDate"],
            "email": this.state["email"],
            "password": this.state["password"]
        };
        console.log(JSON.stringify(data));

        fetch(config.host + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
          .then((responseJSON) => {
              if(responseJSON["errors"])
              {
                  this.state.errorDisplayList.push(responseJSON["errors"]);
                  this.handleShow();
              }
              else{
                  //this handle success case 
              }
          });
          return;
    };

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" onChange={this.handleInputChange} placeholder="First Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" onChange={this.handleInputChange} placeholder="Last Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <DatePicker selected={this.state.birthDate} name="birthDate" onChange={this.handleDateChange} placeholderText="MM/DD/YYYY" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" onChange={this.handleInputChange} placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handleInputChange} placeholder="Password" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={this.handleInputChange} placeholder="Confirm Password" required />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <input type="submit" onClick={this.handleSubmit} className="btn" id="registerBtn" value="Register" />
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uh Oh...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                        {this.state.errorDisplayList.map(errorsToDisplay => (
                            <li className="list-group-item"><span className="errorValues">{errorsToDisplay}</span></li>
                        ))} 
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" id="modalCloseBtn" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
