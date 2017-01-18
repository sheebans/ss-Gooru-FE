import Ember from 'ember';
import { CENTURY_SKILLS_GROUPS } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:century-skill/century-skill
   */
  centurySkillService: Ember.inject.service("century-skill"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: [ 'gru-century-skills-content'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * select or not the skill item.
     * @function actions:selectSkillItem
     * @param {CenturySkill} skillItem
     */
    selectSkillItem: function(skillItem) {
      let component = this;

      var selectedCenturySkills = component.get('selectedCenturySkills');
      var isSelected = (selectedCenturySkills.indexOf(skillItem.get('id'))>=0) ? true : false;

      if (isSelected){
        //selectedCenturySkills = selectedCenturySkills.filter(function(selectedCenturySkill){
        //  return selectedCenturySkill.get("id") !== skillItem.get('id');
        //});
        //component.set('selectedCenturySkills',selectedCenturySkills);
        selectedCenturySkills.removeObject(skillItem.get('id'));
        //selectedCenturySkills = selectedCenturySkills.without(skillItem);
        //component.set('selectedCenturySkills',selectedCenturySkills)
      }
      else {
        //skillItem.set('isSelected', !isSelected);
        selectedCenturySkills.pushObject(skillItem.get('id'));
      }
    },

    saveSelectedSkills () {
      var selectedCenturySkills = this.get('selectedCenturySkills');
      this.get('onSave')(selectedCenturySkills);
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super( ...arguments );

    component.get('centurySkillService').findCenturySkills()
      .then(function(centurySkills) {
        component.set('centurySkills', centurySkills.toArray());
      });
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
  selectedCenturySkills: Ember.A([]),

  /**
   * @property {centurySkill[]} cognitive group of century skills
   */
  cognitiveSkillsGroup: Ember.computed("centurySkills.[]", "selectedCenturySkills.[]", function(){
    let component = this;

    return this.get("centurySkills").filter(function(centurySkill){
      var selectedCenturySkills = component.get('selectedCenturySkills');
      var isSelected = (selectedCenturySkills.indexOf(centurySkill.get('id'))>=0) ? true : false;

      centurySkill.set('isSelected',isSelected);

      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_COGNITIVE_SKILLS_AND_STRATEGIES;
    });
  }),

  /**
   * @property {centurySkill[]} content group of century skills
   */
  contentSkillsGroup: Ember.computed("centurySkills.[]", "selectedCenturySkills.[]", function(){
    let component = this;

    return this.get("centurySkills").filter(function(centurySkill){
      var selectedCenturySkills = component.get('selectedCenturySkills');
      var isSelected = (selectedCenturySkills.indexOf(centurySkill.get('id'))>=0) ? true : false;

      centurySkill.set('isSelected',isSelected);

      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_CONTENT_KNOWLEDGE;
    });
  }),

  /**
   * @property {centurySkill[]} learning group of century skills
   */
  learningSkillsGroup: Ember.computed("centurySkills.[]", "selectedCenturySkills.[]", function(){
    let component = this;

    return this.get("centurySkills").filter(function(centurySkill){
      var selectedCenturySkills = component.get('selectedCenturySkills');
      var isSelected = (selectedCenturySkills.indexOf(centurySkill.get('id'))>=0) ? true : false;

      centurySkill.set('isSelected',isSelected);

      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES;
    });
  })

  // ----------------------------
  // Methods
});
