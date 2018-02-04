import React from 'react';
import { StyleSheet, Text, View ,Alert,AsyncStorage} from 'react-native';
import Home from "./src/component/home";
import Login from "./src/component/login";
import Timer from "./src/component/timer";
import Question from "./src/component/question";
import { Asset, AppLoading,Font} from 'expo';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
	
export default class App extends React.Component {
	state = {
		isReady: false,
		pageState:3
	}
	async componentWillMount1(){
		try {
			const value = await AsyncStorage.getItem('facebookId');
			if (value !== null){
				this.setState({"pageState":1});
			} else {
				//Alert.alert("nuasdsads",value);
			}
		} catch (error) {
			console.log(error);
		}
    }
	changeState(pageId){
		this.setState({pageState:pageId});
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
			return <Home pageChange={this.changeState.bind(this)}/>
		} else if(this.state.pageState == 2){
			return <Timer pageChange={this.changeState.bind(this)}/>
		} else if(this.state.pageState == 3){
			return <Question pageChange={this.changeState.bind(this)}/>
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