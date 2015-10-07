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

  standardItems: function(){
    //@todo: use data retrieved in the route
    const items = Ember.A();
    items.addObject(DropdownItem.create({ id: 1, label: "Math"}));
    items.addObject(DropdownItem.create({ id: 2, label: "Science"}));
    items.addObject(DropdownItem.create({ id: 3, label: "History"}));
    items.addObject(DropdownItem.create({ id: 4, label: "Language"}));
    return items;
  }.property(),

  actions: {

    /**
     * Triggered when a subject selection changes
     * @param {{ id: string, name: string }} items
     */
    onSubjectChange: function(items){
      console.debug(items);
    }
  }

});
