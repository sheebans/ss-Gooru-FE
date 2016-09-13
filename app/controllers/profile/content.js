import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import ContentSearch from 'gooru-web/models/search/content-search';

export default Ember.Controller.extend(ModalMixin, {
  queryParams: ['term','sortRecent','sortAscending'],

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

  coursesController: Ember.inject.controller('profile.content.courses'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent profile controller
   * @see controllers/profile.js
   * @property {Class}
   */
  "profile": Ember.computed.reads('parentController.profile'),

  /**
   * A link to the computed property isMyProfile in profile controller
   * @see controllers/profile.js
   * @property {isMyProfile}
   */
  "isMyProfile": Ember.computed.reads('parentController.isMyProfile'),
  /**
   * Search term object
   */
  searchObject: null,
  /**
   * Search term
   */
  term:null,
  /**
   * Search term
   */
  sortRecent:true,
  /**
   * Sort Ascending
   */
  sortAscending:false,
  /**
   * Indicate if the selected profile bar is Course
   */
  disableSearch: Ember.computed.alias("coursesController.disableSearch"),

  actions:{
    /**
     *Term to search by keyword
     */
    searchByTerm:function(term){
     this.set('term',term);
    },
    /**
     *Filter by most recent
     */
    filterByDate:function(){
      this.set('sortRecent',!this.get('sortRecent'));
    },
    /**
     *Filter by ascending
     */
    filterByAsc:function(){
      this.set('sortAscending',!this.get('sortAscending'));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */
    resetProperties() {
    var controller = this;
    var searchObject = ContentSearch.create(Ember.getOwner(this).ownerInjection(),{
      term:''
    });
    controller.set('searchObject', searchObject);
    }
});
