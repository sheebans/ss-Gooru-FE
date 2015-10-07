import Ember from 'ember';
import DropdownItem from '../utils/dropdown-item';

/**
 * @typedef {object} IndexController
 */
export default Ember.Controller.extend({


  subjectItems: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(DropdownItem.create({ id: 1, label: "Math"}));
    items.addObject(DropdownItem.create({ id: 2, label: "Science"}));
    items.addObject(DropdownItem.create({ id: 3, label: "History"}));
    items.addObject(DropdownItem.create({ id: 4, label: "Language"}));
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
    }
  }

});
