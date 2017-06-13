import Ember from 'ember';
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";
import Bookmark from "gooru-web/models/content/bookmark";
import { CONTENT_TYPES } from 'gooru-web/config/config';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend(PublicRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomySdkService: Ember.inject.service('api-sdk/taxonomy'),

  /**
   * @requires service:api-sdk/bookmark
   */
  bookmarkService: Ember.inject.service('api-sdk/bookmark'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

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

  model: function(params) {
    const taxonomyIds = params.taxonomies;
    let taxonomyCodes = [];
    let subjects = [];

    if (taxonomyIds.length > 0) {
      taxonomyCodes = this.get('taxonomySdkService').fetchCodesByIds(taxonomyIds);
      subjects = this.get('taxonomyService').fetchSubjectsByIds(taxonomyIds);
    }

    return Ember.RSVP.hash({
      taxonomyCodes: taxonomyCodes,
      subjects: subjects
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('subjects', model.subjects);
    controller.set('taxonomyCodes', model.taxonomyCodes);
    controller.reloadTaxonomyTags();
  },

  createBookmark: function(bookmark, showType) {
    this.get('bookmarkService').createBookmark(bookmark).then(() => {
      this.get('notifications').setOptions({
        positionClass: 'toast-top-full-width',
        toastClass: 'gooru-toast',
        timeOut: 10000
      });
      const successMsg = showType ? this.get('i18n').t(
        'common.bookmarked-content-success',
        { contentType: bookmark.get('contentType') }
      ) : this.get('i18n').t('common.bookmarked-success');
      const independentLearningURL = '#';
      const buttonText = this.get('i18n').t('common.take-me-there');
      this.get('notifications').success(
        `${successMsg} <a class="btn btn-success" href="${independentLearningURL}">${buttonText}</a>`
      );
    });
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
        this.transitionTo('player', collection.get("id"), { queryParams: { type: collection.get("collectionType") } });
      }
    },

    /**
     * Action triggered to bookmark a collection or assessment
     * @param {Collection/Assessment} content
     */
    onBookmarkContent: function({ title, id, collectionType }, showType) {
      let bookmark = Bookmark.create(Ember.getOwner(this).ownerInjection(), {
        title,
        contentId: id,
        contentType: collectionType
      });
      this.createBookmark(bookmark, showType);
    },

    /**
     * Action triggered to bookmark a course
     * @param {Course} course
     */
    onBookmarkCourse: function({ title, id }, showType) {
      let bookmark = Bookmark.create(Ember.getOwner(this).ownerInjection(), {
        title,
        contentId: id,
        contentType: CONTENT_TYPES.COURSE
      });
      this.createBookmark(bookmark, showType);
    }
  }

});
