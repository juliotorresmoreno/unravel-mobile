"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Template from "./app/gui/Template/Main";
import Store from "./app/Store/Store";
import Auth from "./app/Services/Auth/Main";
import config from "./app/config/config";

export default class rwebapp extends Component {
    constructor(props) {
        super(props);
        this.store = new Store(config);
        this.store.addService(Auth);
    }
    render = function() {
        return <Template store={this.store}/>
    }.bind(this);
}

AppRegistry.registerComponent('rwebapp', () => rwebapp);