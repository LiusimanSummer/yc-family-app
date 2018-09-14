import React from 'react';

const styles = {
    container: {
        width: '100%',
        minHeight: window.innerHeight - 150,
        backgroundColor: '#FCF4E7',
        textAlign: 'center',
        margin: 'auto',
        paddingTop:75
    },
    photoContainer: {
        backgroundColor: '#AD1F25',
        height: (window.innerHeight - 100) * 0.25

    },
    mealContainer: {
        backgroundColor: '#046786',
        height: (window.innerHeight - 100) * 0.25


    },
    activityContainer: {
        backgroundColor: '#E9AE2D',
        height: (window.innerHeight - 100) * 0.25
    },
    linkContainer:{
      backgroundColor: '#29a52f',
      height: (window.innerHeight - 100) * 0.25
    },
    icon: {
        height: 62,
        width: 223,

      //  marginTop: (window.innerHeight - 100) * 0.15 - 30
    },

};

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      let container = {
          width: '100%',
          minHeight: window.innerHeight - 150,
          backgroundColor: '#FCF4E7',
          textAlign: 'center',
          margin: 'auto',
          paddingTop:75
      };

      const centerContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
        return (
            <div style={container}>
                <div style={Object.assign({}, centerContainer, styles.photoContainer)} onClick={() => this.props.goTo('photo')}>
                    <img style={styles.icon} src={require('../../../images/FAC009.png')} alt=''/>
                </div>
                <div style={Object.assign({}, centerContainer, styles.mealContainer)} onClick={() => this.props.goTo('meal')}>
                    <img style={styles.icon} src={require('../../../images/FAC010.png')} alt=''/>
                </div>
                <div style={Object.assign({}, centerContainer, styles.activityContainer)} onClick={() => this.props.goTo('activityList')}>
                    <img style={styles.icon} src={require('../../../images/FAC011.png')} alt=''/>
                </div>
                <div style={Object.assign({}, centerContainer, styles.linkContainer)} onClick={() => this.openSite()}>
                    <img style={styles.icon} src={require('../../../images/FAC032.png')} alt=''/>
                </div>
            </div>
        );
    }

    openSite() {
      var win = window.open('http://www.ychss.org.hk/elder/dragon-series/327-2018-04-13-04-22-53', '_blank');
      win.focus();
    }
}
