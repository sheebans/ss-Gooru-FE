import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Component.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-course-play'],

  tagName: 'article',


  // -------------------------------------------------------------------------
  // Actions

  actions:  {

    remix: function() {
      if (this.get('session.isAnonymous')) {
        this.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        var model = {
          content: this.get('course')
        };
        this.send('showModal', 'content.modals.gru-course-remix', model);
      }
    },

    /**
     * Sets the current course builder location
     * @param unitId
     * @param lessonId
     */
    setLocation: function (unitId, lessonId = undefined) {
      this.sendAction("onLocationChange", unitId, lessonId);
    },

    viewDetails: function () {
      this.toggleProperty('viewCourseDetails');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route.
   * @property {Course}
   */
  course: null,

  /**
   * @property {Profile[]} remixedUsers
   */
  remixedUsers: null,

  /**
   * @property {Profile[]} createdUsers
   */
  createdUsers: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('course.taxonomy.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get("course.taxonomy"), false);
  }),

  isOwner: null,

 /**
   * @property {string} action name when the location is changed
   */
  onLocationChange: null,

  /**
   * @property {string} selected lesson id
   */
  selectedLessonId:null,

  /**
   * @property {Boolean} view course details
   */
  viewCourseDetails: false

});
