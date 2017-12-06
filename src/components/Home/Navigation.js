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
import Profile from './Menu/Profile'
import History from './Menu/History'
import axios from 'axios';
import serverURL from '../../serverURL';


export default class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
	  		histories: []
  		};
	}

	componentWillMount() 
	{
		
  	
	}

	render() {
		return (
		  <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#F035E0' }}>
		    <View style={{ flex: 1}}>
		    	<Text style={{color: 'white'}}> Calm App</Text>
		    </View>
		    <Menu>
		      <MenuTrigger >
		        <Text style={{ fontSize: 20, color: 'white' }}>&#8942;</Text>
		      </MenuTrigger>
		      <MenuOptions style={{ padding: 10}}>
		       <MenuOption>
		         	<Text></Text>
		        </MenuOption>
		         <MenuOption>
		         	<Text></Text>
		        </MenuOption>
		        <MenuOption>
		         	<Profile id={this.props.id}/>
		        </MenuOption>
		        <MenuOption>
		        	<History id={this.props.id}/>
		        </MenuOption>
		      </MenuOptions>
		    </Menu>
		  </View>
		);
	}
}
