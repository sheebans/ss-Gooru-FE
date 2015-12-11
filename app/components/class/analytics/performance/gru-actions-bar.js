import Ember from 'ember';

/**
 * Class actions bar
 *
 * Component responsible for showing the action bar in my class analytics page.
 *
 * @module
 * @see controllers/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-actions-bar'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Action triggered when the user selects the Download option
     */
    onDownload: function() {
      console.log("onDownload");
    },
    /**
     * Action triggered when the user selects the Share option
     */
    onShare:function(){
      console.log("onShare");
    },
    /**
     * Action triggered when the user selects the Full Screen option
     */
    onFullScreen:function(){
      console.log("onFullScreen");
    },

    /**
     * Action triggered when the user selects the view filter option
     * @param {string} filterBy - view filter option
     */
    onFilter:function(filterBy){
       if (this.get("onFilterSelected")){
        this.sendAction("onFilterSelected", filterBy);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} for mode: student or teacher
   */
  mode: null,

  /**
   * @property {String|Function} onFilterSelected - event handler when a  filter option is selected in the view dropdown.
   */
  onFilterSelected: null,

  /**
   * @property {String} selectedFilterBy - shows the filter option selected in the view dropdown.
   */
  selectedFilterBy:null,

  /**
   * @property {String} isFilterByAssessment - shows if the filter option selected is by Assessment.
   */
  isFilterByAssessment: Ember.computed.equal("selectedFilterBy", "assessment"),

  /**
   * @property {String} isFilterByCollection - shows if the filter option selected is by Collection.
   */
  isFilterByCollection: Ember.computed.equal("selectedFilterBy", "collection"),

  /**
   * @property {String} isFilterByBoth - shows if the filter option selected is by Both.
   */
  isFilterByBoth: Ember.computed.equal("selectedFilterBy", "both"),

  /**
   * @property {String} dropdownFilterText - shows the text for the filter option selected in the view dropdown.
   */
  dropdownFilterText: Ember.computed('selectedFilterBy', function () {
    const selectedFilter = this.get('selectedFilterBy');

    return 'class.analytics.performance.actions.'+selectedFilter;
  })

  // -------------------------------------------------------------------------

  // Methods

});
