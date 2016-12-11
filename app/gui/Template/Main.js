"use strict";

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TAuth from './Auth/Main';
import TNoAuth from './NoAuth/Main';

export default class Templates extends Component {
    constructor(props) {
        super(props);
        this.props.store.enlazar(this, ['session']);
    }
    render = function() { 
        if(typeof this.props.store.getState().session === 'undefined') {
            return (
                <TNoAuth store={this.props.store} />
            );
        } else {
            return (
                <TAuth store={this.props.store} />
            );
        }
    }.bind(this);
}