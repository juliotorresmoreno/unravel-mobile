"use strict";

import React, { Component } from 'react';
import {
    Button,
    Image,
    ListView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import styles from "../Styles/Styles.js";
import ChatUser from "./ChatUser";

export default class Users extends Component {
    state = {name:"Users"};
    constructor(props) {
        super(props);
        this.props.store.subscribe(this, ['status']);
        this.DataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }
    renderRow = function(data) {
        return (
            <TouchableOpacity onPress={this.onPressUser}>
                <View style={styles.UserItem} key={data._id} user={data}>
                    <Image
                        style={styles.UserItemImage}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                    <Text>{data.nombres + ' ' + data.apellidos}</Text>
                </View>
            </TouchableOpacity>
        );
    }.bind(this);
    render = function() {
        var friends = this.props.store.getState().friends || [];
        var dataSource = this.DataSource.cloneWithRows(friends);
        switch (this.props.store.getState().status) {
            case "chatUser":
                return <ChatUser store={this.props.store} />;
            default:
                return (
                    <View>
                        <ListView
                            enableEmptySections={true}
                            style={styles.Container}
                            dataSource={dataSource}
                            renderRow={this.renderRow} />
                    </View>
                );
        }
    }.bind(this);
    onPressUser = function(e) {
        var target = e._targetInst._currentElement.props.children[0];
        this.props.store.setState({
            status: "chatUser",
            chatUser: target.props.user
        });
    }.bind(this);
    goBack = function() {
        return true;
    }
};