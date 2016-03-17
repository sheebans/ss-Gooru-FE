import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true)
});

export default Ember.Object.extend(Validations, {

  /**
   * @property {Number} category - Category the course belongs to
   */
  category: 1,

  /**
   * @property {String} image - Course image url
   */
  image: '',

  /**
   * @property {String} subject
   */
  subject: '',

  /**
   * @property {String} title
   */
  title: '',

  /**
   * @property {Boolean} isPublic
   */
  isPublic: false

});
