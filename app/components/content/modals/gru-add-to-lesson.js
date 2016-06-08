import Ember from 'ember';
import AddToModal from 'gooru-web/components/content/modals/gru-add-to';

export default AddToModal.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-add-to-collection'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  copyContent: function() {
    return Ember.RSVP.resolve();
  },

  addContent: function() {
    var collectionId = this.get('selectedCollection.id');
    var courseId = this.get('model.courseId');
    var unitId = this.get('model.unitId');
    var lessonId = this.get('content.id');
    var isCollection = this.get('isCollection');
    return this.get('lessonService').associateAssessmentOrCollectionToLesson(
      courseId, unitId, lessonId, collectionId, isCollection
    );
  },

  successMessage: function() {
    this.triggerAction({ action: 'closeModal' });
    this.get('notifications').setOptions({
      positionClass: 'toast-top-full-width',
      toastClass: 'gooru-toast'
    });
    var editRoute = this.get('isCollection') ? 'content.collections.edit' : 'content.assessments.edit';
    var contentEditUrl = this.get('router').generate(editRoute, this.get('selectedCollection.id'));
    var successMsg = this.get('i18n').t('common.add-to-lesson-success', {
      collectionTitle: this.get('selectedCollection.title'),
      collectionType: this.get('i18n').t(this.get('collectionType')).toLowerCase(),
      lessonTitle: this.get('content.title'),
    });
    var edit = this.get('i18n').t('common.edit');
    this.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${contentEditUrl}">${edit}</a>`);
    this.$('.modal-footer button.add-to').prop('disabled', false);
    if(this.get('onAdd')) {
      this.get('onAdd')(this.get('selectedCollection'));
    }
  },

  errorMessage: function(error) {
    var message = this.get('isCollection') ? 'common.errors.collection-not-added-to' : 'common.errors.assessment-not-added-to';
    this.get('notifications').error(this.get('i18n').t(message, {collectionType: ''}).string);
    Ember.Logger.error(error);
    this.$('.modal-footer button.add-to').prop('disabled', false);
  },

  init() {
    this._super(...arguments);
    this.set('onAdd', this.get('model.onAdd'));
    this.set('isCollection', this.get('model.isCollection'));
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Boolean} if it is showing collections
   */
  isCollection: true,

  /**
   * @type {Function} callback when the add is finished
   */
  onAdd: null,
});
