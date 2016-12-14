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
        this.props.store.subscribe(this, ['chatUserDetail']);
        this.props.store.setState({chatUserDetail: []});
        this.props.store.chats.get({user:this.props.store.getState().chatUser._id})
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });
    }
    renderRow = function(data) {
        var user = this.props.store.getState().chatUser;
        var session = this.props.store.getState().session; 
        if(data.usuario == user.usuario) {
            return (
                <View key={data._id}>
                    <Text style={{textAlign:'right', color: 'blue'}}>{user.nombres + ' ' + user.apellidos}</Text>
                    <Text style={{textAlign:'right'}}>{data.mensaje}</Text>
                </View>
            );
        } else {
            return (
                <View key={data._id}>
                    <Text style={{color: 'blue'}}>{session.nombres + ' ' + session.apellidos}</Text>
                    <Text>{data.mensaje}</Text>
                </View>
            );
        }
    }.bind(this);
    render = function() {
        var chats = this.props.store.getState().chatUserDetail || [];
        var dataSource = this.DataSource.cloneWithRows(chats);
        return (
            <View style={styles.chatUserContainer}>
                <View style={styles.chatUserMessages}>
                    <ListView
                        enableEmptySections={true}
                        style={styles.Container}
                        dataSource={dataSource}
                        renderRow={this.renderRow} />
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
                            onPress={this.onPressSend}
                            title="Send" 
                            color="#841584"/>
                    </View>
                </View>
            </View>
        );
    }.bind(this);
    onPressSend = function() {
        var mensaje = this.state.mensaje;
        var usuario = this.props.store.getState().chatUser.usuario;
        this.props.store.chats.mensaje(usuario, mensaje)
            .then((() => this.setState({mensaje: ''}) ));
    }.bind(this);
};