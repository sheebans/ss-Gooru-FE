import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import ContentSearch from 'gooru-web/models/search/content-search';

export default Ember.Controller.extend(ModalMixin, {
  queryParams: ['term'],

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

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

  term:null,

  actions:{
    searchByTerm:function(term){
     this.set('term',term);
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
