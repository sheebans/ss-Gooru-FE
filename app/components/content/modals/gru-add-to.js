import Ember from 'ember';

export default Ember.Component.extend({

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

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-add-to'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    /**
     * Action triggered when a collection/assessment is selected
     */
    selectCollection:function(collection){
      this.set("selectedCollection", collection);
      $('.gru-add-to .selected').removeClass('selected');
      $('.' + collection.id).addClass('selected');
    },

    /**
     * Action triggered when clicking add to
     */
    addTo: function() {
      this.$('.modal-footer button.add-to').prop('disabled', true);
      this.get('copyContent').call(this)
        .then(this.get('addContent').bind(this))
        .then(this.get('successMessage').bind(this))
        .catch(this.get('errorMessage').bind(this));
    },

    /**
     * Action triggered to redirect to the collection/assessment player
     */
    openCollectionPlayer: function(collectionId) {
      this.get('router').transitionTo('player', collectionId);
      this.triggerAction({ action: 'closeModal' });
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
    if(this.get('isQuestion')) {
      return this.get('assessmentService').addQuestion(collectionId, contentId);
    } else {
      return this.get('collectionService').addResource(collectionId, contentId);
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
      collectionTitle: this.get('selectedCollection.title')});
    if(this.get('isQuestion')){
      contentEditUrl = this.get('router').generate('content.assessments.edit', this.get('selectedCollection.id'));
      successMsg = this.get('i18n').t('common.add-to-assessment-success', {
        contentTitle: this.get('content.title'),
        collectionTitle: this.get('selectedCollection.title')});
    }
    var edit = this.get('i18n').t('common.edit');
    this.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${contentEditUrl}">${edit}</a>`);
    this.$('.modal-footer button.add-to').prop('disabled', false)
  },

  errorMessage: function(error) {
    var message = this.get('isQuestion') ?
      'common.errors.question-not-added-to-assessment' : 'common.errors.resource-not-added-to-collection';
    this.get('notifications').error(this.get('i18n').t(message).string);
    Ember.Logger.error(error);
    this.$('.modal-footer button.add-to').prop('disabled', false)
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.set('collections', this.get('model.collections'));
    this.set('content', this.get('model.content'));
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {String} selected collection/assessment ID
   */
  selectedCollection: null,

  /**
   * @type {String} selected collection/assessment ID
   */
  hasSelectedCollection: Ember.computed.notEmpty('selectedCollection'),

  /**
   * @type {List} user collections/assessments
   */
  collections: null,

  /**
   * @type {Resource/Question} resource or question to add
   */
  content: null,

  /**
   * @type {Boolean} if content is a question
   */
  isQuestion: Ember.computed.equal('content.format', 'question')

});
