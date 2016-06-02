import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

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
   * @property {TaxonomyRoot} Taxonomy primary subject
   */
  mainSubject: null,

  /**
   * @property {TaxonomyTagData[]} Array of selected taxonomy subject courses
   */
  selectedCourses: Ember.computed('mainSubject', 'taxonomy.[]', function() {
    if (this.get('mainSubject') && this.get('taxonomy').length) {
      let subject = this.get('mainSubject');
      let taxonomy = this.get('taxonomy');
      // TODO: Determine the list of courses using the subject and the taxonomy
      return [];
    } else {
      return [];
    }
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('taxonomy.[]', function() {
    if (this.get('taxonomy').length) {
      return this.get('taxonomy').map(function(tagData) {
        return TaxonomyTag.create({
          isActive: false,
          isReadonly: true,
          isRemovable: false,
          data: tagData
        });
      });
    } else {
      return [];
    }
  }),

  /**
   * @property {String[]} Course taxonomy array
   */
  taxonomy: [],

  /**
   * @property {Number} Number of units in the course
   */
  unitCount: 0,

  /**
   * @property {Profile[]}
   */
  remixedBy: Ember.computed("user", function(){
    return Ember.A([this.get("owner")]); //TODO add also collaborators
  }),

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
    let selectedCourses = this.get('selectedCourses');
    let tags = this.get('tags');

    // Copy the audience and taxonomy values
    properties.audience = audience.slice(0);
    properties.taxonomy = taxonomy.slice(0);
    properties.tags = tags.slice(0);

    // Copy subject reference
    properties.mainSubject = this.get('mainSubject');

    // Copy selectedCourses reference
    properties.selectedCourses = selectedCourses.slice(0);

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
   */
  setTaxonomySubject: Ember.observer('mainSubject', function() {
    var mainSubject = this.get('mainSubject');
    this.set('subject', mainSubject ? mainSubject.get('id') : null);
  })

});
