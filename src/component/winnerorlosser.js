import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,TouchableHighlight,AsyncStorage,ScrollView} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font,Facebook,Alert,LinearGradient} from 'expo';
var {height, width} = Dimensions.get('window');
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
var config = require("../config/index.js");
var ajax = require("../utils/ajax.js");
import moment from 'moment';

export default class WinnerOrLosser extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      "isWinner":this.props.isWinner,
      "winnerAmount":this.props.winnerAmount
    }
  }

  winnerPage(){
    this.props.pageChange(4)
  }
  render(){
    var _this = this;
	return (<ImageBackground
        source={require('../images/landing.png')}
        style={styles.container}>
			<View style={styles.header}>
				<View><Text style={styles.headerText}>IQ</Text></View>
			</View>
      <View style={styles.winnerBox}>
          <ImageBackground elevation ={3} source={require('../images/iquiz-49.png')} style={styles.centerBox}>
                {
                  this.state.isWinner?
                  <View style={styles.congratsContainer}><Text style={styles.congrats}>CONGRATULATIONS</Text></View>:
                  <View style={styles.congratsContainer}><Text style={styles.congrats}>OHH SORRY</Text></View>
                }
                {
                  this.state.isWinner?
                  <View style={styles.youAreContainer}><Text style={styles.youAre}>YOU ARE</Text></View>:
                  <View style={styles.youHaveContainer}><Text style={styles.youAre}>YOU HAVE</Text></View>
                }
                {
                  this.state.isWinner?
                  <View style={styles.winnerLogo}>
                    <Image
                    source={require('../images/winner_page.png')}>
                    </Image>
                  </View>:
                  <View style={styles.lostContainer}><Text style={styles.lostText}>LOST</Text></View>
                }
                {
                    this.state.isWinner?
                    <View style={styles.youWonContainer}><Text style={styles.youWon}>YOU HAVE WON
                    <Text style={styles.darkBlue}> {this.state.winnerAmount}$</Text></Text></View>:
                    <View style={styles.betterLuckContainer}><Text style={styles.betterLuckText}>Better Luck Next Time</Text></View>
                }

                {
                    this.state.isWinner?
                    <View style={styles.shareContainer}>
                      <LinearGradient elevation ={3}
                         colors={['#2c003a', '#360762', '#2c003a']}
                         start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                         style={styles.gradientBox}>
                         <Text
                           style={styles.share}>
                           SHARE
                         </Text>
                       </LinearGradient>
                    </View>:
                    <View>
                        <Image style={styles.imageSize}
                        source={require('../images/iquiz-53.png')}>
                        </Image>
                    </View>
                }
                <View style={styles.contContainer}><Text onPress={this.winnerPage.bind(this)} style={styles.contTxt}>CONTINUE >> </Text></View>
          </ImageBackground>
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
  },
  "header":{
	flex: .1,
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
  winnerBox:{
    flex:.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerBox:{
    flex:.8,
    backgroundColor:"white",
    width:width - 100,
    borderRadius:10
  },
  congratsContainer:{
    marginTop:40,
     alignItems: 'center',
    marginBottom:30
  },
  congrats:{
    fontSize: 20,
  color: "rgb(0,0,0)",
  fontFamily: "montserrat-regular",
  fontWeight: "bold",
  },

  youAreContainer:{
    alignItems: 'center',
    marginBottom:30
  },
  youAre:{
    fontSize: 20,
    color: "rgb(97,97,97)",
    fontFamily: "montserrat-regular"
  },
  winnerLogo:{
      alignItems: 'center',
        marginBottom:10,
  },
  youWonContainer:{
    alignItems: 'center',
      marginBottom:30,
  },
  youWon:{
    fontSize: 18,
    color: "rgb(0,0,0)",
    fontFamily: "montserrat-regular"
  },
  shareContainer:{
    height:60,
    width:width -150,
    alignSelf:"center",
    borderRadius:30,
  },
  gradientBox:{ padding: 15, alignItems: 'center', borderRadius: 30 },
  share:{
      backgroundColor: 'transparent',
      fontSize: 18,
      color: 'rgb(255,255,255)',
      fontFamily: "montserrat-regular",
      fontWeight: "bold"
  },
  contContainer:{
      marginTop:20,
      alignItems: 'center',
  },
  contTxt:{
    fontSize: 20,
    color: "rgb(54,7,99)",
    fontFamily:  "montserrat-regular",
  },
  lostContainer:{
      alignItems: 'center',
  },
  lostText:{
    fontSize: 38,
    color: "rgb(97,97,97)",
    fontFamily: "montserrat-regular",
    fontWeight: "bold"
  },
  youHaveContainer:{
    alignItems: 'center',
    marginBottom:0
  },
  betterLuckContainer:{
    marginTop:30,
    alignItems: 'center'
  },
  betterLuckText:{
    fontSize: 18,
    color: "rgb(0,0,0)",
    fontFamily: "montserrat-regular"
  },
  imageSize:{
     width:100,
     height:100,
     alignSelf:"center"
  },
  darkBlue:{
    color:"#2c003a",
    fontWeight:"bold"
  }
});
