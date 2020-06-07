import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export class Register extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        startDate: null
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChange} placeholderText="MM/DD/YYYY" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" id="registerBtn">
                        Register
                    </button>
                </div>
            </div>
        );
    }
}
