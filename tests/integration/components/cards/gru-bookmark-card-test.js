import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Bookmark from 'gooru-web/models/content/bookmark';

moduleForComponent('cards/gru-bookmark-card', 'Integration | Component | cards/gru bookmark card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set('locale', 'en');
    this.inject.service('i18n');
    this.inject.service('api-sdk/course');
  }
});

var mockBookmark = Bookmark.create({
    id: "aaa-bbb",
    contentId: "123",
    contentType: "course",
    title: "Title 1"
  });

test('Bookmark Card Layout', function(assert) {

  this.set('bookmark', mockBookmark);

  this.render(hbs`{{cards/gru-bookmark-card bookmark=bookmark}}`);

  var $component = this.$(); //component dom element

  const $bookmarkCard = $component.find('.gru-bookmark-card');
  const $panel = $bookmarkCard.find('.panel');
  const $panelHeading = $panel.find('.panel-heading');
  const $panelBody = $panel.find('.panel-body');

  T.exists(assert, $bookmarkCard, 'Missing bookmark card section');
  T.exists(assert, $panel, 'Missing bookmark card panel');
  T.exists(assert, $panelHeading, 'Missing bookmark card panel heading');
  T.exists(assert, $panelBody, 'Missing bookmark card panel body');
  assert.ok($panelHeading.find('.icon i').hasClass('course'), 'Must be a course icon');
  T.exists(assert, $panelHeading.find('button.unBookmark-btn'), 'Missing unBookmark button');
  T.exists(assert, $panelBody.find('.title'), 'Missing bookmark title');
  assert.equal(T.text($panelBody.find('.title')), 'Title 1', 'Wrong text title');
});
