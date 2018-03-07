import Ember from 'ember';
import {
  formatTime,
  formatDate,
  formatTime as formatMilliseconds,
  getAnswerResultIcon,
  getScoreString,
  getReactionIcon
} from 'gooru-web/utils/utils';
import {
  averageReaction,
  correctPercentage,
  totalTimeSpent
} from 'gooru-web/utils/question-result';
import ReportData from 'gooru-web/models/result/report-data';

/**
 * Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel', 'panel'],

  classNameBindings: [
    'visible:visibility_on:visibility_off',
    'item.isAssessment:assessment:collection',
    'item.visible:item-enabled:item-disabled',
    'item.isOnAir:on-air',
    'item.isAssessment:li-flow:li-flow'
  ],

  tagName: 'li',

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),
  /**
   * @property {Ember.Service} Service to configuration properties
   */
  configurationService: Ember.inject.service('configuration'),
  assessmentResult: {},

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function changeVisibility
     */
    changeVisibility: function(classActivity) {
      this.sendAction('onChangeVisibility', classActivity);
    },
    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    selectRowHeader: function(studentId, assessmentType) {
      var typeVal = 'assessment';
      if (!assessmentType) {
        typeVal = 'collection';
      }
      this.getMembersOnSummaryClick(studentId, typeVal);
      //   var memberData = this.get('membersData')
      //                     .findBy('id', studentId);
      //   if (memberData !== undefined) {
      //       this.sendAction(
      //     'onselectRowHeader',
      //     studentId,
      //     memberData,
      //     this.get('reportData'),
      //     this.get('collection')
      //   );
      // }
    },
    /**
     * @function actions:selectFirstTierColHeader
     * @param {string} headerId
     */
    selectFirstTierColHeader: function(headerId) {
      this.sendAction(
        'onSelectFirstTierHeader',
        headerId,
        this.get('collection'),
        this.get('membersData')
      );
    },

    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    },
    checkfilter: function(filterLabl) {
      const component = this;
      var chkVal = this.get('questionProperties').findBy(
        'value',
        filterLabl.value
      );
      if (chkVal !== undefined) {
        if (chkVal.visible) {
          Ember.set(chkVal, 'visible', false);
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', false);
          }
          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', false);
          }
        } else {
          Ember.set(chkVal, 'visible', true);
          if (chkVal.value === 'timeSpent') {
            component.set('timevisible', true);
            // Ember.$('.data th').each(function() {
            //   Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            // });
          }

          if (chkVal.value === 'reaction') {
            component.set('reactionvisible', true);
            // Ember.$('.data th').each(function() {
            //   Ember.$(this).width(`${177  }px`); // css attribute of your <td> width:15px; i.e.
            // });
            // Ember.$('.fixedCol').each(function() {
            //   Ember.$(this).css('width', '111px'); // css attribute of your <td> width:15px; i.e.
            // });
          }
        }
      }
    },
    /**
     * @function goLive
     */
    onReportClick: function(collectionId, assessmentType) {
      const component = this;
      const members = component.get('members');
      component.set('membersData', members);
      component.set('questionProperties', this.initQuestionProperties());
      component.set('onCollectionclick', collectionId);
      var itemVal = component.get('item');
      let collectionObj = null;
      Ember.set(itemVal, 'isReportEnabled', component.get('isReportEnabled'));
      if (component.get('isReportEnabled')) {
        component.set('isReportEnabled', false);
        Ember.set(itemVal, 'isReportEnabled', component.get('isReportEnabled'));
      } else {
        if (assessmentType) {
          component
            .get('assessmentService')
            .readAssessmentDCA(collectionId, assessmentType)
            .then(function(collection) {
              collectionObj = collection;
              members.forEach(function(item1) {
                Ember.set(item1, 'resultResources', collection.children);
                Ember.set(item1, 'avgScore', '');
                Ember.set(item1, 'avgTime', '--');
                Ember.set(item1, 'avgReact', '--');
              });
              component.set('firstTierHeaders', collection.children);
              component.getMembers(
                collectionObj,
                component.get('activityDateVal'),
                assessmentType
              );
            });
        } else {
          component
            .get('collectionService')
            .readCollection(collectionId)
            .then(function(collection) {
              collectionObj = collection;
              members.forEach(function(item1) {
                Ember.set(item1, 'resultResources', collection.children);
                Ember.set(item1, 'avgScore', '');
                Ember.set(item1, 'avgTime', '--');
                Ember.set(item1, 'avgReact', '--');
              });
              component.set('firstTierHeaders', collection.children);
              component.getMembers(
                collectionObj,
                component.get('activityDateVal'),
                assessmentType
              );
            });
        }
      }
    },
    /**
     * @function onscoresort
     */
    onScoreSortClick: function() {
      let memData = this.get('membersData');
      var desorted = this.get('membersData').sort(function(a, b) {
        return b.get('avgScore') - a.get('avgScore');
      });
      if (this.get('sortOrderScore') === -1) {
        this.set('membersData', []);
        this.set('membersData', this.scoreSortAsc(memData));
        this.set('sortOrderScore', 1);
      } else {
        this.set('membersData', []);
        this.set('membersData', desorted);
        this.set('sortOrderScore', -1);
      }
    },
    /**
     * @function onscoresort
     */
    onNameSortClick: function() {
      let memData = this.get('membersData');
      let strArr = Ember.A([]);
      let strArr1 = Ember.A([]);
      let memArr = Ember.A([]);
      if (this.get('sortOrderName') === -1) {
        memData.forEach(function(item1) {
          strArr.pushObject(item1.lastName);
        });
        strArr.sort().forEach(function(item2) {
          memData.forEach(function(item1) {
            if (item2 === item1.lastName) {
              memArr.pushObject(item1);
            }
          });
        });
        this.set('membersData', Ember.A([]));
        this.set('membersData', memArr);
        this.set('sortOrderName', 1);
      } else {
        memData.forEach(function(item1) {
          strArr1.pushObject(item1.lastName);
        });
        Ember.Logger.info('reverse--', strArr.reverse());
        strArr1.reverse().forEach(function(item2) {
          memData.forEach(function(item1) {
            if (item2 === item1.lastName) {
              memArr.pushObject(item1);
            }
          });
        });
        this.set('membersData', Ember.A([]));
        this.set('membersData', memArr);
        this.set('sortOrderName', -1);
      }
    },
    /**
     * @function onscoresort
     */
    onTimeSortClick: function() {
      let memData = this.get('membersData');
      var desorted = this.get('membersData').sort(function(a, b) {
        return b.get('othTime') - a.get('othTime');
      });
      if (this.get('sortOrderTime') === -1) {
        this.set('membersData', []);
        this.set('membersData', this.timeSortAsc(memData));
        this.set('sortOrderTime', 1);
      } else {
        this.set('membersData', []);
        this.set('membersData', desorted);
        this.set('sortOrderTime', -1);
      }
    },
    /**
     * @function onscoresort
     */
    onReactionSortClick: function() {
      let memData = this.get('membersData');
      var desorted = this.get('membersData').sort(function(a, b) {
        return b.get('othReact') - a.get('othReact');
      });
      if (this.get('sortOrderReact') === -1) {
        this.set('membersData', []);
        this.set('membersData', this.reactSortAsc(memData));
        this.set('sortOrderReact', 1);
      } else {
        this.set('membersData', []);
        this.set('membersData', desorted);
        this.set('sortOrderReact', -1);
      }
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    },

    /**
     * @function externalAssessment open new tab from DCA
     */
    externalAssessment: function(classActivity) {
      let url = classActivity.get('url');
      if (url) {
        window.open(url);
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    var today = new Date();
    var dcaDate = new Date(this.get('dcaAddeddate'));
    if (dcaDate.getFullYear() === 1969 || dcaDate.getFullYear() === 1970) {
      dcaDate = new Date(this.get('otherAddeddate'));
    }
    var dcaDateDate = `${dcaDate.getFullYear()}-${dcaDate.getMonth() +
      1}-${dcaDate.getDate()}`;
    var todayDate = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    var sdayDate = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate() - 1}`;
    var activityDate = `${dcaDate.getFullYear()}-${dcaDate.getMonth() +
      1}-${dcaDate.getDate()}`;
    this.set('activityDateVal', activityDate);
    if (todayDate === dcaDateDate) {
      this.set('todayDateStatus', true);
    }
    if (todayDate !== activityDate && sdayDate !== activityDate) {
      var dateValstr = new Date(activityDate);
      this.set('activityDateStr', formatDate(dateValstr, 'MMMM D, YYYY'));
    } else {
      this.set('activityDateStr', '');
    }
  },

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    var width = Ember.$('#maindatatable').offset();
    if (width !== undefined) {
      Ember.$('.Colall').css({
        'margin-left': `${177 + 99}px`
      });
      Ember.$('.ColOnlyTime').css({
        'margin-left': `${115 + 99}px`
      });
      Ember.$('.ColOnlyScore').css({
        'margin-left': `${115 + 61}px`
      });
      Ember.$('.ColOnlyReaction').css({
        'margin-left': `${115 + 123}px`
      });
    }
    var width1 = Ember.$('#clscroll-table').width();
    var height = Ember.$(window).height() - 63;
    if (height > 300) {
      height = height - 191;
    }
    Ember.$('#clscroll-content').attr(
      'style',
      `max-width:${width1 + 15}px;max-height:${height}px;overflow:auto`
    );
    Ember.$('#clscroll-row-headers').attr('style', `height:${height - 2}px;`);

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

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {ClassActivity}
   */
  classActivity: null,
  /**
   * The header titles
   * @property {classId}
   */

  classId: null,
  /**
   * The header titles
   * @property {members}
   */
  members: null,
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),
  /**
   * @type AnalyticsService
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),
  /**
   * @property {Collection/Assessment} prevItem
   */
  prevItem: null,

  /**
   * @property {string}
   */
  dcaAddeddate: Ember.computed.alias('dcadate'),
  /**
   * @property {string}
   */
  activityDateVal: null,
  /**
   * @property {string}
   */
  activityDateStr: null,
  /**
   * @property {string}
   */
  otherAddeddate: Ember.computed.alias('otherdate'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.activityPerformanceSummary.collectionPerformanceSummary'
  ),

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive'),
  /**
   * @property {string}
   */
  sortOrderScore: -1,
  /**
   * @property {string}
   */
  sortOrderName: -1,
  /**
   * @property {boolean}
   */
  sortOrderTime: -1,
  /**
   * @property {boolean}
   */
  sortOrderReact: -1,
  /**
   * @property {boolean}
   */
  timevisible: true,
  /**
   * @property { ReportData } report data
   */
  reportData: [],
  userDataObj: [],
  userQuestionDataObj: [],
  /**
   * @property {boolean}
   */
  reactionvisible: true,
  /**
   * @property {boolean}
   */
  todayDateStatus: false,
  /**
   * The user performanceData
   * @property {membersData[]}
   */
  membersData: [],
  /**
   * The user performanceData
   * @property {firstTierHeaders[]}
   */
  firstTierHeaders: [],
  /**
   * @property {boolean}
   */
  isReportEnabled: false,
  /**
   * @property {string} go live action name
   */
  onCollectionclick: '',
  /**
   * @property {collection/Collection} collection
   */
  collection: null,
  /**
   * @prop { Collection } assessment
   */
  assessment: null,

  /**
   * @property {string} go live action name
   */
  onGoLive: 'goLive',

  /**
   * @property {string} changeVisibility action name
   */
  onChangeVisibility: 'changeVisibility',
  /**
   * @prop { Object[] } questionProperties - An array made up of question properties
   *
   * Each property object will consist of:
   * - filter: information to use for the corresponding filter checkbox
   * - label: visual representation of the header
   * - value: internal header identifier
   * - visible: should the property be visible or not?
   * - renderFunction: function to process values of this property for output
   * - aggregateFunction: if there's an aggregate column, this function will be
   *   used to aggregate all the values for this property that are in the same row
   * - aggregateRenderFunction: if there's an aggregate column, this function will
   *   take the result of the aggregateFunction and process it for output
   * - sortFunction: sort function for values of this property
   */
  questionProperties: null,
  /**
   * @prop { String[] } questionPropertiesIds - An array with the ids of all the question properties
   */
  questionPropertiesIds: Ember.computed('questionProperties', function() {
    return this.get('questionProperties').map(function(questionProperty) {
      return questionProperty.value;
    });
  }),

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),
  /**
   * Initialize the question properties array with values -including i18n labels
   * @return {Object[]}
   */
  initQuestionProperties: function() {
    const component = this;
    return [
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.scores').string,
          disabled: true
        },
        label: this.get('i18n').t('reports.gru-table-view.score').string,
        value: 'correct',
        visible: true,
        renderFunction: getAnswerResultIcon,
        aggregateFunction: correctPercentage,
        aggregateRenderFunction: getScoreString
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.study-time').string
        },
        label: this.get('i18n').t('reports.gru-table-view.time').string,
        value: 'timeSpent',
        visible: true,
        renderFunction: formatTime,
        aggregateFunction: totalTimeSpent
      }),
      Ember.Object.create({
        filter: {
          label: this.get('i18n').t('reports.gru-table-view.reactions').string
        },
        label: this.get('i18n').t('reports.gru-table-view.reaction').string,
        value: 'reaction',
        visible: true,
        renderFunction: function(value) {
          const appRootPath = component.get('appRootPath');
          return getReactionIcon(value, appRootPath);
        },
        aggregateFunction: averageReaction
      })
    ];
  },
  getMembers: function(collectionObj, activityDate, assessmentType) {
    const component = this;
    let collection = null;
    component.sendAction('onReportclick');
    const classId = component.get('classId');
    const members = component.get('members');
    var itemVal = component.get('item');
    component.set('membersData', members);
    component.set('isReportEnabled', true);
    Ember.set(itemVal, 'isReportEnabled', component.get('isReportEnabled'));
    component
      .get('collectionService')
      .readPerformanceDataDCA(
        classId,
        collectionObj.id,
        activityDate,
        assessmentType
      )
      .then(function(result1) {
        component.set('userQuestionDataObj', result1);
        let questionDataObj = [];
        if (assessmentType) {
          collection = collectionObj;
          members.forEach(function(item1) {
            var memberDataobj = result1.content.findBy('userUid', item1.id);
            if (memberDataobj !== undefined) {
              questionDataObj = [];
              collection.children.forEach(function(qobj) {
                let objData = memberDataobj.usageData
                  .get(0)
                  .questions.findBy('questionId', qobj.id);
                if (objData !== undefined) {
                  Ember.set(
                    objData,
                    'timeSpent',
                    formatMilliseconds(objData.timeSpent)
                  );
                  if (objData.timeSpent === 0) {
                    Ember.set(objData, 'score', null);
                  }
                  if (objData.questionType === 'OE') {
                    Ember.set(objData, 'score', 0);
                  }
                  questionDataObj.pushObject(objData);
                } else {
                  questionDataObj.pushObject(qobj);
                }
              });
              Ember.set(item1, 'content', questionDataObj);
              Ember.set(item1, 'resultResources', []);
              let collObj = memberDataobj.usageData.get(0).assessment;
              if (collObj === undefined) {
                collObj = memberDataobj.usageData.get(0).collection;
              }
              Ember.set(item1, 'avgScore', collObj.score);
              Ember.set(item1, 'othTime', collObj.timeSpent);
              Ember.set(
                item1,
                'avgTime',
                formatMilliseconds(collObj.timeSpent)
              );
              Ember.set(item1, 'avgReact', collObj.reaction);
              Ember.set(item1, 'othReact', collObj.reaction);
            } else {
              Ember.set(item1, 'avgScore', '');
              Ember.set(item1, 'othTime', 0);
              Ember.set(item1, 'othReact', 0);
              Ember.set(item1, 'avgTime', '--');
              Ember.set(item1, 'avgReact', '--');
              Ember.set(item1, 'resultResources', collection.children);
              Ember.set(item1, 'content', []);
            }
          });

          component.set('collection', collection);
          component.set('collection.children', collection.children);
          component.set('userDataObj', []);
        } else {
          component.set('isReportEnabled', true);
          Ember.set(
            itemVal,
            'isReportEnabled',
            component.get('isReportEnabled')
          );
          collection = collectionObj;
          members.forEach(function(item1) {
            questionDataObj = [];
            var memberDataobj = result1.content.findBy('userUid', item1.id);
            if (memberDataobj !== undefined) {
              collection.children.forEach(function(qobj) {
                let objData = memberDataobj.usageData
                  .get(0)
                  .questions.findBy('resourceId', qobj.id);
                if (objData !== undefined) {
                  Ember.set(
                    objData,
                    'timeSpent',
                    formatMilliseconds(objData.timeSpent)
                  );
                  if (qobj.content_format === 'resource') {
                    Ember.set(objData, 'score', null);
                  }
                  questionDataObj.pushObject(objData);
                }
              });
              Ember.set(item1, 'content', questionDataObj);
              Ember.set(item1, 'resultResources', []);
              let collObj = memberDataobj.usageData.get(0).assessment;
              if (collObj === undefined) {
                collObj = memberDataobj.usageData.get(0).collection;
              }
              Ember.set(item1, 'avgScore', collObj.score);
              Ember.set(item1, 'othTime', collObj.timeSpent);
              Ember.set(
                item1,
                'avgTime',
                formatMilliseconds(collObj.timeSpent)
              );
              Ember.set(item1, 'avgReact', collObj.reaction);
              Ember.set(item1, 'othReact', collObj.reaction);
            } else {
              Ember.set(item1, 'avgScore', '');
              Ember.set(item1, 'othTime', 0);
              Ember.set(item1, 'othReact', 0);
              Ember.set(item1, 'avgTime', '--');
              Ember.set(item1, 'avgReact', '--');
              Ember.set(item1, 'resultResources', collection.children);
              Ember.set(item1, 'content', []);
            }
          });
          component.set('collection', collection);
          component.set('collection.children', collection.children);
          component.set('userDataObj', []);
        }
      });
  },
  scoreSortAsc: function(memData) {
    let sortdat = memData.sort(function(a, b) {
      return a.get('avgScore') - b.get('avgScore');
    });
    return sortdat;
  },
  timeSortAsc: function(memData) {
    let sortdat = memData.sort(function(a, b) {
      return a.get('othTime') - b.get('othTime');
    });
    return sortdat;
  },
  reactSortAsc: function(memData) {
    let sortdat = memData.sort(function(a, b) {
      return a.get('othReact') - b.get('othReact');
    });
    return sortdat;
  },
  getMembersOnSummaryClick: function(studentId, assessmentType) {
    const component = this;
    const classId = component.get('classId');
    const members = component.get('members');
    const collection = component.get('collection');
    const contentObj = component.get('userQuestionDataObj');
    component.set('membersData', members);
    collection.children.forEach(function(resourceobj) {
      Ember.set(resourceobj, 'resourceId', resourceobj.id);
      Ember.set(resourceobj, 'questionId', resourceobj.id);
      Ember.set(resourceobj, 'answerObject', null);
      Ember.set(resourceobj, 'userAnswer', null);
      Ember.set(resourceobj, 'content_format', null);
    });
    component.set('userDataObj', []);
    contentObj.content.forEach(function(item1) {
      if (studentId === item1.userUid) {
        var memberData = members.findBy('id', studentId);
        if (memberData !== undefined) {
          if (memberData.id === studentId) {
            var sessionId = '';
            if (item1.usageData.get(0).assessment !== undefined) {
              sessionId = item1.usageData.get(0).assessment.sessionId;
            } else {
              sessionId = item1.usageData.get(0).collection.sessionId;
            }
            if (sessionId !== '') {
              component
                .get('analyticsService')
                .findResourcesByCollectionforDCA(
                  sessionId,
                  collection.id,
                  classId,
                  memberData.id,
                  assessmentType,
                  component.get('activityDateVal')
                )
                .then(function(resultSession) {
                  if (resultSession !== undefined && resultSession.length > 0) {
                    Ember.merge(
                      memberData,
                      'resultResources',
                      resultSession[0].resourceResults
                    );
                    resultSession[0].resourceResults.forEach(function(
                      resource1obj
                    ) {
                      collection.children.forEach(function(resource2obj) {
                        if (
                          resource2obj.resourceId === resource1obj.resourceId
                        ) {
                          Ember.set(
                            resource2obj,
                            'answerObject',
                            resource1obj.answerObject
                          );
                          Ember.set(
                            resource2obj,
                            'questionId',
                            resource1obj.resourceId
                          );
                          Ember.set(
                            resource2obj,
                            'userAnswer',
                            resource1obj.userAnswer
                          );
                          Ember.set(
                            resource2obj,
                            'content_format',
                            resource1obj.resourceType
                          );
                          Ember.set(
                            resource2obj,
                            'correct',
                            resource1obj.correct
                          );
                        }
                      });
                    });
                    const reportData1 = ReportData.create({
                      students: members,
                      resources: collection.children
                    });
                    let resourceResultdata = resultSession[0].resourceResults;
                    resourceResultdata.forEach(function(resourceResultdataobj) {
                      if (reportData1.data[memberData.id]) {
                        const questionId = Ember.get(
                          resourceResultdataobj,
                          'resourceId'
                        );

                        if (reportData1.data[memberData.id][questionId]) {
                          //if there are several attempts for the same resource the time spent should be added
                          const totalTimeSpent =
                            Ember.get(resourceResultdataobj, 'timeSpent') +
                            Ember.get(
                              reportData1.data[memberData.id][questionId],
                              'timeSpent'
                            );
                          Ember.set(
                            resourceResultdataobj,
                            'timeSpent',
                            totalTimeSpent
                          );
                          Ember.set(resourceResultdataobj, 'isGraded', null);
                          Ember.set(
                            resourceResultdataobj,
                            'submittedAnswer',
                            null
                          );
                          Ember.set(
                            resourceResultdataobj,
                            'questionType',
                            resourceResultdataobj.type
                          );
                        }
                        reportData1.data[memberData.id][
                          questionId
                        ] = resourceResultdataobj;
                      }
                    });
                    component.set('reportData', reportData1);
                    component.set('students', members);
                    component.sendAction(
                      'onselectRowHeader',
                      studentId,
                      memberData,
                      component.get('reportData'),
                      component.get('collection')
                    );
                  }
                });
            }
          }
        }
      }
    });
  }
});
