import Ember from 'ember';
import { createDataMatrix } from 'gooru-web/utils/performance-data';
import { alphabeticalStringSort, numberSort } from 'gooru-web/utils/utils';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';
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
   * @property {Headers[]}
   */

  tempheaders: null,
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
   * @property {selectedUnitId}
   */

  selectedUnitId: null,
  /**
   * Action name when the user clicks at any score box
   * @property {string}
   */
  onClickReport: null,
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
   * The averageheaders of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeaders: Ember.computed('performanceDataMatrix.length', function() {
    const averageHeaders = this.get('performanceDataMatrix').objectAt(0);
    return averageHeaders;
  }),
  /**
   * If study time option is selected
   * @property {Boolean}
   */
  showStudyTime: Ember.computed('dataPickerOptions.[]', function() {
    const dataPickerOptions = this.get('dataPickerOptions');
    return dataPickerOptions.includes('time-spent');
  }),
  /**
   * If study time option is selected
   * @property {Boolean}
   */
  showReportTime: Ember.computed('dataPickerOptions.[]', function() {
    const dataPickerOptions = this.get('dataPickerOptions');
    return (
      dataPickerOptions.includes('time-spent') &&
      dataPickerOptions.includes('score')
    );
  }),
  /**
   * The averageheaders of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeadersLesson: [],
  /**
   * The averageheaders of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeadersAssessment: [],
  /**
   * The averageheaders of the Data Matrix
   * @property {averageHeaderstempAssessment[]}
   */
  averageHeaderstempAssessment: [],
  /**
   * The averageheaders of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  unitPerformanceData: [],
  /**
   * The averageheaders of the Data Matrix
   * @property {unitArray[]}
   */
  unitArray: [],
  /**
   * The averageheaders of the Data Matrix
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
   * The averageheaders of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  lesson1PerformanceData: [],
  /**
   * The averageheaders of the Data Matrix
   * @property {totalAssessments}
   */
  totalAssessments: 0,
  /**
   * The averageheaders of the Data Matrix
   * @property {boolFlag}
   */
  boolFlag: false,
  /**
   * The averageheaders of the Data Matrix
   * @property {expandedUnit}
   */
  expandedUnit: false,
  /**
   * The averageheaders of the Data Matrix
   * @property {unitPerformanceData[]}
   */
  assessment1PerformanceData: [],
  /**
   * The user performanceData
   * Gets data from performanceDataMatrix
   * 1) Silce
   *
   * @property {performanceData[]}
   */
  performanceData: Ember.computed(
    'performanceDataMatrix.length',
    'sortCriteria',
    function() {
      const component = this;

      /*
        //Removing top row from performanceDataMatrix that is
        // Header average for each item (unit|lesson|collection)
        // What is remaining is students data along with their performance data
        // For Example performanceDataMatrix 0 is class performance object with rows of
  */

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

      /*
        // Arrange units in
        // 1 sequence of headers,
        // 2 Units are inside of each of students performanceData
        // 3 here students nested collection is tempUnitPerformanceArray
        // 4 Nested levels are
        // a)     PerformanceDataMatrix which is nested array/collection
        // a.1)   PerformanceDataMatrix first item
        //        is performaceData array or collection object having score / timespent information
        //        at the LEVEL in a sequence, if level changes it gets recomputed for the given "LEVEL"
        //        LEVELS are drill down of "Class", "UNIT", "Lesson","Assessment", "Collection",
        //        All collapesed is CLASS and UNITS, thus level is "Course", and collection type would be
        //        R1, C1 = Class avg, R1,C2 till number of units in that course,i.e. R1, C(no of units) in Sequenc of units ?
        //        DRILL DOWN1 - is Expanded uni
        //        This forms "Class average row on UI", and sequence is captured from DB ? todo verify
        // a.2)   Students wise performanceData
        //        Which is having user, and userId of Student and performanceData collection
        //a.2.1)  perfromanceData collection
        //a.2.1.1) Average score of student across level,
        //a.2.1.2) Average score of student across units
      */

      component.get('tempUnitPerformanceArray').forEach(function(user) {
        component.set('unitArray', []);
        // 1st create unit array
        component.get('headers').forEach(function(unit) {
          if (unit !== undefined) {
            var emberObject = Ember.Object.create({
              id: unit.id
            });
            component.get('unitArray').pushObject(emberObject);
          }
        });

        user.performanceData.forEach(function(userunitperfromance, pdindx) {
          if (pdindx === 0) {
            // index 0 is always the performance data avg of that "level" Row average and not the column
            component.get('unitArray').insertAt(pdindx, userunitperfromance);
          }
          if (pdindx > 0) {
            if (
              userunitperfromance !== undefined &&
              userunitperfromance.id !== undefined &&
              userunitperfromance.collectionType !== undefined
            ) {
              var unitDetails = component
                .get('unitArray')
                .findBy('id', userunitperfromance.id);
              if (unitDetails !== undefined) {
                var indxUnit = component.get('unitArray').indexOf(unitDetails);
                component.get('unitArray').removeAt(indxUnit);
                component
                  .get('unitArray')
                  .insertAt(indxUnit, userunitperfromance);
              }
            }
            if (pdindx === user.performanceData.length - 1) {
              // Set this data back to the user profmance
              user.set('performanceData', component.get('unitArray'));
            }
          }
        });
      });
      if (sortCriteria) {
        let sortedData = component.getSortedData(
          sortCriteria,
          performanceData1
        );
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
   * List of selected options from the data picker.
   * @property {Boolean}
   */
  isExpanded: false,
  /**
   * Query param, filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',
  /**
   * Query param, filterBy selected
   * @property {String}
   */
  nodata: '--NO DATA--',
  /**
   * Query param, filterBy selected
   * @property {String}
   */
  loaderIcon: '',

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
  defaultSortOrderScore: 1,
  defaultSortOrderStudent: 1,
  defaultSortOrderTime: 1,
  defaultSortOrderCompletion: 1,

  /**
   * metric sent by the sort function
   */
  sortByMetric: null,

  init() {
    this._super(...arguments);
    const component = this;
    component.set('loaderIcon', DEFAULT_IMAGES.LOADER_IMAGE);
    component.set('filterBy', component.get('filterBy'));
    component.removeexpandedUnit();

    component.get('headers').forEach(function(levelheader, index) {
      var orginalTitle = levelheader.get('title');
      if (!(orginalTitle.indexOf(':') !== -1)) {
        levelheader.set('title', `U${index + 1}: ${orginalTitle}`);
      }
      if (!orginalTitle.startsWith('U')) {
        levelheader.set('title', `U${index + 1}: ${orginalTitle}`);
      }
      if (levelheader.get('lessonCount') === 0) {
        Ember.set(levelheader, 'hideExpand', true);
      } else {
        Ember.set(levelheader, 'hideExpand', false);
      }
    });
    if (component.get('selectedUnitId') !== null) {
      var unitDetails = component
        .get('tempheaders')
        .findBy('id', component.get('selectedUnitId'));
      if (unitDetails !== undefined) {
        component.removeexpandedUnit();
      }
    }
    if (
      component.getStoredUnitIdVal() !== null &&
      component.getStoredUnitIdVal() !== 'null'
    ) {
      component.expandByUnit(component.getStoredUnitIdVal());
    }
  },

  resetDisplayVars(leveheader, component) {
    Ember.set(leveheader, 'showSub', false);
    component.set('expandedUnit', false);
    Ember.set(leveheader, 'showSubSub', false);
    Ember.set(leveheader, 'showAssessments', false);
    Ember.set(leveheader, 'subColumns', []);
    Ember.set(leveheader, 'colspanval', 1);
  },

  didInsertElement() {
    'use strict';
    Ember.run.next(this, function() {
      this.$('table').addClass('table');
    });
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('sortCriteria', this.initSortCriteria());
    });
    Ember.$('#clscroll-content').scroll(function() {
      Ember.$('#clscroll-row-headers').scrollTop(
        Ember.$('#clscroll-content').scrollTop()
      );
      Ember.$('#clscroll-column-headers').scrollLeft(
        Ember.$('#clscroll-content').scrollLeft()
      );
    });
    Ember.$('#clscroll-column-headers').scroll(function() {
      Ember.$('#header-Table').attr('style', 'padding-right:15px;');
      if (Ember.$('#clscroll-column-headers').scrollLeft() === 0) {
        Ember.$('#header-Table').attr('style', 'padding-right:0px;');
      }
      Ember.$('#clscroll-content').scrollLeft(
        Ember.$('#clscroll-column-headers').scrollLeft()
      );
    });
    Ember.$('#clscroll-row-headers').scroll(function() {
      $('#clscroll-content').scrollTop(
        Ember.$('#clscroll-row-headers').scrollTop()
      );
    });
  },

  didRender() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    var width = Ember.$('#clscroll-table').width();
    var height = Ember.$(window).height() - 63;
    if (height > 300) {
      height = height - 191;
    }
    Ember.$('#clscroll-content').attr(
      'style',
      `width:${width + 15}px;max-height:${height}px;`
    );
    Ember.$('#clscroll-row-headers').attr('style', `height:${height - 2}px;`);
  },

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.fetchRecords();
      }
    },
    sortChange: function(metric) {
      const component = this;
      var metricsIndex = metric.get('index');
      component.set('sortByMetric', metric.get('value'));
      let performanceData = component.get('performanceData');
      //alphabeticalStringSort

      let defaultsorton = 'defaultSortOrderStudent';
      if (metricsIndex === -1) {
        defaultsorton = 'defaultSortOrderStudent';
      } else if (metricsIndex >= 0) {
        let sortByMetric = component.get('sortByMetric');
        if (sortByMetric === 'score') {
          defaultsorton = 'defaultSortOrderScore';
        } else if (sortByMetric === 'completion') {
          defaultsorton = 'defaultSortOrderCompletion';
        } else {
          defaultsorton = 'defaultSortOrderTime';
        }
      }
      let sortCriteria = {
        metricsIndex: metricsIndex,
        order: component.get(defaultsorton)
      };
      let sortedData = component.getSortedData(sortCriteria, performanceData);
      component.set(defaultsorton, sortCriteria.order * -1); // Toggle sort order from -1 to 1
      component.set('performanceData', []);
      component.set('performanceData', sortedData);
    },

    showassessments(index) {
      var unitheader = this.get('headers').objectAt(index);
      this.set('isLoading', true);
      Ember.set(unitheader, 'showSub', true);
      this.set('expandedUnit', true);
      Ember.set(unitheader, 'showSubSub', true);
      Ember.set(unitheader, 'showAssessments', true);
      this.expandLesson(unitheader.get('id'), index);
    },
    showlessons(index) {
      var lessonatheaderindex = this.get('headers').objectAt(index);
      this.set('isLoading', true);
      this.expandUnit(lessonatheaderindex.get('id'), index);
      Ember.set(lessonatheaderindex, 'showSub', true);
      this.set('expandedUnit', true);
      Ember.set(lessonatheaderindex, 'showSubSub', false); //Check if showAssessments can be used for both assessments and collections
      Ember.set(lessonatheaderindex, 'showAssessments', false);
    },

    expand(expandindex) {
      let component = this;
      this.set('isLoading', true);
      var headertoexpand = this.get('headers').objectAt(expandindex);
      if (this.get('selectedUnitId') !== null) {
        var unitDetails = this.get('tempheaders').findBy(
          'id',
          this.get('selectedUnitId')
        );
        if (unitDetails !== undefined) {
          this.removeexpandedUnit();
          component.setExpand(headertoexpand, expandindex);
        }
      } else {
        component.setExpand(headertoexpand, expandindex);
      }
    },
    /**
     * When the user clicks at the report
     */
    clickReport: function(performance, userPerformance) {
      if (this.get('onClickReport')) {
        this.sendAction('onClickReport', performance, userPerformance);
      }
    },
    /**
     * navigateToAssessments
     */
    navigateToCollection: function(unitId, lessonId, collectionId) {
      this.sendAction('onAssessmentClick', unitId, lessonId, collectionId);
    },
    collapse() {
      const component = this;
      component.set('filterBy', component.get('filterBy'));
      component.removeexpandedUnit(); // This takes care of resetting display vars
      component.set('selectedUnitId', null);
      this.storeClickValues(null);
      this.set('isExpanded', false);
      component.set('tempheaders', null);
      this.extractoldavg(component);
    },
    onAfterResponsiveChange(matches) {
      if (matches.indexOf('jumbo') > -1) {
        this.get('table.expandedRows').setEach('expanded', false);
      }
    }
  },
  setExpand(headertoexpand, expandindex) {
    this.set('filterBy', this.get('filterBy'));
    this.set('selectedUnitId', headertoexpand.get('id'));
    this.storeClickValues(headertoexpand.get('id'));
    this.set('isExpanded', true);
    this.set('tempheaders', this.get('headers'));
    this.expandLesson(headertoexpand.get('id'), expandindex);
    Ember.set(headertoexpand, 'showSub', true);
    this.set('expandedUnit', true);
    Ember.set(headertoexpand, 'showSubSub', true);
    Ember.set(headertoexpand, 'showAssessments', true);
  },
  removeexpandedUnit: function() {
    const component = this;
    component.get('headers').forEach(function(levelheader) {
      component.resetDisplayVars(levelheader, component);
    });
    component.get('performanceData').forEach(function(userperfdata) {
      userperfdata.performanceData.forEach(function(levelperformance) {
        levelperformance.set('subColumns', []);
        levelperformance.set('subsubColumns', []);
      });
    });
    component.set('averageHeaderstempAssessment', []);
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
            unit.get('children').forEach(function(item, indx) {
              var orginalTitle = item.get('title');
              item.set('title', `L${indx + 1}: ${orginalTitle}`);
            });
            Ember.set(temp, 'subColumns', unit.get('children'));
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
                const performanceData2 = createDataMatrix(
                  lessons,
                  classPerformanceData,
                  'unit'
                );
                component.set('lessonperformanceDataMatrix', performanceData2);
                const lessonperformanceData = Ember.computed(
                  'lessonperformanceDataMatrix.length',
                  'sortCriteria',
                  function() {
                    const performanceData3 = this.get(
                      'lessonperformanceDataMatrix'
                    );
                    var tempInx = unitIndex + 1;
                    var lessnDataArr = component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0).performanceData;
                    component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0)
                      .set('performanceData', lessnDataArr);
                    component
                      .get('lessonperformanceDataMatrix')
                      .objectAt(0)
                      .performanceData.forEach(function(item, indx) {
                        if (indx > 0) {
                          item.set('level', 'lesson');
                          item.set('unitId', unitId);
                          component
                            .get('averageHeaders')
                            .performanceData.insertAt(tempInx + indx, item);
                        }
                      });
                    component.set('lessonperformanceData', performanceData3);
                    return performanceData3;
                  }
                );
                component.set('lessonperformanceData', lessonperformanceData);
                component.get('lessonperformanceData').forEach(function(item) {
                  var lessonUser = item.user;
                  var lessonPerformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1) {
                    var indexLesson = 0;
                    var tempInx = unitIndex + 1;
                    if (lessonUser === item1.user) {
                      item1.performanceData.forEach(function(
                        item9,
                        lessonpIndex
                      ) {
                        if (item9 !== undefined && item9.id !== undefined) {
                          if (item9.id === unitId) {
                            item9.set('unitIdVal', unitId);
                            if (lessonpIndex === tempInx) {
                              var hdrObj = component
                                .get('averageHeaders')
                                .performanceData.objectAt(lessonpIndex);
                              hdrObj.set('unitIdVal', unitId);
                              component
                                .get('averageHeaders')
                                .performanceData.removeAt(lessonpIndex);
                              component
                                .get('averageHeaders')
                                .performanceData.insertAt(lessonpIndex, hdrObj);
                            }
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
                              if (j === lessonPerformanceData.length - 1) {
                                component.set('isLoading', false);
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
  extractoldavg: function(component) {
    const filterBy = component.get('filterBy');
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
      //'This is used only in collape flow'

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
  },

  expandLesson: function(unitId, unitIndex) {
    const component = this;
    component.set('filterBy', component.get('filterBy'));
    component.get('performanceData').forEach(function(userperfdata) {
      userperfdata.performanceData.forEach(function(unit) {
        unit.set('subColumns', []);
        unit.set('subsubColumns', []);
      });
    });
    component.set('totalAssessments', 0);
    this.extractoldavg(component);
    const classId = component.get('classId');
    const courseIdVal = component.get('courseId');

    var promiseclassmembers = {
      membersdata: new Ember.RSVP.Promise(resolve => {
        component
          .get('classService')
          .readClassMembers(classId)
          .then(members => resolve(members));
      }),
      unitsdata: new Ember.RSVP.Promise(resolve => {
        component
          .get('unitService')
          .fetchById(courseIdVal, unitId)
          .then(unit => resolve(unit));
      })
    };

    Ember.RSVP.hash(promiseclassmembers).then(function(hash) {
      component.showLessonsData(
        hash.unitsdata,
        hash.membersdata,
        unitIndex,
        unitId
      );
    }, component);
  },

  showLessonsData: function(unit, members, unitIndex, unitId) {
    const component = this;
    const filterBy = component.get('filterBy');
    const classId = component.get('classId');
    const courseIdVal = component.get('courseId');

    var unitheader = component.get('headers').objectAt(unitIndex);
    var lessons = unit.get('children');

    lessons.forEach(function(lesson, indx) {
      var orginalTitle = lesson.get('title');
      lesson.set('title', `L${indx + 1}: ${orginalTitle}`);
    });

    Ember.set(unitheader, 'subColumns', lessons);
    Ember.set(unitheader, 'colspanval', 1);
    component.set('assessment1performanceData', []);
    component.set('averageHeadersAssessment', []);
    component.set('averageHeaderstempAssessment', []);
    component.set('boolFlag', false);

    if (filterBy === 'collection') {
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
            unitheader,
            unitIndex,
            lessons.length
          );
        }, 500 * lessonIndex);
      });
    } else {
      component
        .get('performanceService')
        .findClassPerformanceByUnitAndLesson(
          classId,
          courseIdVal,
          unitId,
          '',
          members.get('members'),
          { collectionType: filterBy }
        )
        .then(function(classPerformanceData) {
          let lessonSeqpromise = [];
          lessons.forEach(function(lessonObj) {
            lessonSeqpromise.push(
              new Ember.RSVP.Promise(function(resolve) {
                component
                  .get('lessonService')
                  .fetchById(courseIdVal, unitId, lessonObj.id)
                  .then(lesson => resolve(lesson));
              })
            );
          });

          Ember.RSVP.all(lessonSeqpromise).then(lessonsassessment => {
            var totallessonsofunit = lessonsassessment.length - 1;
            lessonsassessment.forEach((lessonassements, lessonIndex) => {
              component.eachLessonAssessment(
                courseIdVal,
                unitId,
                lessonassements.id,
                unitIndex,
                lessonIndex,
                filterBy,
                unit,
                classId,
                members,
                unitheader,
                unitIndex,
                lessons.length,
                classPerformanceData,
                lessonassements
              );

              if (totallessonsofunit === lessonIndex) {
                component.showAverageRow(unitId, unitIndex);
              }
            });
          });
        });
    }
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
    temp,
    unitIndex,
    lessonLen
  ) {
    const component = this;
    component
      .get('lessonService')
      .fetchById(courseIdVal, unitId, lessonObj.id)
      .then(function(lesson) {
        const filteredCollections = lesson
          .get('children')
          .filter(function(collection) {
            return filterBy === 'both' || collection.get('format') === filterBy;
          });
        Ember.set(lessonObj, 'subsubColumns', []);
        if (lessonIndex === 0) {
          component.set('averageHeadersAssessment', []);
        }
        var countCols = 0;
        var tempInx = index1 + 1;
        var array1 = [];
        var array2 = [];
        var arrayComplete = [];
        var timerConst = 2000;
        if (lessonLen > 3) {
          timerConst = 500 * lessonLen;
        }
        var tempVal = 0;
        if (lessonIndex === 0) {
          component.set('averageHeaderstempAssessment', []);
        }
        lesson.get('children').forEach(function(assessmentObj) {
          if (assessmentObj.format === filterBy) {
            tempVal = tempVal + 1;
            countCols = countCols + 1;
            var emberObject = Ember.Object.create({
              id: assessmentObj.id,
              lessonId: lessonObj.id,
              level: filterBy
            });
            var orginalTitle = assessmentObj.get('title');
            if (filterBy === 'assessment') {
              assessmentObj.set('title', `A${tempVal}: ${orginalTitle}`);
            } else {
              assessmentObj.set('title', `C${tempVal}: ${orginalTitle}`);
            }
            lessonObj.get('subsubColumns').pushObject(assessmentObj);
            component.get('averageHeadersAssessment').pushObject(emberObject);
          }
        });
        if (tempVal === 0) {
          countCols = countCols + 1;
          var tempassessmentObj = Ember.Object.create({
            format: filterBy,
            id: 'NoObject',
            collectionType: filterBy,
            openEndedQuestionCount: 0,
            questionCount: 0,
            resourceCount: 0,
            title: '--NO DATA--'
          });
          lessonObj.get('subsubColumns').pushObject(tempassessmentObj);
        }
        Ember.run.later(function() {
          component.set('averageHeadersAssessment', []);
          component
            .get('averageHeaderstempAssessment')
            .forEach(function(lessonItem) {
              var emberObject = Ember.Object.create({
                id: 'NoObject',
                lessonId: lessonItem.lessonId,
                collectionType: filterBy,
                unitId: unitId,
                level: filterBy
              });
              if (lessonItem.lessonData.length > 0) {
                lessonItem.lessonData.forEach(function(item23) {
                  item23.set('level', filterBy);
                  item23.set('unitId', unitId);
                  item23.set('lessonId', lessonItem.lessonId);
                  component.get('averageHeadersAssessment').pushObject(item23);
                });
              } else {
                component
                  .get('averageHeadersAssessment')
                  .pushObject(emberObject);
              }
            });
          if (
            component.get('averageHeadersAssessment').length ===
            component.get('totalAssessments')
          ) {
            component.set('isLoading', false);
          }
          if (
            component.get('averageHeadersAssessment').length === 0 &&
            component.get('totalAssessments') === 0
          ) {
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
              array2.forEach(function(item, indx) {
                if (
                  (item.level !== undefined && item.level === filterBy) ||
                  (item.collectionType !== undefined &&
                    item.collectionType === filterBy)
                ) {
                  array2.removeAt(indx);
                }
              });
              arrayComplete.pushObjects(array1);
              arrayComplete.pushObjects(
                component.get('averageHeadersAssessment')
              );
              array2.forEach(function(item) {
                if (
                  !(
                    (item.collectionType !== undefined &&
                      item.collectionType === filterBy) ||
                    (item.level !== undefined && item.level === filterBy)
                  )
                ) {
                  arrayComplete.pushObject(item);
                }
              });
              component
                .get('averageHeaders')
                .set('performanceData', arrayComplete);
            } else {
              array2.forEach(function(item, indx) {
                if (
                  (item.level !== undefined && item.level === filterBy) ||
                  (item.collectionType !== undefined &&
                    item.collectionType === filterBy)
                ) {
                  array2.removeAt(indx);
                }
              });
              arrayComplete.pushObjects(array1);
              arrayComplete.pushObjects(
                component.get('averageHeadersAssessment')
              );
              array2.forEach(function(item) {
                if (
                  !(
                    (item.collectionType !== undefined &&
                      item.collectionType === filterBy) ||
                    (item.level !== undefined && item.level === filterBy)
                  )
                ) {
                  arrayComplete.pushObject(item);
                }
              });
              component
                .get('averageHeaders')
                .set('performanceData', arrayComplete);
            }
          }
        }, timerConst);
        if (countCols === 0) {
          var lessonValObj = temp.get('subColumns').findBy('id', lessonObj.id);
          if (lessonValObj !== undefined) {
            var indx = temp.get('subColumns').indexOf(lessonValObj);
            temp.get('subColumns').removeAt(indx);
          }
          component.set('isLoading', false);
        }
        if (countCols > 0) {
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
                  var lessonPerformanceObj = Ember.Object.create({
                    lessonId: lessonObj.id,
                    lessonData: component
                      .get('assessmentperformanceDataMatrix')
                      .objectAt(0)
                      .performanceData.slice(1)
                  });
                  component
                    .get('averageHeaderstempAssessment')
                    .pushObject(lessonPerformanceObj);
                  return performanceData;
                }
              );

              component.set(
                'assessmentperformanceData',
                assessmentperformanceData
              );
              var indxObj = 0;
              component
                .get('assessmentperformanceData')
                .forEach(function(item) {
                  var lessonUser = item.userId;
                  var assessmentperformanceData = item.performanceData;
                  component.get('performanceData').forEach(function(item1) {
                    var indexLesson = 0;
                    var tempInx = unitIndex + 1;
                    if (lessonUser === item1.userId) {
                      item1.performanceData.forEach(function(
                        item9,
                        lessonpIndex
                      ) {
                        if (item9 !== undefined && item9.id !== undefined) {
                          if (item9.id === unitId) {
                            item9.set('unitIdVal', unitId);
                            if (lessonpIndex === tempInx) {
                              var hdrObj = component
                                .get('averageHeaders')
                                .performanceData.objectAt(lessonpIndex);
                              hdrObj.set('unitIdVal', unitId);
                              component
                                .get('averageHeaders')
                                .performanceData.removeAt(lessonpIndex);
                              component
                                .get('averageHeaders')
                                .performanceData.insertAt(lessonpIndex, hdrObj);
                            }
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
                                    unitId: unitId,
                                    lessonId: lessonObj.id
                                  });
                                  if (
                                    item9.get('subsubColumns') !== undefined
                                  ) {
                                    item9
                                      .get('subsubColumns')
                                      .pushObject(emberObject);
                                  } else {
                                    item9.set('subsubColumns', []);
                                    item9
                                      .get('subsubColumns')
                                      .pushObject(emberObject);
                                  }
                                  colcount = colcount + 1;
                                }
                              });
                            if (tempVal === 0) {
                              assessmentsStr = `${`${assessmentsStr}NoObject`},`;
                              var emberObject = Ember.Object.create({
                                id: 'NoObject',
                                unitId: unitId,
                                lessonId: lessonObj.id
                              });
                              if (item9.get('subsubColumns') !== undefined) {
                                item9
                                  .get('subsubColumns')
                                  .pushObject(emberObject);
                              } else {
                                item9.set('subsubColumns', []);
                                item9
                                  .get('subsubColumns')
                                  .pushObject(emberObject);
                              }
                            }
                            for (
                              var j = 0;
                              j < assessmentperformanceData.length;
                              j++
                            ) {
                              if (
                                assessmentperformanceData[j] !== undefined &&
                                tempVal !== 0
                              ) {
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
                                    indxObj = item9
                                      .get('subsubColumns')
                                      .indexOf(group);
                                    assessmentperformanceData[j].set(
                                      'unitId',
                                      unitId
                                    );
                                    assessmentperformanceData[j].set(
                                      'lessonId',
                                      lessonObj.id
                                    );
                                    var objAtLesson = item9
                                      .get('subsubColumns')
                                      .objectAt(indxObj);

                                    if (objAtLesson.lessonId === lessonObj.id) {
                                      item9
                                        .get('subsubColumns')
                                        .removeAt(indxObj);
                                      item9
                                        .get('subsubColumns')
                                        .insertAt(
                                          indxObj,
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
                  indxObj = indxObj + 1;
                });
            });
        }
      });
    index1 = index1 + 1;
  },
  eachLessonAssessment: function(
    courseIdVal,
    unitId,
    lessonid,
    index1,
    lessonIndex,
    filterBy,
    unit,
    classId,
    members,
    unitheader,
    unitIndex,
    lessonLen,
    classPerformanceData,
    lesson
  ) {
    const component = this;
    var unitlessonObj = unitheader.get('subColumns').findBy('id', lessonid);
    component.set('isLoading', false);
    const filteredCollections = lesson
      .get('children')
      .filter(function(collection) {
        return filterBy === 'both' || collection.get('format') === filterBy;
      });
    Ember.set(unitlessonObj, 'subsubColumns', []);
    if (lessonIndex === 0) {
      component.set('averageHeadersAssessment', []);
    }
    var countCols = 0;
    var lessonassementcount = 0;

    lesson.get('children').forEach(function(assessmentObj) {
      if (assessmentObj.format === filterBy) {
        lessonassementcount = lessonassementcount + 1;
        countCols = countCols + 1;
        var emberObject = Ember.Object.create({
          id: assessmentObj.id,
          lessonId: unitlessonObj.id,
          level: filterBy
        });
        var orginalTitle = assessmentObj.get('title');
        if (filterBy === 'assessment') {
          assessmentObj.set(
            'title',
            `A${lessonassementcount}: ${orginalTitle}`
          );
        } else {
          assessmentObj.set(
            'title',
            `C${lessonassementcount}: ${orginalTitle}`
          );
        }
        unitlessonObj.get('subsubColumns').pushObject(assessmentObj);
        component.get('averageHeadersAssessment').pushObject(emberObject);
      }
    });

    if (lessonassementcount === 0) {
      countCols = countCols + 1;
      let tempassessmentObj = Ember.Object.create({
        format: filterBy,
        id: 'NoObject',
        collectionType: filterBy,
        openEndedQuestionCount: 0,
        questionCount: 0,
        resourceCount: 0,
        title: '--NO DATA--'
      });
      unitlessonObj.get('subsubColumns').pushObject(tempassessmentObj);
    }
    //Ember.run.later(
    //, timerConst);

    // Dont show anything if columns are 0
    if (countCols === 0) {
      let lessonValObj = unitheader
        .get('subColumns')
        .findBy('id', unitlessonObj.id);
      if (lessonValObj !== undefined) {
        let indx = unitheader.get('subColumns').indexOf(lessonValObj);
        unitheader.get('subColumns').removeAt(indx);
      }
      component.set('isLoading', false);
    } else if (countCols > 0) {
      //Show if colmums are more than 0
      component.set(
        'totalAssessments',
        component.get('totalAssessments') + countCols
      );
      Ember.set(
        unitheader,
        'colspanval',
        component.get('totalAssessments') + 1
      );

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
          var lessonPerformanceObj = Ember.Object.create({
            lessonId: unitlessonObj.id,
            lessonData: component
              .get('assessmentperformanceDataMatrix')
              .objectAt(0)
              .performanceData.slice(1)
          });
          component
            .get('averageHeaderstempAssessment')
            .pushObject(lessonPerformanceObj);
          return performanceData;
        }
      );

      component.set('assessmentperformanceData', assessmentperformanceData);
      var indxObj = 0;
      component.get('assessmentperformanceData').forEach(function(assementpd) {
        var lessonUser = assementpd.userId;
        var assessmentperformanceData = assementpd.performanceData;
        component.get('performanceData').forEach(function(user) {
          var indexLesson = 0;
          let tempInx = unitIndex + 1;
          if (lessonUser === user.userId) {
            //user performancedata starts
            user.performanceData.forEach(function(unitcols, unitcolsindex) {
              if (unitcols !== undefined && unitcols.id !== undefined) {
                if (unitcols.id === unitId) {
                  unitcols.set('unitIdVal', unitId);

                  if (unitcolsindex === tempInx) {
                    var hdrObj = component
                      .get('averageHeaders')
                      .performanceData.objectAt(unitcolsindex);
                    hdrObj.set('unitIdVal', unitId);
                    component
                      .get('averageHeaders')
                      .performanceData.removeAt(unitcolsindex);

                    component
                      .get('averageHeaders')
                      .performanceData.insertAt(unitcolsindex, hdrObj);
                  }
                  assessmentperformanceData.removeAt(0);
                  unitcols.set('subColumns', []);
                  if (lessonIndex === 0) {
                    unitcols.set('subsubColumns', []);
                  }
                  var assessmentsStr = '';
                  var colcount = 0;
                  lesson.get('children').forEach(function(assessmentObj) {
                    if (assessmentObj.format === filterBy) {
                      assessmentsStr = `${assessmentsStr + assessmentObj.id},`;
                      var emberObject = Ember.Object.create({
                        id: assessmentObj.id,
                        unitId: unitId,
                        lessonId: unitlessonObj.id
                      });
                      if (unitcols.get('subsubColumns') !== undefined) {
                        unitcols.get('subsubColumns').pushObject(emberObject);
                      } else {
                        unitcols.set('subsubColumns', []);
                        unitcols.get('subsubColumns').pushObject(emberObject);
                      }
                      colcount = colcount + 1;
                    }
                  });
                  if (lessonassementcount === 0) {
                    assessmentsStr = `${`${assessmentsStr}NoObject`},`;
                    var emberObject = Ember.Object.create({
                      id: 'NoObject',
                      unitId: unitId,
                      lessonId: unitlessonObj.id
                    });
                    if (unitcols.get('subsubColumns') !== undefined) {
                      unitcols.get('subsubColumns').pushObject(emberObject);
                    } else {
                      unitcols.set('subsubColumns', []);
                      unitcols.get('subsubColumns').pushObject(emberObject);
                    }
                  }
                  for (var j = 0; j < assessmentperformanceData.length; j++) {
                    if (
                      assessmentperformanceData[j] !== undefined &&
                      lessonassementcount !== 0
                    ) {
                      if (
                        assessmentsStr.indexOf(
                          assessmentperformanceData[j].id
                        ) !== -1
                      ) {
                        var group = unitcols
                          .get('subsubColumns')
                          .findBy('id', assessmentperformanceData[j].id);
                        if (group !== undefined) {
                          indxObj = unitcols
                            .get('subsubColumns')
                            .indexOf(group);
                          assessmentperformanceData[j].set('unitId', unitId);
                          assessmentperformanceData[j].set(
                            'lessonId',
                            unitlessonObj.id
                          );
                          var objAtLesson = unitcols
                            .get('subsubColumns')
                            .objectAt(indxObj);

                          if (objAtLesson.lessonId === unitlessonObj.id) {
                            unitcols.get('subsubColumns').removeAt(indxObj);
                            unitcols
                              .get('subsubColumns')
                              .insertAt(indxObj, assessmentperformanceData[j]);
                          }
                        }
                      }
                    }
                  }
                }
              }
              indexLesson = indexLesson + 1;
            });

            //user performancedata ends
          } else {
            //console.log('User present for course but no data present ');
          }
        });
        indxObj = indxObj + 1;
      });
      //});
    }

    //});
    //index1 = index1 + 1;
  },

  storeClickValues: function(unitId) {
    let localStorage = window.localStorage;
    localStorage.setItem('uId', unitId);
    localStorage.setItem('cId', this.get('classId'));
  },
  getStoredUnitIdVal: function() {
    let localStorage = window.localStorage;
    if (this.get('classId') === localStorage.getItem('cId')) {
      return localStorage.getItem('uId');
    } else {
      localStorage.setItem('uId', null);
      localStorage.setItem('cId', null);
      return null;
    }
  },
  expandByUnit: function(unitId) {
    this.set('isLoading', true);
    var unitObj = this.get('headers').findBy('id', unitId);
    if (unitObj !== undefined) {
      let index = this.get('headers').indexOf(unitObj);
      this.send('expand', index); // This will trigger expand action with given index
    }
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
  },
  getSortedData: function(sortCriteria, performanceData) {
    let metricsIndex = sortCriteria.metricsIndex;
    let sortedData = performanceData;
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
            numberSort(a.performanceData[0].score, b.performanceData[0].score) *
            sortCriteria.order
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
  },
  showAverageRow: function(unitId) {
    const component = this;
    const filterBy = component.get('filterBy');

    component.set('isLoading', false);
    component.set('averageHeadersAssessment', []);
    component.get('averageHeaderstempAssessment').forEach(function(lessonItem) {
      var emberObject = Ember.Object.create({
        id: 'NoObject',
        lessonId: lessonItem.lessonId,
        collectionType: filterBy,
        unitId: unitId,
        level: filterBy
      });
      if (lessonItem.lessonData.length > 0) {
        lessonItem.lessonData.forEach(function(lessondataitem) {
          lessondataitem.set('level', filterBy);
          lessondataitem.set('unitId', unitId);
          lessondataitem.set('lessonId', lessonItem.lessonId);
          component.get('averageHeadersAssessment').pushObject(lessondataitem);
        });
      } else {
        component.get('averageHeadersAssessment').pushObject(emberObject);
      }
    });

    if (
      component.get('averageHeadersAssessment').length === 0 &&
      component.get('totalAssessments') === 0
    ) {
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
      // component.createAverageRow(unitIndex, filterBy, assesmentCountCols); //Older logic
      // Check and remove previous values if need be or filter might be needed here
    }

    component.get('averageHeadersAssessment').forEach(avg => {
      component.get('averageHeaders').performanceData.push(avg);
    });
  },
  // Older code not used
  createAverageRow: function(unitIndex, filterBy, assesmentCountCols) {
    const component = this;
    var lesserunitarray = [];
    var greaterEqUnitarray = [];
    var arrayComplete = [];

    component
      .get('averageHeaders')
      .performanceData.forEach(function(item, indx) {
        if (indx < unitIndex) {
          lesserunitarray.pushObject(item);
        } else if (indx >= unitIndex) {
          greaterEqUnitarray.pushObject(item);
        }
      });
    if (greaterEqUnitarray.length >= assesmentCountCols) {
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
      greaterEqUnitarray.forEach(function(item, indx) {
        if (
          (item.level !== undefined && item.level === filterBy) ||
          (item.collectionType !== undefined &&
            item.collectionType === filterBy)
        ) {
          greaterEqUnitarray.removeAt(indx);
        }
      });

      arrayComplete.pushObjects(lesserunitarray);
      arrayComplete.pushObjects(component.get('averageHeadersAssessment'));

      greaterEqUnitarray.forEach(function(item) {
        if (
          !(
            (item.collectionType !== undefined &&
              item.collectionType === filterBy) ||
            (item.level !== undefined && item.level === filterBy)
          )
        ) {
          arrayComplete.pushObject(item);
        }
      });
    } else {
      greaterEqUnitarray.forEach(function(item, indx) {
        if (
          (item.level !== undefined && item.level === filterBy) ||
          (item.collectionType !== undefined &&
            item.collectionType === filterBy)
        ) {
          greaterEqUnitarray.removeAt(indx);
        }
      });
      arrayComplete.pushObjects(lesserunitarray);
      greaterEqUnitarray.forEach(function(item) {
        if (
          !(
            (item.collectionType !== undefined &&
              item.collectionType === filterBy) ||
            (item.level !== undefined && item.level === filterBy)
          )
        ) {
          arrayComplete.pushObject(item);
        }
      });
      arrayComplete.pushObjects(component.get('averageHeadersAssessment'));
    }
    component.get('averageHeaders').set('performanceData', arrayComplete);
  }
});
