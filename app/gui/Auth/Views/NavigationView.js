"use strict";

import React, { Component } from 'react';
import { Text, View } from 'react-native';


export default class NavigationView extends Component {
    constructor(props) {
        super(props);
    }
    render = function () {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    I'm in the Drawer!
                </Text>
            </View>
        );
    }
}