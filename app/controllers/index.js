import Ember from "ember";

/**
 * @typedef {object} Index Controller
 */
export default Ember.Controller.extend({

  /**
   * @property {[]} subjects
   * @see setupController at routes/index.js
   */
  subjects: null,

  /**
   * @property {[]} grades
   * @see setupController at routes/index.js
   */
  grades: null,

  standards: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(Ember.Object.create({ id: 1, name: "CCSS", title: "Common Core State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "CA SS", title: "California State Standard"}));
    items.addObject(Ember.Object.create({ id: 2, name: "NGSS", title: "Next Generation State Standard"}));
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
