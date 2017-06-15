import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('library/gru-browse-library', 'Integration | Component | library/gru browse library', {
  integration: true
});

test('Browse Library Test', function(assert) {

  let courses = [
    {
      id:12345,
      title:'Course title',
      unitCount:3,
      thumbnailUrl:'url-image.jpg'
    },{
      id:12345,
      title:'Course title',
      unitCount:3,
      thumbnailUrl:'url-image.jpg'
    }
  ];
  this.set('courses',courses);
  this.render(hbs`{{library/gru-browse-library courses=courses}}`);
  const $component = this.$();
  let $options = $component.find('.tab');
  assert.equal($options.filter(':first-child').text().trim(), 'Featured Libraries', 'Featured Libraries tab is missing');
  assert.ok($component.find('#featured-courses'),'Missing featured libraries section');
  assert.equal($component.find('.gru-library-card').length, 2, 'Should appear 2 cards');
});
