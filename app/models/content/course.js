import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-course-title'
      })
    ]
  }
});

/**
 * Course model
 * typedef {Object} Course
 */
export default Ember.Object.extend(Validations, {

  /**
   * @property {String} id - The Course Id
   */
  id: null,

  /**
   * @property {String} category - Category the course belongs to
   */
  category: Ember.computed('subject', function() {
    var keys = this.get('subject').split('.');
    var category = TAXONOMY_CATEGORIES[0].value; // Default to K12 category
    if (keys.length > 1) {
      for (var i = TAXONOMY_CATEGORIES.length - 1; i >= 0; i--) {
        // The second part of the subjectId represents the category
        if (keys[1] === TAXONOMY_CATEGORIES[i].apiCode) {
          category = TAXONOMY_CATEGORIES[i].value;
          break;
        }
      }
    }
    return category;
  }),

  /**
   * @property {Content/Unit[]} children - List of course units
   */
  children: [],

  /**
   * @property {String} title
   */
  title: '',

  /**
   *  @property {String} Course description
   */
  description: '',

  /**
   * @property {String} Course thumbnail url
   */
  thumbnailUrl: null,

  /**
   * @property {Boolean} Is this course visible on profile
   */
  isVisibleOnProfile: true,

  /**
   * @property {Boolean} isPublished When a course is set as published
   */
  isPublished: false,

  /**
   * @property {Number[]} Array with the audience ids
   */
  audience:[],

  /**
   * @property {String} id of the course's owner
   */
  owner: null,

  /**
   * @property {String} Taxonomy primary subject ID
   */
  subject: '',

  /**
   * @property {String[]} Course taxonomy array
   */
  taxonomy: [],

  /**
   * @property {Number} Number of units in the course
   */
  unitCount: 0,

  /**
   * Return a copy of the course
   *
   * @function
   * @return {Course}
   */
  copy: function() {

    var properties = [];
    var enumerableKeys = Object.keys(this);

    for (let i = 0; i < enumerableKeys.length; i++) {
      let key = enumerableKeys[i];
      let value = Ember.typeOf(this.get(key));
      if (value === 'string' || value === 'number' || value === 'boolean') {
        properties.push(key);
      }
    }

    // Copy the course data
    properties = this.getProperties(properties);

    let audience = this.get('audience');
    let taxonomy = this.get('taxonomy');

    // Copy the audience and taxonomy values
    properties.audience = audience.slice(0);
    properties.taxonomy = taxonomy.slice(0);

    return this.get('constructor').create(Ember.getOwner(this).ownerInjection(), properties);
  },

  /**
   * Copy a list of property values from another model to override the current ones
   *
   * @function
   * @param {Course} model
   * @param {String[]} propertyList
   * @return {null}
   */
  merge: function(model, propertyList = []) {
    var properties = model.getProperties(propertyList);
    this.setProperties(properties);
  },

  /**
   * Sets the subject of the course
   *
   * @function
   * @param {TaxonomyRoot} taxonomySubject
   */
  setTaxonomySubject: function(taxonomySubject) {
    this.set('subject', taxonomySubject ? taxonomySubject.get('id') : null);
  }

});
