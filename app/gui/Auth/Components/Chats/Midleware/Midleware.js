"use strict";

var chatUser = [
    {
        title: 'Videollamada', 
        show: 'always',
        handler: function(store) {
            var state = store.getState();
            store.chats.videollamada(state.chatUser.usuario);
        }
    }
];

export default function Midleware(store) {
    var state = store.getState();
    if (state.status == "chatUser") {
        state.actions = chatUser;
    } else {
        state.actions = [];
    }
}