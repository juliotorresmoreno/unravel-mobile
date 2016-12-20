import constantes from "./Config/config";

export default class Auth {
    secure = function(fn) {
        if(typeof fn !== 'function') {
            return () => {};
        }
        return fn;
    }.bind(this);
    constructor(store) {
        var jsonToUrlEncode = function(data) {
            var resp = [];
            for(var i in data) {
                if(data.hasOwnProperty(i)) {
                    resp.push(i + "=" + data[i]);
                }
            }
            return resp.join("&");
        }
        this.login = function (data) {
            return new Promise((resolve, reject) => {
                var url = store.getState().api + constantes.login;
                var body = jsonToUrlEncode(data);
                fetch(url, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                    body: body
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
                    this.secure(reject)({
                        error:"Ocurrio un error en la red"
                    });
                });
            });
        }.bind(this);
        this.registro = function (data) {
            var url = store.getState().api + constantes.registro;
            var body = jsonToUrlEncode(data);
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                    body: body
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
                    this.secure(reject)({error:"Ocurrio un error en la red"});
                });
            });
        }.bind(this);
        store.auth = this;
    }
}