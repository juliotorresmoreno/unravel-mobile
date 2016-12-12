import constantes from './Config/config';

export default class Friends {
    secure = function(fn) {
        if(typeof fn !== 'function') {
            return () => {};
        }
        return fn;
    }
    constructor(store) {
        this.get = function(params) {
            return new Promise((resolve, reject) => {
                var url = store.getState().api + constantes.list + '/' + params.user;
                fetch(url, {method: 'GET'})
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            store.setState({chatUserDetail: response.data});
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }.bind(this);
            this.mensaje = function(user, mensaje) {
                return new Promise((resolve, reject) => {
                    var url = store.getState().api + constantes.mensaje;
                    var data = { tipo: 'usuario', usuario: user, mensaje: mensaje };
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
                                this.secure(resolve)(response);
                            } else {
                                this.secure(reject)(response);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.secure(reject)(error);
                        });
                });
        }.bind(this);
        store.chats = this;
    }
}