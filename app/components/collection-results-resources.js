import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * @property {number} quantityResources
     */
    quantityResources: null,

    /**
     * @property {number} quantityQuestions
     */
    quantityQuestions: null,

    /**
     * Selected collection results itemResources
     * @property {array}
     */
    itemResources: function() {

        var itemsResources = Ember.A();
        var resources = this.get("resources");
        var countQuestions = 0,
            countResources = 0;

        if(resources){
            resources.forEach(function(item, index){
                if(index<4){
                    itemsResources.addObject(item);
                }

                if (item.type === "question"){
                    countQuestions +=1;
                }
                else {
                    countResources +=1;
                }

            });

            if (countResources > 0){
                this.set('quantityResources', countResources);
            }
            if (countQuestions > 0){
                this.set('quantityQuestions', countQuestions);
            }
        }

        return  itemsResources;

    }.property()
});
