import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	TextInput,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImg  from '../../images/eye_black.png';

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showPass: true,
			press: false,
			email: '', 
		    password: '', 
		};

		this.showPass = this.showPass.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	componentWillMount() {
		this.props.updateParentState('filhoww');
	}

	changeEmail(email) {
		this.setState({email: email});
		this.props.updateParentState({email: this.state.email});
	}

	changePassword(password) {
		this.setState({password: password})
		this.props.updateParentState({password: this.state.password});
	}

	showPass() {
  		this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
  	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding'
				style={styles.container}>
				<View style={styles.inputWrapper}>
					<Image source={usernameImg}
						style={styles.inlineImg} />
					<TextInput style={styles.input}
						placeholder='Email'
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false} 
						onChangeText={(email) => this.props.updateParentState({email: email})}
						placeholderTextColor='white'
						underlineColorAndroid='transparent' />
				</View>
				<View style={styles.inputWrapper}>
					<Image source={passwordImg}
						style={styles.inlineImg} />
					<TextInput style={styles.input}
						secureTextEntry={this.state.showPass}
						placeholder='Senha'
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false} 
						onChangeText={(password) => this.props.updateParentState({password: password})} 
						placeholderTextColor='white'
						underlineColorAndroid='transparent' />
				</View>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.btnEye}
					onPress={this.showPass}
				>
					<Image source={eyeImg} style={styles.iconEye} />
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btnEye: {
    position: 'absolute',
    top: 65,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	},
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});
