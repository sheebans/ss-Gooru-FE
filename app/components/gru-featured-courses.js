import Ember from 'ember';
/**
 * featured courses component
 *
 * Component responsible for show  the question bubbles under the assessment report
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
// -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-featured-courses'],

  attributeBindings:[
    'dataSpy:data-spy',
    'dataTarget:data-target',
    'dataOffset:data-offset'
  ],


  dataSpy:"scroll",
  dataTarget:".navbar",
  dataOffset:"50",
  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Properties

  courses:null,

  subjects: Ember.computed('courses', function() {

    return this.get('courses').map(function(course){
      return course.subject;
    }).filter(function(elem, pos, list) {
      return list.indexOf(elem) === pos;
    });
  }),

  orderedCourses: Ember.computed('subjects', 'courses', function(){
    const component = this;
    return component.get('subjects').map(function(subject){
     return component.get('courses').filter(function(course){
       return course.subject===subject;
     });
   });
  }),

  formattedContent: Ember.computed('subjects', 'orderedCourses', function(){
    const component = this;

    return component.get('subjects').map(function(subject, index){
      var test = component.get('orderedCourses')[index];
      return Ember.Object.create({
        'category': subject.slice(0,subject.indexOf('.')),
        'subject':  subject.slice(subject.indexOf('.')+1, subject.length),
        'courses': component.get('orderedCourses')[index]
      });
    });
  }),
  // -------------------------------------------------------------------------
  // Methods
  didInsertElement: function() {
    this._super(...arguments);
    const component = this;
    $('#affixed-subject-navbar').affix({
      offset: 300
    });
  }


});
