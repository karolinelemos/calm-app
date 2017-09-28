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
import tutorial from '../../images/exercicio.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Home extends Component {
	constructor() {
		super();

		this.state = { 
            image: image1,
            button: true,
            message: '',
            count: 6,
            Istext: false, 
            cancelButton: false, 
            stage1: true
        }

        this._onPress = this._onPress.bind(this);
        this._continueApp = this._continueApp.bind(this);
	}

	_onPress() {
		var _t = this;
		var intervalo = setInterval(function() {
    		let a = _t.state.count;
    		a--;
    		_t.setState({count: a, Istext: true,
    			button: false, message: "Respire acompanhando a imagem a seguir."});
		}, 1000);

		setTimeout(function() {
		    clearInterval(intervalo);
		    _t.setState({Istext: false,
    			message: "Concentre-se na sua respiração. Está tudo bem...", cancelButton: true, image: tutorial});
		}, 6000);

		setTimeout(function() {
		    _t.setState({
    			message: "Não deixe seus medos decidirem por você..."});
		}, 10000);

		setTimeout(function() {
		    _t.setState({
    			message: "Lembre-se de coisas boas!"});
		}, 14000);

		setTimeout(function() {
		    _t.setState({
    			message: "Quando se sentir pronto, pressione continuar."});
		}, 18000);
	}

	_continueApp() {
		this.setState({stage1: false});
	}

	render() { 
		return (
			<MenuContext style={{ flex: 1 }}>
			  <Navigation />
			  {this.state.stage1 ?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				  	{!this.state.Istext ? 
				  		<Image style={{width: 300, height: 300}} source={this.state.image} /> 
				  		: <Text style={{fontSize: 24}}> {this.state.count} </Text> }

				  	{this.state.button ? 
					  	<TouchableOpacity style={styles.button}
							onPress={this._onPress}
							activeOpacity={1}>
							<Text style={styles.textButton}>INICIAR</Text> 
						</TouchableOpacity>
					: <Text> {this.state.message} </Text>}

					{this.state.cancelButton ? 
					  	<TouchableOpacity style={styles.button}
							onPress={this._continueApp}
							activeOpacity={1}>
							<Text style={styles.textButton}>CONTINUAR</Text> 
						</TouchableOpacity>
					: null}
				 </View>
			  	: 
			  		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			  			<TouchableOpacity style={styles.button}
							onPress={this._openGalery}
							activeOpacity={1}>
							<Text style={styles.textButton}>GALERIA</Text> 
						</TouchableOpacity>
			  		</View>
			  	}

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