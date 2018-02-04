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
  }
  render(){
	return (<ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
			<View style={styles.header}>
				<View><Text style={styles.headerText}>IQ</Text></View>
			</View>
			<View style={styles.panel}>
				<View style={styles.panelInner}>
					<View style={styles.referal}>
					</View>
					<View style={styles.questionHeader}>
						<View style={styles.absolute}><Text style={styles.onlineTxt}>Online</Text><Text style={styles.onlinUser}>0 users</Text></View>
						<View style={styles.absolute}><View style={styles.headerTextCenter}>
							<ImageBackground
							source={require('../images/circle.png')}
							style={styles.timecnt}>
								<Text style={styles.counter}>8</Text>
							</ImageBackground>
						</View></View>			
						<View style={styles.absolute}>
						<Text style={styles.refPointText}>Referal</Text>
						<Text style={styles.refPoint}>Point: <Text style={styles.colorChange}>143</Text></Text></View>
		
					</View>
					<View style={styles.questionPanelDetais}>
						<View style={styles.alignTop}>
							<Text style={styles.quizQuestion}>How Old are you</Text>
						</View>
						
						<View style={styles.alignBottom}>
							
							<ImageBackground
								source={require('../images/iquiz-55.png')}
								style={styles.answerBtnImg}>
									<Text style={styles.ansText}>111</Text>
							</ImageBackground>
							<ImageBackground
								source={require('../images/iquiz-55.png')}
								style={styles.answerBtnImg}>
									<Text style={styles.ansText}>111</Text>
							</ImageBackground>
							<ImageBackground
								source={require('../images/iquiz-55.png')}
								style={styles.answerBtnImg}>
									<Text style={styles.ansText}>111</Text>
							</ImageBackground>
						</View>
					</View>
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
	flex: .05, 
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
paddingTop:60,
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
	flex: .50,
      justifyContent: 'flex-start',
  },
  alignBottom:{	  
	  flex: .50,
      justifyContent: 'flex-end',
	  paddingBottom:30,
	  
        alignContent: 'center',
  }
});