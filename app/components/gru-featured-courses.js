import Ember from 'ember';
/**
 * featured courses component
 *
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
    let subjects = this.get('courses').map(function(course){
      return Ember.Object.create({
        subject: course.subject,
        subjectSequence: course.subjectSequence,
      });
    }).filter(function(elem, pos, list) {
      return list.reduce((result, e, i) => result < 0 && e.subject === elem.subject ? i : result , -1 ) === pos;
    });
    return subjects.sort((a,b) => a.subjectSequence-b.subjectSequence);
  }),

  orderedCourses: Ember.computed('subjects', 'courses', function(){
    const component = this;
    let result = component.get('subjects').map(function(subjectBucket){
      return component.get('courses').filter(function(course){
        return course.subject===subjectBucket.subject;
       });
    });
    let orderedCourses = result.map(function(arrayOfCourses){
      return arrayOfCourses.sort(function(a,b){
        return a.sequence-b.sequence;
      });
    });
    return orderedCourses;
  }),

  formattedContent: Ember.computed('subjects', 'orderedCourses', function(){
    const component = this;

    return component.get('subjects').map(function(subjectBucket, index){
      return Ember.Object.create({
        'category': subjectBucket.subject.slice(0,subjectBucket.subject.indexOf('.')),
        'subject':  subjectBucket.subject.slice(subjectBucket.subject.indexOf('.')+1, subjectBucket.subject.length),
        'courses': component.get('orderedCourses')[index]
      });
    });
  }),
  // -------------------------------------------------------------------------
  // Methods
  didInsertElement: function() {
    this._super(...arguments);
    $('#subject-navbar').affix({
      offset: 200
    });
  }


});
