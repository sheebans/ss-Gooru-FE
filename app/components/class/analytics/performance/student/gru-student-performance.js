import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  /**
   * Attribute that computes the element to the specified string.
   *
   * @attribute {String}
   */
  tagName: 'ol',
  /**
   * Array that computes the elements class names to the specified strings in the array.
   *
   * @attribute {Array}
   */
  classNames:['gru-student-performance-container','panel-group'],
  /**
   * Attribute that tells the component that it will contain these attributes.
   *
   * @attribute {Array}
   */
  attributeBindings: ['role','aria-multiselectable'],
  /**
   * Attribute that computes the elements 'role' attribute to the specified string.
   *
   * @attribute {String}
   */
  role: 'tablist',
  /**
   * Attribute that computes the elements 'aria-multiselectable' attribute to the specified string.
   *
   * @attribute {String}
   */
  'aria-multiselectable':'true',


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Call the passed setUnitBreadcrumb function with or without parameters.
     *
     *
     * @function actions:setUnitBreadcrumb
     */
    setUnitBreadcrumb: function(unit, unitIndex){
      if(unit){
        this.get('setUnitBreadcrumb')(unit, unitIndex);
      }else{
        this.get('setUnitBreadcrumb')();
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,

  /**
   * Collection that contains the unit performance models for this unit, class, course and student
   *
   * @property {Ember.Array}
   */
  performances:null,
  /**
   * Model of the class this unit belongs to
   *
   * @property {Class}
   */
  classModel:null,
  /**
   * UserID this user belongs to
   *
   * @property {String}
   */
  userId:'',

  // -------------------------------------------------------------------------

  // Methods


  /**
   * Function received as parameter to set the unit as a breadcrumb
   * @function setUnitBreadcrumb
   * @returns {undefined}
   */
  setUnitBreadcrumb:null



});
