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

export default class rwebapp extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.almacen = new Store({title: "Ecate"});
        this.almacen.enlazar(this, ["text"]);
    }
    render() {
        return (
            <Template store={this.almacen} />
        ); 
    }
}

AppRegistry.registerComponent('rwebapp', () => rwebapp);