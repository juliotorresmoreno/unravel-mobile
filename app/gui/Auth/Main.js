"use strict";

import React, { Component } from 'react';
import {
    BackAndroid,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

import NavigationView from "./Views/NavigationView";
import Chats from "./Components/Chats/Main.js";
import styles from "./Styles/Styles.js";
import MidlewareChats from "./Components/Chats/Midleware/Midleware";

const describe = function(obj) {
    var result = [];
    for(var i in obj) {
        if(obj.hasOwnProperty(i)) {
            result.push(i);
        }
    }
    return result;
}

export default class TAuth extends Component {
    Midlewares = [
        MidlewareChats
    ];
    constructor(props) {
        super(props);
        this.goHome(false);
        this.props.store.subscribe(this, ['friends', 'location', 'status', 'actions'], "TAuth");
        this.props.store.friends.get()
            .catch(function(error) {
                console.log(error);
            });
        this.props.store.conection.open(this.props.store.getState().session.token);
        BackAndroid.addEventListener('hardwareBackPress', () => {
            var location = this.props.store.getState().location;
            var status = this.props.store.getState().status;
            if (location != 'chats' || status != '') {
                this.goHome();
                return true;
            }
            return false;
        });
    }
    goHome = function (update) {
        this.props.store.setState({location: 'chats', status: ''}, update);
    }.bind(this);
    onActionSelected = function (index) {
        var actions = this.props.store.getState().actions;
        if (typeof actions[index].handler === 'function') {
            actions[index].handler(this.props.store);
        }
    }.bind(this);
    render = function() {
        switch (this.props.store.getState().location) {
            case "chats":
                this.Page = <Chats store={this.props.store} />
                break;
        }
        return (
            <DrawerLayoutAndroid 
                drawerWidth={300} 
                drawerPosition={DrawerLayoutAndroid.positions.Left} 
                renderNavigationView={() => NavigationView}>
                <ToolbarAndroid 
                    title={this.props.store.getState().title}
                    style={styles.Toolbar}
                    actions={this.props.store.getState().actions}
                    onActionSelected={this.onActionSelected} />
                {this.Page}
            </DrawerLayoutAndroid>
        ); 
    }.bind(this);
}