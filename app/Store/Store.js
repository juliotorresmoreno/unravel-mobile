Array.prototype.contains = Array.prototype.contains || function(obj)
{
    var i, l = this.length;
    for (i = 0; i < l; i++)
    {
        if (this[i] == obj) return true;
    }
    return false;
};

export default class Store {
    constructor(args) {
        var elementos = {};
        var state = args || {}; 
        this.setState = function (data, update) {
            var list = {};
            for(let i in data) {
                if(data.hasOwnProperty(i) && state[i] != data[i]) {
                    state[i] = data[i];
                    if(update !== false) {
                        for(let j in elementos) {
                            if(elementos.hasOwnProperty(j)) {
                                if(elementos[j].filter.indexOf(i) + 1 || i == "updateAt") {
                                    list[j] = elementos[j];
                                }
                            }
                        }
                    }
                }
            }
            for(var i in list) {
                if(list.hasOwnProperty(i) && list[i].item.mounted) {
                    if(Array.isArray(list[i].item.Midlewares)) {
                        for(var j = 0; j < list[i].item.Midlewares.length; j++) {
                            if(typeof list[i].item.Midlewares[j] == "function") {
                                list[i].item.Midlewares[j](state);
                            }
                        }
                    }
                }
            }
            for(var i in list) {
                if(list.hasOwnProperty(i) && list[i].item.mounted) {
                    list[i].item.setState({updateAt:new Date()});
                }
            }
        }.bind(this);
        this.getState = function (data) {
            return state;
        }.bind(this);
        this.subscribe = function(elemento, filter, key) {
            var subscribe = {item: elemento, filter: filter};
            if(typeof elemento === 'undefined') {
                return;
            }
            if(typeof elemento.componentDidMount == 'function') {
                let componentDidMount = elemento.componentDidMount; 
                elemento.componentDidMount = function() { 
                    this.mounted = true;
                    componentDidMount();
                }.bind(elemento);
            } else {
                elemento.componentDidMount = function() { 
                    this.mounted = true;
                }.bind(elemento);
            }
            if(typeof elemento.componentWillUnmount == 'function') {
                let componentWillUnmount = elemento.componentWillUnmount; 
                elemento.componentWillUnmount = function() { 
                    this.mounted = false;
                    this.unsubscribe();
                    componentWillUnmount();
                }.bind(elemento);
            } else {
                elemento.componentWillUnmount = function() { 
                    this.mounted = false;
                    this.unsubscribe();
                }.bind(elemento);
            }
            elemento.unsubscribe = function() {
                delete elementos[key];
            };
            elementos[key] = subscribe;
        }.bind(this);
        this.addService = function (service) {
            return new service(this);
        }.bind(this);
    }
}