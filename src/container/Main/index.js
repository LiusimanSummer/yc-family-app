import React from 'react';
import axios from 'axios';
import StatementBar from './../../component/StatementBar';
import HeaderBar from './../../component/HeaderBar';
import Page from './../../component/Page';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            isLogin: false,
            trace: [],
            currentPage: {
                login: true,
                title: '仁濟心連心',
                titleBarBackgroundColor: '#FFF6ED',
                titleBarTextColor: '#666666',
            },
            profile:{},
            dimemsion:{
              width: 0,
              height: 0
            }
        };
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
      this.setState({
        dimemsion:{
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    }

    logout(){
      this.setState({
        isLogin: false,
        currentPage: {
            login: true,
            title: '仁濟心連心',
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#666666',
        }
      })
    }

    statementClick = async (statementProps) => {
        let currentPage = {
            title: statementProps,
            statement: true,
            content: statementProps,
            backBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#666666',
            titleBackImage: 'FAC012_b.png'
        };
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }
    // componentWillReceiveProps() {
    //     window.location.reload(true);
    // }

    login = async (id,pw) => {

      const userid = "alex3288@gmail.com"
      const password = "asdf2013"

      /*let _currentPage = {
          title: '仁濟心連心',
          mainmenu: true,
          logoutBtn: true,
          titleBarBackgroundColor: '#FFF6ED',
          titleBarTextColor: '#666666',
          titleBackImage: 'FAC012_b.png'
      }
      this.setState({
        currentPage: _currentPage,
        profile: {}
      });
      return;*/

      axios.post(process.env.REACT_APP_LOGIN,JSON.stringify({}),{
          headers: {
            'userid': userid,
            'password': password
          }
        }
      )
      .then(async (res)=>{
        console.log(res);
        if(!res.data.status){
          return;
        }

        let _currentPage = {
            title: '仁濟心連心',
            mainmenu: true,
            logoutBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#666666',
            titleBackImage: 'FAC012_b.png'
        }
        this.setState({
          currentPage: _currentPage,
          profile: res.data
        });

        this.state.trace.splice(0, 0, _currentPage);
      }).catch(err=>{
        console.log(err);
      });

    }

    goTo = async (pageProps) => {
        let currentPage = {
            logoutBtn: true,
            backBtn: true,
            titleBarBackgroundColor: '#FFF6ED',
            titleBarTextColor: '#FFF7EE',
            titleBackImage: 'FAC012_w.png'
        };
        if (pageProps === 'photo') {
            currentPage.title = '相簿';
            currentPage.photo = true;
            currentPage.titleBarBackgroundColor = '#AD1F25';
        } else if (pageProps === 'activityList') {
            currentPage.title = '活動消息';
            currentPage.activityList = true;
            /*currentPage.activities = [
                '太極深造班 第一期',
                '瑜伽入門班 第三期',
                '太極入門班 第二期',
                '瑜伽深造班 第二期',
                '速成入門班 第二期',
                '速成入門班 第十期',
                '速成入深造班 第二期',
                '速成入深造班 第十期',
            ];*/
            currentPage.titleBarBackgroundColor = '#E9AE2D';
        } else if (pageProps === 'meal') {
            currentPage.title = '每日餐單';
            currentPage.meal = true;
            currentPage.mealMenu = {
                /**breakfast: '麥皮',
                lunch: '炸醬面',
                tea: '曲奇',
                dinner: '粥',*/
            };
            currentPage.titleBarBackgroundColor = '#046786';
        }
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }
    activitySelected = async (activityProps) => {
        // alert("activitySelected:::" + JSON.stringify(activityProps));
        //console.log(activityProps);
        let currentPage = {
            activityBooking: true,
            logoutBtn: true,
            title: '活動消息',
            activity: activityProps,
            backBtn: true,
            titleBarBackgroundColor: '#E9AE2D',
            titleBarTextColor: '#FFF7EE',
            titleBackImage: 'FAC012_w.png'
        };
        await this.setState({
            currentPage
        });
        this.state.trace.splice(0, 0, currentPage);
    }

    backToPreviousPage() {
        //alert('backToPreviousPage:::' + JSON.stringify(this.state.trace[0]));
        this.state.trace.splice(0, 1);
        if (this.state.trace.length === 0) {
            this.setState({
                currentPage: {
                    login: true
                }
            });
        } else {
            this.setState({
                currentPage: this.state.trace[0]
            });
        }
    }

    render() {
        let curPage = this.state.currentPage;

        return (
            <div style={styles.container}>
              <HeaderBar
                  title={curPage.title}
                  logoutBtn={curPage.logoutBtn}
                  backBtn={curPage.backBtn}
                  backToPreviousPage={this.backToPreviousPage.bind(this)}
                  titleBarBackgroundColor={this.state.currentPage.titleBarBackgroundColor}
                  titleBarTextColor={this.state.currentPage.titleBarTextColor}
                  titleBackImage={this.state.currentPage.titleBackImage}
                  dimemsion={this.state.dimemsion}
                  logout={this.logout.bind(this)}/>
              <Page currentPage={curPage}
                  login={this.login.bind(this)}
                  goTo={this.goTo.bind(this)}
                  activitySelected={this.activitySelected.bind(this)}
                  profile={this.state.profile}/>
              <StatementBar statementClick={this.statementClick.bind(this)} />
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        minHeight: window.innerHeight,
        backgroundColor: '#FCF4E7',
        textAlign: 'center',
        display: 'flex',
        flexFlow: 'column nowrap'
    }
};
