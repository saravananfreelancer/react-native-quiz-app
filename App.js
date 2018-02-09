import React from 'react';
import { StyleSheet, Text, View ,Alert,AsyncStorage} from 'react-native';
import Home from "./src/component/home";
import Login from "./src/component/login";
import Timer from "./src/component/timer";
import Question from "./src/component/question";
import Winner from "./src/component/winner";
import WinnerOrLosser from "./src/component/winnerorlosser";
import { Asset, AppLoading,Font} from 'expo';
var config = require("./src/config/index.js");
import SocketIOClient from 'socket.io-client';
var _ = require("underscore");

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
	state = {
		isReady: false,
		pageState:0
	}
	constructor(props) {
		super(props);
		// Creating the socket-client instance will automatically connect to the server.
	}
  async userDetailsSocketEmiter(){
    try {
			const token = await AsyncStorage.getItem('token');
      const fbId = await AsyncStorage.getItem('facebookId');
			this.socket.emit("userDetails",{"token":token,"facebookId":fbId});
    } catch(e){

    }

  }
  userQuizAns(data){
    console.log("adsadsadsa");
    this.socket.emit("quizResponse",data);
  }
	socketReceiver() {
    this.socket.on("getUserDetais",()=>{
        this.userDetailsSocketEmiter();
    })

    //console.log("sadsa")
  	this.socket.on("quizTiming",function(data){
  		console.log(data,"quizTiming");
  	});
  	this.socket.on("quizGoingToStart",(data) => {
  		this.changeState(2,data);
  	});
    this.socket.on("quizEditMode",(data) => {
        data.mode = 1;
        this.setState({"pageState":3,questionData:data,"changeType":"question"})
        console.log(data,"quizEditMode",new Date());
    });
    this.socket.on("timer",(data) => {
        data.question.mode = data.mode == "quizEditMode" ? 1:0;
        this.setState({"pageState":3,questionData:data.question,"questionTime":data.timer,"changeType":"time"})
    });
    this.socket.on("showAnwserTimer",(data) => {
        data.question.mode = data.mode == "quizEditMode" ? 1:0;
        this.setState({"pageState":3,questionData:data.question,"questionTime":data.counterTime,result:data,"changeType":"showAnwser"})
        //console.log(data,"showAnwserTimer",new Date());
    })
    this.socket.on("showTimerBreak",(data) =>{
        data.question.mode = data.mode == "quizEditMode" ? 1:0;
        this.setState({"pageState":3,questionData:data.question,changeType:"break","breakTime":data.counter});
        //console.log(data,"showTimerBreak",new Date());
    })
    this.socket.on("quizReadMode",(data) => {
        //data = data || {};
        data.mode = 0;
        this.setState({"pageState":3,questionData:data,"changeType":"question"})
        console.log(data,"quizReadMode",new Date());
    });
    this.socket.on("winnerList",(data) => {
      console.log(data.winners,"Winner");
      console.log(this.FBID,"fbID");
        var record = _.where(data.winners,{"facebookId":this.FBID.toString()});
        var winnerLoss = record.length > 0? true:false;
        console.log(winnerLoss,"win")
        this.setState({"pageState":5,"userWinner":winnerLoss,"winnerList":data.winners,"winnerAmount":data.winnerAmount})
    })


	}
	async componentWillMount(){
		try {
			const value = await AsyncStorage.getItem('facebookId');
      this.FBID = value;
			if (value !== null) {
        this.isLogin = true;
        //console.log("asdsadsadsadsadsadsad sadsa d sad  sa d sa")
				this.setState({"pageState":1});
        this.componentRendered();
			} else {
        this.isLogin = false;
				//Alert.alert("nuasdsads",value);
			}
		} catch (error) {
			console.log(error);
		}
  }
  componentRendered(){
    //console.log("asdsa dsadsad sadsa d sad sad sa d sad sa ddsadsadsadsadsad sadsa d sad  sa d sa")
    if(this.isLogin) {
        this.socket = SocketIOClient(config.serverURL);

        this.socketReceiver();
    }
  }
	changeState(pageId,data){
		var stateData = {pageState:pageId};
		if(pageId == 2){
			stateData.timer  = data;
		}
		this.setState(stateData);
	}
	render() {
		if (!this.state.isReady) {
			return (
			<AppLoading
			startAsync={this._loadAssetsAsync}
			onFinish={() => this.setState({ isReady: true })}
			onError={this.errorApploading}
			/>);
		} else if(this.state.pageState == 0){
			return <Login pageChange={this.changeState.bind(this)}/>
		} else if(this.state.pageState == 1){
			return <Home socket={this.socket} pageChange={this.changeState.bind(this)}/>
		} else if(this.state.pageState == 2){
			return <Timer pageChange={this.changeState.bind(this)} timer={this.state.timer}/>
		} else if(this.state.pageState == 3){
			return <Question questionTimer={this.state.questionTime} userQuizAns={this.userQuizAns.bind(this)} breakTime={this.state.breakTime} changes={this.state.changeType} questionData={this.state.questionData} pageChange={this.changeState.bind(this)}/>
		} else if(this.state.pageState == 4){
      return <Winner winnerList={this.state.winnerList} winnerAmount ={this.state.winnerAmount} pageChange={this.changeState.bind(this)}  />
    } else if(this.state.pageState == 5){
      return <WinnerOrLosser isWinner = {this.state.userWinner} winnerAmount={this.state.winnerAmount} pageChange={this.changeState.bind(this)}/>
    }
	}
	errorApploading(err) {
		console.log(err,"app loading")
	}
	async _loadAssetsAsync() {
		console.log("_loadAssetsAsync");
		const fontAssets = cacheFonts([{
		'montserrat-regular': require('./src/fonts/Montserrat-Regular.ttf'),
		'montserrat-semibold': require('./src/fonts/Montserrat-SemiBold.ttf')
		}]);
		await Promise.all([...fontAssets]);
	}


}
