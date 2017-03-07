import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('teacher/class/gru-class-statistics', 'Integration | Component | teacher/class/gru class statistics', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});


const classMock = Ember.Object.create({
  id: '1',
  name: 'Class A1',
  code: 'ABCDEF',
  greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  startDate: '9.2.2015',
  endDate: '12.15.2015'
});


test('Layout', function(assert) {
  assert.expect(4);

  this.set('class', classMock);
  this.render(hbs`{{teacher.class.gru-class-statistics class=class}}`);
  const $statistics = this.$(); //component dom element

  const $titleContainer = $statistics.find(".title-statistics");
  const $performanceContainer = $statistics.find(".performance");
  const $completionContainer = $statistics.find(".completion");
  const $timeSpentContainer = $statistics.find(".time-spent");

  T.exists(assert, $titleContainer, 'Missing class statistics title');
  T.exists(assert, $performanceContainer, 'Missing class performance container');
  T.exists(assert, $completionContainer, 'Missing class completion container');
  T.exists(assert, $timeSpentContainer, 'Missing class time spent container');



});
