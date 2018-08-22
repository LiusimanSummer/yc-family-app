import React from 'react';
import axios from 'axios';

class ActivityBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeState: props.routeState ? props.routeState : 'activityDetail',
            title: props.activity.EvtNam,
            reserved: this.getReservedArray(this.props.activity.ErlStsDes),
            registered: this.getRegisteredArray(this.props.activity.ErlStsDes)
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    _renderDetail = (detailObj) => {
        let activity = this.props.activity;
        //console.log(activity)
        detailObj = {
            sdate: activity.EvtFrDat,
            edate: activity.EvtToDat,
            duriation: activity.EvtStaTim + ' - ' + activity.EvtEndTim,
            weekDate: this.GetWeekDayString(activity.EvtWkDay),
            location: activity.Vnu,
            fee: this.getFeeDescription(activity.EvtCosDes),
            deadline: activity.ErlEndDay
        };

        return (
            <div style={{ textAlign: 'center', paddingRight: 5 }}>
                <div style={{ marginTop: 30, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>日期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.sdate}{detailObj.sdate !== detailObj.edate? ' 至 ' + detailObj.edate:''}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>時間 ：</div>
                    <div style={styles.detailCol2}>{detailObj.duriation}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>星期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.weekDate}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>地點 ：</div>
                    <div style={styles.detailCol2}>{detailObj.location}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>費用 ：</div>
                    <div style={styles.detailCol2}>{detailObj.fee}</div>
                </div>
                <div style={{ marginTop: 5, verticalAlign: 'text-top' }}>
                    <div style={styles.detailCol1}>截止日期 ：</div>
                    <div style={styles.detailCol2}>{detailObj.deadline}</div>
                </div>
                <div style={styles.checkBookingBtn} onClick={() => this.btnClick('activityDetail')}>留位狀況</div>
            </div>
        );
    }
    _renderBookRequest = () => {

        return (
            <div>
                <div style={styles.text2}>確定留位 ?</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: window.innerHeight * 0.2 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookRequest_ok')}>確定留位</div>
                    <div style={styles.cancelBtn} onClick={() => this.btnClick('bookRequest_cancel')}>取消留位</div>
                </div>
            </div>);

    }

    _renderBookingSuccess = () => {

        return (
            <div style={{ maxheight: 50 }}>
                <div style={styles.text}>你已成功留位！ <br />有關同事將會與你接洽。</div>
                <div style={styles.textContact}>如有問題請致電 24086639 聯絡我們。</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: window.innerHeight * 0.1 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookingSuccess_ok')}>確定</div>
                </div>
            </div>);

    }

    _renderBookedStatus = () => {
        return (
            <div style={{ maxheight: 50 }}>
                <div style={styles.text2}>您已留位，<br />需要<span style={{ color: '#E75125' }}>取消</span>留位嗎？</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: window.innerHeight * 0.2 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('bookedStatus_cancel')}>確定取消</div>
                    <div style={styles.cancelBtn} onClick={() => this.btnClick('bookedStatus_keep')}>保留留位</div>
                </div>
            </div>);
    }

    _renderCancelConfirm = () => {
        return (
            <div style={{ maxheight: 50 }}>
                <div style={styles.text}>你已成功取消留位！</div>
                <div style={styles.textContact}>如有問題請致電 24086639 聯絡我們。</div>
                <div style={{ width: '100%', textAlign: 'center', marginTop: window.innerHeight * 0.1 }}>
                    <div style={styles.sureBtn} onClick={() => this.btnClick('cancelConfirm_ok')}>確定</div>
                </div>
            </div>);
    }

    btnClick = async (btnId) => {
        if (btnId === 'activityDetail') {
          //console.log(this.props.profile);
          //console.log(this.state.reserved);
          let isBooked = !this.state.reserved.includes(this.props.profile.nfcId);

          if (isBooked) {
              await this.setState({ routeState: 'bookedStatus' });
          } else {
              await this.setState({ routeState: 'bookRequest' });
          }
        } else if (btnId === 'bookedStatus_cancel') {
          this.UpdateEventStatus(false);
            //await this.setState({ routeState: 'cancelConfirm' });
        } else if (btnId === 'bookedStatus_keep') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'cancelConfirm_ok') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'bookRequest_ok') {
            this.UpdateEventStatus(true);
            //await this.setState({ routeState: 'bookingSuccess' });
        } else if (btnId === 'bookRequest_cancel') {
            await this.setState({ routeState: 'activityDetail' });
        } else if (btnId === 'bookingSuccess_ok') {
            await this.setState({ routeState: 'activityDetail' });
        }

    }

    _renderContent = () => {
        let contentType = this.state.routeState;
        if (contentType === 'activityDetail') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderDetail()}
                </div>
            );
        } else if (contentType === 'bookRequest') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookRequest()}
                </div>
            );
        } else if (contentType === 'bookingSuccess') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookingSuccess()}
                </div>
            );

        } else if (contentType === 'bookedStatus') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderBookedStatus()}
                </div>
            );

        } else if (contentType === 'cancelConfirm') {
            return (
                <div style={styles.detailContainer}>
                    {this._renderCancelConfirm()}
                </div>);
        }
    }

    render() {
        return (
            <div style={styles.contentMainContainer}>
                <div style={styles.contentContainer}>
                    <div style={styles.contentBar}>{this.state.title}</div>
                    {this._renderContent()}
                </div>
            </div>
        );
    }

    getDateString() {
      let date = new Date();
      let year = date.getFullYear();
      let monthIndex = date.getMonth() + 1;
      let day = date.getDate();

      let dateStr = year + '-' + monthIndex + '-' + day;
      return dateStr;
    }

    GetWeekDayString(weekDay){
      //console.log(weekDay);
      let toReturn = '';
      for (var i = 0;i < 7; i++) {
        if(weekDay.charAt(i) === '1'){
          toReturn += this.GetWeekDay(i) + '、';
        }
      }
      return(toReturn.substring(0,toReturn.length - 1));
    }

    GetWeekDay(index){
      let toReturn =
        index === '0'? '日':
        index === '1'? '一':
        index === '2'? '二':
        index === '3'? '三':
        index === '4'? '四':
        index === '5'? '五':
        index === '6'? '六':
        '日';
      return(toReturn);
    }

    getFeeDescription(feeStr){
      if(feeStr === null){
        return '';
      }
      var feeDesc = feeStr.split(';');
      var returnStr='';
      for(var i=0;i<feeDesc.length;i++){
        var fee = feeDesc[i].split(',');
        var feeValue = fee[1].split('.');
        returnStr += fee[0] + '：$' + feeValue[0] + '  ';
      }
      return returnStr;
    }

    getRegisteredArray(ErlStsDes){
      if(ErlStsDes === null){
        return [];
      }
      let reservedArray = ErlStsDes.split(';');
      for(var i = 0;i<reservedArray.length;i++){
        let array = reservedArray[i].split(',');
        if(array.length === 3 && array[2] === "報名"){
          reservedArray[i] = array[1];
        }else{
          reservedArray[i] = "";
        }
      }
      //console.log(reservedArray);
      return(reservedArray);
    }

    getReservedArray(ErlStsDes){
      if(ErlStsDes === null){
        return [];
      }
      //console.log(ErlStsDes);
      let reservedArray = ErlStsDes.split(';');
      for(var i = 0;i<reservedArray.length;i++){
        let array = reservedArray[i].split(',');
        if(array.length === 3 && array[2] === "留位"){
          reservedArray[i] = array[1];
        }else{
          reservedArray[i] = "";
        }
      }
      //console.log(reservedArray);
      return(reservedArray);
    }

    UpdateEventStatus(reserve){
      //console.log("UpdateEventStatus");
      const prfl = this.props.profile;
      const activity = this.props.activity;
      //console.log(prfl);
      //console.log(activity);
      const data = {
        'MEMID': prfl.residentId,
        'CTRID': 'JCH',
        'EvtCod': activity.EvtCod,
        'ErlName': activity.EvtNam,
        'ErlDat': this.getDateString(),
        'IsMbr': '1',
        'ErlPhone': '12345678',
        'EvtCosID': '1',
        'Reserve': reserve? 'RSVD':'CANN'
      }
      axios.post(process.env.REACT_APP_API + 'updEvtErl' , data).then(res=>{
        console.log(res);
        this.setState({
          routeState: !reserve? 'cancelConfirm': 'bookingSuccess'
        });
      }).catch(err=>{
        console.log(err.message);
        this.setState({
          routeState: 'activityDetail'
        });
      })
    }
}


