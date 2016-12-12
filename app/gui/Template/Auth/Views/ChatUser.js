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

export default class chatUser extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.DataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.props.store.enlazar(this, ['chatUserDetail']);
        this.props.store.chats.get({user:this.props.store.getState().userChat})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    renderRow = function(data) {
        return (
            <TouchableOpacity onPress={this.onPressUser}>
                <View style={styles.UserItem} key={data._id}>
                    <Image
                        style={styles.UserItemImage}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
                    <Text>{data.nombres + ' ' + data.apellidos}</Text>
                </View>
            </TouchableOpacity>
        );
    }.bind(this);
    render = function() {
        return (
            <View style={styles.chatUserContainer}>
                <View style={styles.chatUserMessages}>
                    <Text>{JSON.stringify(this.props.store.getState().chatUserDetail)}</Text>
                </View>
                <View style={styles.chatUserInput}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput 
                            placeholder="Escribe tu mensaje"
                            onChangeText={(value) => this.setState({mensaje:value})}
                            value={this.state.mensaje}
                            style={styles.chatUserInputText}
                            multiline={false} />
                        <Button
                            onPress={() => {}}
                            title="Send" 
                            color="#841584"/>
                    </View>
                </View>
            </View>
        );
    }.bind(this);
};