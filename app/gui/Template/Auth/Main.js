"use strict";

import React, { Component } from 'react';
import {
    BackAndroid,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    Text,
    View
} from 'react-native';

import Users from "./Views/Users.js";
import styles from "./Styles/Styles.js";

export default class TAuth extends Component {
    Page = <Text>Page</Text>;
    constructor(props) {
        super(props);
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
    componentDidMount = function() { 
        this.mounted = true;
    }.bind(this);
    componentWillUnmount = function() {
        this.mounted = false;
        this.unsubscribe();
    }.bind(this);
    goHome = function (update) {
        this.props.store.setState({location: 'chats', status: ''}, update);
    }.bind(this);
    render = function() {
        switch (this.props.store.getState().location) {
            case "chats":
                this.Page = <Users store={this.props.store} />
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