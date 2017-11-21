import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../../images/loading.gif';
import axios from 'axios';
import serverURL from '../../serverURL';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			errorMessage: null
		};

		
		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		const _this = this, 
		email = this.props.formValue.email, 
		password = this.props.formValue.password;

		_this.setState({errorMessage: null});

		if(email && password)
		{		
	    	axios.post(serverURL + 'verifyLogin', {
			    email: email,
			    password: password
			  })
			  .then(function (response) {
			    if(response.data) {
			    	setTimeout(() => {
						_this._onGrow();
					}, 2000);

			    	/* 
					setTimeout(() => {
						Actions.home('teste');
						_this.setState({ isLoading: false });
						_this.buttonAnimated.setValue(0);
						_this.growAnimated.setValue(0);
					}, 2300); */

					Actions.home(response.data);
					_this.setState({ isLoading: false });
					_this.buttonAnimated.setValue(0);
					_this.growAnimated.setValue(0);
			    } else {
			    	_this.setState({ isLoading: false });
			    	_this.setState({errorMessage: 'Usuário ou senha inválidos.'});
			    	_this.setState({ isLoading: false });
					_this.buttonAnimated.setValue(0);
					_this.growAnimated.setValue(0);
			    }
			  })
			  .catch(function (error) {
			   	_this.setState({errorMessage: 'Erro interno.'});
			  	_this.setState({ isLoading: false });
				_this.buttonAnimated.setValue(0);
				_this.growAnimated.setValue(0);
			});
		} else 
		{
				_this.setState({errorMessage: 'Digite os dados de login.'});
			  	_this.setState({ isLoading: false });
				_this.buttonAnimated.setValue(0);
				_this.growAnimated.setValue(0);
		}

	}

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View>
				<View style={styles.container}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							onPress={this._onPress}
							activeOpacity={1} >
								{this.state.isLoading ?
									<Image source={spinner} style={styles.image} />
									:
									<Text style={styles.text}>ENTRAR</Text>
								}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
				</View>
				<View>
				{
					this.state.errorMessage ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> : null
				}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: -95,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	errorMessage: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white',
		justifyContent: 'center'
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F035E0',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});
