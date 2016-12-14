import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    Container: {
        padding: 15,
    },
    UserItem: {
        backgroundColor: "#eee",
        flexDirection: 'row',
        marginBottom: 10,
        height: 30
    },
    UserItemImage: {
        width: 30,
        height:30,
        marginRight: 10
    },
    chatUserContainer: {
        flexDirection: 'column',
        flex: 1
    },
    chatUserMessages: {
        flex: 1,
        backgroundColor: '#eee'
    },
    chatUserInput: {
        height: 40
    },
    chatUserInputText: {
        flex: 1
    }
});

export default styles;