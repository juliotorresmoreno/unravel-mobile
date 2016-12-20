"use strict";

import { Alert } from 'react-native';

export default class wss {
    constructor(store) {
        var events = [], ws;
        this.open = function (token) {
            if(typeof ws === 'undefined' && token) {
                var url = store.getState().servidorwss + '?token=' + token;
                ws = new WebSocket(url);
                ws.onopen = function() {
                    for (let i = 0; i < events.length; i++) {
                        let element = events[i];
                        if(element.event == 'open') {
                            element.fn();
                        }
                    }
                }; 
                ws.onmessage = function(request) {
                    var data = JSON.parse(request.data);
                    switch(data.action) {
                        case "mensaje":
                            var users = [data.usuario, data.usuarioReceptor];
                            var chatUser = store.getState().chatUser;
                            if(chatUser !== undefined && users.indexOf(chatUser.usuario)+1) {
                                var chatUserDetail = [];
                                for(var i = 0; i < store.getState().chatUserDetail.length; i++) {
                                    chatUserDetail.push(store.getState().chatUserDetail[i]);
                                }
                                chatUserDetail.push(data);
                                store.setState({chatUserDetail: chatUserDetail});
                            } else {
                                var friends = [];
                                for(var i = 0; i < store.getState().friends.length; i++) {
                                    friends.push(store.getState().friends[i]);
                                    if (store.getState().friends[i].usuario === data.usuario) {
                                        friends[i].alert = true;
                                    }
                                }
                                store.setState({friends:friends});
                            }
                            break;
                    }
                }; 
                ws.onerror = function(e) {
                    for (let i = 0; i < events.length; i++) {
                        let element = events[i];
                        if(element.event == 'error') {
                            element.fn(e);
                        }
                    }
                }; 
                ws.onclose = function(e) {
                    for (let i = 0; i < events.length; i++) {
                        let element = events[i];
                        if(element.event == 'close') {
                            element.fn(e);
                        }
                    }
                };
            }
        }.bind(this);
        this.bind = function (event, fn) {
            if(typeof event === 'string', typeof fn === 'function') {
                var exists = false;
                for (let i = 0; i < events.length; i++) {
                    let element = events[i];
                    if(element.event == event && element.fn == fn) {
                        exists = true;
                        break;
                    }
                }
                if(exists === false) {
                    events.push({event, fn});
                }
            }
        }
        this.unbind = function (event, fn) {
            if(typeof event === 'string', typeof fn === 'function') {
                for (let i = 0; i < events.length; i++) {
                    let element = events[i];
                    if(element.event == event && element.fn == fn) {
                        events.slice(i, 1);
                        i--;
                    }
                }
            }
        }
        store.conection = this;
    }
}