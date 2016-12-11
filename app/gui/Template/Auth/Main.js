"use strict";

import React, { Component } from 'react';
import {
    DrawerLayoutAndroid,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

import styles from "./Styles/Styles.js";

export default class TAuth extends Component {
    constructor(props) {
        super(props);
    }
    render = function() {
        var navigationView = ( 
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    I'm in the Drawer!
                </Text>
            </View> 
        );
        return (
            <DrawerLayoutAndroid 
                drawerWidth={300} 
                drawerPosition={DrawerLayoutAndroid.positions.Left} 
                renderNavigationView={() => navigationView}>
                <ToolbarAndroid 
                    title={this.props.store.getState().title}
                    style={styles.Toolbar}
                    onActionSelected={this.onActionSelected} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
                </View>
            </DrawerLayoutAndroid>
        ); 
    }.bind(this);
}