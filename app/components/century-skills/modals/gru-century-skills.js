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

    updateSelectedSkills(selectedCenturySkills) {
      this.get('model.callback').success(selectedCenturySkills);
      this.triggerAction({ action: 'closeModal' });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of Century Skills
   * @prop {CenturySkill[]}
   */
  centurySkills: Ember.A([])

});
