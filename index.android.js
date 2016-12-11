"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Template from "./app/gui/Template/Main";
import store from "./app/store/store";

export default class rwebapp extends Component {
    state = {
        title: "Ecate"
    }
    constructor(props) {
        super(props);
        store.suscribe(this);
    }
    render() {
        return (
            <Template />
        );
    }
}

AppRegistry.registerComponent('rwebapp', () => rwebapp);