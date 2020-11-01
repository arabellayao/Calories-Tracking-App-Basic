import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
  NavigationContainer,
  HeaderNavigationBar,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import base64 from 'base-64';
import LoginScreen from './LoginScreen.js'
import SignupScreen from './SignupScreen.js'
import ProfileScreen from './ProfileScreen.js'


const TabNavigation = createBottomTabNavigator();
const LoggedinStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      token: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(name, tok) {
    this.setState({ username: name });
    this.setState({ token: tok });
  }

  logout() {
    this.setState({token: null});
  }

  render() {
    return (
      <NavigationContainer>
        {!this.state.token ? 
        <TabNavigation.Navigator>
          <TabNavigation.Screen
            name="Login"
            children={(props) => <LoginScreen {...props} login={this.login} />} />
          <TabNavigation.Screen
            name="Signup"
            component={SignupScreen} />
        </TabNavigation.Navigator>
        :
        <LoggedinStack.Navigator>
          <LoggedinStack.Screen
            name="Profile"
            children={(props) => <ProfileScreen {...props} username={this.state.username} token={this.state.token} logout={this.logout}/>} />
        </LoggedinStack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
