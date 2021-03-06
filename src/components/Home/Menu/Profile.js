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

import leftArrow from '../../../images/left-arrow.png';
import axios from 'axios';
import serverURL from '../../../serverURL';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Profile extends Component {

   constructor(props) 
  {
  	super(props);

  	this.state = {
  		modalVisible: false,
  		profile: []
  	};

  	this.setModalVisible = this.setModalVisible.bind(this);
  }

    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillMount() {
  	const _this = this;
  		
  	axios.get(serverURL + 'getProfile/' + this.props.id)
  	.then(function(response){
  		_this.setState({profile: response.data[0]});
  		console.log(response.data)
  	})
  	.catch(function(error){
		console.log(error);
  	})
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
         <View>
			<View>
				<View style={styles.topStyle}>
					<TouchableOpacity 
					onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
					activeOpacity={1} >
						<Image style={{width: 15, height: 15}}  source={leftArrow} />
					</TouchableOpacity>
					<Text style={styles.textH1}> Perfil </Text>
				</View>
				<Text style={styles.label}> Email </Text>
				<TextInput style={styles.input}
					placeholder='Email'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false}
					value={this.state.profile.email}
					placeholderTextColor='white'
					underlineColorAndroid='#F035E0' />
				<Text style={styles.label}> Senha </Text>
				<TextInput style={styles.input}
					placeholder='Senha'
					secureTextEntry={true}
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false}
					value={this.state.profile.password}
					placeholderTextColor='white'
					underlineColorAndroid='#F035E0' />
			</View>

			<TouchableOpacity style={styles.button}
			onPress={this._onPress}
			activeOpacity={1}>
				<Text style={styles.text}>SALVAR ALTERAÇÕES</Text>
			</TouchableOpacity>
			</View>
        </Modal>

		<TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
        	<Text>Perfil</Text>
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
		padding: 10,
		backgroundColor: '#F035E0'
	},
	text: {
		color: 'white'
	},
	textH1: {
		color: 'white',
		fontSize: 21
	},
	label: {
		padding: 10
	},
	input: {
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#000',
		marginTop: 20
	},
	textArea: {
		width: DEVICE_WIDTH - 40,
		height: 100,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 0,
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