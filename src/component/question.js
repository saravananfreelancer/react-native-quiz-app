import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,TouchableHighlight,AsyncStorage} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font,Facebook,Alert} from 'expo';
var {height, width} = Dimensions.get('window');
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
var config = require("../config/index.js");
var ajax = require("../utils/ajax.js");
import moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Timer extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.questionData,"sadsad")
  	this.state = {
  		options:this.props.questionData.option,
  		selected:-1,
  		showAnwser:false,
  		correct:this.props.questionData.answer,
      question:this.props.questionData.question,
      timeInterval:10
  	}
    this.apiDone = false;
	//this.props.socket.on("quizTiming",function(){
		//console.log(data,"quizTiming");
	//});
  }

  componentWillReceiveProps(newProps){
    //console.log(newProps,"newProps");
    if(newProps.changes == "time") {
      this.setState({"timeInterval":10 - newProps.questionTimer,"break":false,});
    } else if(newProps.changes == "question") {
      this.apiDone = false;
      this.setState({
        "timeInterval":10,
        "break":false,
        options:newProps.questionData.option,
        correct:newProps.questionData.answer,
        question:newProps.questionData.question,
        showAnwser:false,
        selected:-1,
      });
    } else if(newProps.changes == "showAnwser") {
      this.callAPI();
      this.setState({
        showAnwser:true,
        "break":false,
        "timeInterval":newProps.questionTimer,
      })
    } else if(newProps.changes == "break") {
      //console.log("ASdsa break",newProps)
      this.setState({
        "break":true,
        "breakTime":newProps.breakTime
      })
    }
    //console.log(newProps)
  }
  callAPI() {
    if(!this.apiDone){
        this.apiDone = true;
        this.props.userQuizAns({
          "questionNo":1,
          "isAnswerCorrect":this.state.selected == this.state.correct ? true:false
        })
    }

  }
  clickHandler(index){
    console.log(index);
    this.setState({"selected":index});
  }
  buttonController(data,index){
	if(this.state.showAnwser){
		if(this.state.correct == index){
		  return (<View elevation ={3} key={index} style={styles.correctans}><Text style={styles.ansText}>{data}</Text></View>)
		} else if(this.state.selected == index){
		  return (<View elevation ={3} key={index} style={styles.wrongans}><Text style={styles.ansText}>{data}</Text></View>)
		} else {
			return (<View elevation ={3} key={index} style={styles.unanswer}><Text style={styles.ansTextAns}>{data}</Text></View>)
		}
	} else {
		if(this.state.selected == index){
		    return (<View elevation ={3} key={index} style={styles.answered}>
          <TouchableHighlight onPress={this.clickHandler.bind(this,index)}>
            <Text style={styles.ansText}>{data}</Text>
          </TouchableHighlight>
        </View>)
		} else {
		    return (<View elevation ={3} key={index} style={styles.unanswer}>
        <TouchableHighlight onPress={this.clickHandler.bind(this,index)}>
          <Text style={styles.ansTextAns}>{data}</Text>
        </TouchableHighlight>
        </View>)
		}
	}

  }
  componentDidMount(){
    if(this.refs && this.refs.circularProgress){
      this.refs.circularProgress.performLinearAnimation(100, 10000);
    }

  }
  render(){
	  var _this = this;
	return (<ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
			<View style={styles.header}>
				<View><Text style={styles.headerText}>IQ</Text></View>
			</View>
			<View style={styles.panel}>
          {
            this.state.break?
            (<View>
              <View style={styles.breakTimerBox}><Text style={styles.breakTimerText}>{this.state.breakTime}</Text></View></View>):(<View style={styles.panelInner}>
    					<View style={styles.referal}>
    					</View>
    					<View style={styles.questionHeader}>
    						<View style={styles.absolute}><Text style={styles.onlineTxt}>Online</Text><Text style={styles.onlinUser}>0 users</Text></View>
                <View style={styles.absolute}>
                    <View style={styles.headerTextCenter}>
          							<ImageBackground
          							source={require('../images/circle.png')}
          							style={styles.timecnt}>
          								<Text style={styles.counter}>{this.state.timeInterval}</Text>
          							</ImageBackground>
						        </View>
                </View>
    						<View style={styles.absolute}>
    						<Text style={styles.refPointText}>Referal</Text>
    						<Text style={styles.refPoint}>Point: <Text style={styles.colorChange}>143</Text></Text></View>

    					</View>
    					<View style={styles.questionPanelDetais}>
    						<View style={styles.alignTop}>
    							<Text style={styles.quizQuestion}>{this.state.question}</Text>
    						</View>

    						<View style={styles.alignBottom}>
    							{
    								this.state && this.state.options && this.state.options.length > 0 ? this.state.options.map(function(data,indexVal){
    									return _this.buttonController(data,indexVal)
    								}):null
    							}
    						</View>
    						<View style={styles.alignChat} >
    						</View>
    					</View>
    				</View>)
          }

			</View>
		</ImageBackground>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
	backgroundColor:'transparent'
  },
  "panel":{
	flex: .93,
	alignItems: 'center',
    justifyContent: 'center',

  },
  panelInner:{
	backgroundColor:"#ffffff",
	flex: .93,
	width:width - 50,
	borderRadius:10
  },
  "header":{
	flex: .07,
	backgroundColor: 'transparent',
	justifyContent: 'center',
	paddingRight:10,
	paddingLeft:10,
	marginTop: StatusBar.currentHeight + 4
  },
  headerText:{
	fontSize:33,
	color:"white",
	//fontWeight:"bold",
	fontFamily:"montserrat-semibold"
  },
  questionHeader:{
	flex: .04,
  },
  refPointText:{
	alignSelf: 'flex-end',
	marginRight:10,
	fontSize: 14,
	color: "rgb(117,117,117)",
	fontFamily: "montserrat-regular"
  },
  refPoint:{
	alignSelf: 'flex-end',
	marginRight:10,
	fontSize: 14,
	color: "rgb(117,117,117)",
	fontFamily: "montserrat-regular"

  },
  colorChange:{
	color:"black"
  },
  headerTextCenter:{
	  alignSelf: 'center'
  },
absolute:{
	  position: 'absolute',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
	paddingLeft:20
  },
  onlineTxt:{
	fontSize: 14,
	color: "rgb(117,117,117)",
	fontFamily: "montserrat-regular"
  },
  onlinUser:{
	fontSize: 14,
	color: "green",
	fontFamily: "montserrat-regular"
  },
  referal:{
	  height:40
  },
  timecnt:{
    width:100,
	  height:100,
	  justifyContent: 'center',
  },
  counter:{
	fontSize: 30,
	color:"black",
	fontFamily: "montserrat-regular",
	alignSelf: 'center'
  },
  quizQuestion:{
	fontSize: 16,
	color: "rgb(88,89,91)",
	fontFamily: "montserrat-regular",
  },
  questionPanelDetais:{
	  flex: .95,
paddingTop:20,
paddingLeft:20,
paddingRight:20
  },
  answerBtn:{


  },
  answerBtnImg:{
	width: width -100,
	height:50,
	marginTop:10,
      justifyContent: 'center',
        alignContent: 'center',
	alignItems: 'center',
  },
  ansText:{
	fontSize: 16,
	color: "black",
	fontFamily: "montserrat-regular"
  },
  alignTop:{
	flex: .40,
      justifyContent: 'flex-start',
  },
  alignBottom:{
	  flex: .20,
      justifyContent: 'flex-end',
	  alignContent: 'center',
  },
  alignChat:{
	  flex: .40,
      justifyContent: 'flex-end',
	  paddingBottom:30,
      alignContent: 'center',
  },
  unanswer:{
	justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor:"#dddddd",
	  width:width-100,
	  height:50,
	  borderRadius:25,
	  marginBottom:10
  },
  answered:{
	 justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor:"#330555",
	  width:width-100,
	  height:50,
	  borderRadius:25,
	  marginBottom:10
  },
  ansTextAns:{
	fontSize: 16,
	color: "white",
	fontFamily: "montserrat-regular"
  },
  correctans:{
	 justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor:"#028e43",
	  width:width-100,
	  height:50,
	  borderRadius:25,
	  marginBottom:10
  },
  wrongans:{
	 justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor:"#ec3e33",
	  width:width-100,
	  height:50,
	  borderRadius:25,
	  marginBottom:10
  },
  breakTimerBox:{
    backgroundColor:'white',
    width:width - 130,
    height:width - 130,
    borderRadius:(width - 130) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  breakTimerText:{
    color:"black",
    fontSize:60,
    fontWeight:"bold",
    fontFamily: "montserrat-regular"
  }
});
