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
import Alert from "../../../Alert/Main";
import styles from "../Styles/Styles.js";
import constantes from "../config/config";

export default class Registro extends Component {
    state = {
        nombres: '',
        apellidos: '',
        usuario: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    constructor(props) {
        super(props);
    }
    render = function() { 
        return (
            <View style={styles.Container}>
                <TextInput 
                    placeholder="Nombres"
                    onChangeText={(value) => this.setState({nombres:value})}
                    value={this.state.nombres}
                    multiline={false} />
                <TextInput 
                    placeholder="Apellidos"
                    onChangeText={(value) => this.setState({apellidos:value})}
                    value={this.state.apellidos}
                    multiline={false} />
                <TextInput 
                    placeholder="Correo electronico"
                    onChangeText={(value) => this.setState({email:value})}
                    value={this.state.email}
                    multiline={false} />
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
                <TextInput 
                    placeholder="Reescribir contraseña"
                    onChangeText={(value) => this.setState({password_confirmation:value})}
                    value={this.state.password_confirmation}
                    secureTextEntry={true}
                    multiline={false} />
                <Button
                    onPress={this.onPressRegistro}
                    title="Registrate" 
                    color="#841584"/>
            </View>
        ); 
    }.bind(this);
    onPressRegistro = function () {
        var state = this.props.store.getState();
        var data = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            usuario: this.state.usuario,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        this.props.store.auth.registro(data)
            .catch((error) => {
                Alert.error(error);
            });
    }.bind(this);
}