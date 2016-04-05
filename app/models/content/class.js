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
  classSharing: '',

  /**
   * @property {String} Path to the cover image of the class
   */
  coverImage: '',

  /**
   * @property {String} Minimum score for class.
   */
  minScore:'',

  /**
   *
   * @property {Date} End date of class
   */

   endDate:null,
  /**
   *
   * @property {Array} Collaborators on class
   */

   collaborator:[],

   /**
    *
    * @property {Array} Creator name
    */
   creatorSystem:'',

});

export default Class;
