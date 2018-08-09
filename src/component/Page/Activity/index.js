import React from 'react';
import axios from 'axios';
import Button from '../../Button';


class ActivityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        list: []
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData(){
    var activities = await axios.get(process.env.REACT_APP_API + 'activities')
    //console.log(activities.data.activities)
    this.setState({
      list: activities.data.activities
    });
  }

  _renderActivities = () => {
    return this.state.list.map((activity, index) => {
        return (
          <div key={index} style={styles.activityContainer} onClick={() => this.props.activitySelected(activity)}>
            {activity.EvtNam}
          </div>
        )
      }
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.activityListContainer}>
          {this._renderActivities()}
        </div>
        <div style={styles.homeContainer}>
          <Button text='回到頂部' onClick={()=>{window.scrollTo(0,0)}}/>
        </div>
      </div>
    );
  }
}

const styles = {

    activityListContainer: {
        minHeight: window.innerHeight - 150,
        paddingTop: 75,
        width: '90%',
        textAlign: 'center',
        margin: 'auto'
    },

    activityContainer: {
        //width: '80%',
        //height: 64,
        fontSize: 18,
        color: '#1A1A1A',
        textAlign: 'center',
        backgroundColor: "#FFF8EE",
        verticalAlign: 'middle',
        marginTop: 25,
        padding: 25,
        borderRadius: 10,
        boxShadow: '0px 5px 20px #CCBFBD',
        isOpenDialog: false
    }
};

export default ActivityPage;
