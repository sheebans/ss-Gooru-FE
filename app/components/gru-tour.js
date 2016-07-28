import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var introJS = window.introJs;
const INTRO_JS_OPTIONS = Ember.A([
  "nextLabel",
  "prevLabel",
  "skipLabel",
  "doneLabel",
  "tooltipPosition",
  "tooltipClass",
  "highlightClass",
  "exitOnEsc",
  "exitOnOverlayClick",
  "showStepNumbers",
  "showStepNumbers",
  "keyboardNavigation",
  "showButtons",
  "showBullets",
  "showProgress",
  "scrollToElement",
  "overlayOpacity",
  "disableInteraction"
]);

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-tour'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    startTour: function(){
      let intro = this.get('introJS');
      let options = this.get('introJSOptions');
      intro.setOptions(options);
      this.registerCallbacksWithIntroJS();
      this._setCurrentStep(0);
      intro.start();
      $('.introjs-skipbutton').hide();
      $('.introjs-prevbutton').text(this.get('i18n').t('common.back').string);
      $('.introjs-nextbutton').text(this.get('i18n').t('common.next').string);
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.set("introJS",introJS());
  },
  // -------------------------------------------------------------------------
  // Properties

  introJSOptions: Ember.computed(
    "nextLabel",
    "prevLabel",
    "skipLabel",
    "doneLabel",
    "tooltipPosition",
    "tooltipClass",
    "highlightClass",
    "exitOnEsc",
    "exitOnOverlayClick",
    "showStepNumbers",
    "showStepNumbers",
    "keyboardNavigation",
    "showButtons",
    "showBullets",
    "showProgress",
    "scrollToElement",
    "overlayOpacity",
    "disableInteraction",
    'steps',

    function(){
      let component = this;
      let options = {};
      INTRO_JS_OPTIONS.map(function(option){
        let value = this.get(`${option}`);
        if (value !== null && value !== undefined) {
         options[option] = value;
        }
      },component);

      let array = Ember.A([]);
      component.get('steps').forEach(function(step, index){
        index++;
        array.push(Ember.Object.create({
          element:document.querySelector(step.elementSelector),
          intro:component.get('constructModal')(
            step.title,
            step.description,
            step.image,
            `${component.get('containerClass')} step-${index}`)
        }));
      })
      options.steps = array;
      return options;
    }
  ),
  tooltipPosition: 'auto',
  positionPrecedence:  ['right', 'bottom', 'left', 'top'],
  showBullets: false,
  showProgress: false,
  showStepNumbers: false,
  disableInteraction: true,
  scrollToElement: true,

  constructModal: function(title, description, image, containerClass){
    let template =
    `<div class="tour-header-${containerClass}">
        <h2>${title}</h2>
        <i onclick="introJs().exit()" class="material-icons">clear</i>
      </div>
      <div class="tour-description-${containerClass}">`;
    if (image !==undefined) {
      template +=
        `<img class=${image}>`;
    }
    template +=
      `<p>${description}</p>
      </div>`;
    return template;
  },
  registerCallbacksWithIntroJS: function(){
    var intro = this.get('introJS');

    intro.onbeforechange(Ember.run.bind(this, function(elementOfNewStep){

      var prevStep = this.get('currentStep');
      this._setCurrentStep(this.get('introJS._currentStep'));
      var nextStep = this.get('currentStep');
      this.sendAction('on-before-change', prevStep, nextStep, this, elementOfNewStep);

    }));

    intro.onchange(Ember.run.bind(this, function(targetElement){
      this.sendAction('on-change', this.get('currentStep'), this, targetElement);
    }));

    intro.onafterchange(Ember.run.bind(this, this._onAfterChange));

    intro.oncomplete(Ember.run.bind(this, function(){
      this.sendAction('on-complete', this.get('currentStep'));
    }));

    intro.onexit(Ember.run.bind(this, this._onExit));
  },

  _setIntroJS: function(introJS){
    this.set('introJS', introJS);
  },

  _onAfterChange: function(targetElement){
    let currentStepIndex = this.get('steps').indexOf(this.get('currentStep'));
    let nextElement = $('.introjs-nextbutton');
    let skipElement = $('.introjs-skipbutton');
    if(currentStepIndex == this.get('steps').length-1){
      nextElement.hide();
      skipElement.show();
    } else if(currentStepIndex == this.get('steps').length-2){
      skipElement.hide();
      nextElement.show();
    }
    this.sendAction('on-after-change', this.get('currentStep'), this, targetElement);
  },

  _onExit: function(){
    this.sendAction('on-exit', this.get('currentStep'), this);
  },

  exitIntroJS: Ember.on('willDestroyElement', function(){
    var intro = this.get('introJS');
    if (intro) {
      intro.exit();
    }
  }),

  _setCurrentStep: function(step){
    var stepObject = Ember.A(this.get('steps')).objectAt(step);
    this.set('currentStep', stepObject);
  },
  _getStepIndex: function(step){
    return this.get('steps').indexOf(step);
  }.bind(this)
});
