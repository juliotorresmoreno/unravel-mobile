"use strict";

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Template from "./app/gui/Main";
import Store from "./app/Store/Store";
import config from "./app/config/config";

// Services
import Auth from "./app/Services/Auth/Main";
import Friends from "./app/Services/Friends/Main";
import Chats from "./app/Services/Chats/Main";
import Alert from "./app/Services/Alert/Main";
import Wss from "./app/Services/WebSocket/Main";

export default class rwebapp extends Component {
    constructor(props) {
        super(props);
        this.store = new Store(config);
        this.store.addService(Wss);
        this.store.addService(Auth);
        this.store.addService(Friends);
        this.store.addService(Chats);
        this.store.addService(Alert);
        console.disableYellowBox = true;
    }
    render = function() {
        return <Template store={this.store}/>
    }.bind(this);
}

AppRegistry.registerComponent('rwebapp', () => rwebapp);