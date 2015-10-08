import Ember from 'ember';

/**
 * @typedef {object} IndexController
 */
export default Ember.Controller.extend({


  subjects: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "Math"}));
    items.addObject(Ember.Object.create({ id: 2, name: "Science"}));
    items.addObject(Ember.Object.create({ id: 3, name: "History"}));
    items.addObject(Ember.Object.create({ id: 4, name: "Language"}));
    return items;
  }.property(),

  standards: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "CCSS", title: "Common Core State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "CA SS", title: "California State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "NGSS", title: "Next Generation State Standard"}));
    return items;
  }.property(),

  grades: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "Pre-K", levels: [] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Middle School", levels: ["6", "7", "8"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
    items.addObject(Ember.Object.create({ id: 1, name: "Higher Ed", levels: [] }));
    return items;
  }.property(),

  actions: {

    /**
     * Triggered when a subject selection changes
     * @param {DropdownItem[]} items
     */
    onSubjectChange: function(items){
      console.debug(items);
    },

    /**
     * Triggered when a standard selection changes
     * @param {DropdownItem} item
     */
    onStandardSelected: function(item){
      console.debug(item);
    },

    /**
     * Triggered when grade selection changes
     * @param {DropdownItem} item
     */
    onGradeSelected: function(items){
      console.debug(items);
    }
  }

});
