import React from 'react';

const styles = {
    homeBtn: {
        width: window.innerWidth * 0.5,
        backgroundColor: '#53C2BB',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        color: "#FFF7EE",
        borderRadius: 5,
        marginTop: 25
    }
};

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
          <button onClick={this.props.onClick} style={styles.homeBtn} >{this.props.text}</button>
        );
    }
}
