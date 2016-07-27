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

  classNames: ['content', 'modals', 'gru-tour'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    startTour: function(){
      let intro = this.get('introJS');
      let options = this.get('introJSOptions');
      intro.setOptions(options);
      intro.start();
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
        options.steps = array;
      }, component)
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


  nextStep: function() {
    let intro = this.get('introJS');
    intro.nextStep();
  },

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
  }
});
