import React, { Component, PropTypes } from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {Text, KeyboardAvoidingView} from 'react-native';

export default class LoginScreen extends Component {
		constructor(props) {
			super(props);

			this.state = {
				email: '',
				password: ''
			}

			this.updateState = this.updateState.bind(this);
		}

		updateState (a) {
			const email = a.email;
			const password = a.password;

        	if(email)
        	{
        		this.setState({email: email})
        	} else {
				this.setState({password: password})
        	} 	
    	}

		render() {
			return (
				<Wallpaper>
					<Logo  />
					<Form updateParentState={this.updateState} />
					<SignupSection/>
					<ButtonSubmit formValue={this.state} />
				</Wallpaper>
			);
	}
}
