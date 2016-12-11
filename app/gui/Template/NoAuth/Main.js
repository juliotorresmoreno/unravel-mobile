"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

import styles from "./Styles/Styles.js";
import Login from "./Views/Login.js";
import Registro from "./Views/Registro.js";

export default class TNoAuth extends Component {
    actions=[{title: 'Login', show: 'always', location:"login"}];
    constructor(props) {
        super(props);
        this.onActionSelected();
        this.props.store.enlazar(this, ['location']);
        this.props.store.setState({location:'login'}, false);
    }
    render = function() {
        var location = this.props.store.getState().location;
        var store = this.props.store; 
        return (
            <View>
                <ToolbarAndroid 
                    logo={require('./Icons/ic_language_black_24px.svg')} 
                    title={this.props.store.getState().title}
                    actions={this.actions}
                    style={styles.Toolbar}
                    onActionSelected={this.onActionSelected} />
                    {location === "registro"?<Registro store={store} />:<Login store={store} />}
            </View> 
        ); 
    }.bind(this);
    onActionSelected = function() {
        this.props.store.setState({location:this.actions[0].location});
        if(this.props.store.getState().location === "registro") {
            this.actions=[{title: 'Login', show: 'always', location:"login"}];
        } else {
            this.actions=[{title: 'Registrate', show: 'always', location:"registro"}];
        }
    }.bind(this);
}