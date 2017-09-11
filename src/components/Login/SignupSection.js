import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import NewAccount from './NewAccount';

export default class SignupSection extends Component {
	_onPress() {
		Actions.newAccount();
	}

	render() {
		return (
			<View style={styles.container}>
				<NewAccount/>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
});
