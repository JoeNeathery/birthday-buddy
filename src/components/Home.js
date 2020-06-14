import React from 'react';

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            errorDisplayList: []
        };
    }

    render(){
        return(
            <h1>Welcome Home!</h1>
        );
    }
}