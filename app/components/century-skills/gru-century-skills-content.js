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

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super( ...arguments );

    var centurySkillsArray = component.get('centurySkills');

    component.get('centurySkillService').findCenturySkills()
      .then(function(centurySkills) {
        centurySkillsArray.pushObjects(centurySkills.toArray());
        component.set('centurySkills', centurySkillsArray);
      });
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of Century Skills
   * @prop {CenturySkill[]}
   */
  centurySkills: [],

  /**
   * @property {centurySkills[]} first group of century skills
   */
  firstSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_COGNITIVE_SKILLS_AND_STRATEGIES;
    });
  }),

  /**
   * @property {centurySkills[]} second group of second skills
   */
  secondSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_CONTENT_KNOWLEDGE;
    });
  }),

  /**
   * @property {centurySkills[]} third group of second skills
   */
  thirdSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES;
    });
  })

  // ----------------------------
  // Methods
});
