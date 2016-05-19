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

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Properties

  courses:null,
  testCourses: Ember.A([
  Ember.Object.create({
    'subject':'K12.First'
  }),
  Ember.Object.create({
    'subject':'K12.Second'
  }),
  Ember.Object.create({
    'subject':'K12.First'
  }),
  Ember.Object.create({
    'subject':'K12.Third'
  }),
  Ember.Object.create({
    'subject':'K12.Fourth'
  }),
  Ember.Object.create({
    'subject':'K12.Second'
  })]),

  subjects: Ember.computed('testCourses', function() {
    return this.get('testCourses').map(function(course){
      return course.subject;
    }).filter(function(elem, pos, list) {
      return list.indexOf(elem) === pos;
    });
  }),

  orderedCourses: Ember.computed('formattedSubjects', 'testCourses', function(){
    const component = this;
    return component.get('formattedSubjects').map(function(subject){
      console.log(subject.category+'.'+subject.subject);

     return component.get('testCourses').filter(function(course){
       console.log(course.subject);
       return course.subject===subject.category+'.'+subject.subject;
     });
   });
  }),

  formattedSubjects: Ember.computed('subjects', function(){
    return this.get('subjects').map(function(subject){
      return Ember.Object.create({
        'category': subject.slice(0,subject.indexOf('.')),
        'subject':  subject.slice(subject.indexOf('.')+1, subject.length)
      });
    });
  })
  // -------------------------------------------------------------------------
  // Methods



});
