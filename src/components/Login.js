import React from 'react';
import loginImg from './content/img/login.svg';

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

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
                            <input type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="Password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" id="loginBtn">
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
