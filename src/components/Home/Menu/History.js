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
	TouchableOpacity,
	FlatList
} from 'react-native';
import Dimensions from 'Dimensions';

import leftArrow from '../../../images/left-arrow.png';
import HistoryList from './HistoryList';
import axios from 'axios';
import serverURL from '../../../serverURL';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class History extends Component {

  constructor(props) 
  {
  	super(props);

  	this.state = {
  		modalVisible: false,
  		histories: []
  	};

  	this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillMount() {
  	const _this = this;
  		
  	axios.get(serverURL + 'getHistory/' + this.props.id)
  	.then(function(response){
  		_this.setState({histories: response.data});
  	})
  	.catch(function(error){
		console.log(error);
  	})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
					<Image  style={{width: 15, height: 15}} source={leftArrow} />
				</TouchableOpacity>
          		<Text style={styles.textH1}> Histórico </Text>
          	</View>
          		{ this.state.histories.map(function(a)
				    {	
						return ( <HistoryList key={a.history_id} title={(new Date (a.date.substr(0 , a.date.indexOf("T")))).toLocaleDateString()}>
		          		  <Text>{a.text}</Text>
		          		</HistoryList> ) 
				  	}) 
          		}
          </View>
         </View>
        </Modal>

		<TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
        	<Text>Histórico</Text>
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
	textH1: {
		color: 'white',
		fontSize: 21
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