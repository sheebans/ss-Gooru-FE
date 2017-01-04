import Ember from 'ember';

/**
 * 21-century-skills model
 *
 * @typedef {Object} CenturySkill
 */
var CenturySkill = Ember.Object.extend({

  /**
   * @property {String} id
   */
  id: null,

  /**
   * @property {String} label
   */
  label: '',

  /**
   * @property {Boolean} It says if the skill is hewlettDeepLearningModel
   */
  hewlettDeepLearningModel: false,

  /**
   * @property {Boolean} It says if the skill is conleyFourKeysModel
   */
  conleyFourKeysModel: false,

  /**
   * @property {Boolean} It says if the skill is p21FrameworkModel
   */
  p21FrameworkModel: false,

  /**
   * @property {Boolean} It says if the skill is nationalResearchCenterModel
   */
  nationalResearchCenterModel: false,

  /**
   * @property {String} Century Skills group
   */
  group: null

});

export default CenturySkill;
