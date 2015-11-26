import Ember from 'ember';

export default Ember.Component.extend({

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
   * True if resources option is selected
   *  @property {boolean} resourceSelected
   *
   */
  resourceSelected: false,
  /**
   * True if collection option is selected
   *  @property {boolean} collectionSelected
   *
   */
  collectionSelected: true,

  /**
   * True if collection filter option is selected
   *  @property {boolean} collectionFilterSelected
   *
   */

  selectedCollectionType: 'collection',

  collectionFilterSelected: Ember.computed('selectedCollectionType', function() {
    var selectedCollectionType = this.get('selectedCollectionType');

    return (!selectedCollectionType || selectedCollectionType === 'collection');
  }),

  /**
   * @property {[]} standards
   * @see setupController at routes/search/collections.js
   */
  standards: null,

  /**
   * @property {[]} grades
   * @see setupController at routes/search/collections.js
   */
  grades:null,

  actions: {

    /**
     * Triggered when grade selection changes
     * @param {DropdownItem} items
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
    },

    /**
     * Triggered when search collection filter is selected
     */
    searchCollectionFilter: function(){
      this.sendAction("onFilterType", this.get("term"),'collection');
    },

    /**
     * Triggered when search assessment filter is selected
     */
    searchAssessmentFilter: function(){
      this.sendAction("onFilterType",this.get("term"), 'assessment');
    }
  },

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  }

});
