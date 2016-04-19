import Ember from 'ember';
import Assessment from 'gooru-web/models/content/assessment';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {AssessmentService} Assessment service API SDK
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

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

  classNames: ['content', 'modals', 'gru-assessment-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    createAssessment: function () {
      const component = this;
      const assessment = this.get('assessment');
      assessment.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          component.get('assessmentService')
            .createAssessment(assessment)
            .then(function(newAssessment) {
                component.triggerAction({ action: 'closeModal' });
                component.get('router').transitionTo('content.assessments.edit', newAssessment.get('id'));
              },
              function() {
                const message = component.get('i18n').t('common.errors.assessment-not-created').string;
                component.get('notifications').error(message);
              }
            );
        }
        this.set('didValidate', true);
      }.bind(this));
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('assessment', assessment);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Assessment} assessment
   */
  assessment: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});

