import constantes from "./config/config";

export default class Auth {
    constructor(store) {
        this.login = function (data) {
            return new Promise((resolve, reject) => {
                var url = store.getState().api + constantes.login;
                fetch(url, {
                    method: 'POST', 
                    headers: { 
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json', 
                    }, 
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((response) => {
                    if(response.success) {
                        store.setState({session: response.session});
                        if(typeof resolve === 'function') {
                            resolve(response);
                        }
                    } else {
                        if(typeof reject === 'function') {
                            reject(response);
                        }
                    }
                })
                .catch((error) => {
                    if(typeof reject === 'function') {
                        reject(response);
                    }
                });
            });
        }.bind(this);
        this.registro = function (data) {
            var url = store.getState().api + constantes.registro;
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST', 
                    headers: { 
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json', 
                    }, 
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((response) => {
                    if(response.success) {
                        store.setState({session: response.session});
                        if(typeof resolve === 'function') {
                            resolve(response);
                        }
                    } else {
                        if(typeof reject === 'function') {
                            reject(response);
                        }
                    }
                })
                .catch((error) => {
                    if(typeof reject === 'function') {
                        reject(response);
                    }
                });
            });
        }.bind(this);
        store.auth = this;
    }
}