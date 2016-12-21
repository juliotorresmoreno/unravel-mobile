"use strict";

import React, { Component } from 'react';
import { Button, Image, ListView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from "./Styles/Styles.js";
import ChatUser from "./Views/ChatUser";
import Users from "./Views/Users";

export default class Chats extends Component {
    constructor(props) {
        super(props);
    }
    render = function() {
        switch (this.props.store.getState().status) {
            case "chatUser":
                return <ChatUser store={this.props.store} />;
            default:
                return <Users store={this.props.store} />;
        }
    }.bind(this);
};