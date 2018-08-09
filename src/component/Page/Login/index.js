import React from 'react';

const styles = {
    contentContainer: {
        width: '85%',
        minHeight: window.innerHeight - window.innerWidth * 0.075,
        height: '85%',
        backgroundColor: '#FFF6ED',
        margin: 'auto',
        boxShadow: '0px 1px 15px #E1D2CF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        textAlign: 'center',
        marginBottom: 20
    },
    image: {
        width: 130,
        height: 119,
        marginTop: 100
    },
    subTitle: {
        fontSize: 20,
        //fontFamily: 'source-han-sans-traditional',
        //verticalAlign: 'middle',
        color: "#666666",
        paddingTop: 18,
        height: 50
    },
    formContainer: {

        width: '100%',
        textAlign: 'center'
    },
    input: {
        border: '1px solid',
        borderColor: '#A8A6A6',
        width: '80%',
        // height: 30,
        fontSize: 20,
        color: '#A8A6A6',
        padding: 5,
        marginTop: 15,
        borderRadius: 5
    },
    submitBtn: {
        backgroundColor: '#53C2BB',
        width: '80%',
        // height: 30,
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
        color: '#FCFCFC',
        border: '0px solid',
    },
    errorContainer: {
        padding: 10,
    },
    errorMsg: {
        color: "#D64F5D",
        fontSize: 16,
        display: 'inline',
        verticalAlign: 'middle'
    },
    errorIcon: {
        width: 20,
        height: 20,
        display: 'inline',
        marginRight: 5,
        verticalAlign: 'middle'
    },
    YCIcon: {
        maxWidth: 180,
        maxHeight: 57,
        marginTop: 20
    },
    middleContainer: {
        minHeight: window.innerHeight - 100
    }

};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            isLogin: false
        };
    }

    login(event){
      event.preventDefault();
      const id = document.getElementById("id").value;
      const pw = document.getElementById("pw").value;

      //console.log("login " + id + " / " + pw);
      this.props.login(id,pw);
    }

    render() {
        return (
            <div style={styles.middleContainer}>
                <img style={styles.image} src={require('../../../images/FAC003.png')} alt=''/>
                <div style={styles.subTitle}>仁濟心連心網站</div>
                <form style={styles.formContainer}>
                    <input id="id" style={styles.input} type="text" name="user" />
                    <br />
                    <input id="pw" style={styles.input} type="password" name="password" />
                    <br />
                    {!this.state.isLogin && <div style={styles.errorContainer}>
                        {this.state.errorMsg !== '' && <img style={styles.errorIcon} src={require('../../../images/FAC005.png')} alt=''/>}
                        <div style={styles.errorMsg}>{this.state.errorMsg}</div>
                    </div>}
                    {this.state.isLogin && <div style={styles.errorContainer}></div>}
                    <input style={styles.submitBtn} type="submit" value="登入"  onClick = {this.login.bind(this)}/>
                </form>
                <img style={styles.YCIcon} src={require('../../../images/FAL001.png')} alt=''/>
            </div>
        );
    }
}
