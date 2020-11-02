import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
    NavigationContainer,
    HeaderNavigationBar,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import base64 from 'base-64';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            goalDailyActivity: 0.0,
            goalDailyCalories: 0.0,
            goalDailyCarbohydrates: 0.0,
            goalDailyFat: 0.0,
            goalDailyProtein: 0.0,
            lastName: ""
        }
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'GET',
            headers: {
                'x-access-token': this.props.token
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    firstName: response.firstName || "", 
                    lastName: response.lastName || "",
                    goalDailyActivity: response.goalDailyActivity || 0.0,
                    goalDailyCalories: response.goalDailyCalories || 0.0,
                    goalDailyCarbohydrates: response.goalDailyCarbohydrates || 0.0,
                    goalDailyFat: response.goalDailyFat || 0.0,
                    goalDailyProtein: response.goalDailyProtein || 0.0
                })
            })

    }

    handleSave() {
        var obj = {};
        obj.firstName = this.state.firstName || "";
        obj.lastName = this.state.lastName || "";
        obj.goalDailyActivity = this.state.goalDailyActivity || "0";
        obj.goalDailyCalories = this.state.goalDailyCalories || "0";
        obj.goalDailyCarbohydrates = this.state.goalDailyCarbohydrates || "0";
        obj.goalDailyFat = this.state.goalDailyFat || "0";
        obj.goalDailyProtein = this.state.goalDailyProtein || "0";

        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
                .then(response => {
                    alert("Profile Updated!")
                })
                .catch(error => {
                    alert("Failed!!!")
                })
    }

    render() {
        return (
            <View>
                <Text>First Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ firstName: text })}
                    value={this.state.firstName}
                    placeholder="First Name">
                </TextInput>
                <Text>Last Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ lastName: text })}
                    value={this.state.lastName}
                    placeholder="Last Name">
                </TextInput>
                <Text>Goal Daily Activity</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ goalDailyActivity: text })}
                    value={this.state.goalDailyActivity + ""}
                    placeholder="0">
                </TextInput>
                <Text>Goal Daily Calories</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ goalDailyCalories: text })}
                    value={this.state.goalDailyCalories + ""}
                    placeholder="0">
                </TextInput>
                <Text>Goal Daily Carbohydrates</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ goalDailyCarbohydrates: text })}
                    value={this.state.goalDailyCarbohydrates + ""}
                    placeholder="0">
                </TextInput>
                <Text>Goal Daily Fat</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ goalDailyFat: text })}
                    value={this.state.goalDailyFat + ""}
                    placeholder="0">
                </TextInput>
                <Text>Goal Daily Protein</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ goalDailyProtein: text })}
                    value={this.state.goalDailyProtein + ""}
                    placeholder="0">
                </TextInput>
                <Button title="Save" onPress={this.handleSave}></Button>
                <Button title="Log out" onPress={() => this.props.logout()}></Button>
            </View>
        )
    }
}