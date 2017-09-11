import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Animated,
	Easing,
	Text,
	ToolbarAndroid,
	SwitchAndroid
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Dimensions from 'Dimensions';
import Navigation from './Navigation';
import image1 from '../../images/frase7.jpg';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Home extends Component {
	constructor() {
		super();
	}

	_onPress() {

	}

	render() {
		return (
			<MenuContext style={{ flex: 1 }}>
			  <Navigation />
			  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			  	<Image style={{width: 300, height: 300}} source={image1} />
			  	<TouchableOpacity style={styles.button}
					onPress={this._onPress}
					activeOpacity={1}>
					<Text style={styles.textButton}>INICIAR</Text>
				</TouchableOpacity>
			  </View>
			</MenuContext>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	},
	image: {
		width: 260,
		height: 100,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	},
	textButton: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	button: {
		alignItems: 'center',
		width: DEVICE_WIDTH - 40,
		marginHorizontal: 20,
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
		marginTop: 30
	}
});