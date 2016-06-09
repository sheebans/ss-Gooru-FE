import Ember from 'ember';
import AddToModal from 'gooru-web/components/content/modals/gru-add-to';

export default AddToModal.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} collection service
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @property {Service} assessment service
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Service} resource service
   */
  resourceService: Ember.inject.service('api-sdk/resource'),

  /**
   * @property {Service} question service
   */
  questionService: Ember.inject.service('api-sdk/question'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-add-to-collection'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    /**
     * Action triggered when a tab is selected
     */
    changeTab: function(showCollections) {
      this.set("selectedCollection", null);
      $('.gru-add-to .selected').removeClass('selected');
      this.set('showCollections', showCollections);
    }
  },

  copyContent: function() {
    var contentId = this.get('content.id');
    if(this.get('isQuestion')) {
      return this.get('questionService').copyQuestion(contentId);
    } else {
      return this.get('resourceService').copyResource(contentId);
    }
  },

  addContent: function(contentId) {
    var collectionId = this.get('selectedCollection.id');
    if(this.get('selectedCollection.isCollection')) {
      if(this.get('isQuestion')) {
        return this.get('collectionService').addQuestion(collectionId, contentId);
      } else {
        return this.get('collectionService').addResource(collectionId, contentId);
      }
    } else {
      return this.get('assessmentService').addQuestion(collectionId, contentId);
    }
  },

  successMessage: function() {
    this.triggerAction({ action: 'closeModal' });
    this.get('notifications').setOptions({
      positionClass: 'toast-top-full-width',
      toastClass: 'gooru-toast'
    });
    var contentEditUrl = this.get('router').generate('content.collections.edit', this.get('selectedCollection.id'));
    var successMsg = this.get('i18n').t('common.add-to-collection-success', {
      contentTitle: this.get('content.title'),
      collectionTitle: this.get('selectedCollection.title'),
      collectionType: this.get('i18n').t(`common.${this.get('collectionType').toLowerCase()}`)
    });
    if(this.get('selectedCollection.isAssessment')) {
      contentEditUrl = this.get('router').generate('content.assessments.edit', this.get('selectedCollection.id'));
    }
    var edit = this.get('i18n').t('common.edit');
    this.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${contentEditUrl}">${edit}</a>`);
    this.$('.modal-footer button.add-to').prop('disabled', false);
  },

  errorMessage: function(error) {
    var message = this.get('isQuestion') ?
      'common.errors.question-not-added-to' : 'common.errors.resource-not-added-to-collection';
    var collectionType = this.get('i18n').t(`common.${this.get('collectionType').toLowerCase()}`);
    this.get('notifications').error(this.get('i18n').t(message, {collectionType}).string);
    Ember.Logger.error(error);
    this.$('.modal-footer button.add-to').prop('disabled', false);
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.set('assessments', this.get('model.assessments'));
    this.set('showCollections', !this.get('showAssessments'));
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {List} user assessments
   */
  assessments: null,

  /**
   * @type {Boolean} if content is a question
   */
  isQuestion: Ember.computed.equal('content.format', 'question'),

  /**
   * @type {Boolean} if collections should be shown
   */
   showCollections: true,

  /**
   * @type {Boolean} if the option to add to assessments should be shown
   */
  showAssessments: Ember.computed('isQuestion', 'content.isOpenEnded', function() {
    return this.get('isQuestion') && !this.get('content.isOpenEnded');
  }),

   /**
    * @type {List} collections/assessments to be rendered
    */
   collectionsList: Ember.computed('showCollections', function() {
     return this.get('showCollections') ? this.get('collections') : this.get('assessments');
   })
});