const styles = {
    contentMainContainer: {
        minHeight: window.innerHeight - 200,
        paddingTop: 100
    },

    contentContainer: {
        width: '85%',
        paddingBottom: 40,
        height: '85%',
        backgroundColor: '#FFF6ED',
        margin: 'auto',
        boxShadow: '0px 1px 15px #E1D2CF',
        //marginTop: 100,
        borderRadius: 15,
    },

    detailContainer: {
        textAlign: 'center',
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        //height: window.innerHeight*0.45,
    },
    checkBookingBtn: {
        backgroundColor: '#EAAF2D',
        color: '#FFF8EE',
        fontSize: 20,
        width: '50%',
        borderRadius: 5,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        marginTop: 30
    },
    detailCol1: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'right',
        marginTop: 5,
        width: 90,
        display: 'inline-block',
    },

    detailCol2: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'left',
        marginTop: 5,
        width: '60%',
        display: 'inline-block',
        verticalAlign: 'top'

    },

    contentBar: {
        backgroundColor: '#E9AE2D',
        padding: 10,
        fontSize: 18,
        color: '#FFF7EE',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    sureBtn: {
        backgroundColor: '#EAAF2D',
        color: '#FFF8EE',
        minWidth: 100,
        fontSize: 18,
        width: '30%',
        borderRadius: 3,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        display: 'inline-block',
    },
    cancelBtn: {
        backgroundColor: '#FFF8EE',
        color: '#EAAF2D',
        fontSize: 18,
        minWidth: 100,
        width: '30%',
        borderRadius: 3,
        padding: 8,
        boxShadow: '0px 1px 15px #E1D2CF',
        margin: 'auto',
        display: 'inline-block',
        marginLeft: 30
    },

    text: {
        fontSize: 24,
        color: '#1A1A1A',
        marginTop: window.innerHeight * 0.1
    },
    text2: {
        fontSize: 24,
        color: '#1A1A1A',
        marginTop: window.innerHeight * 0.15
    },
    textContact: {
        fontSize: 16,
        color: '#1A1A1A',
        marginTop: 20
    },



};

export default ActivityBooking;
