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
  // -------------------------------------------------------------------------
  // Properties
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
   * @property {unitArray[]}
   */
  unitArray: [],
  /**
   * The average headers of the Data Matrix
   * @property {unitArray[]}
   */
  tempUnitPerformanceArray: Ember.computed(
    'performanceDataMatrix.length',
    function() {
      const tempUnitPerformanceArray = this.get('performanceDataMatrix').slice(
        1
      );
      return tempUnitPerformanceArray;
    }
  ),
  /**
   * The average headers of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  lesson1PerformanceData: [],
  /**
   * The average headers of the Data Matrix
   * @property {totalAssessments}
   */
  totalAssessments: 0,
  /**
   * The average headers of the Data Matrix
   * @property {boolFlag}
   */
  boolFlag: false,
  /**
   * The average headers of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  assessment1PerformanceData: [],
  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  performanceData: Ember.computed(
    'performanceDataMatrix.length',
    'sortCriteria',
    function() {
      const component = this;
      const performanceData1 = this.get('performanceDataMatrix').slice(1);
      const sortCriteria = this.get('sortCriteria');
      component.set('unitArray', []);
      component.get('headers').forEach(function(item) {
        if (item !== undefined) {
          var emberObject = Ember.Object.create({
            id: item.id
          });
          component.get('unitArray').pushObject(emberObject);
        }
      });
      component.get('tempUnitPerformanceArray').forEach(function(item1) {
        component.set('unitArray', []);
        component.get('headers').forEach(function(item) {
          if (item !== undefined) {
            var emberObject = Ember.Object.create({
              id: item.id
            });
            component.get('unitArray').pushObject(emberObject);
          }
        });
        item1.performanceData.forEach(function(item2, indx2) {
          if (indx2 === 0) {
            component.get('unitArray').insertAt(indx2, item2);
          }
          if (indx2 > 0) {
            if (
              item2 !== undefined &&
              item2.id !== undefined &&
              item2.collectionType !== undefined
            ) {
              var unitDetails = component
                .get('unitArray')
                .findBy('id', item2.id);
              if (unitDetails !== undefined) {
                var indxUnit = component.get('unitArray').indexOf(unitDetails);
                component.get('unitArray').removeAt(indxUnit);
                component.get('unitArray').insertAt(indxUnit, item2);
              }
            }
            if (indx2 === item1.performanceData.length - 1) {
              item1.set('performanceData', component.get('unitArray'));
            }
          }
        });
      });
      if (sortCriteria) {
        let metricsIndex = sortCriteria.metricsIndex;
        let sortedData = performanceData1;
        //alphabeticalStringSort
        if (metricsIndex === -1) {
          sortedData.sort(function(a, b) {
            return alphabeticalStringSort(a.user, b.user) * sortCriteria.order;
          });
        } else if (metricsIndex >= 0) {
          let sortByMetric = this.get('sortByMetric');
          sortedData.sort(function(a, b) {
            if (sortByMetric === 'score') {
              return (
                numberSort(
                  a.performanceData[0].score,
                  b.performanceData[0].score
                ) * sortCriteria.order
              );
            } else if (sortByMetric === 'completion') {
              return (
                numberSort(
                  a.performanceData[0].completionDone,
                  b.performanceData[0].completionDone
                ) * sortCriteria.order
              );
            } else {
              return (
                numberSort(
                  a.performanceData[0].studyTime,
                  b.performanceData[0].studyTime
                ) * sortCriteria.order
              );
            }
          });
        }
        return sortedData;
      } else {
        this.set('unitPerformanceData', performanceData1);
        return performanceData1;
      }
    }
  ),

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
  averageMetrics: Ember.A([
    Ember.Object.create({
      value: 'student',
      sorted: false,
      isAsc: false,
      visible: true,
      index: -1
    })
  ]),

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  dataPickerOptions: Ember.A(['score']),

  /**
   * List of selected options from the data picker.
   * @property {Boolean}
   */
  isLoading: false,
  /**
   * Query param, filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',

  /**
   * Indicate if the table is on collection level
   * @property {Boolean}
   */
  isCollection: Ember.computed.equal('headerType', 'collection'),

  model: Ember.A([
    Ember.Object.create({
      label: 'Students',
      valuePath: 'studentName',
      class: 'header',
      width: '150px'
    }),
    Ember.Object.create({
      label: 'Class Average',
      valuePath: 'classaverage',
      class: 'header',
      width: '150px'
    })
  ]),
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
    const component = this;
    component.set('filterBy', component.get('filterBy'));
    if (component.get('tempUnitId') !== null) {
      var unitDetails = component
        .get('headers')
        .findBy('id', component.get('tempUnitId'));
      if (unitDetails !== undefined) {
        var indx = component.get('headers').indexOf(unitDetails);
        component.removeexpandedUnit(component.get('tempUnitId'), indx);
      }
    }
  },
  didInsertElement() {
    'use strict';
    Ember.run.next(this, function() {
      this.$('table').addClass('table');
    });
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('sortCriteria', this.initSortCriteria());
    });
  },
  didRender() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },
  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.fetchRecords();
      }
    },
    sortChange: function(metric) {
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
      var temp = this.get('headers').objectAt(index);
      this.expandLesson(temp.get('id'), index);
      Ember.set(temp, 'showSubSub', true);
      Ember.set(temp, 'showAssessments', true);
    },
    showlessons(index) {
      var temp = this.get('headers').objectAt(index);
      this.expandUnit(temp.get('id'), index);
      Ember.set(temp, 'showSub', true);
      Ember.set(temp, 'showSubSub', false);
      Ember.set(temp, 'showAssessments', false);
    },
    expand(index) {
      if (this.get('tempUnitId') !== null) {
        var unitDetails = this.get('headers').findBy(
          'id',
          this.get('tempUnitId')
        );
        if (unitDetails !== undefined) {
          var indx = this.get('headers').indexOf(unitDetails);
          this.removeexpandedUnit(this.get('tempUnitId'), indx);
        }
      }
      this.set('filterBy', this.get('filterBy'));
      var temp = this.get('headers').objectAt(index);
      this.set('tempUnitId', temp.get('id'));
      this.expandUnit(temp.get('id'), index);
      Ember.set(temp, 'showSub', true);
    },
    collapse(index) {
      const component = this;
      const filterBy = component.get('filterBy');
      component.set('filterBy', component.get('filterBy'));
      var temp = component.get('headers').objectAt(index);
      Ember.set(temp, 'showSub', false);
      Ember.set(temp, 'showSubSub', false);
      var inxArr = [];
      component
        .get('averageHeaders')
        .performanceData.forEach(function(item, indx) {
          if (
            item.level !== undefined &&
            (item.level === 'lesson' || item.level === filterBy)
          ) {
            inxArr.pushObject(indx);
          }
        });
      inxArr.forEach(function(item, indx) {
        if (indx > 0) {
          component
            .get('averageHeaders')
            .performanceData.removeAt(inxArr.objectAt(indx) - indx);
        } else {
          component
            .get('averageHeaders')
            .performanceData.removeAt(inxArr.objectAt(indx));
        }
      });
      component.removeexpandedUnit(temp.get('id'), index);
      component.set('tempUnitId', null);
      Ember.set(temp, 'showSub', false);
    },
    onAfterResponsiveChange(matches) {
      if (matches.indexOf('jumbo') > -1) {
        this.get('table.expandedRows').setEach('expanded', false);
      }
    }
  },
  removeexpandedUnit: function(unitId, unitIndex) {
    const component = this;
    const classId = component.get('classId');
    const courseIdVal = component.get('courseId');
    const filterBy = component.get('filterBy');
    component.set('filterBy', component.get('filterBy'));
    component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        component
          .get('unitService')
          .fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp = component.get('headers').objectAt(unitIndex);
            Ember.set(temp, 'subColumns', []);
            Ember.set(temp, 'colspanval', 1);
            Ember.set(temp, 'showSub', false);
            var lessons = unit.get('children');
            component
              .get('performanceService')
              .findClassPerformanceByUnit(
                classId,
                courseIdVal,
                unitId,
                members.get('members'),
                { collectionType: filterBy }
              )
              .then(function(classPerformanceData) {
                const performanceData = createDataMatrix(
                  lessons,
                  classPerformanceData,
                  'unit'
                );
                component.set('lessonperformanceDataMatrix', performanceData);
                const lessonperformanceData = Ember.computed(
                  'lessonperformanceDataMatrix.length',
                  'sortCriteria',
                  function() {
                    const performanceData = this.get(
                      'lessonperformanceDataMatrix'
                    ).slice(1);
                    const sortCriteria = this.get('sortCriteria');
                    if (sortCriteria) {
                      let metricsIndex = sortCriteria.metricsIndex;
                      let sortedData = performanceData;
                      if (metricsIndex === -1) {
                        sortedData.sort(function(a, b) {
                          return (
                            alphabeticalStringSort(a.user, b.user) *
                            sortCriteria.order
                          );
                        });
                      } else if (metricsIndex >= 0) {
                        let sortByMetric = this.get('sortByMetric');
                        sortedData.sort(function(a, b) {
                          if (sortByMetric === 'score') {
                            return (
                              numberSort(
                                a.performanceData[0].score,
                                b.performanceData[0].score
                              ) * sortCriteria.order
                            );
                          } else if (sortByMetric === 'completion') {
                            return (
                              numberSort(
                                a.performanceData[0].completionDone,
                                b.performanceData[0].completionDone
                              ) * sortCriteria.order
                            );
                          } else {
                            return (
                              numberSort(
                                a.performanceData[0].studyTime,
                                b.performanceData[0].studyTime
                              ) * sortCriteria.order
                            );
                          }
                        });
                      }
                      return sortedData;
                    } else {
                      return performanceData;
                    }
                  }
                );
                component.set('lessonperformanceData', lessonperformanceData);
                component.get('lessonperformanceData').forEach(function(item) {
                  var lessonUser = item.user;
                  var lessonPerformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1) {
                    var indexLesson = 0;
                    if (lessonUser === item1.user) {
                      item1.performanceData.forEach(function(item9) {
                        if (item9 !== undefined && item9.id !== undefined) {
                          if (item9.id === unitId) {
                            if (lessonPerformanceData.length > lessons.length) {
                              lessonPerformanceData.removeAt(lessons.length);
                            }
                            item9.set('subColumns', []);
                            item9.set('subsubColumns', []);
                          }
                        }
                        indexLesson = indexLesson + 1;
                      });
                    }
                  });
                });
              });
          });
      });
  },
  expandUnit: function(unitId, unitIndex) {
    const component = this;
    const classId = component.get('classId');
    const courseIdVal = component.get('courseId');
    const filterBy = component.get('filterBy');
    component.set('filterBy', component.get('filterBy'));
    component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        component
          .get('unitService')
          .fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp = component.get('headers').objectAt(unitIndex);
            Ember.set(temp, 'subColumns', unit.get('children'));
            //component.set('colspanval',unit.get('children').length+1);
            Ember.set(temp, 'colspanval', unit.get('children').length + 1);
            var lessons = unit.get('children');
            var inxArr = [];
            component
              .get('averageHeaders')
              .performanceData.forEach(function(item, indx) {
                if (
                  item.level !== undefined &&
                  (item.level === 'lesson' || item.level === filterBy)
                ) {
                  inxArr.pushObject(indx);
                }
              });
            inxArr.forEach(function(item, indx) {
              if (indx > 0) {
                component
                  .get('averageHeaders')
                  .performanceData.removeAt(inxArr.objectAt(indx) - indx);
              } else {
                component
                  .get('averageHeaders')
                  .performanceData.removeAt(inxArr.objectAt(indx));
              }
            });
            component
              .get('performanceService')
              .findClassPerformanceByUnit(
                classId,
                courseIdVal,
                unitId,
                members.get('members'),
                { collectionType: filterBy }
              )
              .then(function(classPerformanceData) {
                const performanceData = createDataMatrix(
                  lessons,
                  classPerformanceData,
                  'unit'
                );
                component.set('lessonperformanceDataMatrix', performanceData);
                const lessonperformanceData = Ember.computed(
                  'lessonperformanceDataMatrix.length',
                  'sortCriteria',
                  function() {
                    const performanceData = this.get(
                      'lessonperformanceDataMatrix'
                    ).slice(1);
                    const sortCriteria = this.get('sortCriteria');
                    var lessnDataArr = component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0).performanceData;
                    component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0)
                      .set('performanceData', lessnDataArr);
                    var tempInx = unitIndex + 1;
                    component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0)
                      .performanceData.forEach(function(item, indx) {
                        if (indx > 0) {
                          item.set('level', 'lesson');
                          component
                            .get('averageHeaders')
                            .performanceData.insertAt(tempInx + indx, item);
                        }
                      });
                    if (sortCriteria) {
                      let metricsIndex = sortCriteria.metricsIndex;
                      let sortedData = performanceData;
                      if (metricsIndex === -1) {
                        sortedData.sort(function(a, b) {
                          return (
                            alphabeticalStringSort(a.user, b.user) *
                            sortCriteria.order
                          );
                        });
                      } else if (metricsIndex >= 0) {
                        let sortByMetric = this.get('sortByMetric');
                        sortedData.sort(function(a, b) {
                          if (sortByMetric === 'score') {
                            return (
                              numberSort(
                                a.performanceData[0].score,
                                b.performanceData[0].score
                              ) * sortCriteria.order
                            );
                          } else if (sortByMetric === 'completion') {
                            return (
                              numberSort(
                                a.performanceData[0].completionDone,
                                b.performanceData[0].completionDone
                              ) * sortCriteria.order
                            );
                          } else {
                            return (
                              numberSort(
                                a.performanceData[0].studyTime,
                                b.performanceData[0].studyTime
                              ) * sortCriteria.order
                            );
                          }
                        });
                      }
                      return sortedData;
                    } else {
                      return performanceData;
                    }
                  }
                );

                component.set('lessonperformanceData', lessonperformanceData);
                component.get('lessonperformanceData').forEach(function(item) {
                  var lessonUser = item.user;
                  var lessonPerformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1) {
                    var indexLesson = 0;
                    if (lessonUser === item1.user) {
                      item1.performanceData.forEach(function(item9) {
                        if (item9 !== undefined && item9.id !== undefined) {
                          if (item9.id === unitId) {
                            // if(lessonPerformanceData.length>lessons.length)
                            //   {
                            //     lessonPerformanceData.removeAt(lessons.length);
                            //   }
                            if (lessonPerformanceData.length !== 1) {
                              lessonPerformanceData.removeAt(0);
                            }
                            item9.set('subsubColumns', []);
                            item9.set('subColumns', []);
                            var lessonsStr = '';
                            lessons.forEach(function(lessonObj) {
                              lessonsStr = `${lessonsStr + lessonObj.id},`;
                              var emberObject = Ember.Object.create({
                                id: lessonObj.id
                              });
                              item9.get('subColumns').pushObject(emberObject);
                            });
                            for (
                              var j = 0;
                              j < lessonPerformanceData.length;
                              j++
                            ) {
                              if (lessonPerformanceData[j] !== undefined) {
                                if (
                                  lessonsStr.indexOf(
                                    lessonPerformanceData[j].id
                                  ) !== -1
                                ) {
                                  var group = item9
                                    .get('subColumns')
                                    .findBy('id', lessonPerformanceData[j].id);
                                  if (group !== undefined) {
                                    var indx = item9
                                      .get('subColumns')
                                      .indexOf(group);
                                    item9.get('subColumns').removeAt(indx);
                                    item9
                                      .get('subColumns')
                                      .insertAt(indx, lessonPerformanceData[j]);
                                  }
                                }
                              }
                            }
                          }
                        }
                        indexLesson = indexLesson + 1;
                      });
                    }
                  });
                });

                Ember.computed(
                  'lessonperformanceDataMatrix.length',
                  function() {
                    const averageHeaders = component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0);
                    component.set('averageHeadersLesson', averageHeaders);
                    return averageHeaders;
                  }
                );
              });
          });
      });
  },
  expandLesson: function(unitId, unitIndex) {
    const component = this;
    const filterBy = component.get('filterBy');
    component.set('filterBy', component.get('filterBy'));
    var inxArr = [];
    component.set('totalAssessments', 0);
    component
      .get('averageHeaders')
      .performanceData.forEach(function(item, indx) {
        if (
          item.level !== undefined &&
          (item.level === 'lesson' || item.level === filterBy)
        ) {
          inxArr.pushObject(indx);
        }
      });
    inxArr.forEach(function(item, indx) {
      if (indx > 0) {
        component
          .get('averageHeaders')
          .performanceData.removeAt(inxArr.objectAt(indx) - indx);
      } else {
        component
          .get('averageHeaders')
          .performanceData.removeAt(inxArr.objectAt(indx));
      }
    });
    //component.set('isLoading',true);
    const classId = component.get('classId');
    const courseIdVal = component.get('courseId');
    component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        component
          .get('unitService')
          .fetchById(courseIdVal, unitId)
          .then(function(unit) {
            var temp = component.get('headers').objectAt(unitIndex);
            Ember.set(temp, 'subColumns', unit.get('children'));
            //component.set('colspanval',unit.get('children').length+1);
            Ember.set(temp, 'colspanval', 1);
            var lessons = unit.get('children');
            component.set('assessment1performanceData', []);
            component.set('averageHeadersAssessment', []);
            component.set('boolFlag', false);
            lessons.forEach(function(lessonObj, lessonIndex) {
              setTimeout(function() {
                component.eachLesson(
                  courseIdVal,
                  unitId,
                  lessonObj,
                  unitIndex,
                  lessonIndex,
                  filterBy,
                  unit,
                  classId,
                  members,
                  temp
                );
              }, 500 * lessonIndex);
            });
          });
      });
  },
  eachLesson: function(
    courseIdVal,
    unitId,
    lessonObj,
    index1,
    lessonIndex,
    filterBy,
    unit,
    classId,
    members,
    temp
  ) {
    const component = this;
    component
      .get('lessonService')
      .fetchById(courseIdVal, unitId, lessonObj.id)
      .then(function(lesson) {
        Ember.set(lessonObj, 'subsubColumns', lesson.get('children'));
        const filteredCollections = lesson
          .get('children')
          .filter(function(collection) {
            return filterBy === 'both' || collection.get('format') === filterBy;
          });
        if (lessonIndex === 0) {
          component.set('averageHeadersAssessment', []);
        }
        var countCols = 0;
        var tempInx = index1 + 1;
        var array1 = [];
        var array2 = [];
        var arrayComplete = [];
        lesson.get('children').forEach(function(assessmentObj) {
          if (assessmentObj.format === filterBy) {
            countCols = countCols + 1;
            var emberObject = Ember.Object.create({
              id: assessmentObj.id,
              lessonId: lessonObj.id,
              level: filterBy
            });
            component.get('averageHeadersAssessment').pushObject(emberObject);
          }
        });
        Ember.run.later(function() {
          Ember.Logger.info('col---', component.get('totalAssessments'));
          if (
            component.get('averageHeadersAssessment').length === 0 &&
            component.get('totalAssessments') === 0
          ) {
            component.get('performanceData').forEach(function(item1) {
              item1.performanceData.forEach(function(item9) {
                item9.set('subColumns', []);
                item9.set('subsubColumns', []);
              });
            });
            var inxArr = [];
            component
              .get('averageHeaders')
              .performanceData.forEach(function(item, indx) {
                if (
                  item.level !== undefined &&
                  (item.level === 'lesson' || item.level === filterBy)
                ) {
                  inxArr.pushObject(indx);
                }
              });
            inxArr.forEach(function(item, indx) {
              if (indx > 0) {
                component
                  .get('averageHeaders')
                  .performanceData.removeAt(inxArr.objectAt(indx) - indx);
              } else {
                component
                  .get('averageHeaders')
                  .performanceData.removeAt(inxArr.objectAt(indx));
              }
            });
          } else if (
            component.get('averageHeadersAssessment').length ===
            component.get('totalAssessments')
          ) {
            component
              .get('averageHeaders')
              .performanceData.forEach(function(item, indx) {
                if (indx < tempInx) {
                  array1.pushObject(item);
                }
              });
            component
              .get('averageHeaders')
              .performanceData.forEach(function(item, indx) {
                if (indx >= tempInx) {
                  array2.pushObject(item);
                }
              });

            if (array2.length > countCols) {
              var inxArr11 = [];
              component
                .get('averageHeaders')
                .performanceData.forEach(function(item, indx) {
                  if (
                    item.level !== undefined &&
                    (item.level === 'lesson' || item.level === filterBy)
                  ) {
                    inxArr11.pushObject(indx);
                  }
                });
              inxArr11.forEach(function(item, indx) {
                if (indx > 0) {
                  component
                    .get('averageHeaders')
                    .performanceData.removeAt(inxArr11.objectAt(indx) - indx);
                } else {
                  component
                    .get('averageHeaders')
                    .performanceData.removeAt(inxArr11.objectAt(indx));
                }
              });
              Ember.run.later(function() {
                array2.forEach(function(item, indx) {
                  if (
                    (item.level !== undefined && item.level === filterBy) ||
                    item.collectionType === 'collection'
                  ) {
                    array2.removeAt(indx);
                  }
                });
                arrayComplete.pushObjects(array1);
                arrayComplete.pushObjects(
                  component.get('averageHeadersAssessment')
                );
                arrayComplete.pushObjects(array2);
                Ember.Logger.info('array1---', array1);
                Ember.Logger.info('array2---', array2);
                Ember.Logger.info(
                  'array3---',
                  component.get('averageHeadersAssessment')
                );
                component
                  .get('averageHeaders')
                  .set('performanceData', arrayComplete);
              }, 2000);
            } else {
              array2.forEach(function(item, indx) {
                if (
                  (item.level !== undefined && item.level === filterBy) ||
                  item.collectionType === 'collection'
                ) {
                  array2.removeAt(indx);
                }
              });
              arrayComplete.pushObjects(array1);
              arrayComplete.pushObjects(
                component.get('averageHeadersAssessment')
              );
              arrayComplete.pushObjects(array2);
              Ember.Logger.info('array11---', array1);
              Ember.Logger.info('array22---', array2);
              Ember.Logger.info(
                'array32---',
                component.get('averageHeadersAssessment')
              );
              component
                .get('averageHeaders')
                .set('performanceData', arrayComplete);
            }
          }
        }, 2000);
        if (countCols === 0) {
          var lessonValObj = temp.get('subColumns').findBy('id', lessonObj.id);
          if (lessonValObj !== undefined) {
            var indx = temp.get('subColumns').indexOf(lessonValObj);
            temp.get('subColumns').removeAt(indx);
          }
        }
        if (countCols > 0) {
          //component.set('colspanval',temp.get('subColumns').length+1 +(countCols));
          component.set(
            'totalAssessments',
            component.get('totalAssessments') + countCols
          );
          Ember.set(temp, 'colspanval', component.get('totalAssessments') + 1);
          component
            .get('performanceService')
            .findClassPerformanceByUnitAndLesson(
              classId,
              courseIdVal,
              unitId,
              lessonObj.id,
              members.get('members'),
              { collectionType: filterBy }
            )
            .then(function(classPerformanceData) {
              const performanceData = createDataMatrix(
                filteredCollections,
                classPerformanceData,
                'lesson'
              );
              component.set('assessmentperformanceDataMatrix', performanceData);
              const assessmentperformanceData = Ember.computed(
                'assessmentperformanceDataMatrix.length',
                'sortCriteria',
                function() {
                  const performanceData = this.get(
                    'assessmentperformanceDataMatrix'
                  ).slice(1);
                  const sortCriteria = this.get('sortCriteria');
                  if (sortCriteria) {
                    let metricsIndex = sortCriteria.metricsIndex;
                    let sortedData = performanceData;
                    if (metricsIndex === -1) {
                      sortedData.sort(function(a, b) {
                        return (
                          alphabeticalStringSort(a.user, b.user) *
                          sortCriteria.order
                        );
                      });
                    } else if (metricsIndex >= 0) {
                      let sortByMetric = this.get('sortByMetric');
                      sortedData.sort(function(a, b) {
                        if (sortByMetric === 'score') {
                          return (
                            numberSort(
                              a.performanceData[0].score,
                              b.performanceData[0].score
                            ) * sortCriteria.order
                          );
                        } else if (sortByMetric === 'completion') {
                          return (
                            numberSort(
                              a.performanceData[0].completionDone,
                              b.performanceData[0].completionDone
                            ) * sortCriteria.order
                          );
                        } else {
                          return (
                            numberSort(
                              a.performanceData[0].studyTime,
                              b.performanceData[0].studyTime
                            ) * sortCriteria.order
                          );
                        }
                      });
                    }
                    return sortedData;
                  } else {
                    return performanceData;
                  }
                }
              );
              component.set(
                'assessmentperformanceData',
                assessmentperformanceData
              );
              var indx = 0;
              component
                .get('assessmentperformanceData')
                .forEach(function(item) {
                  var lessonUser = item.userId;
                  var assessmentperformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1) {
                    var indexLesson = 0;
                    if (lessonUser === item1.userId) {
                      item1.performanceData.forEach(function(item9) {
                        if (item9 !== undefined && item9.id !== undefined) {
                          if (item9.id === unitId) {
                            assessmentperformanceData.removeAt(0);
                            item9.set('subColumns', []);
                            if (lessonIndex === 0) {
                              item9.set('subsubColumns', []);
                            }
                            var assessmentsStr = '';
                            var colcount = 0;
                            lesson
                              .get('children')
                              .forEach(function(assessmentObj) {
                                if (assessmentObj.format === filterBy) {
                                  assessmentsStr = `${assessmentsStr +
                                    assessmentObj.id},`;
                                  var emberObject = Ember.Object.create({
                                    id: assessmentObj.id,
                                    lessonId: lessonObj.id
                                  });
                                  item9
                                    .get('subsubColumns')
                                    .pushObject(emberObject);
                                  colcount = colcount + 1;
                                }
                              });
                            for (
                              var j = 0;
                              j < assessmentperformanceData.length;
                              j++
                            ) {
                              if (assessmentperformanceData[j] !== undefined) {
                                if (
                                  assessmentsStr.indexOf(
                                    assessmentperformanceData[j].id
                                  ) !== -1
                                ) {
                                  var group = item9
                                    .get('subsubColumns')
                                    .findBy(
                                      'id',
                                      assessmentperformanceData[j].id
                                    );
                                  if (group !== undefined) {
                                    var indx = item9
                                      .get('subsubColumns')
                                      .indexOf(group);
                                    var objAtLesson = item9
                                      .get('subsubColumns')
                                      .objectAt(indx);
                                    if (objAtLesson.lessonId === lessonObj.id) {
                                      item9.get('subsubColumns').removeAt(indx);
                                      item9
                                        .get('subsubColumns')
                                        .insertAt(
                                          indx,
                                          assessmentperformanceData[j]
                                        );
                                      component
                                        .get('averageHeadersAssessment')
                                        .removeAt(indx);
                                      component
                                        .get('averageHeadersAssessment')
                                        .insertAt(
                                          indx,
                                          assessmentperformanceData[j]
                                        );
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        indexLesson = indexLesson + 1;
                      });
                    }
                  });
                  indx = indx + 1;
                });
              component.set('isLoading', false);
              //  Ember.computed('assessmentperformanceDataMatrix.length', function() {
              //   const averageHeaders = component.get('assessmentperformanceDataMatrix').objectAt(0);
              //   component.set('averageHeadersAssessment',averageHeaders);
              //   return averageHeaders;
              // });
            });
        }
      });
    //}
    index1 = index1 + 1;
  },
  /**
   * Initialize the table's sort criteria
   * @return {Object}
   */
  initSortCriteria: function() {
    return {
      metricsIndex: -1,
      order: this.get('defaultSortOrder')
    };
  }
});
