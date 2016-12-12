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
                if(data.hasOwnProperty(i)) {
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
                list[i].item.forceUpdate();
            }
        }.bind(this);
        this.getState = function (data) {
            return state;
        }.bind(this);
        this.enlazar = function(elemento, filter) {
            elementos.push({item: elemento, filter: filter});
        }.bind(this);
        this.addService = function (service) {
            new service(this);
        }.bind(this);
    }
}