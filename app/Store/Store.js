export default class Store {
    constructor(args) {
        var elementos = [];
        var state = args || {}; 
        this.setState = function (data, update) {
            for(let i in data) {
                if(data.hasOwnProperty(i)) {
                    state[i] = data[i];
                    if(update !== false) {
                        for(let j = 0; j < elementos.length; j++) {
                            if(elementos[j].filter.indexOf(i) + 1) {
                                elementos[j].item.forceUpdate();
                                break;
                            }
                        }
                    }
                }
            }
        }.bind(this);
        this.getState = function (data) {
            return state;
        }.bind(this);
        this.enlazar = function(elemento, filter) {
            elementos.push({item: elemento, filter: filter});
        }.bind(this);
    }
    addService = function (service) {
        new service(this);
    }.bind(this);
}