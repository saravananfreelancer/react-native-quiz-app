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

export default class Timer extends React.Component {

  constructor(props) {
    super(props);
	console.log(this.props.timer,"sasa");
	 this.state = {
		 examTime:moment().add(this.props.timer.quizStartIn,"seconds").format("YYYY-MM-DD HH:mm:ss")
	 }
  }
  componentDidMount(){
	 this.diffence();
	 this.TickeTimer = setInterval(function(){
		this.diffence();
	 }.bind(this));
  }
  diffence(oldDate){
	var now = moment().format("YYYY-MM-DD HH:mm:ss");//this.state.currentTime;
	var examTime =  this.state.examTime;
	//console.log(examTime,now);
	var duration = moment.duration(moment(examTime).diff(moment(now)));
	var hours = parseInt(duration.hours());
	var minutes = parseInt(duration.minutes())
	var seconds = parseInt(duration.seconds());
	if( hours == 0 && minutes == 0 && seconds == 0){
		//console.log("ASdas");
		clearInterval(this.TickeTimer);
		//this.
	} else {
		if(hours < 10){
		hours = "0" + hours
		}
		if(minutes < 10){
			minutes = "0" + minutes
		}
		if(seconds < 10){
			seconds = "0" + seconds
		}
		this.setState({"diffTime":hours+":"+ minutes + ":"+ seconds})
		//console.log(hours,minutes,seconds)
	}

  }
  render(){
	return (<ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
			<View style={styles.header}>
				<View><Text style={styles.headerText}>IQ</Text></View>
			</View>
			<View style={styles.panel}>
				<View style={styles.newquiz}>
					<Text style={styles.quizTime}>NEW QUIZ IN</Text>
					<Text style={styles.timer}> {this.state.diffTime}</Text>
				</View>
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
	position: 'absolute',
	height: '100%',
	width: '100%',
	flex: 1,
	alignItems: 'center',
    justifyContent: 'center'
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
  newquiz:{
	backgroundColor:'white',
	width:width - 130,
	height:width - 130,
	borderRadius:(width - 130) / 2,
	alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  quizTime:{
	  fontSize: 20,
	color: "rgb(189,189,189)",
	fontFamily: "montserrat-regular",
	fontWeight: "bold"
  },
  timer:{
	fontSize: 34,
	color: "rgb(54,7,99)",
	fontFamily: "montserrat-regular",
	fontWeight: "bold",
  },
  absolutePanel:{
	position: 'absolute',
	height: '100%',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center'
  },
});
