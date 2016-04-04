import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true),
  class_sharing:validator('presence', true)
});

/**
 * CLass model
 * typedef {Object} Class
 */
const Class = Ember.Object.extend(Validations, {
  /**
   * @property {String} Title of the class
   */
  title: '',

  /**
   * @property {String} Description for class
   */
  description: '',

  /**
   * @property {String} Greetings for class
   */
  greeting: '',

  /**
   * @property {Number[]} Grade for class
   */
  grade:[],

  /**
   * @property  {String} Sharing type of the class. Either “open” or “restricted”
   */
  class_sharing: '',

  /**
   * @property {String} Path to the cover image of the class
   */
  cover_image: '',

  /**
   * @property {String} Minimum score for class.
   */
  min_score:'',

  /**
   *
   * @property {Date} End date of class
   */

   end_date:null,
  /**
   *
   * @property {Array} Collaborators on class
   */

   collaborator:[],

   /**
    *
    * @property {Array} Creator name
    */
   creator_system:'',

});

export default Class;
