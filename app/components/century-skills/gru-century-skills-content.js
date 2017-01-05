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
      var isSelected = selectedCenturySkills.findBy('id', skillItem.get('id'));

      if (isSelected){
        selectedCenturySkills.removeObject(skillItem);
      }
      else {
        selectedCenturySkills.pushObject(skillItem);
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

    var centurySkillsArray = component.get('centurySkills');

    component.get('centurySkillService').findCenturySkills()
      .then(function(centurySkills) {
        centurySkillsArray.pushObjects(centurySkills.toArray());
      });
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
      var isSelected = (selectedCenturySkills.findBy('id', centurySkill.get('id'))) ? true : false;

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
      var isSelected = (selectedCenturySkills.findBy('id', centurySkill.get('id'))) ? true : false;

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
      var isSelected = (selectedCenturySkills.findBy('id', centurySkill.get('id'))) ? true : false;

      centurySkill.set('isSelected',isSelected);

      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES;
    });
  })

  // ----------------------------
  // Methods
});
