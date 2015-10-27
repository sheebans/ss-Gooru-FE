import Ember from 'ember';
import i18nMixin from '../mixins/i18n';

export default Ember.Component.extend(i18nMixin, {

  /**
   * Selected grades items
   * @property {array}
   */
  selectedGrades: null,
  /**
   * Selected subject item
   * @property {array}
   */
  selectedSubjects: null,

  /**
   * @property {[]} subjects
   * @see setupController at routes/search/collections.js
   */
  subjects: null,

  /**
   * True if resources option are selected
   *  @property {[]} subjects
   *
   */
  resourceSelected: false,
  /**
   * True if collection option are selected
   *  @property {[]} subjects
   *
   */
  collectionSelected: true,

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
     * Triggered when grade selection changes
     * @param {DropdownItem} item
     */
    onGradeSelected: function (items) {
      this.set("selectedGrades", items);
    },
    /**
     * Triggered when a subject selection changes
     * @param {DropdownItem[]} items
     */
    onSubjectChange: function(items){
      this.set("selectedSubjects",items);
    },
    /**
     * Triggered when a standard selection changes
     * @param {DropdownItem} item
     */
    onStandardSelected: function(item){
      console.debug(item);
    },
    /**
     * Triggered when select the resources option
     */
    onResourceSelected: function(){
        this.set("collectionSelected", false);
        this.set("resourceSelected", true);
    },
    /**
     * Triggered when select the collection option
     */
    onCollectionSelected: function(){
        this.set("resourceSelected", false);
        this.set("collectionSelected", true);
    },

    /**
     * Triggered when change the rating
     */
    onRateChange: function(newRating){
      console.log('Changing Rate'+newRating);
    }
  }

});
