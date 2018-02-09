import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ImageBackground,Button,Dimensions,Image,Alert,AsyncStorage,TouchableHighlight,ToastAndroid} from 'react-native';
import Icon from 'react-native-fa-icons';
import { Ionicons } from '@expo/vector-icons';
import { Font,LinearGradient } from 'expo';
var {height, width} = Dimensions.get('window');
var ajax = require("../utils/ajax.js");
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
var moment =require("moment");
import PopupDialog, { SlideAnimation,DialogTitle,DialogButton } from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quizTime: [],
	"username":"",
	"credit":"",
	"imageLink":"../images/cute-profile-pics-for-whatsapp-images.png",
	"price":0,
  "walletOption":[{
      value: 'Paypal',
    }, {
      value: 'PayTM',
    }],
  "emailIdPayPal":"",
  "paytmPhoneNo":"",
  "walletType":"Paypal"
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
  AsyncStorage.setItem('token', data.token);
  this.setState({
		"username":data.userDetails.Username,
		"credit":data.userDetails.creditCount,
    "referralCode":data.userDetails.referralCode,
		"imageLink": data.userDetails.image,
		"price":data.userDetails.price,
		"quizTime":data.quizDetails || []
	})
  }
  changeState(data,quizStart){
	  setTimeout(()=>{
			this.props.pageChange(2,data);
	  },100)
	//console.log(data,quizStart);
  }
  logoutApp(){
    console.log("asdsa");
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('facebookId');
    this.props.pageChange(0);
  }
  clickUserIcon(){
    this.popupDialog.show();
  }
  clickinvite(){
    this.popupDialogInvite.show();
  }
  logoutCancel(){
    this.popupDialog.dismiss();
  }
  showWallet(){
    if(this.state.price > 0){
      this.popupDialogWallet.show();
    } else {
      ToastAndroid.show("You don't have any amout to withdraw", ToastAndroid.SHORT);
    }


  }
  render(){
    var _this = this;
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
						  <TouchableHighlight onPress={this.clickUserIcon.bind(this)}>
                  <Image source={{uri:this.state.imageLink}} style={styles.profileImage}></Image>
              </TouchableHighlight>
					</View>
					<View style={styles.profileNameContainer}>
						<Text onPress={this.clickUserIcon.bind(this)} style={styles.profileName}>{this.state.username}</Text>
						<Text style={styles.profilePoint}>{this.state.credit} points</Text>
					</View>
				</View>
				<View style={styles.absoluteProfile}>
              <Text onPress={this.showWallet.bind(this)} style={styles.walletPrize}>Wallet</Text>
              <Text onPress={this.showWallet.bind(this)} style={styles.profilePrize}>${this.state.price}</Text>
        </View>
			</View>
			<View style={styles.bottomRefal}>
				<Text style={styles.referal}>Get a Referal Code</Text>
				<View style={styles.referalButton}>
        <TouchableHighlight style={styles.clickInvite} onPress={this.clickinvite.bind(this)}>
        <LinearGradient elevation ={3}
           colors={['#2c003a', '#360762', '#2c003a']}

           start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          >
          <Text style={styles.friends}>Invite Friends</Text>
         </LinearGradient>
         </TouchableHighlight>
         </View>
			</View>
		</View>
    <PopupDialog dismiss= {true} width={ width - 75} height = {176}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }} >
        <View style={styles.areYou}>
            <Text style={styles.areYouText}>ARE YOU SURE?</Text>
        </View>
        <View style={styles.aboutTologout}>
            <Text style={styles.aboutTologoutTxt}>You are about to logout</Text>
        </View>
        <View style={styles.LogoutPanel}>
          <View style={styles.logoutBtn} >
            <Text style={styles.logoutBtnTxt} onPress={_this.logoutApp.bind(_this)}>Logout</Text>
          </View>
          <View style={styles.cancelLog} >
              <Text style={styles.cancelLogTxt} onPress={_this.logoutCancel.bind(_this)}>Cancel</Text>
          </View>
        </View>
    </PopupDialog>
    <PopupDialog dismiss= {true} width={ width - 75} height={350}
    ref={(popupDialogInvite) => { this.popupDialogInvite = popupDialogInvite; }} >
        <View style={styles.areYou}>
            <Text style={styles.areYouText}>REFERAL CODE</Text>
        </View>
        <View style={styles.aboutTobonus}>
            <Text style={styles.aboutTologoutTxt}>Here is the referal code you share with your friends and you all can enjoy the bonus credit point!!</Text>
        </View>
        <View style={styles.refCode}>
            <Text style={styles.refCodeTxt}>{this.state.referralCode}</Text>
        </View>
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
        </View>
    </PopupDialog>
    <PopupDialog dismiss= {true} width={ width - 75} height={height - 100}
    ref={(popupDialogWallet) => { this.popupDialogWallet = popupDialogWallet; }} >
        <View style={styles.areYou}>
            <Text style={styles.areYouText}>WALLET MONEY</Text>
        </View>
        <View style={styles.centerBoxImage}>
            <Image source={require('../images/iquiz-47.png')} style={styles.walletMoneyPic}></Image>
        </View>
        <View style={styles.centerBoxImage}>
            <Text style={styles.amountWallet}>${this.state.price}</Text>
        </View>
        <View style={styles.inputBox}>
          <Dropdown
          label='Withdraw By'
          value={"Paypal"}
          data={_this.state.walletOption}
          onChangeText ={(walletType)=> _this.setState({walletType:walletType})} />
          {
            _this.state.walletType == "Paypal"?
            <TextField
                label='Paypal Email Address'
                value={_this.state.emailIdPayPal}
                onChangeText={ (emailIdPayPal) => _this.setState({ emailIdPayPal }) }
              />:
              <TextField
                  label='PayTM Mobile Number'
                  value={_this.state.paytmPhoneNo}
                  onChangeText={ (paytmPhoneNo) => _this.setState({ paytmPhoneNo }) }
                />
        }
        </View>
        <View style={styles.centerBoxImage}>
            <Text style={styles.disclimer}>Please verify that Email address used above is a valid paypal account</Text>
        </View>
        <View style={styles.payPalContainer}>
            <LinearGradient elevation ={3}
               colors={['#2c003a', '#360762', '#2c003a']}
               start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
               style={styles.gradientBox}>
               <Text
                 style={styles.paypal}>
                 {
                     _this.state.walletType == "Paypal"?
                     "CASHOUT WITH PAYPAL":"CASHOUT WITH PAYTM"
                 }

               </Text>
             </LinearGradient>
        </View>
    </PopupDialog>
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
  walletPrize:{
    marginTop:10,
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
  clickInvite:{
  	  height:50,
  	  width:width-75,
  	  borderRadius:25,
  	  alignItems: 'center',
      justifyContent: 'center',
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
},
  areYou:{
    marginTop:25,
    alignItems:"center"
  },
  areYouText:{
    fontSize: 20,
    color: "rgb(0,0,0)",
    fontFamily: "montserrat-regular"
  },
  aboutTologout:{
    marginTop:15,
    alignItems:"center",
    marginBottom:25,
  },
  aboutTobonus:{
    marginTop:15,
    alignItems:"center",
    justifyContent: 'center',
    alignSelf:"center",
    marginBottom:25,
    marginRight:20,
    marginLeft:20
  },
  refCode:{
    marginBottom:20,
    alignSelf:"center",
  },
  refCodeTxt:{
    fontSize: 26,
    color: "rgb(54,7,99)",
    fontFamily: "montserrat-regular",
    fontWeight: "bold"
  },
  aboutTologoutTxt:{
    fontSize: 20,
    color: "rgb(117,117,117)",
    fontFamily: "montserrat-regular",
    alignSelf:"center",
    textAlign: 'center',
  },
  LogoutPanel:{borderTopColor: '#ccc',borderTopWidth: 1,flexDirection: 'row'},
  logoutBtn:{width: "50%",justifyContent: 'center', alignItems:"center",height: 50,borderRightColor: '#ccc',borderRightWidth: 1, borderBottomLeftRadius:9, backgroundColor: 'transparent'},
  cancelLog:{width: "50%", justifyContent: 'center',alignItems:"center",height: 50, borderBottomRightRadius:9, backgroundColor: 'transparent'},
  logoutBtnTxt:{
    fontSize: 20,
    color: "rgb(244,67,54)",
    fontFamily:  "montserrat-regular"
  },
  cancelLogTxt:{
    fontSize: 20,
    color: "rgb(56,142,60)",
    fontFamily: "montserrat-regular"
  },
  shareContainer:{
    height:70,
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
  walletMoneyPic:{
      width:165,
      height:129
  },
  paypal:{
    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'rgb(255,255,255)',
    fontFamily: "montserrat-regular",
    fontWeight: "bold"
  },
  payPalContainer:{
    height:70,
    width:width - 100,
    alignSelf:"center",
    borderRadius:30,
  },
  centerBoxImage:{
    marginTop:15,
    alignItems:"center",
    justifyContent: 'center',
    alignSelf:"center",
  },
  amountWallet:{
    fontSize: 30,
    color:"rgb(97,97,97)",
    fontFamily:"montserrat-regular",
    fontWeight: "bold"
  },
  disclimer:{
  fontSize: 16,
  color: "rgb(117,117,117)",
  fontFamily: "montserrat-regular",
  textAlign:"center"
},
inputBox:{
  width:200,
  alignSelf:"center"
}
});
