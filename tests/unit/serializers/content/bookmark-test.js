import { moduleFor, test } from 'ember-qunit';
import BookmarkModel from 'gooru-web/models/content/bookmark';

moduleFor('serializer:content/bookmark', 'Unit | Serializer | content/bookmark');

test('serializeCreateBookmark', function(assert) {
  const serializer = this.subject();
  const bookmarkObject = BookmarkModel.create({
    title: 'bookmark-title',
    contentId: 'any-id',
    contentType: 'any-type'
  });
  const response = serializer.serializeCreateBookmark(bookmarkObject);
  assert.equal(response.title, 'bookmark-title', "Wrong title");
  assert.equal(response.content_id, 'any-id', "Wrong content id");
  assert.equal(response.content_type, 'any-type', "Wrong content type");
});

