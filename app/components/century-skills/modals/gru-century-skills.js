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

  /**
   * @requires service:century-skill/century-skill
   */
  centurySkillService: Ember.inject.service("century-skill"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['century-skills', 'modals', 'gru-century-skills'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    updateSelectedSkills(selectedCenturySkills) {
      this.set('selectedCenturySkills',selectedCenturySkills);
      this.get('model.callback').success(selectedCenturySkills);
      this.triggerAction({ action: 'closeModal' });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super( ...arguments );

    var selectedSkills = this.get('model.selectedSkills');

    component.get('centurySkillService').findCenturySkills()
      .then(function(centurySkills) {
        component.set('centurySkills', centurySkills.toArray());
      });

    if (selectedSkills) {
      this.set('selectedCenturySkills', selectedSkills);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('centurySkills', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of Century Skills
   * @prop {CenturySkill[]}
   */
  centurySkills: Ember.A([]),

  /**
   * List of selected Century Skills
   * @prop {CenturySkill[]}
   */
  selectedCenturySkills: Ember.A([])

});
