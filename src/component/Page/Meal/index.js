import React from 'react';
import axios from 'axios';

class Meal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mealMenu: [

        ]
      };
    }

    componentDidMount(){
      this.fetchData();
    }

    async fetchData(){
      var menu = await axios.get(process.env.REACT_APP_API + 'todayMeal')
      //console.log(menu.data);
      var _mealMenu = this.state.mealMenu;
      var diets = menu.data.meal.Diet;
      _mealMenu.push(diets[0]);
      for(var i=1;i<diets.length;i++){
        for(var j=0;j<_mealMenu.length;j++){
          if(diets[i].MeaTyp === _mealMenu[j].MeaTyp){
            _mealMenu[j].MeaDes += '\n' + diets[i].MeaDes;
            break;
          }
          if(_mealMenu.length === 0 || j === _mealMenu.length - 1){
            _mealMenu.push(diets[i]);
            break;
          }
        }
      }
      console.log(_mealMenu);
      this.setState({
        mealMenu: _mealMenu
      });
    }

    renderMeal(){
      return this.state.mealMenu.map((meal,i)=>{
        if(!meal){ return null;}
        return(
          <div key={i} style={styles.mealMenuContainer}>
            <div style={styles.mealMenuTitleBar1}>
              <div style={styles.textAlignMiddleTitle}>
                {meal.MeaTyp}
              </div>
            </div>
            <div style={styles.mealDetail}>
              <div style={styles.textAlignMiddle}>
                {meal.MeaDes}
              </div>
            </div>
          </div>
        )
      })

    }


    render() {
      let container= {
          width: window.innerWidth,
          minHeight: window.innerHeight - 150,
          backgroundColor: '#FCF4E7',
          textAlign: 'center',
          margin: 'auto',
          paddingTop:75
      };
      return (

        <div style={container} >
          {this.renderMeal()}
        </div>
      );
    }
}

const styles = {

    mealMainContainer: {
      width: window.innerWidth,
      minHeight: (window.innerHeight - 150),
      paddingTop: 80,
      // paddingLeft: 20,
      // paddingRight: 20,
      textAlign: 'center',
      display: 'table'
    },
    mealMenuContainer: {
      width: window.innerWidth * 0.9,
      height: (window.innerHeight - 100) * 0.2,
      borderRadius: 10,
      textAlign: 'center',
      margin: 'auto',
      boxShadow: '0px 5px 20px #CCBFBD',
      marginTop: 20,
      backgroundColor: "#FFF8EE",
    },
    mealMenuTitleBar1: {
      width: '100%',
      textAlign: 'center',
      backgroundColor: "#003E56",
      fontSize: 20,
      color: "#FFF7EE",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    mealMenuTitleBar2: {
      width: '100%',
      textAlign: 'center',
      backgroundColor: "#046787",
      fontSize: 20,
      color: "#FFF7EE",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    mealDetail: {
      width: '100%',
      height: (window.innerHeight - 100) * 0.18 - 30,
      textAlign: 'center',
      backgroundColor: "#FFF8EE",
      fontSize: 18,
      color: "#1A1A1A",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      position: 'relative'
    },
    textAlignMiddle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '90%',
      paddingTop: (window.innerHeight - 100) * 0.09 - 29,
      paddingLeft: 10,
      paddingRight: 10
    },
    textAlignMiddleTitle: {
      width: '100%',
      textAlign: 'center',
      paddingTop: 2,
      paddingBottom: 2
    }
};

export default Meal;
