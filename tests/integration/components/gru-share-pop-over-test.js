import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('gru-share-pop-over', 'Integration | Component | gru share pop over', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{#gru-share-pop-over tagName="button" type="course"}}
    {{gru-icon name="insert_link"}}
  {{/gru-share-pop-over}}`);

  let $component = this.$();
  let $button = $component.find('.gru-share-pop-over');
  T.exists(assert, $button, "Missing the button");
  T.exists(assert, $button.find('.gru-icon'), "Missing the button");
});
