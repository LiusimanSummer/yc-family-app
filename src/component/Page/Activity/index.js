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
    console.log(activities.data.activities)
    this.setState({
      list: activities.data.activities
    });
  }

  _renderActivities = () => {
    const activityContainer = {
        //width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: this.props.innerHeight * 0.075,
        fontSize: this.props.innerHeight * 0.03,
        color: '#1A1A1A',
        textAlign: 'center',
        backgroundColor: "#FFF8EE",
        verticalAlign: 'middle',
        marginTop: 25,
        padding: 25,
        borderRadius: 10,
        boxShadow: '0px 5px 20px #CCBFBD',
        isOpenDialog: false,
        cursor: 'pointer'
    }
    return this.state.list.map((activity, index) => {
        return (
          <div key={index} style={activityContainer} onClick={() => this.props.activitySelected(activity)}>
            {activity.EvtNam}
          </div>
        )
      }
    );
  }

  render() {
    let activityListContainer = {
        // height: this.props.innerHeight - 150,
        // minHeight: '505px',
        paddingTop: 75,
        width: '90%',
        textAlign: 'center',
        margin: 'auto',
    };
    return (
      <div style = {{padding: 5}}>
        <div style={activityListContainer}>
          {this._renderActivities()}
        </div>
        <Button text='回到頂部' onClick={()=>{window.scrollTo(0,0)}}/>
      </div>
    );
  }
}

export default ActivityPage;
