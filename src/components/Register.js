import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
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

    async handleSubmit(){
        //check that all fields are populated
        var valid = function(){
                let fields = this.state.fields;
                let errors = {};
                let formIsValid = true;
        
                //First Name
                if(!fields["firstName"]){
                    formIsValid = false;
                    errors["firstName"] = "Cannot be empty";
                }
        
                if(typeof fields["firstName"] !== "undefined"){
                    if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
                       formIsValid = false;
                       errors["firstName"] = "Only letters";
                    }        
                 }
        
                //Last Name
                if(!fields["lastName"]){
                    formIsValid = false;
                    errors["lastName"] = "Cannot be empty";
                }
        
                if(typeof fields["lastName"] !== "undefined"){
                    if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
                       formIsValid = false;
                       errors["lastName"] = "Only letters";
                    }        
                 }
        
                 //Birth Date
                if(!fields["birthDate"]){
                     formIsValid = false;
                     errors["birthDate"] = "Cannot be empty";
                 }
        
                //Email
                if(!fields["email"]){
                    formIsValid = false;
                    errors["email"] = "Cannot be empty";
                 }
         
                if(typeof fields["email"] !== "undefined"){
                    let lastAtPos = fields["email"].lastIndexOf('@');
                    let lastDotPos = fields["email"].lastIndexOf('.');
         
                    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                       formIsValid = false;
                       errors["email"] = "Email is not valid";
                     }
                }
        
                if(!fields["password"]){
                    formIsValid = false;
                    errors["password"] = "Cannot be empty";
                }else if(fields["password"].length < 8){
                    formIsValid = false;
                    errors["password"] = "must be at least 8 characters";
                }
        
                if(!fields["confirmPassword"]){
                    formIsValid = false;
                    errors["confirmPassword"] = "Cannot be empty";
                }else if(fields["confirmPassword"] != fields["password"]) {
                    formIsValid = false;
                    errors["confirmPassword"] = "passwords must match";
                }
        
                return formIsValid;
        };

        //not valid
        if(!valid)
        {

        }

        var data = {
            "firstName": this.state["firstName"],
            "lastName" : this.state["lastName"],
            "dateOfBirth" : this.state["birthDate"],
            "email" : this.state["email"],
            "password" : this.state["password"]
        };
        console.log(JSON.stringify(data));

        return fetch("http://localhost:3600/users", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
    };



    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" onChange={this.handleInputChange} placeholder="First Name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" onChange={this.handleInputChange} placeholder="Last Name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <DatePicker selected={this.state.birthDate} name="birthDate" onChange={this.handleDateChange} placeholderText="MM/DD/YYYY" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" onChange={this.handleInputChange} placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handleInputChange} placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" onChange={this.handleInputChange} placeholder="Confirm Password" required/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <input type="submit" onClick={this.handleSubmit} className="btn" id="registerBtn" value="Register"/>
                </div>
            </div>
        );
    }
}
