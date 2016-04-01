import Ember from 'ember';
import Assessment from 'gooru-web/models/content/assessment';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-assessment-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {

    createAssessment: function () {
      const assessment = this.get('assessment');
      assessment.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          Ember.logger("Assessment Valid");
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

