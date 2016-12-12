"use strict";

import React, { Component } from 'react';
import { Alert } from 'react-native';

export default class Msg {
    constructor(store) {
        store.alert = this;
    }
    error = function (errores) {
        var error = [];
        for(var i in errores) {
            if(errores.hasOwnProperty(i)) {
                if(typeof errores[i] == 'string' && errores[i].trim() != '') {
                    error.push(errores[i]);
                } else {
                    if(typeof errores[i] == 'object') {
                        for(var j = 0; j < errores[i].length; j++) {
                            error.push(errores[i][j]);
                        }
                    }
                }
            }
        }
        Alert.alert('Error', error.join('\n'));
    }.bind(this);
};