import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,Alert,AsyncStorage} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
var {height, width} = Dimensions.get('window');
var ajax = require("../utils/ajax.js");
var moment =require("moment");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quizTime: [],
	"username":"",
	"credit":"",
	"imageLink":"../images/cute-profile-pics-for-whatsapp-images.png",
	"price":0
	};
	this.loadHomepage();
}
  async loadHomepage(){
		try {
			const value = await AsyncStorage.getItem('facebookId');
			if (value !== null){
				ajax.get("/user/"+value,this.userDetails.bind(this));
			} else {
				//Alert.alert("nuasdsads",value);
			}
		} catch (error) {
			console.log(error);
		}
  }
  userDetails(data){
	console.log("data",data); 
	this.setState({
		"username":data.userDetails.Username,
		"credit":data.userDetails.creditCount,
		"imageLink": data.userDetails.image,
		"price":data.userDetails.price,
		"quizTime":data.quizDetails
	})
  }
  render(){
    return (
      <ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
		
		<View style={styles.header}>
			<View style={styles.absolute}><Text style={styles.headerText}>IQ</Text></View>
			<View style={styles.absolute}><Text style={styles.headerTextHelp}><Ionicons name="md-help-circle" size={33} color="white"/></Text></View>			
		</View>
		<View style={styles.panel}>
			{
				this.state && this.state.quizTime.length > 0?
				<View style={styles.nextGameContainer}><Text style={styles.nextGame}>Next Games</Text></View>:null
			}
			{
				
				this.state && this.state.quizTime.length > 0?this.state.quizTime.map(function(data,index){
					return (<View key={index} style={styles.quiz}>
						<View style={styles.absoluteQuiz}><Text style={styles.quizTime}>{moment(data.quizOn).format("DD/MM h:mmA")}</Text></View>
						<View style={styles.absoluteQuiz}><Text style={styles.quizPrice}>${data.price} price</Text></View>	
					</View>)
				}):null 
			}
		</View>
		<View style={styles.bottom}>
			<View style={styles.userPanel}>
				<View style={styles.absoluteProfile}>
					<View style={styles.profileNameContainer}>
						<Image source={{uri:this.state.imageLink}} style={styles.profileImage}></Image>					
					</View>
					<View style={styles.profileNameContainer}>
						<Text style={styles.profileName}>{this.state.username}</Text>
						<Text style={styles.profilePoint}>{this.state.credit} points</Text>
					</View>
				</View>
				<View style={styles.absoluteProfile}><Text style={styles.profilePrize}>${this.state.price} price</Text></View>	
			</View>
			<View style={styles.bottomRefal}>
				<Text style={styles.referal}>Get a Referal Code</Text>
				<View style={styles.referalButton}><Text style={styles.friends}>Invite Friends</Text></View>	
			</View>
		</View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,	
    width: undefined,
    height: undefined,
	backgroundColor:'transparent'
  },
  absolute:{
	  position: 'absolute',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
	paddingLeft:20
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
  headerTextHelp:{
	  alignSelf: 'flex-end',
	  marginTop:10
  },
  "panel":{
	flex: .70,
	alignItems: 'center',
    justifyContent: 'center'
  },
  quiz:{
	width:width - 50,
	height:68,
	backgroundColor:"white",
	alignItems: 'center',
	marginBottom:5,
	borderRadius:3
  },
  quizTime:{
	fontSize:18,
	color: "#360763",
	fontFamily:"montserrat-semibold"
  },
  quizPrice:{
	alignSelf: 'flex-end',
	color: "#360763",
	fontSize:18,
	fontFamily:"montserrat-semibold"
  },
  absoluteQuiz:{
	  position: 'absolute',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
	paddingLeft:15,	
	paddingRight:15
  },  
  bottom:{
	flex: .3,
	alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImage:{
	width:50,
	height:50,
	borderRadius:25
  },
  userPanel:{
	width:width - 40,
	height:70,
	alignItems: 'center'
  },
  profileName:{
	fontSize: 20,
	color: "rgb(255,255,255)",
	fontWeight:"bold",
	fontFamily: "montserrat-regular",
	paddingLeft:55
  },
  absoluteProfile:{
	position: 'absolute',
	height: '100%',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center',
	paddingLeft:10,	
	paddingRight:10
  },
  profileNameContainer:{
	position: 'absolute',
	height: '100%',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center',
  },
  profilePoint:{
	fontSize: 14,
	color: "rgb(255,255,255)",
	fontFamily: "montserrat-regular",
	paddingLeft:55
  },
  profilePrize:{
	  fontSize: 20,
	  color: "rgb(255,255,255)",
	  fontFamily: "montserrat-regular",
	  fontWeight: "bold",	  
	  alignSelf: 'flex-end',
  },
  referal:{
	fontSize: 16,
	color: "rgb(255,255,255)",
	fontFamily: "montserrat-regular",
  },
  referalButton:{
	  height:50,
	  width:width-75,
	  backgroundColor:"#2e0244",
	  borderRadius:25,
	  alignItems: 'center',
    justifyContent: 'center',
	marginTop:10,
  },
  friends:{
	fontSize: 16,
	color: "rgb(255,255,255)",
	fontFamily: "montserrat-regular"
  },
  bottomRefal:{
	alignItems: 'center',
    justifyContent: 'flex-start'
  },
  nextGameContainer:{
	  marginBottom:10,
	  alignItems: 'flex-start',	  
	  alignSelf: 'flex-start',
	  paddingLeft:25
  },
  nextGame:{
	fontSize: 20,
	color: "rgb(255,255,255)",
	fontFamily: "montserrat-regular",
	fontWeight: "bold",
	alignSelf: 'flex-start',
  }
  
});
