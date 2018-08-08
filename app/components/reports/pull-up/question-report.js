import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-question-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    onClickPrev() {
      let component = this;
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let questions = component.get('questions');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = questions.length - 1;
      }
      component.set('selectedQuestion', questions.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let questions = component.get('questions');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (questions.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedQuestion', questions.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('next');
      component.loadData();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.slideToSelectedQuestion();
    this.initialize();
    this.loadData();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains context data
   * @type {Object}
   */
  context: null,

  /**
   * ClassId belongs to this collection report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this collection report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Unit belongs to this collection report.
   * @type {String}
   */
  unit: Ember.computed.alias('context.unit'),

  /**
   * Lesson belongs to this question report.
   * @type {[type]}
   */
  lesson: Ember.computed.alias('context.lesson'),

  /**
   * Collection belongs to this question report.
   * @type {Object}
   */
  collection: Ember.computed.alias('context.collection'),

  /**
   * collectionId of this  question report.
   * @type {String}
   */
  collectionId: Ember.computed.alias('context.collection.id'),

  /**
   * Selected question for this report
   * @type {Object}
   */
  selectedQuestion: Ember.computed.alias('context.selectedQuestion'),

  /**
   * List of questions mapped to collection.
   * @type {Array}
   */
  questions: Ember.computed.alias('context.questions'),

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * List of class members
   * @type {Object}
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   * Stutent  report data
   * @type {Object}
   */
  studentReportData: Ember.A([]),

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  //--------------------------------------------------------------------------
  // Methods

  slideToSelectedQuestion() {
    let component = this;
    let questions = component.get('questions');
    let selectedQuestion = component.get('selectedQuestion');
    let selectedIndex = questions.indexOf(selectedQuestion);
    component.$('#report-carousel-wrapper').carousel(selectedIndex);
  },

  initialize: function() {
    const component = this;
    const classId = component.get('classId');
    const courseId = component.get('courseId');
    const unitId = component.get('unit.id');
    const lessonId = component.get('lesson.id');
    const collectionId = component.get('collection.id');
    const collectionType = component.get('collection.format');
    return component
      .get('analyticsService')
      .findResourcesByCollection(
        classId,
        courseId,
        unitId,
        lessonId,
        collectionId,
        collectionType
      )
      .then(function(userResourcesResults) {
        let questions = component.get('questions');
        let classMembers = component.get('classMembers');
        let resultSet = Ember.A();
        questions.forEach(question => {
          let questionId = question.get('id');
          let result = Ember.Object.create({
            id: questionId
          });
          let correctAnswers = Ember.A([]);
          let wrongAnswers = Ember.A([]);
          let notAnswerUsers = Ember.A([]);
          classMembers.forEach(member => {
            let memberId = member.get('id');
            let userResourcesResult = userResourcesResults.findBy(
              'user',
              memberId
            );
            let user = component.createUser(member);
            if (userResourcesResult) {
              let resourceResults = userResourcesResult.get('resourceResults');
              let resourceResult = resourceResults.findBy(
                'resourceId',
                questionId
              );
              if (resourceResult) {
                let isCorrect = resourceResult.get('correct');
                let userAnswer = resourceResult.get('userAnswer');
                if (userAnswer) {
                  let answerObj = resourceResult.get('answerObject');
                  let answerId = component.getAnswerId(userAnswer);
                  let answer = answerObj.findBy('answerId', userAnswer);
                  if (isCorrect) {
                    component.answerGroup(
                      answerId,
                      answer,
                      answerObj,
                      correctAnswers,
                      userAnswer,
                      user
                    );
                  } else {
                    component.answerGroup(
                      answerId,
                      answer,
                      answerObj,
                      wrongAnswers,
                      userAnswer,
                      user
                    );
                  }
                } else {
                  notAnswerUsers.pushObject(user);
                }
              } else {
                notAnswerUsers.pushObject(user);
              }
            } else {
              notAnswerUsers.pushObject(user);
            }
          });
          result.set('notAnswered', notAnswerUsers);
          result.set('correct', correctAnswers);
          result.set('wrong', wrongAnswers);
          resultSet.pushObject(result);
        });
      });
  },

  answerGroup(answerId, answer, answerObj, answerGroups, userAnswer, user) {
    let answerGroup = answerGroups.findBy('id', answerId);
    if (!answerGroup) {
      answerGroup = Ember.Object.create({
        id: answerId,
        answer: answer ? answer : answerObj,
        userAnswer: userAnswer,
        users: Ember.A([])
      });
      answerGroups.pushObject(answerGroup);
    }
    answerGroup.get('users').pushObject(user);
  },

  createUser(user) {
    return Ember.Object.create({
      id: user.get('id'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      avatarUrl: user.get('avatarUrl')
    });
  },

  getAnswerId(userAnswer) {
    let answerId = userAnswer;
    if (Array.isArray(userAnswer)) {
      let id = userAnswer.map(answer => {
        if (answer instanceof Object) {
          return answer.selection ? '1' : '0';
        } else {
          return answer.toLowerCase();
        }
      });
      answerId = btoa(id.join('-'));
    }
    return answerId;
  },

  loadData() {
    let component = this;
    component.handleCarouselControl();
  },

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  handleCarouselControl() {
    let component = this;
    let selectedQuestion = component.get('selectedQuestion');
    let questions = component.get('questions');
    let currentIndex = questions.indexOf(selectedQuestion);
    if (questions.length - 1 === 0) {
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$('#report-carousel-wrapper .carousel-control.left')
          .addClass('in-active');
      } else {
        component
          .$('#report-carousel-wrapper .carousel-control.left')
          .removeClass('in-active');
      }
      if (currentIndex === questions.length - 1) {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .addClass('in-active');
      } else {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .removeClass('in-active');
      }
    }
  }
});
