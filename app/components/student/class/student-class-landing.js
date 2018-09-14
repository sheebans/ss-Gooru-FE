import Ember from 'ember';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';
import {
  createStudyPlayerQueryParams,
  hasSuggestions
} from 'gooru-web/utils/navigation-util';

export default Ember.Component.extend({

  classNames: ['student-class-landing'],

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  actions: {
    onMoveNext(curStep) {
      let component = this;
      if (curStep === 'grade') {
        component.set('isShowInspectDestination', true);
        component.set('isShowGradeLevel', false);
        component.set('isShowRoute0Destination', false);
      } else if (curStep === 'inspect-destination') {
        component.set('isShowInspectDestination', false);
        component.set('isShowGradeLevel', false);
        component.set('isShowRoute0Destination', true);
      } else if (curStep === 'playNext'){
        component.startPlaying();
      }
    }
  },

  isShowRoute0Destination: false,

  isShowInspectDestination: false,

  isShowGradeLevel: true,

  classGrade: Ember.computed('classData', function() {
    let controller = this;
    let classData = controller.get('classData');
    let classGrade = classData.get('grade');
    return classGrade ? parseInt(classGrade.objectAt(0)) : null;
  }),

  classId: Ember.computed('classData', function() {
    let component = this;
    let classData = component.get('classData');
    return classData.get('id');
  }),

  courseId: Ember.computed('classData', function() {
    let component = this;
    let classData = component.get('classData');
    return classData.get('courseId');
  }),

  startPlaying() {
    const component = this;
    let classData = component.get('classData');
    let navigateMapService = component.get('navigateMapService');
    let classId = classData.get('id');
    let courseId = classData.get('courseId');
    let options = {
        role: ROLES.STUDENT,
        source: PLAYER_EVENT_SOURCE.COURSE_MAP,
        courseId,
        classId
      },
      nextPromise = null;
    //start studying
    nextPromise = navigateMapService.continueCourse(
      options.courseId,
      options.classId
    );
    nextPromise.then(component.nextPromiseHandler).then(queryParams => {
      component.get('router').transitionTo('study-player', courseId, { queryParams });
    });
  },

  /** returns options promise chain resolving response
   * @param
   */
  nextPromiseHandler(resp) {
    let queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      courseId: hasSuggestions(resp) ? resp.context.courseId : resp.courseId // Only in case of suggestions we dont have courseId in suggestion
    };
    queryParams = createStudyPlayerQueryParams(
      hasSuggestions(resp) ? resp.suggestions[0] : resp.context || resp,
      queryParams
    );
    return Ember.RSVP.resolve(queryParams);
  }
});
