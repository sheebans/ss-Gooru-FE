import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('library/gru-browse-library', 'Unit | Component | library/gru browse library', {
  unit: true
});

test('options', function(assert) {
  let component = this.subject();
  component.set('options',[{
    name: 'featured-libraries',
    text: 'Featured Libraries'
  }]);

  assert.equal(component.get('options')[0].name, 'featured-libraries', 'First option incorrect');
});
