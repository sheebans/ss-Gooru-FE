import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * @property {number} quantityTooltips
     */
    quantityTooltips: null,

    /**
    * @property {string} tooltipStandards
    */
    tooltipStandards: '',

    /**
     * Selected collection results itemsStandards
     * @property {array}
     */
    itemsStandards: function() {
        var standards = this.get("standards");
        var itemsStandards = Ember.A();
        var tooltipsStand = '';
        var count = 0;
        var itemName = '';

        if (standards){
            standards.forEach(function(item, index){
                if(index<2){
                    itemsStandards.addObject(item);
                }
                else {
                    itemName = '<p>'+item.name+'</p>';
                    count +=1;
                    tooltipsStand= tooltipsStand + itemName;
                }
            });

            this.set('tooltipStandards',tooltipsStand);
            if (count > 0){
                this.set('quantityTooltips',count);
            }
        }

        return  itemsStandards;

    }.property()

});
