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
                var url = store.getState().api + constantes.list;
                fetch(url, {method: 'GET'})
                    .then((response) => response.json())
                    .then((response) => {
                        if(response.success) {
                            store.setState({friends: response.data});
                            this.secure(resolve)(response);
                        } else {
                            this.secure(reject)(response);
                        }
                    })
                    .catch((error) => this.secure(reject)(error));
            });
        }.bind(this);
        store.friends = this;
    }
}