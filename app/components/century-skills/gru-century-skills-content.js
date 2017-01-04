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
     * Clear any active skill item, then change the path the browse selector is open to.
     * @function actions:updatePath
     * @param {CenturySkill} skillItem
     */
    selectSkillItem: function(skillItem) {
      console.log('sI',skillItem);
      //this.resetShortcuts();
      //return this.updateSelectedPath(item);
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
   * @property {centurySkill[]} cognitive group of century skills
   */
  cognitiveSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_COGNITIVE_SKILLS_AND_STRATEGIES;
    });
  }),

  /**
   * @property {centurySkill[]} content group of century skills
   */
  contentSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_CONTENT_KNOWLEDGE;
    });
  }),

  /**
   * @property {centurySkill[]} learning group of century skills
   */
  learningSkillsGroup: Ember.computed("centurySkills.[]", function(){
    return this.get("centurySkills").filter(function(centurySkill){
      return centurySkill.get("group") === CENTURY_SKILLS_GROUPS.KEY_LEARNING_SKILLS_AND_TECHNIQUES;
    });
  })

  // ----------------------------
  // Methods
});
