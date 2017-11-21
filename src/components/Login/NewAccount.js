import React, { Component } from 'react';
import { 
	Modal, 
	Text, 
	TouchableHighlight, 
	View,
	StyleSheet,
	TextInput,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import Wallpaper from './Wallpaper';
import axios from 'axios';
import leftArrow from '../../images/left-arrow.png';
import serverURL from '../../serverURL';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class NewAccount extends Component {

  constructor() {
		super();

		  this.state = {
		    modalVisible: false,
		    email: '', 
		    password: '', 
		    passwordConfirm: '',
		    errorMessage: null
		  }

		this.create = this.create.bind(this);
	}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  create() {
    console.log(this.state);
    var password = this.state.password;
    var psConfirm = this.state.passwordConfirm;
    var _this = this;
    if(password == psConfirm)
    {
    	_this.setState({errorMessage: null});
    	axios.post(serverURL + 'saveUser', {
		    email: this.state.email,
		    password: this.state.password
		  })
		  .then(function (response) {
		    _this.setState({modalVisible: false});
		  })
		  .catch(function (error) {
		   _this.setState({errorMessage: 'Ocorreu um erro interno. Tente novamente.'});
		});

    } else {
    	this.setState({errorMessage: 'Senhas não correspondem'})
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
          >
        <Wallpaper>
         <View>
          <View>
          	<View style={styles.topStyle}>
          		<TouchableOpacity 
				onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
				activeOpacity={1} >
					<Image  style={{width: 15, height: 15}} source={leftArrow} />
				</TouchableOpacity>
          		<Text style={styles.textH1}> Nova conta </Text>
          	</View>
          	<KeyboardAvoidingView behavior='padding'
			style={styles.container}>
	            <TextInput style={styles.input}
					placeholder='Email'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} 
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
					onChangeText={(email) => this.setState({email})} />
				<TextInput style={styles.input}
					placeholder='Senha'
					secureTextEntry={true}
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} 
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
					onChangeText={(password) => this.setState({password})} />
				<TextInput style={styles.input}
					placeholder='Confirmar senha'
					secureTextEntry={true}
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} 
					placeholderTextColor='white'
					underlineColorAndroid='transparent' 
					onChangeText={(passwordConfirm) => this.setState({passwordConfirm})} />

					{
						this.state.errorMessage ?
						<Text style={styles.errorMessage}>{this.state.errorMessage}</Text> 
						: null
					}	

					<TouchableOpacity style={styles.button} onPress={this.create}>
						<Text style={{color: 'white'}}>Criar</Text>
					</TouchableOpacity>

			</KeyboardAvoidingView>
          </View>
         </View>
        </Wallpaper>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text style={{color: 'white'}}>Criar conta</Text>
        </TouchableHighlight>

      </View>

    );
  }
}

const styles = StyleSheet.create({
	topStyle: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start', 
		alignItems: 'center',
		marginLeft: 20
	},
	textH1: {
		color: 'white',
		padding: 20,
		fontSize: 21
	},
	errorMessage: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white',
		justifyContent: 'center'
	},
	input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#000',
		marginTop: 20
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