import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,TouchableHighlight,AsyncStorage} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font,Facebook,Alert} from 'expo';
var {height, width} = Dimensions.get('window');
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
var config = require("../config/index.js");
var ajax = require("../utils/ajax.js");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  
	userRegisteredRes(data){
		if(data.status == 200){
			AsyncStorage.setItem('facebookId', data.userDetails.facebookId);
			this.props.pageChange(1);
		}
	}
  async logIn() {
	  const { type, token } = await Facebook.logInWithReadPermissionsAsync(config.fb.appId, {permissions: ['public_profile',"email","user_photos"]});
	  if (type === 'success') {
		try {
			const response = await fetch(
			"https://graph.facebook.com/me?access_token="+token+"&fields=email,name,picture");
			var userObject = await response.json();
			var userData = {
			  "name": userObject.name,
			  "userId": userObject.id,
			  "email": userObject.email,
			  "thumbnail": userObject.picture && userObject.picture.data && userObject.picture.data.url ?  userObject.picture.data.url : ""
			};
		} catch(e){
			console.error(e);
		}
		ajax.post("/user-check",userData,this.userRegisteredRes.bind(this))
	  }
   }
  render(){
	return (<ImageBackground
        source={require('../images/iquiz-08.png')}
        style={styles.container}>
			<View style={styles.absolutePanel}>
				<Text style={styles.headerText}>IQ</Text>
			</View>
			<View style={styles.panel}>
				<TouchableHighlight onPress={this.logIn.bind(this)} style={styles.touch} underlayColor={'transparent'}>
					<View style={styles.facebook}>					
						<Text style={styles.facebookBtn}> Log in with Facebook</Text>					
					</View>
				</TouchableHighlight>
			</View>
		</ImageBackground>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,	
    width: undefined,
    height: undefined,
	backgroundColor:'transparent',
	paddingBottom:30
  },
  "panel":{
	flex: 1,
	alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerText:{
	fontSize:75,
	color:"white",
	fontFamily:"montserrat-semibold",
		  
	  alignSelf: 'center',
  },
  facebook:{
	height:60,
	width:width -100,
	backgroundColor:"#3b5998",
	alignContent: 'center',
	justifyContent: 'center',
	borderRadius:30
  },
  facebookBtn:{
	fontSize: 16,
	color: "rgb(255,255,255)",
	fontFamily: "montserrat-regular",
	alignSelf: 'center',
	fontWeight:"bold"
  },
  absolutePanel:{
	position: 'absolute',
	height: '100%',
	width: '100%',
	alignContent: 'center',
	justifyContent: 'center'
  },
  touch:{  
	borderRadius:30
  }
});