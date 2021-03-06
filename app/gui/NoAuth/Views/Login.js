"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ToolbarAndroid,
    Text, TextInput,
    Button,
    View
} from 'react-native';

import styles from "../Styles/Styles";
import constantes from "../config/config";

export default class Login extends Component {
    state = {
        usuario: 'jtorres',
        password: 'jtorres'
    };
    constructor(props) {
        super(props);
    }
    render = function() { 
        return (
            <View style={styles.Container}>
                <TextInput 
                    placeholder="Usuario"
                    onChangeText={(value) => this.setState({usuario:value})}
                    value={this.state.usuario}
                    multiline={false} />
                <TextInput 
                    placeholder="Contraseña"
                    onChangeText={(value) => this.setState({password:value})}
                    value={this.state.password}
                    secureTextEntry={true}
                    multiline={false} />
                <Button
                    onPress={this.onPressLogin}
                    title="Ingresar" 
                    color="#841584"/>
            </View>
        ); 
    }.bind(this);
    onPressLogin = function () {
        var state = this.props.store.getState();
        var data = {
            usuario: this.state.usuario,
            passwd: this.state.password
        };
        this.props.store.auth.login(data)
            .catch((error) => {
                this.props.store.alert.error(error);
            });
    }.bind(this);
}