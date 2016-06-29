import Ember from 'ember';
import {K12_CATEGORY} from 'gooru-web/config/config';
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend(PublicRouteMixin, {

  queryParams: {
    term: {
      /**
       Only 'term' query param should refresh the entire model, since the event is handled by
       the application route. Other query params are handled by the collection controller

       @see routes/application.js#searchTerm
       */
      refreshModel: true
    },
    taxonomies: {
      refreshModel: true
    }
  },

  /**
   * @property {Ember.Service} Service for the Taxonomies back-end endpoints
   */
  taxonomySdkService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    console.log('Refreshing....');
    const taxonomies = params.taxonomies;
    const subjects = this.get('taxonomyService').getSubjects(K12_CATEGORY.value);
    var standards = [];

    if (taxonomies.length > 0) {
      standards = this.get('taxonomySdkService').fetchCodesByIds(taxonomies)
    }

    /*
    var taxonomiesIds = params.taxonomies;
    var selectedTags = Ember.A([]);
    if(taxonomiesIds.length>0){
      this.get('taxonomySdkService').fetchCodesByIds(taxonomiesIds)
        .then(function(taxonomyArray) {
          taxonomyArray.map(function(taxonomyItem) {
            var newSelectedTag = TaxonomyTag.create({
              isActive: true,
              isReadonly: true,
              isRemovable: true,
              data: {
                id: taxonomyItem.id,
                label: taxonomyItem.code,
                caption: taxonomyItem.code,
                title: taxonomyItem.title
              }
            });
            selectedTags.pushObject(newSelectedTag);
          });
         });
    }
    */

    return Ember.RSVP.hash({
      subjects: subjects,
      //selectedTags: selectedTags
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    console.log('refreshingController...');
    controller.set("subjects", model.subjects);
    //controller.set("selectedTags", model.selectedTags);
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    /**
     * Action triggered to open the content player
     * @param {string} collection collection identifier
     */
    onOpenContentPlayer: function(collection) {
      if (collection.get("isExternalAssessment")){
        window.open(collection.get("url")); //TODO url?
      }
      else {
        this.transitionTo('player', collection.get("id"));
      }
    }
  }
});
