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
    let subjects = this.get('courses').map(
      course => Ember.Object.create({
        subject: course.subject,
        subjectSequence: course.subjectSequence,
      })
    ).filter(
      (elem, pos, list) => list.reduce(
        (result, e, i) => result < 0 && e.subject === elem.subject ? i : result , -1
      ) === pos
    );
    return subjects.sort((a,b) => a.subjectSequence-b.subjectSequence);
  }),

  orderedCourses: Ember.computed('subjects', 'courses', function(){
    let result = this.get('subjects').map(
      subjectBucket => this.get('courses').filter(
        course => course.subject===subjectBucket.subject
      )
    );
    return result.map(
      arrayOfCourses => arrayOfCourses.sort(
        (a,b) => a.sequence-b.sequence));
  }),

  formattedContent: Ember.computed('subjects', 'orderedCourses', function(){
    return this.get('subjects').map(
      (subjectBucket, index) => Ember.Object.create({
        'category': subjectBucket.subject.slice(0,subjectBucket.subject.indexOf('.')),
        'subject':  subjectBucket.subject.slice(subjectBucket.subject.indexOf('.')+1, subjectBucket.subject.length),
        'courses': this.get('orderedCourses')[index]
      })
    );
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
