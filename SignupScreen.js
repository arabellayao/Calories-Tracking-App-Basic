import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
  NavigationContainer,
  HeaderNavigationBar,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import base64 from 'base-64';

export default class SignupScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      }
      this.handleSignup = this.handleSignup.bind(this);
    }
  
    handleSignup() {
      var obj = {};
      obj.username = this.state.username;
      obj.password = this.state.password;
      
      fetch('https://mysqlcs639.cs.wisc.edu/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
            .then(response => {
                if (response.message !== "User created!") {
                    alert(JSON.stringify(response.message));
                }
                else {
                    alert(JSON.stringify(response.message));
                    this.props.navigation.navigate("Login");
                }
            })
    }
  
    render() {
      return (
        <View>
          <Text>{`\n\nThis is sign up screen.\n\n`}</Text>
          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({username: text})}
          placeholder="Username">
          </TextInput>
          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({password: text})}
          placeholder="Password">
          </TextInput>
          <Button title="Sign Up" onPress={this.handleSignup}></Button>
          <Button title="Go to log in" onPress={() => this.props.navigation.navigate("Login")}></Button>
        </View>
      )
    }
  }