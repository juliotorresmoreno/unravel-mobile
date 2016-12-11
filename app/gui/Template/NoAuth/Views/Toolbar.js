"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

export default class Template extends Component {
    actions=[{title: 'Settings', show: 'always'}];
    constructor(props) {
        super(props);
    }
    render = function() { 
        return (
            <ToolbarAndroid 
                logo={require('./Icons/ic_language_black_24px.svg')} 
                title="AwesomeApp"
                actions={this.actions}
                style={ {height: 50} }
                onActionSelected={this.onActionSelected} />
        ); 
    }.bind(this);
    onActionSelected = function(position) {
        if (position === 0) {
            
        } 
    }.bind(this);
}