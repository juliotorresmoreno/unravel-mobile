"use strict";

export default class wss {
    constructor(store) {
        var events = [], ws;
        this.open = function () {
            if(typeof ws === 'undefined') {
                ws = new WebSocket(store.getState().servidorwss);
                ws.onopen = function() {
                    for (let i = 0; i < events.length; i++) {
                        let element = events[i];
                        if(element.event == 'open') {
                            element.fn();
                        }
                    }
                }; 
                ws.onmessage = function(e) {
                    for (let i = 0; i < events.length; i++) {
                        let element = events[i];
                        if(element.event == 'message') {
                            element.fn(e);
                        }
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