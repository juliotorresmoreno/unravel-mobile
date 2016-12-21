"use strict";

export default function Midleware(state) {
        if (state.status == "chatUser") {
            state.actions = [{title: 'Videollamada', show: 'always'}];
        } else {
            state.actions = [];
        }
}