import React from 'react';
import Login from './Login';
import Statement from './Statement';
import MainMenu from './MainMenu';
import Photo from './Photo';
import Meal from './Meal';
import Activity from './Activity';
import ActivityBooking from './ActivityBooking';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({currentPage: nextProps.currentPage});
       // alert("componentWillReceiveProps:::"+ JSON.stringify(nextProps));
    }

    render() {
        let curp = this.state.currentPage;

        return (
            <div>
                {curp.login && <Login login={this.props.login.bind(this)}/>}
                {curp.statement && <Statement content={curp.title} />}
                {curp.mainmenu && <MainMenu goTo = {this.props.goTo.bind(this)}/>}
                {curp.photo && <Photo />}
                {curp.meal && <Meal mealMenu={curp.mealMenu} />}
                {curp.activityList && <Activity activities={curp.activities} activitySelected = {this.props.activitySelected.bind(this)}/>}
                {curp.activityBooking && <ActivityBooking activity={curp.activity} profile={this.props.profile}/>}
            </div>
        );
    }
}
