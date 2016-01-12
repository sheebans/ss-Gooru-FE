export const QUESTION_COMPONENT_MAP = {
  'MC'    : 'player.questions.gru-multiple-choice',
  'MA'    : 'player.questions.gru-multiple-answer',
  'T/F'   : 'player.questions.gru-true-false',
  'OE'    : 'player.questions.gru-open-ended',
  'FIB'   : 'player.questions.gru-fib',
  'HS_TXT': 'player.questions.gru-hs-text',
  'HS_IMG': 'player.questions.gru-hs-image',
  'HT_RO' : 'player.questions.gru-reorder',
  'HT_HL' : 'player.questions.gru-hot-text-highlight'
};

export const RESOURCE_COMPONENT_MAP = {
  'video/youtube' : 'player.resources.gru-youtube-resource',
  'resource/url'  : 'player.resources.gru-url-resource',
  'handouts'      : 'player.resources.gru-pdf-resource',
  'image'         : 'player.resources.gru-image-resource',
  'vimeo/video'   : 'player.resources.gru-vimeo-resource'
};

export const DEFAULT_IMAGES = {
  USER_PROFILE: '/assets/gooru/profile.png'
};

export const CONTENT_TYPES = {
  COLLECTION: 'collection',
  ASSESSMENT: 'assessment'
};

export const KEY_CODES = {
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
};
export const VIEW_LAYOUT_PICKER_OPTIONS = {
  LIST:'list',
  THUMBNAILS:'thumbnails'
};

export const EMOTION_VALUES = [1, 2, 3, 4, 5];

export const SCORES = {
  REGULAR: 60,
  GOOD: 70,
  VERY_GOOD: 80,
  EXCELLENT: 90

};

export const GRADE_BRACKETS = [
  {UPPER_LIMIT: 60},
  {UPPER_LIMIT: 70},
  {UPPER_LIMIT: 80},
  {UPPER_LIMIT: 90},
  {UPPER_LIMIT: 101}
];
