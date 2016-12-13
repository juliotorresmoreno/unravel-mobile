import constantes from "./Config/config";

export default class Auth {
    secure = function(fn) {
        if(typeof fn !== 'function') {
            return () => {};
        }
        return fn;
    }.bind(this);
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
                        this.secure(resolve)(response);
                    } else {
                        this.secure(reject)(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.secure(reject)({
                        error:"Ocurrio un error en la red"
                    });
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
                        this.secure(resolve)(response);
                    } else {
                        this.secure(reject)(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.secure(reject)({error:"Ocurrio un error en la red"});
                });
            });
        }.bind(this);
        store.auth = this;
    }
}