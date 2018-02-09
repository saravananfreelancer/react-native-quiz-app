import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,TouchableHighlight,AsyncStorage,ScrollView} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font,Facebook,Alert} from 'expo';
var {height, width} = Dimensions.get('window');
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
var config = require("../config/index.js");
var ajax = require("../utils/ajax.js");
import moment from 'moment';

export default class Winner extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      "amount":this.props.winnerAmount,
      "winners":this.props.winnerList
    }
  }
navigateHome(){
  this.props.pageChange(1);
}

  render(){
    var _this = this;
	return (<ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
			<View style={styles.header}>
				<View style={styles.absolute}><Text style={styles.headerText}>IQ</Text></View>
        <View style={styles.absolute}><Text onPress={this.navigateHome.bind(this)} style={styles.headerTextHelp}><Ionicons name="md-home" size={33} color="white"/></Text></View>
			</View>
      <View style={styles.winnerIcon}>
            <Image
            source={require('../images/winner.png')}>
            </Image>
      </View>
      <View style={styles.panel}>
          <ScrollView>
        {
            this.state.winners && this.state.winners.length > 0 ? this.state.winners.map(function(winner,index){
                return (<View key={index}><View style={styles.userPanel}>
                  <View style={styles.absoluteProfile}>
                  <View style={styles.profileNameContainer}>
                      <Image source={{uri:winner.image}} style={styles.profileImage}></Image>
                  </View>
                  <View style={styles.profileNameContainer}>
                      <Text style={styles.profileName}>{winner.Username}</Text>
                  </View>
                </View>
                <View style={styles.absoluteProfile}>
                  <Text style={styles.profilePrize}>{_this.state.amount} $</Text></View>
                </View></View>)
            }):null
        }
        </ScrollView>
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
	   flex: 5,

	   alignItems: 'center',
     justifyContent: 'flex-start'
  },
  winnerIcon:{
    alignItems: 'center',
    marginBottom:15,
      marginTop:15
  },
  "header":{
	flex: .4,
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
  userPanel:{
	width:width,
	height:60,
	alignItems: 'center'
  },
  absolute:{
	  position: 'absolute',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
	paddingLeft:20
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
  profileImage:{
	width:50,
	height:50,
	borderRadius:25,
  marginRight:10,
  marginLeft:20
  },
  profileName:{
	fontSize: 20,
	color: "rgb(255,255,255)",
	fontWeight:"bold",
	fontFamily: "montserrat-regular",
	paddingLeft:80
  },
  profilePrize:{
	  fontSize: 20,
	  color: "rgb(255,255,255)",
	  fontFamily: "montserrat-regular",
	  fontWeight: "bold",
	  alignSelf: 'flex-end',
    marginRight:20
  },
  headerTextHelp:{
	  alignSelf: 'flex-end',
	  marginTop:10
  },
});
