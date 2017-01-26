import Ember from 'ember';

/**
 * 21st century skills
 *
 * Component responsible for displaying three panels of 21st century skills
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['century-skills', 'modals', 'gru-century-skills'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    updateSelectedSkills(tempSelectedCenturySkills) {
      this.set('tempSelectedCenturySkills', tempSelectedCenturySkills);
      this.get('model.callback').success(tempSelectedCenturySkills);
      this.triggerAction({ action: 'closeModal' });
    },

    cancelSelectedSkills() {
      this.get('model.callback').success(this.get('selectedCenturySkills'));
      this.triggerAction({ action: 'closeModal' });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super( ...arguments );

    var selectedCenturySkills = component.get('model.selectedCenturySkills');
    var tempSelectedCenturySkills = component.get('model.tempSelectedCenturySkills');
    var centurySkills = component.get('model.centurySkills');

    if (selectedCenturySkills) {
      this.set('selectedCenturySkills', selectedCenturySkills);
      this.set('tempSelectedCenturySkills', tempSelectedCenturySkills);
    }
    if (centurySkills) {
      this.set('centurySkills', centurySkills);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('centurySkills', null);
    this.set('selectedCenturySkills', null);
    this.set('tempSelectedCenturySkills', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of Century Skills
   * @prop {CenturySkill[]}
   */
  centurySkills: Ember.A([]),

  /**
   * List of selected Century Skills ids
   * @prop {Number[]}
   */
  selectedCenturySkills: Ember.A([]),

  /**
   * List of selected Century Skills ids
   * @prop {Number[]}
   */
  tempSelectedCenturySkills: Ember.A([])

});
