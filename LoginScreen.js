import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
  NavigationContainer,
  HeaderNavigationBar,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import base64 from 'base-64';


export default class LoginScreen extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      }
      this.handleLogin = this.handleLogin.bind(this);
    }
  
    handleLogin() {
      fetch('https://mysqlcs639.cs.wisc.edu/login', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
        }
      })
        .then(response => response.json())
          .then(response => {
            if (response.token) {
            // log in
            // define callback function
            this.props.login(this.state.username, response.token);
            }
            else {
                alert("Username or password is incorrect");
            } 
          })
          .catch(error => {
              alert("Username does not exist");
          })
        
    }
  
    render() {
      return (
        <View>
          <Text>{`\n\nThis is login screen.\n\n`}</Text>
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
          <Button title="Log in" onPress={this.handleLogin}></Button>
          <Button title="Sign up" onPress={() => this.props.navigation.navigate("Signup")}></Button>
        </View>
      )
    }
  }