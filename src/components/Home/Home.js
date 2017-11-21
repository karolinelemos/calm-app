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
	SwitchAndroid,
	TextInput
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Dimensions from 'Dimensions';
import Navigation from './Navigation';
import image1 from '../../images/frase7.jpg';
import tutorial from '../../images/exercicio.gif';
import image2 from '../../images/frase2.jpg';
import serverURL from '../../serverURL';
import axios from 'axios';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = { 
            image: image1,
            button: true,
            message: '',
            count: 6,
            Istext: false, 
            cancelButton: false, 
            stage1: true,
            history: '', 
            errorMessage: null
        }

        this._onPress = this._onPress.bind(this);
        this._continueApp = this._continueApp.bind(this);
        this._saveHistory = this._saveHistory.bind(this);
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

	_saveHistory() {
		const _this = this;
		_this.setState({errorMessage: null});

		if(this.state.errorMessage)
		{
			axios.post(serverURL + 'saveHistory', {
			    date: new Date(),
			    text: this.state.history,
			    user_id: this.props.id
			  })
			  .then(function (response) {
			   	_this.setState({errorMessage: 'Mensagem salva com sucesso!'});
			  })
			  .catch(function (error) {
			   _this.setState({errorMessage: 'Ocorreu um erro interno. Tente novamente.'});
			});
		} else {
			_this.setState({errorMessage: 'Digite a mensagem.'});
		}
	}

	render() { 
		return (
			<MenuContext style={{ flex: 1, paddingTop: 20 }}>
			  <Navigation id={this.props.id}/>
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
			  			<Image style={{width: 200, height: 200}} source={image2} />
			  			<Text style={{paddingLeft: 20, paddingRight: 20}}>Como você está se sentindo? 
			  			Consegue identificar o que fez com que você se sentisse mal?
			  			Converse com você.</Text>
			  			<TextInput style={styles.textArea}
							placeholder='Descrição'
							autoCapitalize={'none'}
							returnKeyType={'done'}
							multiline = {true}
							numberOfLines = {10}
							autoCorrect={false}
							onChangeText={(history) => this.setState({history})}
							placeholderTextColor='white'
							underlineColorAndroid='#F035E0' />
			  			<TouchableOpacity style={styles.button}
							onPress={this._saveHistory}
							activeOpacity={1}>
							<Text style={styles.textButton}>RELATAR</Text> 
						</TouchableOpacity>
						{
							this.state.errorMessage ?
							<Text>{this.state.errorMessage}</Text>
							: null
						}
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
	textArea: {
		width: DEVICE_WIDTH - 40,
		height: 100,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 0,
		color: '#000'
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