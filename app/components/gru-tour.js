import Ember from 'ember';
var introJS = window.introJs;
const INTRO_JS_OPTIONS = Ember.A([
  'next-label',
  'prev-label',
  'skip-label',
  'done-label',
  'tooltip-position',
  'tooltip-class',
  'highlightClass',
  'exit-on-esc',
  'exit-on-overlay-click',
  'show-step-numbers',
  'show-step-numbers',
  'keyboard-navigation',
  'show-buttons',
  'show-bullets',
  'show-progress',
  'scroll-to-element',
  'overlay-opacity',
  'disable-interaction'
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
    test() {
      let intro = this.get('introJS');
      let options = this.get('introJSOptions');
      intro.setOptions(options);
      intro.start();
    },

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    this.set("introJS",introJS());
  },
  didRender(){

  },
  // -------------------------------------------------------------------------
  // Properties

  introJSOptions: Ember.computed(
    'next-label',
    'prev-label',
    'skip-label',
    'done-label',
    'tooltip-position',
    'tooltip-class',
    'highlightClass',
    'exit-on-esc',
    'exit-on-overlay-click',
    'show-step-numbers',
    'show-step-numbers',
    'keyboard-navigation',
    'show-buttons',
    'show-bullets',
    'show-progress',
    'scroll-to-element',
    'overlay-opacity',
    'disable-interaction',
    'steps',

    function(){
      var camelize = Ember.String.camelize;
      var underscore = Ember.String.underscore;
      let options = {};

      INTRO_JS_OPTIONS.map(function(option){
        let normalizedName = camelize(underscore(option));
        let value = this.get(`${normalizedName}`);
        if (value !== null && value !== undefined) {
         options[normalizedName] = value;
        }
      },this);

      //options.steps = this.get('steps');
      let array = Ember.A([]);
      this.get('steps').map(function(step){
        console.log(document.querySelector('#step1'));
        array.push(Ember.Object.create({
          element:document.querySelector('#step1'),
          intro:step.intro
        }));
        console.log(array);
        options.steps = array;
      })

      return options;
    }
  ),
  tooltipPosition: 'auto',
  positionPrecedence:  ['right', 'left', 'bottom', 'top'],
  showBullets: false,
  showProgress: false,
  showStepNumbers: false,

  startTour: function(){
    let intro = this.get('introJS');
    let options = this.get('introJSOptions');
    intro.setOptions(options);
    intro.start();
  }


});
