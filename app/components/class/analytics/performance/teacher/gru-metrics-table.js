import Ember from 'ember';
import { createDataMatrix } from 'gooru-web/utils/performance-data';
import { alphabeticalStringSort, numberSort } from 'gooru-web/utils/utils';
/**
   * used to increment hbs file
*/
export function plusOne(params) {
  return parseInt(params) + 1;
}

Ember.HTMLBars.makeBoundHelper(plusOne);
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

    classNames: ['gru-metrics-table'],

    page: 0,
    limit: 10,
    colspanval:1,
    dir: 'asc',
    sort: 'name',

    isLoading: false,
    canLoadMore: true,
  /**
   * @prop { Object } sortCriteria - Object with information on how the data should be sorted
   * - metricsIndex: {number} - Index of metrics option
   * - order: {number} - Ascending or descending order
   */
  sortCriteria: null,
  /**
   * The header titles
   * @property {Headers[]}
   */

  headers: null,
   /**
   * The header titles
   * @property {courseId}
   */

  courseId: null,
  /**
   * The header titles
   * @property {classId}
   */

  classId: null,
    /**
   * The header titles
   * @property {tempUnitId}
   */

  tempUnitId: null,
  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),
/**
   * The lessonperformanceDataMatrix
   * @property {lessonperformanceDataMatrix[]}
   */

  lessonperformanceDataMatrix: null,
  /**
   * The lessonperformanceDataMatrix
   * @property {lessonperformanceDataMatrix[]}
   */
  assessmentperformanceDataMatrix: null,
  /**
   * The performanceDataMatrix
   * @property {performanceDataMatrix[]}
   */

  performanceDataMatrix: null,

   /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),
  /**
   * @type UnitService
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * The average headers of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeaders: Ember.computed('performanceDataMatrix.length', function() {
    const averageHeaders = this.get('performanceDataMatrix').objectAt(0);
    return averageHeaders;
  }),
   /**
   * The average headers of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeadersLesson: [],
     /**
   * The average headers of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeadersAssessment: [],

  /**
   * The average headers of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  unitPerformanceData: [],
  /**
   * The average headers of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  lesson1PerformanceData: [],
  /**
   * The average headers of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  assessment1PerformanceData: [],
  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  performanceData: Ember.computed('performanceDataMatrix.length','sortCriteria', function() {
    const performanceData = this.get('performanceDataMatrix').slice(1);
    const sortCriteria = this.get('sortCriteria');

    if (sortCriteria) {
      let metricsIndex = sortCriteria.metricsIndex;
      let sortedData = performanceData;

      //alphabeticalStringSort
      if (metricsIndex === -1) {
        sortedData.sort(function (a, b) {
          return alphabeticalStringSort(a.user, b.user) * sortCriteria.order;
        });
      } else if (metricsIndex >= 0) {
        let sortByMetric = this.get('sortByMetric');
        sortedData.sort(function (a, b) {
          if (sortByMetric === 'score') {
            return numberSort(a.performanceData[0].score, b.performanceData[0].score) * sortCriteria.order;
          } else if (sortByMetric === 'completion') {
            return numberSort(a.performanceData[0].completionDone, b.performanceData[0].completionDone) * sortCriteria.order;
          } else {
            return numberSort(a.performanceData[0].studyTime, b.performanceData[0].studyTime) * sortCriteria.order;
          }
        });
      }
      return sortedData;
    } else {
      this.set('unitPerformanceData',performanceData);
      return performanceData;
    }
  }),

  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  lessonperformanceData: [],
  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  assessmentperformanceData: [],
  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  assessment1performanceData: [],

  /**
   * List of  metrics to be displayed by the sub-header component for the average
   * @sorted {Boolean}
   * @isAsc {Boolean}
   * @constant {Array}
   */
  averageMetrics: Ember.A([Ember.Object.create({
    'value': 'student',
    'sorted':false,
    'isAsc':false,
    'visible': true,
    'index': -1
  })]),

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  dataPickerOptions: Ember.A(['score']),

  /**
   * Indicate if the table is on collection level
   * @property {Boolean}
   */
  isCollection:Ember.computed.equal('headerType', 'collection'),

        model: Ember.A([Ember.Object.create({
            label: 'Students',
            valuePath: 'studentName',
            class:"header",
            width: '150px'
        }),Ember.Object.create({
            label: 'Class Average',
            valuePath: 'classaverage',
            class:"header",
            width: '150px'
         })]),
  /*
   * @prop { Number } defaultSortOrder - Default sort order for values in columns (1 = ascending; -1 = descending)
   */
  defaultSortOrder: 1,

  /**
   * metric sent by the sort function
   */
  sortByMetric: null,

    init() {
        this._super(...arguments);
        if(this.get('tempUnitId')!==null)
        {
          this.removeexpandedUnit(this.get('tempUnitId'));
        }
    },
      didInsertElement() {
        "use strict";
        Ember.run.next(this, function(){
            this.$('table').addClass('table');
      });
      Ember.run.scheduleOnce('afterRender', this, function () {
      this.set('sortCriteria', this.initSortCriteria());
    });
},
    actions: {
        onScrolledToBottom() {
            if (this.get('canLoadMore')) {
                this.incrementProperty('page');
                this.fetchRecords();
            }
        },
        sortChange:function(metric){
        var metricsIndex = metric.get('index');
        var sortCriteria = this.get('sortCriteria');
        var newSortCriteria = {
          metricsIndex: metricsIndex
        };

        this.set('sortByMetric', metric.get('value'));

        if (sortCriteria.metricsIndex === metricsIndex) {
          // Reverse the sort order if the same column has been selected
          newSortCriteria.order = sortCriteria.order * -1;
          this.set('sortCriteria', newSortCriteria);

        } else {
          newSortCriteria.order = this.get('defaultSortOrder');
          this.set('sortCriteria', newSortCriteria);
        }
      },
       showassessments(index) {
             var temp = this.get('columns').objectAt(index);
              this.expandLesson(temp.get('valuePath'));
              Ember.set(temp, 'showSubSub', true);
              Ember.set(temp, 'showAssessments', true);
        },
        showlessons(index) {
             var temp = this.get('columns').objectAt(index);
              this.expandUnit(temp.get('valuePath'));
             Ember.set(temp, 'showSub', true);
              Ember.set(temp, 'showAssessments', false);
        },
        expand(index) {
            if(this.get('tempUnitId')!==null)
            {
              this.removeexpandedUnit(this.get('tempUnitId'));
            }
             var temp = this.get('columns').objectAt(index);
             this.set('tempUnitId',temp.get('valuePath'));
             this.expandUnit(temp.get('valuePath'));
             Ember.Logger.info("LessonPerformance---",this.get('performanceData'));
             Ember.set(temp, 'showSub', true);
        },
        collapse(index) {
             var temp = this.get('columns').objectAt(index);
            this.removeexpandedUnit(temp.get('valuePath'));
             Ember.set(temp, 'showSub', false);
        },
        onAfterResponsiveChange(matches) {
        if (matches.indexOf('jumbo') > -1) {
          this.get('table.expandedRows').setEach('expanded', false);
        }
        }
    },
  removeexpandedUnit: function(unitId){
   const component = this;
    const classId = component.get('classId');
        const courseIdVal = component.get('courseId');
        const filterBy="assessment";
        component.get('classService').readClassMembers(classId)
        .then(function(members) {
        component.get('unitService').fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp1 = component.get('columns').findBy('valuePath', unitId);
            var temp = component.get('columns').objectAt(temp1.index);
            Ember.set(temp, 'subColumns', unit.get('children'));
            var lessons = unit.get('children');
            component.get('performanceService').findClassPerformanceByUnit(classId, courseIdVal, unitId, members.get('members'), {collectionType: filterBy})
            .then(function(classPerformanceData) {
            const performanceData = createDataMatrix(lessons, classPerformanceData, 'unit');
            component.set('lessonperformanceDataMatrix',performanceData);
            const lessonperformanceData= Ember.computed('lessonperformanceDataMatrix.length','sortCriteria', function() {
              const performanceData = this.get('lessonperformanceDataMatrix').slice(1);
              const sortCriteria = this.get('sortCriteria');
              if (sortCriteria) {
                let metricsIndex = sortCriteria.metricsIndex;
                let sortedData = performanceData;
                if (metricsIndex === -1) {
                  sortedData.sort(function (a, b) {
                    return alphabeticalStringSort(a.user, b.user) * sortCriteria.order;
                  });
                } else if (metricsIndex >= 0) {
                  let sortByMetric = this.get('sortByMetric');
                  sortedData.sort(function (a, b) {
                    if (sortByMetric === 'score') {
                      return numberSort(a.performanceData[0].score, b.performanceData[0].score) * sortCriteria.order;
                    } else if (sortByMetric === 'completion') {
                      return numberSort(a.performanceData[0].completionDone, b.performanceData[0].completionDone) * sortCriteria.order;
                    } else {
                      return numberSort(a.performanceData[0].studyTime, b.performanceData[0].studyTime) * sortCriteria.order;
                    }
                  });
                }
                return sortedData;
              } else {
                return performanceData;
              }
            });
            component.set('lessonperformanceData',lessonperformanceData);
            component.get('lessonperformanceData').forEach(function(item){
              var lessonUser = item.user;
              var lessonPerformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1){
                    var indexLesson = 0;
                    if(lessonUser === item1.user)
                      {
                        item1.performanceData.forEach(function(item9){
                          if(item9!==undefined && item9.id!==undefined)
                            {
                              if(item9.id===unitId)
                                {
                                  if(lessonPerformanceData.length>lessons.length)
                                    {
                                      lessonPerformanceData.removeAt(lessons.length);
                                    }
                                  item9.set('subColumns', []);
                                  item9.set('subsubColumns', []);
                                 component.set('colspanval',1);
                                }
                            }
                          indexLesson = indexLesson + 1;
                          });
                      }
                  });
              });

              Ember.computed('lessonperformanceDataMatrix.length', function() {
                const averageHeaders = component.get('lessonperformanceDataMatrix').objectAt(0);
                component.set('averageHeadersLesson',averageHeaders);
                return averageHeaders;
              });
             });
          });
          });
},
expandUnit: function(unitId){
   const component = this;
    const classId = component.get('classId');
        const courseIdVal = component.get('courseId');
        const filterBy="assessment";
        component.get('classService').readClassMembers(classId)
        .then(function(members) {
        component.get('unitService').fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp1 = component.get('columns').findBy('valuePath', unitId);
            var temp = component.get('columns').objectAt(temp1.index);
            component.set('colspanval',unit.get('children').length+1);
            Ember.set(temp, 'subColumns', unit.get('children'));
            var lessons = unit.get('children');
            component.get('performanceService').findClassPerformanceByUnit(classId, courseIdVal, unitId, members.get('members'), {collectionType: filterBy})
            .then(function(classPerformanceData) {

            const performanceData = createDataMatrix(lessons, classPerformanceData, 'unit');
            component.set('lessonperformanceDataMatrix',performanceData);
            const lessonperformanceData= Ember.computed('lessonperformanceDataMatrix.length','sortCriteria', function() {
              const performanceData = this.get('lessonperformanceDataMatrix').slice(1);
              const sortCriteria = this.get('sortCriteria');

              if (sortCriteria) {
                let metricsIndex = sortCriteria.metricsIndex;
                let sortedData = performanceData;
                if (metricsIndex === -1) {
                  sortedData.sort(function (a, b) {
                    return alphabeticalStringSort(a.user, b.user) * sortCriteria.order;
                  });
                } else if (metricsIndex >= 0) {
                  let sortByMetric = this.get('sortByMetric');
                  sortedData.sort(function (a, b) {
                    if (sortByMetric === 'score') {
                      return numberSort(a.performanceData[0].score, b.performanceData[0].score) * sortCriteria.order;
                    } else if (sortByMetric === 'completion') {
                      return numberSort(a.performanceData[0].completionDone, b.performanceData[0].completionDone) * sortCriteria.order;
                    } else {
                      return numberSort(a.performanceData[0].studyTime, b.performanceData[0].studyTime) * sortCriteria.order;
                    }
                  });
                }
                return sortedData;
              } else {
                return performanceData;
              }
            });
            component.set('lessonperformanceData',lessonperformanceData);
            component.get('lessonperformanceData').forEach(function(item){
              var lessonUser = item.user;
              var lessonPerformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1){
                    var indexLesson = 0;
                    if(lessonUser === item1.user)
                      {
                        item1.performanceData.forEach(function(item9){
                          if(item9!==undefined && item9.id!==undefined)
                            {
                              if(item9.id===unitId)
                                {
                                  if(lessonPerformanceData.length>lessons.length)
                                    {
                                      lessonPerformanceData.removeAt(lessons.length);
                                    }
                                    if(lessonPerformanceData.length!==1)
                                      {
                                      lessonPerformanceData.removeAt(0);
                                      }
                                  item9.set('subsubColumns', []);
                                  item9.set('subColumns', lessonPerformanceData);
                                  // lessonPerformanceData.forEach(function(item2){
                                  //   if(newindexLesson<=lessons.length)
                                  //   {
                                  //   item1.performanceData.insertAt(newindexLesson, item2);
                                  //   newindexLesson = newindexLesson + 1;
                                  //   }
                                  //   });
                                }
                            }
                          indexLesson = indexLesson + 1;
                          });
                      }
                  });
              });

              Ember.computed('lessonperformanceDataMatrix.length', function() {
                const averageHeaders = component.get('lessonperformanceDataMatrix').objectAt(0);
                component.set('averageHeadersLesson',averageHeaders);
                return averageHeaders;
              });
             });
          });
          });
},
expandLesson: function(unitId){
   const component = this;
    const classId = component.get('classId');
        const courseIdVal = component.get('courseId');
        const filterBy="assessment";
        component.get('classService').readClassMembers(classId)
        .then(function(members) {
        component.get('unitService').fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp1 = component.get('columns').findBy('valuePath', unitId);
            var temp = component.get('columns').objectAt(temp1.index);
            component.set('colspanval',unit.get('children').length+1);
            Ember.set(temp, 'subColumns', unit.get('children'));
            var lessons = unit.get('children');
            component.set('assessment1performanceData',[]);
            var index1 =0;
            lessons.forEach(function(lessonObj){
          component.get('lessonService').fetchById(courseIdVal, unitId, lessonObj.id)
          .then(function(lesson) {
            Ember.set(lessonObj, 'subsubColumns', lesson.get('children'));
            component.set('colspanval',unit.get('children').length+1 +lesson.get('children').length);
            var assessments = lesson.get('children');
            component.get('performanceService').findClassPerformanceByUnitAndLesson(classId, courseIdVal, unitId,lessonObj.id, members.get('members'), {collectionType: filterBy})
            .then(function(classPerformanceData) {
            const performanceData = createDataMatrix(assessments, classPerformanceData, 'lesson');
            component.set('assessmentperformanceDataMatrix',performanceData);
            const assessmentperformanceData= Ember.computed('assessmentperformanceDataMatrix.length','sortCriteria', function() {
              const performanceData = this.get('assessmentperformanceDataMatrix').slice(1);
              const sortCriteria = this.get('sortCriteria');
              if (sortCriteria) {
                let metricsIndex = sortCriteria.metricsIndex;
                let sortedData = performanceData;
                if (metricsIndex === -1) {
                  sortedData.sort(function (a, b) {
                    return alphabeticalStringSort(a.user, b.user) * sortCriteria.order;
                  });
                } else if (metricsIndex >= 0) {
                  let sortByMetric = this.get('sortByMetric');
                  sortedData.sort(function (a, b) {
                    if (sortByMetric === 'score') {
                      return numberSort(a.performanceData[0].score, b.performanceData[0].score) * sortCriteria.order;
                    } else if (sortByMetric === 'completion') {
                      return numberSort(a.performanceData[0].completionDone, b.performanceData[0].completionDone) * sortCriteria.order;
                    } else {
                      return numberSort(a.performanceData[0].studyTime, b.performanceData[0].studyTime) * sortCriteria.order;
                    }
                  });
                }
                return sortedData;
              } else {
                return performanceData;
              }
            });
            component.set('assessmentperformanceData',assessmentperformanceData);
            Ember.Logger.info("datafromFramedobj---",component.get('assessmentperformanceDataMatrix'));
            var indx = 0;
            component.get('assessmentperformanceDataMatrix').forEach(function(item){
              var lessonUser = item.userId;
              var assessmentperformanceData = item.performanceData;
               Ember.Logger.info("assessmentperformanceData11---",assessmentperformanceData);
                  component.get('performanceData').forEach(function(item1){
                    var indexLesson = 0;
                    if(lessonUser === item1.userId)
                      {

                        item1.performanceData.forEach(function(item9){
                          if(item9!==undefined && item9.id!==undefined)
                            {
                              if(item9.id===unitId)
                                {
                                  assessmentperformanceData.removeAt(0);
                                  Ember.Logger.info("addng--",assessmentperformanceData);
                                  // if(assessmentperformanceData.length>assessments.length)
                                  //   {
                                  //     assessmentperformanceData.removeAt((assessments.length-1));
                                  //   }
                                  item9.set('subColumns', []);
                                   item9.set('subsubColumns', []);
                                   assessments.forEach(function(assessmentItem){
                                    assessmentperformanceData.forEach(function(assessmentpItem){
                                    if(assessmentpItem!==undefined){
                                     if(assessmentpItem.id === assessmentItem.id)
                                      {
                                        item9.get('subsubColumns').pushObject(assessmentpItem);
                                        return false;
                                      }
                                      }
                                      });
                                    });
                                }
                            }
                          indexLesson = indexLesson + 1;
                          });
                      }
                  });
                    indx = indx+1;
              });

               Ember.computed('assessmentperformanceDataMatrix.length', function() {
                const averageHeaders = component.get('assessmentperformanceDataMatrix').objectAt(0);
                component.set('averageHeadersAssessment',averageHeaders);
                return averageHeaders;
              });
             });
          });
           //}
            index1 = index1+1;
          });
          });
          });
},
    /**
   * Initialize the table's sort criteria
   * @return {Object}
   */
  initSortCriteria: function () {
    return {
      metricsIndex: -1,
      order: this.get('defaultSortOrder')
    };
  }
});