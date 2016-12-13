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
        var elementos = [];
        var state = args || {}; 
        this.setState = function (data, update) {
            var list = [];
            for(let i in data) {
                if(data.hasOwnProperty(i) && state[i] != data[i]) {
                    state[i] = data[i];
                    if(update !== false) {
                        for(let j = 0; j < elementos.length; j++) {
                            if(elementos[j].filter.indexOf(i) + 1) {
                                if(list.contains(elementos[j]) == false) {
                                    list.push(elementos[j]);
                                }
                            }
                        }
                    }
                }
            }
            for(var i = 0; i < list.length; i++) {
                if(list[i].item.mounted) {
                    list[i].item.setState({updateAt:new Date()});
                }
            }
        }.bind(this);
        this.getState = function (data) {
            return state;
        }.bind(this);
        this.subscribe = function(elemento, filter) {
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
                for(var i = 0; i < elementos.length; i++) {
                    if(elementos[i] === subscribe) {
                        elementos.slice(i, 1);
                        return;
                    }
                }
            };
            elementos.push(subscribe);
        }.bind(this);
        this.addService = function (service) {
            new service(this);
        }.bind(this);
    }
}