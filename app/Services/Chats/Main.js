import constantes from './Config/config';

export default class Friends {
    secure = function(fn) {
        if(typeof fn !== 'function') {
            return () => {};
        }
        return fn;
    }
    constructor(store) {
        store.chats = this;
    }
}