import React from 'react';
import loginImg from './content/img/login.svg';
import { Button, Modal } from 'react-bootstrap';
var config = require('../../src/config')[process.env.NODE_ENV];

export class Login extends React.Component {
    constructor(props){
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


    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleValidation(){
        var valid = true;

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
        
        if(!valid)
        {
            this.handleShow();
            return;
        }

        var data = {
            "email": this.state["email"],
            "password": this.state["password"]
        };

        fetch(config.server.host + "/auth", {
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
            else
            {
                var authToken = "Bearer " + responseJSON["accessToken"];
                this.props.parentMethod(true, authToken);
                console.log(responseJSON);
            }
        });
    };

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="Login"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" onChange={this.handleInputChange} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handleInputChange} placeholder="Password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <input type="submit" onClick={this.handleSubmit} className="btn" id="loginBtn" value="Login" />
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
