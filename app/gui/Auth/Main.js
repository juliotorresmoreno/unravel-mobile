"use strict";

import React, { Component } from 'react';
import {
    BackAndroid,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

import Chats from "./Components/Chats/Main.js";
import styles from "./Styles/Styles.js";
//import io from 'socket.io-client/socket.io'
//import WebSocket from 'WebSocket';

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
    Page = <Text>Page</Text>;
    constructor(props) {
        super(props);
        //var socket = io('localhost:3001', {jsonp: false});
        //var url = 'ws://www.ecate.cf/chats?token=' + this.props.store.getState().session.token;
        //var url = 'ws://192.168.1.24/chats?token=' + this.props.store.getState().session.token;
        //console.log('intento', utl);
        const ws = new WebSocket('ws://www.ecate.cf');
        //const ws = new WebSocket(url, 'echo-protocol');
        ws.onopen = function() {
            console.log('onopen');
        };
        ws.onmessage = function(e) {
            console.log('onmessage');
        }; 
        ws.onerror = function(e) {
            console.log('onerror');
            console.log(describe(e));
        }; 
        ws.onclose = function(e) {
            //console.log('onclose', e);
        };
        this.goHome(false);
        this.props.store.subscribe(this, ['friends', 'location']);
        this.props.store.friends.get()
            .catch(function(error) {
                console.log(error);
            });
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
    render = function() {
        switch (this.props.store.getState().location) {
            case "chats":
                this.Page = <Chats store={this.props.store} />
                break;
        }
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
                {this.Page}
            </DrawerLayoutAndroid>
        ); 
    }.bind(this);
}