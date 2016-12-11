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


export default class Template extends Component {
    constructor(props) {
        super(props);
        this.onActionSelected();
        this.props.store.enlazar(this, ['location']);
    }
    render = function() { 
        return ( 
            <View>
                <ToolbarAndroid 
                    logo={require('./Icons/ic_language_black_24px.svg')} 
                    title={this.props.store.getState().title}
                    actions={this.actions}
                    style={styles.Toolbar}
                    onActionSelected={this.onActionSelected} />
                <Text>sdf</Text>
            </View> 
        ); 
    }.bind(this);
    onActionSelected = function() {
        if(this.props.store.getState().location === "registro") {
            this.actions=[{title: 'Login', show: 'always', location:"login"}];
        } else {
            this.actions=[{title: 'Registrate', show: 'always', location:"registro"}];
        }
        this.props.store.setState({location:this.actions[0].location});
    }.bind(this);
}
