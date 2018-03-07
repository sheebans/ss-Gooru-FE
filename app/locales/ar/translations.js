import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  errors: {
    description: 'هذا الحقل',
    inclusion: '{{description}} غير مدرج في القائمة',
    exclusion: '{{description}} محجوز',
    invalid: '{{description}} غير صالح',
    confirmation: '\t{{description}} لا يطابق {{on}}',
    accepted: 'يجب قبول {{description}} ',
    empty: 'لا يمكن ترك {{description}} خالياً',
    blank: 'لا يمكن ترك {{description}} فارغاً',
    present: 'يجب أن يكون {{description}} فارغا',
    collection: 'يجب أن يكون {{description}} عبارة عن مجموعة',
    singular: 'لا يمكن أن يكون {{description}} مجموعة',
    tooLong: '{{description}} طويل جدا (الحد الأقصى هو {{max}})) حرفاً',
    tooShort: '{{description}} قصير جدا (الحد الأدنى هو {{min}}) حرف',
    before: 'يجب أن يكون {{description}} قبل {{before}}',
    after: 'يجب أن يكون {{description}} بعد {{after}}',
    wrongDateFormat: 'يجب أن يكون {{description}} بصيغة {{format}}',
    wrongLength: '{{description}} هو الطول الخاطئ، (يجب أن يكون {{is}} حرف)',
    notANumber: 'يجب أن يكون {{description}} رقما',
    notAnInteger: 'يجب أن يكون {{description}} عدداً صحيحاً',
    greaterThan: 'يجب أن يكون {{description}} أكبر من {{gt}}',
    greaterThanOrEqualTo:
      'يجب أن يكون {{description}} أكبر من أو يساوي {{gte}}',
    equalTo: '{{description}} يجب أن يساوي {{is}}',
    lessThan: 'يجب أن يكون {{description}} أقل من {{lt}}',
    lessThanOrEqualTo: 'يجب أن يكون {{description}} أقل من أو يساوي {{lte}}',
    otherThan: 'يجب أن يختلف {{description}} عن {{value}}',
    odd: 'يجب أن يكون {{description}} فردي',
    even: 'يجب أن يكون {{description}}  زوجي',
    positive: 'يجب أن يكون {{description}}  موجب',
    date: 'يجب أن يكون {{description}} تاريخ صالح',
    email: 'يجب أن يكون {{description}} بريد إلكتروني صالح',
    phone: 'يجب أن يكون {{description}} رقم هاتف صالح',
    url: 'يجب أن يكون {{description}} رابط موقع صحيح'
  },
  common: {
    'a-collection': 'مجموعة',
    'a-course': 'مساق دراسي\n',
    'a-question': 'سؤال',
    'a-resource': 'مصدر',
    'a-rubric': 'سلم تقييم',
    'all-completed': 'تم إنجاز الكل',
    'an-assessment': 'تقييم',
    about: 'حول',
    'about-you': 'حولك',
    'about-me': 'حولي',
    add: 'ضِف',
    'add-assessment': 'إنشاء تقييم جديد',
    'add-century-skills': 'ضَف مهارات القرن الحادي والعشرين',
    'add-collaborator': 'ضِف مشارك',
    'add-collection': 'أنشئ مجموعة جديدة',
    'add-collection-item': 'أنشئ مصدر أو سؤال',
    'add-competency': 'ضِف كفاءة',
    'add-content-prompt': 'لم تنشئ {{type}} بعد',
    'add-course': 'أنشئ مساق دراسي جديد\n',
    'add-domains-to-unit': 'ضِف مجالات إلى الوحدة',
    'add-url': 'ضِف رابط',
    'add-from-url': 'ضِف من الرابط',
    'add-lessons': 'ضِف دروس',
    'add-new-lesson': 'أنشئ درس جديد',
    'add-new-unit': 'أنشئ وحدة جديدة',
    'add-new-resource': 'أنشئ مصدر جديد',
    'add-new-question': 'أنشئ سؤال جديد',
    'add-question': 'أنشئ سؤال',
    'add-question-image': 'ضِف سؤال على شكل صورة',
    'add-rubric': 'ضِف سلم تقييم جديد',
    'add-standard': 'ضِف معيار',
    'add-standards': 'ضِف معايير',
    'add-standards-to-collection': 'ضِف معايير إلى مجموعة',
    'add-to': 'ضِف إلى',
    'add-to-classroom': 'ضِف إلى الصف',
    'add-to-daily-class': 'ضِف إلى أنشطة الصف اليومية',
    'add-to-collection-success':
      'لقد ضفت {{contentTitle}} إلى {{collectionTitle}}. هل تريد تعديل ال {{collectionType}}؟',
    'add-to-lesson-success':
      'لقد ضفت {{collectionTitle}} إلى {{contentTitle}}. هل تريد تعديل ال{{collectionType}}؟',
    'add-type-question': 'ما نوع السؤال الذي تريد إضافته؟',
    'add-type-resource': 'ما نوع هذا المصدر؟',
    'add-units': 'ضِف وحدات',
    added: 'مُضاف',
    'advanced-editing': 'تعديل متقدم',
    announcements: 'الإعلانات',
    anonymous_mode: 'أسلوب تقييم المجهول',
    answer: 'إجابتك',
    'answer-correct': 'إجابتك صحيحة',
    'answer-incorrect': 'إجابتك خاطئة',
    'answer-key-was-hidden': 'ملاحظة: قام المعلم بإخفاء مفتاح الإجابة.',
    approved: 'ُمعتمَد',
    archive: 'الأأرشيف',
    assessment: 'التقييم',
    'assessment-disabled': 'لا يمكنك إجراء هذا التقييم',
    'assessment-external': 'التقييم الخارجي',
    'assessment-pl': {
      zero: 'التقييمات',
      one: 'التقييم',
      other: 'التقييمات'
    },
    'assessment-title': 'عنوان التقييم',
    assessmentInitial: 'ت',
    assessments: 'التقييمات',
    assign: 'تعيين',
    'assign-to-class': 'تعيين إلى الصف',
    'assign-to-course': 'تعيين إلى المساق الدراسي',
    attempt: 'رقم المحاولة',
    audience: 'الجمهور',
    avatarFor: 'صورة رمزية لـ',
    averageScore: 'متوسط العلامات',
    back: 'عودة',
    'back-to-assessment': 'العودة إلى التقييم',
    'back-to-collection': 'العودة إلى المجموعة',
    'back-to-course-map': 'العودة إلى خريطة المساق الدراسي',
    'back-to-data': 'العودة إلى البيانات',
    'back-to-report': 'العودة إلى التقرير',
    'best-practices': 'أفضل التمارين',
    beta: 'بيتا',
    'big-ideas': 'أفكار كبيرة',
    biography: 'السيرة الشخصية',
    bookmark: 'إشارة مرجعية',
    bookmarks: 'إشارات مرجعية',
    'bookmarked-content-success':
      'سيتم إضافة {{contentType}} الذي تم وضع إشارة مرجعية عليه إلى صفحة التعليم المستقل الخاصة بك',
    'bookmarked-success':
      'سيتم إضافة كل المحتوى الذي تم وضع إشارة مرجعية عليه إلى صفحة التعليم المستقل الخاصة بك',
    builder: 'محرِر',
    cancel: 'إلغاء',
    categories: 'فئات',
    category: 'فئة',
    categoryOptions: {
      k12: 'روضة - الصف12',
      'higher-ed': 'تعليم عالى',
      'professional-dev': 'التطوير المهني'
    },
    'century-skills': 'مهارات القرن الحادي والعشرين',
    choose: 'اختر',
    'choose-file': 'اختر ملفاً',
    class: 'الصف الدراسي',
    classScores: 'علامات الصف الدراسي',
    'click-unBookmark': 'انقر لإزالة المؤشر',
    close: 'إغلاق',
    collection: 'مجموعة',
    'collection-pl': {
      zero: 'مجموعات',
      one: 'مجموعة',
      other: 'مجموعات'
    },
    'collection-title': 'عنوان المجموعة',
    collections: 'مجموعات',
    collectionInitial: 'م',
    competency: 'كفاءة',
    competencies: 'كفاءات',
    completed: 'تم إنجازه',
    completion: 'إنجاز',
    community: 'المجتمع',
    confirm: 'تأكيد',
    'confirm-copy': 'تأكيد ونسخ',
    content: 'محتوى',
    'content-manager': 'مدير المحتوى',
    contentUnavailable: 'لا يوجد محتوى',
    'contributed-by': 'ساهم في ذلك',
    copy: 'نسخ',
    'copy-to': 'نسخ إلى',
    correct: 'صحيح',
    'correct-answer': 'إجابة صحيحة',
    country: 'البلد',
    'course-map': 'خريطة المساق الدراسي',
    course: 'مساق دراسي',
    'course-title': 'عنوان المساق الدراسي',
    courses: 'المساقات الدراسية',
    create: 'أنشئ',
    createClass: 'أنشئ مساق دراسي',
    'created-by': 'إعداد',
    'create-rubric': 'إنشاء سلم تقييم جديد',
    'current-attempt': 'الإجراء الحالي',
    delete: 'حذف',
    'delete-instructions': {
      'links-inaccessible': 'سيتعذر الوصول إلى  جميع الروابط المشارَكة',
      'content-inaccessible':
        'سيتعذر وصول محتوى المساق المحذوف إلى الصفوف الدراسية المرتبطة به.'
    },
    'depth-of-knowledge': 'عمق المعرفة',
    description: 'وصف',
    'disappear-after-login': 'سيختفي هذا بعد  تسجيل دخول {{loginNumber}} ',
    'disappear-next-login': 'لن يظهر هذا عند تسجيل الدخول مرة أخرى',
    district: 'مقاطعة',
    domain: 'مجال',
    domains: 'مجالات',
    download: 'تنزيل',
    'download-print': 'تنزيل أو طباعة',
    'drag-drop-suggestions': 'أو ضع اقتراحاتك هنا.',
    'download-report': 'تنزيل  التقرير',
    edit: 'تعديل',
    showassessments: 'أظهر التقييمات',
    showcollections: 'أظهر المجموعات',
    showlessons: 'أظهر الدروس',
    collapse: 'انطوى',
    expand: 'تمدد',
    'edit-assessment': 'تعديل التقييم',
    'edit-collection': 'تعديل المجموعة',
    'edit-course': 'تعديل المساق الدراسي',
    'edit-question': 'تعديل السؤال',
    'edit-resource': 'تعديل المصدر',
    'edit-rubric': 'تعديل سلم التقييم',
    email_support: 'support@gooru.org',
    emotions: {
      'emotion-1': 'أحتاج للمساعدة',
      'emotion-2': 'لا أفهم',
      'emotion-3': 'الحيرة',
      'emotion-4': 'أفهم ذلك',
      'emotion-5': 'أستطيع الشرح'
    },
    'enter-url': 'أدخِل رابط',
    'enrolled-students': 'الطلاب المسجلين',
    errors: {
      'join-class-code': 'يرجى إدخال رمز الصف الدراسي',
      'answer-has-no-image': 'يرجى تحميل الإجابة على شكل صورة',
      'add-username': 'يرجى إدخال اسم مستخدم',
      'add-course-title': 'يرجى إدخال عنوان المساق الدراسي',
      'add-question-answer-text': 'يرجى إدخال نص الإجابة المختارة',
      'add-question-description': 'يرجى إدخال السؤال',
      'add-question-title': 'يرجى إدخال عنوان السؤال',
      'assessment-title-presence': 'يرجى إدخال عنوان التقييم',
      'can-not-join-class':
        'تعذر الانضمام إلى الصف الدراسي، يرجى إعادة المحاولة بعد قليل',
      'assessment-not-added-to':
        'تعذر إضافة التقييم للدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'assessment-not-copied':
        'تعذر نسخ التقييم الآن. يرجى إعادة المحاولة بعد قليل',
      'assessment-not-created':
        'تعذر إنشاء التقييم الآن. يرجى إعادة المحاولة بعد قليل',
      'assessment-not-updated':
        'تعذر تحديث التقييم الآن. يرجى إعادة المحاولة بعد قليل',
      'category-title-presence': 'يرجى إدخال عنوان الفئة',
      'class-min-score': 'يجب أن يكون الحد الأدنى للعلامة بين 1 و 100',
      'class-not-created':
        'تعذر إنشاء الصف الدراسي الآن. يرجى إعادة المحاولة بعد قليل',
      'class-title-presence': 'يرجى تسمية صفك الدراسي',
      'collection-not-added-to':
        'يتعذر إضافة المجموعة إلى الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'collection-not-copied':
        'تعذر نسخ المجموعة في الوقت الحالي، يرجى إعادة المحاولة بعد قليل',
      'collection-not-created':
        'تعذر إنشاء المجموعة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'collection-not-updated':
        'تعذر تحديث المجموعة الآن. يرجى إعادة المحاولة بعد قليل',
      'collection-title-presence': 'يرجى إدخال عنوان المجموعة',
      'correct-answer-presence': 'يرجى تحديد الإجابة الصحيحة',
      'course-not-copied':
        'تعذر نسخ المساق الدراسي في الوقت الحالي، يرجى إعادة المحاولة بعد قليل',
      'course-not-created':
        'تعذر إنشاء المساق الدراسي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'course-not-updated':
        'تعذر تحديث المساق الدراسي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'highlight-text-not-selected': 'يرجى تحديد الإجابة الصحيحة',
      'highlight-text-wrong-format': 'صيغة السؤال غير صحيحة',
      'hotspot-text-max-choices': 'لقد وصلت إلى الحد الأقصى من خيارات الإجابة',
      'file-max-size': 'يتم دعم الملفات التي يقل حجمها عن 5 ميغابايت فقط',
      'file-upload-missing':
        'يرجى اختيار ملف بأي من الامتدادت التالية: {{extensiones}}',
      'getting-next-resource':
        'حدث خطأ في تثبيت الإجابات، يرجى المحاولة مرة أخرى.',
      'lesson-not-copied':
        'تعذر نسخ الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'lesson-not-created':
        'تعذر إنشاء الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'lesson-not-loaded':
        'تعذر تحميل الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'lesson-title-required': 'يرجى إدخال عنوان الدرس',
      'password-confirm': 'يرجى التأكد من صحة كلمة المرور',
      'password-length': 'يجب أن تكون كلمة المرور بين 5 و 14 حرفاً',
      'password-not-match': 'كلمات المرور غير متطابقة',
      'password-required': 'يرجى إدخال كلمة المرور',
      'password-special-characters': 'يرجى عدم استخدام رموز خاصة',
      'profile-not-updated':
        'تعذر تحديث الملف الشخصي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'question-not-added-to':
        'تعذر إضافة سؤال إلى {{collectionType}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'question-not-copied':
        'تعذر نسخ السؤال في الوقت الحالي. يرجى  إعادة المحاولة بعد قليل',
      'question-not-created':
        'تعذر إنشاء سؤال في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'question-not-updated':
        'تعذر تحديث السؤال في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'reset-password-error':
        'هناك خطأ ما، لا يمكن إعادة تعيين كلمة المرور. يرجى المحاولة بعد قليل',
      'reset-google-account-exists':
        'لقد تم إنشاء حسابك باستخدام حساب جوجل، ولا يمكننا إعادة تعيين كلمة المرور الخاصة به. إذا نسيت كلمة المرور الخاصة بحساب جوجل، يجب عليك إعادة تعيينها عن طريق تطبيقات جوجل.',
      'resource-description-length':
        'الحد الأقصى لعدد الأحرف في الوصف هو 500 حرف.',
      'resource-invalid-url': 'رابط غير صالح',
      'resource-missing-title': 'يرجى إدخال عنوان المصدر',
      'resource-missing-type': 'يرجى تحديد نوع المصدر',
      'resource-missing-url': 'يرجى إدخال رابط صالح',
      'resource-not-added-to-collection':
        'تعذر إضافة المصدر إلى المجموعة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'resource-not-copied':
        'تعذر نسخ المصدر في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'resource-not-created':
        ' تعذر إنشاء المصدر في الوقت الحالي. الرجاء إعادة المحاولة بعد قليل',
      'resource-not-updated':
        'تعذر تحديث المصدر في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'resource-same-host-url':
        'لا يمكن أن تكون المصادر عبارة عن روابط خاصة بجورو',
      'resource-title-length': 'الحد الأقصى لعدد الأحرف في العنوان هو 50 حرفاً',
      'rubric-title-presence': 'يرجى إدخال عنوان سلم التقييم',
      'rubric-url-presence': 'يرجى إدخال رابط سلم التقييم',
      'select-correct-answer': 'يرجى اختيار الإجابة الصحيحة',
      'search-collections-length': 'يرجى إدخال 3 أحرف على الأقل',
      'sign-in-credentials-not-valid':
        'هناك خطأ ما، يرجة التأكد من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى',
      'sign-in-google-account-exists':
        'يرجى تسجيل الدخول باستخدام جوجل، لا يمكننا إعادة تعيين كلمة المرور',
      'sign-up-error': 'تعذر إنشاء الحساب الآن. يرجى إعادة المحاولة بعد قليل',
      'sign-up-first-name': 'يرجى إدخال الاسم الاول',
      'sign-up-last-name': 'يرجى إدخال اسم العائلة',
      'sign-up-name-length': 'يجب أن يحتوي اسم العائلة على حرفين على الأقل',
      'sign-up-name-only-letters': 'يرجى استخدام الأحرف فقط',
      'sign-up-valid-email': 'يرجى إدخال  بريد الكتروني صحيح',
      'special-characters': 'يرجى عدم  استخدام الرموز أو المسافات',
      'unit-not-copied':
        'تعذر نسخ الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'unit-not-created':
        'تعذر إنشاء الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'unit-not-loaded':
        'تعذر تحميل الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
      'unit-title-required': 'يرجى إدخال عنوان الوحدة',
      'user-email-presence': 'يرجى إدخال بريد إلكتروني صالح',
      'username-length': 'يجب أن يتكون اسم المستخدم من 4 إلى 254 حرفاً. ',
      'forgot-password-gmail':
        'يرجى تسجيل الدخول باستخدام جوجل، لا يمكننا إعادة تعيين كلمة المرور'
    },
    'essential-questions': 'الأسئلة الأساسية',
    example: 'مثال:',
    exit: 'خروج',
    explanation: 'شرح',
    explore: 'ابحث',
    false: 'خطأ',
    'featured-courses': 'المساقات الدراسية المميزة',
    'file-name': 'اسم الملف',
    finish: 'إنهاء',
    'first-name': 'الاسم الأول',
    follow: 'متابعة',
    followers: 'متابِعون',
    following: 'متابَعون',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    from: 'من',
    'from-my-assessments': 'من تقييماتي',
    'from-my-collections': 'من مجموعاتي',
    'from-my-questions': 'من أسئلتي',
    'from-my-resources': 'من مصادري',
    'hide-results': 'إخفاء النتائج',
    hints: 'تلميحات',
    home: 'الصفحة الرئيسية',
    if_questions: 'إذا كان لديك أية أسئلة،',
    information: 'معلومات',
    'in-progress': 'جاري',
    instructor: 'مدرب',
    'last-name': 'اسم العائلة',
    'last-updated': 'آخر تحديث',
    'latest-attempt': 'آخر محاولة',
    'launch-anonymous': 'بدء التقييم المجهول',
    'launch-on-air': 'التقييم المباشر',
    'learning-objectives': 'أهداف التعلم',
    'learning-target': 'معيار جزئي',
    'learning-target-mobile': 'المعيار الجزئي ضمن المعيارالأساسي',
    lesson: 'درس',
    lessonInitial: 'د',
    'lesson-title': 'عنوان الدرس',
    lessonObj: {
      zero: 'الدروس',
      one: 'درس',
      other: 'الدروس'
    },
    libraries: 'المكتبات',
    license: 'رخصة',
    link: 'الربط',
    'link-out': 'ربط خارجي',
    'link-out-message':
      '* إذا ظهر المصدر الخاص بك فارغاً عند المعاينة أعلاه، فقد تحتاج إلى تفعيل خاصية "ربط خارجي" لعرض المحتوى في صفحة أخرى.',
    'live-assessments': 'التقييمات المباشرة',
    loading: 'جار التحميل ...',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    mastery: 'إتقان',
    menu: 'القائمة',
    'more-details': 'مزيد من التفاصيل',
    move: 'نقل',
    myContent: 'المحتوى الخاص بي',
    library: 'المكتبة',
    myPerformance: 'آدائي',
    'edit-narration': 'تعديل السرد',
    narration: 'السرد',
    'new-assessment': 'تقييم جديد',
    'new-collection': 'مجموعة جديدة',
    'new-question': 'سؤال جديد',
    'new-question-text': 'أدخل نص السؤال هنا',
    'new-fib-question-text': 'أدخل السؤال مع [الإجابة]',
    'new-resource': 'مصدر جديد',
    next: 'التالى',
    no: 'لا',
    'no-archived': 'لا يوجد لديك أي صفوف دراسية مؤرشفة',
    'no-content': 'لا يوجد محتوى',
    'no-content-my-report':
      'لا يوجد تقارير، سيكون لديك تقارير عند البدء بالتعلم.',
    'no-assessments-to-display': 'لا يوجد تقييمات',
    'no-collections-to-display': 'لا يوجد مجموعات',
    'no-courses-to-display': 'لا يوجد مساقات دراسية',
    'no-questions-to-display': 'لا يوجد أسئلة',
    'no-resources-to-display': 'لا يوجد مصادر',
    'no-rubrics-to-display': 'لا يوجد سلالم تقييم',
    'no-followers': 'لا يوجد متابِعون بعد',
    'no-independent-results':
      'عندما تبدأ البحث عن  {{contentType}} يحتوي على إشارة مرجعية، سيظهر هنا.',
    'no-results': 'لم يتمّ العثور على نتائج.',
    'no-available-results': 'لا يوجد نتائج',
    'no-results-message':
      'يرجى تفقد الإملاء، هناك خطأ ما.\nابحث في نطاق أوسع واحذف بعض مرشحات البحث.\nأو ابحث عن كلمة مشابهة.',
    'no-more-attempts': 'لا مزيد من المحاولات',
    'no-dca-student':
      'لم يقم معلمك بتعيين أي مجموعات أو تقييمات إلى نشاطات الصف اليومية.',
    'no-dca-teacher':
      'لا يوجد نشاطات حالية. ضِف نشاطات الصف اليومية من "خريطة المساق الدراسي" أو من "المحتوى الخاص بي"',
    notScored: 'غير مسَجَّل',
    notStarted: 'لم تبدأ.',
    'not-added': 'غير مُضاف',
    'not-applicable': 'غ/م',
    'not-following': 'أنت غير متابع لأي شخص.',
    'not-provided': 'غير مزوَّد',
    'not-specified': 'غير محدد',
    not_started: 'لم تبدأ.',
    'nothing-to-display': 'لا شيء للعرض',
    number: 'رقم',
    numberStudents: {
      zero: '{{count}} الطلاب',
      one: '{{count}} طالب',
      other: '{{count}} الطلاب'
    },
    of: 'من',
    off: 'إيقاف',
    on: 'تشغيل',
    other: 'أخرى',
    'overall-performance': 'الآداء العام',
    password: 'كلمة المرور',
    pending: 'قيد الانتظار',
    performance: 'عرض الأداء',
    'performance-dashboard': 'لوحة التحكم بالأداء',
    play: 'تشغيل',
    please_contact: 'يرجى التواصل',
    'post-message': 'نشر الرسالة',
    preview: 'معاينة',
    profile: 'الملف الشخصي',
    'profile-publishing': 'إمكانية رؤية الملف الشخصي',
    'publish-to': 'اجعل هذا مرئيا للآخرين في مكتبة ملفي الشخصي',
    'published-by': 'نشرت من قبل',
    'published-tooltip': 'محتوى مميز',
    publisher: 'الناشر',
    question: 'سؤال',
    questions: 'أسئلة',
    'questions-OE': 'أسئلة "الجواب الكتابي"',
    'question-pl': {
      zero: 'أسئلة',
      one: 'سؤال',
      other: 'أسئلة'
    },
    'question-title': 'عنوان السؤال',
    'question-type': {
      SA: 'إجابة واحدة',
      MC: 'خيارات متعددة',
      FIB: 'املأ الفراغ',
      'T/F': 'صح أم خطأ',
      T_F: 'صح أم خطأ',
      MA: 'إجابات متعددة',
      OE: 'إجابة كتابية',
      HS_TXT: 'اختيار متعدد - نص',
      HS_IMG: 'اختيار متعدد - صورة',
      HT_TO: 'سحب وإفلات',
      HT_RO: 'سحب وإفلات',
      HT_HL: 'تظليل النص'
    },
    reaction: 'تفاعل',
    'read-first': 'اقرأ هذا أولاً',
    remaining: 'بقي {{number}}',
    remix: 'إعادة مزج',
    'remix-assessment': 'إعادة مزج التقييم',
    'remix-assessment-lead': 'أنت على وشك إعادة مزج التقييم.',
    'remix-assessment-success':
      'تمت إعادة مزج التقييم {{assessmentTitle}}. هل تريد تعديل هذا التقييم؟',
    'remix-collection': 'إعادة مزج المجموعة.',
    'remix-collection-lead': 'أنت على وشك إعادة مزج المجموعة.',
    'remix-collection-success':
      'لقد قمت بإعادة مزج مجموعة {{collectionTitle}}. هل تريد تعديل هذه المجموعة؟',
    'remix-course': 'إعادة مزج المساق الدراسي.',
    'remix-course-lead': 'أنت على وشك إعادة مزج المساق الدراسي.',
    'remix-course-success':
      'لقد قمت بإعادة مزج المساق الدراسي {{courseTitle}}. هل تريد تعديل هذا المساق؟',
    'remix-lesson': 'إعادة مزج الدرس',
    'remix-lesson-lead': 'أنت على وشك إعادة مزج هذا الدرس.',
    'remix-lesson-success': 'لقد قمت بإعادة مزج درس {{lessonTitle}}.',
    'remix-question': 'إعادة مزج السؤال',
    'remix-question-lead': 'أنت على وشك إعادة مزج السؤال.',
    'remix-question-success':
      'لقد قمت بإعادة مزج سؤال {{questionTitle}}. هل تريد تعديل هذا السؤال؟',
    'remix-resource': 'إعادة مزج المصدر',
    'remix-resource-lead': 'أنت على وشك إعادة مزج المصدر.',
    'remix-resource-success':
      'لقد قمت بإعادة مزج مصدر {{resourceTitle}}. هل تريد تعديل هذا المصدر؟',
    'remix-unit': 'إعادة مزج الوحدة',
    'remix-unit-lead': 'أنت على وشك إعادة مزج الوحدة.',
    'remix-unit-success': 'لقد قمت بإعادة مزج وحدة {{unitTitle}}.',
    'remixed-by': 'أُعيد مزجه من قبل',
    'remix-warning':
      'هناك الكثير من المحتوى الرائع في هذا المساق، ونسخه سيستغرق وقتاً، يرجى تأكيد بدء عملية النسخ وفي غضون 15 دقيقة ستكون نسختك على ملفك الشخصي. ',
    remove: 'حذف',
    report: 'تقرير',
    'report-in-progress': 'جاري إعداد التقرير.',
    'request-to': 'الطلب قيد المراجعة للحصول على شارة.',
    'request-report': 'طلب تقرير',
    resource: 'مصدر',
    resources: 'مصادر',
    'resource-format': {
      image: 'صورة',
      text: 'نص',
      video: 'فيديو',
      interactive: 'تفاعلي',
      webpage: 'صفحة ويب',
      audio: 'تسجيل صوتي',
      question: 'سؤال'
    },
    'resource-pl': {
      zero: 'مصادر',
      one: 'مصدر',
      other: 'مصادر'
    },
    'resource-title': 'عنوان المصدر',
    'resource-url': 'رابط المصدر',
    role: 'دور',
    rubric: 'سلم تقييم',
    'rubric-creation': 'إنشاء سلم التقييم',
    rubrics: 'سلم تقييم',
    'rubric-title': 'عنوان سلم التقييم',
    save: 'حفظ',
    'save-next': 'حفظ والتالي',
    'save-submit': 'حفظ وتثبيت',
    'save-finish': 'حفظ وانتهاء',
    school: 'مدرسة',
    'school-info': 'معلومات المدرسة',
    score: 'العلامة',
    select: 'اختر',
    'select-a-framework':
      'يرجى أولا اختيار إطار المعايير في قسم معلومات المساق الدراسي أعلاه.',
    sentence: 'جملة',
    settings: 'إعدادات',
    search: 'بحث',
    'search-placeholder': 'بحث',
    'search-placeholder-text': 'بحث...',
    'search-error-message': 'يجب أن تتكون مصطلحات البحث من 3 أحرف على الأقل.',
    'search-400-error-message': 'يرجى  إدخال مصطلح صحيح للبحث',
    'search-competency': 'كفاءة البحث',
    'search-standards': 'معايير البحث',
    'select-question-type': 'اختر نوع السؤال',
    'select-resource-type': 'اختر نوع المصدر',
    'send-request': 'أرسل الطلب',
    share: 'مشاركة',
    'show-correct-answer': 'أظهر الإجابة الصحيحة',
    'show-more-results': 'أظهر المزيد من النتائج',
    'show-results': 'أظهر النتائج',
    signUp: 'إنشاء حساب',
    sortAlphabetical: 'فرز حسب الترتيب أبجدي',
    sortAverage: 'فرز حسب المعدل',
    'sort-most-recently': 'فرز حسب آخر تحديث',
    state: 'الدولة أو المقاطعة',
    'state-territory': 'الدولة/المقاطعة',
    standard: 'معيار',
    standards: 'المعايير',
    study: 'ادرس',
    'study-now': 'ادرس الآن',
    student: 'طالب',
    'student-id': 'هوية الطالب (غير ظاهرة على الملف الشخصي)',
    'studen-id-display':
      'هوية الطالب (غير ظاهرة على الملف الشخصي ولكن ظاهرة عند التقييم المجهول)',
    'subject-and-framework': 'الموضوع وإطار العمل',
    submit: 'تثبيت',
    'submit-all': 'تثبيت',
    submitAll: 'إرسال الكل',
    'submit-finish': 'تثبيت وإنهاء',
    swap: 'إعادة ترتيب',
    suggestion: 'اقتراح',
    suggestions: 'اقتراحات',
    'suggested-resources': 'المصادر المقترحة',
    support: 'المساعدة',
    'start-tour': 'قم بجولة',
    'take-me-there': 'انقلني إلى هناك',
    teach: 'درِّس',
    teacher: 'مدرس',
    timeSpent: 'الوقت المستغرق',
    'toggle-dropdown': 'تبديل القائمة المنسدلة',
    tools: 'أدوات',
    true: 'صحيح',
    type: 'اكتب',
    unBookmark: 'إشارة مرجعية',
    unexpectedError: 'حدث خطأ غير متوقع وتم الإبلاغ عنه، نعتذر عن ذلك!',
    unfollow: 'إلغاء المتابعة',
    unit: 'وحدة',
    'unit-title': 'عنوان الوحدة',
    unitInitial: 'و',
    unitObj: {
      zero: 'وحدات',
      one: 'وحدة',
      other: 'وحدات'
    },
    'untitled-course': 'المساق الدراسي  الأول',
    'untitled-lesson': 'درس بلا عنوان',
    'untitled-unit': 'وحدة بلا عنوان',
    'update-thumbnail': 'تحديث الصورة المصغرة',
    'update-photo': 'تحديث الصورة',
    upload: 'تحميل',
    'upload-file': 'تحميل الملف',
    'upload-thumbnail': 'تحميل الصورة المصغرة',
    'upload-photo': 'تحميل الصورة',
    'remove-photo': 'حذف الصورة',
    'use-case': 'حالة الاستخدام',
    'valid-extensions': 'امتدادات الملفات الصالحة هي: {{extensions}}',
    verified: 'تم التحقق منه',
    'visibility-tooltip': 'غير مرئي للآخرين',
    'visibility-available': 'مرئي للآخرين',
    warnings: {
      'on-air-connection-lost':
        'فقدت لوحة تحكم "التقييم المباشر" الاتصال، وتتم إعادة المحاولة تلقائيا. يرجى عدم تحديث الشاشة.',
      'character-limit': 'لقد وصلت إلى الحد الأقصى من عدد الأحرف المسموح به'
    },
    word: 'كلمة',
    yes: 'نعم'
  },
  index: {
    joinUs: 'انضم الينا في "احترام حق الإنسان في التعيلم"',
    browseContent: {
      title: 'مرحباً بك! عن ماذا تبحث؟',
      description_1: 'أنا أبحث عن',
      description_2: 'مواد التعليم في',
      description_3: 'أو',
      button: 'تصفح المحتوى ',
      footer: {
        description_1: 'هل لديك حساب؟',
        description_2: 'هنا.',
        login: 'تسجيل الدخول'
      },
      grades_missing_message: 'يرجى تحديد المرحلة الدراسية والموضوع.',
      subjects_missing_message: 'يرجى تحديد الموضوع'
    },
    gettingStarted: {
      title: 'بدء استخدام موقع جورو',
      toolkit: {
        title: 'أدوات بدء الاسنخدام',
        description:
          'مرحبا بكم في جورو! ألق نظرة على هذه المصادر لمعرفة ما يمكنك القيام به مع جورو والبدء بسرعة.'
      },
      classroom: {
        title: 'قصص من الصف الدراسي',
        description:
          'تعلم مقتدياً بالقصص المطروحة من قبل المعلمين الذين يقولون أن جورو قد أحدث فرقاً في صفوفهم الدراسية.'
      },
      events: {
        title: 'أهم الأحداث.',
        description:
          'نقدم ندوات ودورات تدريبية مجانية لمساعدتك في البدء مع جورو.'
      }
    },
    empowerStudents: {
      title: 'تمكين الطلاب من التعلم على طريقتهم الخاصة.',
      find: 'جد',
      remix: 'إعادة مزج',
      share: 'مشاركة',
      monitor: 'راقِب'
    },
    findDescription:
      'تصفح الآلاف من المجموعات من الروضة وحتى الصف 12 التي أعدّها المعلمون  أو ابحث فيما يزيد عن 16 مليون مصدر. ',
    remixDescription: 'أعد مزج المجموعات ونسق المحتوى لتلبية احتياجات طلابك.',
    shareDescription:
      'شارك المجموعات مع طلابك من خلال صفوف جورو. تسجيل الدخول غير مطلوب.',
    monitorDescription:
      'قم بقياس مدى تقدم وتفاعل الطلاب، للتدخل المباشر إذا تطلب الأمر ذلك.',
    freeAndOpen: {
      title: 'مجاني ومتوفر دائماً',
      description:
        'نؤمن بان التعليم حق من حقوق الإنسان. سيقدم موقع جورو للمعلمين والطلاب في جميع انحاء العالم خدمات تعليم مجانية دائمة وبدون إعلانات. ',
      button: 'تعلم المزيد عن نهجنا'
    }
  },
  class: {
    info: {
      'class-info': 'معلومات الصف االدراسي',
      teachers: 'المعلمون',
      students: 'الطلاب',
      subject: 'موضوع',
      grade: 'مرحلة دراسية',
      description: 'وصف',
      'edit-info': 'تعديل المعلومات',
      'share-class': 'شارك الصف الدراسي',
      'invite-co-teachers': 'قم بدعوة المعلمين المشاركين',
      'add-students': 'ضِف الطلاب',
      'class-code': 'رمز الصف الدراسي',
      delete: 'حذف الصف الدراسي'
    },
    edit: {
      'assigned-course': 'المساق الدراسي المُعيّن',
      'basic-info': 'معلومات أساسية',
      'class-name': 'اسم الصف الدراسي',
      'class-greetings': 'إعلانات الصف الدراسي',
      'class-greetings-placeholder':
        'ألقِ التحية على طلابك أو حفزهم أو أنشئ إعلاناً لهم...إلخ',
      'class-minscore': 'علامة التقييم الدنيا للجوائز (1-100%)',
      'course-map': 'خريطة المساق الدراسي',
      'edit-class': 'تعديل إعدادات الصف الدراسي'
    },
    overview: {
      title: 'خريطة المساق الدراسي',
      locate: 'حدد موقعي',
      'edit-content': 'تعديل المحتوى',
      'add-to-daily-class-activities': 'ضِف إلى أنشطة الصف اليومية'
    },
    analytics: {
      performance: {
        title: 'عرض الأداء',
        'better-experience-message':
          'للحصول على تجربة أفضل مع جورو، قم بعرض التحليل الخاص بالصف الدراسي على الحاسوب المكتبي أو الحاسوب اللوحي.',
        'no-content': 'لم يبدأ طلابك بدراسة أي مساق بعد.',
        actions: {
          share: 'مشاركة',
          edit: 'تعديل المحتوى',
          download: 'تنزيل',
          fullScreen: 'عرض ملء الشاشة',
          exitFullScreen: 'تصغير الشاشة ',
          assessment: 'عرض التقييم',
          collection: 'عرض المجموعة',
          both: 'عرض كلاهما'
        },
        teacher: {
          metricsTable: {
            average: 'معدل',
            'class-average': 'معدل الصف'
          }
        },
        'grade-items': 'بنود الصف',
        'gru-grade-items': {
          students: {
            zero: '{{count}} الطلاب',
            one: '{{count}} طالب',
            other: '{{count}} الطلاب',
            'not-started': 'لم تبدأ.'
          }
        }
      },
      mastery: {
        title: 'عرض الإتقان'
      }
    },
    'quick-start': {
      title: 'تعيين محتوى لهذا الصف الدراسي.',
      'new-course': 'ابدأ مساق درسي جديد سريعاً',
      'new-course-desc': 'ابدأ بإنشاء مساق دراسي جديد، أو مجموعة أو تقييم',
      course: 'مساق دراسي جديد',
      'new-collection': 'مجموعة جديدة',
      'new-assessment': 'تقييم جديد',
      'remix-a-sample': 'امزج عينة',
      'add-existing-course': 'ضِف مساق دراسي من مكتبتك',
      'existing-course-desc': 'الطريقة الأسرع لبدء الصف الدراسي',
      'choose-course': 'اختر المساق الدراسي',
      'remix-from-course': 'امزج مساقاً دراسياً مميزاً',
      'featured-course': 'عرض المساقات الدراسية المميزة',
      'remix-desc': 'انسخ ونسق درساً مميزاً لطلابك'
    }
  },
  classes: {
    classesJoined: 'الصفوف الدراسية التي انضممت إليها',
    classesTaught: 'الصفوف التي أدرّسها',
    noClassesJoined: 'لم تنضم إلى أي صف دراسي',
    noClassesTaught: 'لم تنشئ أي صف دراسي'
  },
  content: {
    assessments: {
      edit: {
        'best-practices':
          'التقييم هو مجموعة من الأسئلة، كل سؤال بعلامة معينة، من خلال الإجابة عليها تستطيع أنت وطلابك تحديد مدى استيعابهم للدرس وتقييم الآداء. \n\nاستخدم أنواع مختلفة من الأسئلة في تقييمك بما في ذلك أسئلة متعددة تابعة لائتلاف تقييم متوازن أذكي(SBAC)، حتى يعبّر الطلاب عن استعيعابهم بطرق  مختلفة. و ننصح بربط الأسئلة بالمعايير والمعايير الجزئية الخاصة بها، ومفهوم عمق المعرفة لنورمان ويب.'
      }
    },
    classes: {
      create: {
        title: 'أنشئ صف دراسي',
        content: 'حيث يستطيع الطلاب التفاعل مع المحتوى',
        'class-name-input': 'قم بتسمية صفك الدراسي',
        'condition-prompt': 'كيف سينضم الطلاب إلى صفك الدراسي؟',
        'condition-prompt-code': 'أي شخص لديه رمز الصف الدراسي',
        'condition-prompt-invite': 'دعوة فقط',
        'get-started': 'ابدأ'
      },
      join: {
        title: 'انضم إلى صف دراسي جديد',
        content: 'حيث تبدأ الرحلة.',
        'not-now': 'ليس الان',
        'class-code-input': 'أدخل رمز الصف الدراسي',
        'class-not-found':
          'لم يتم العثور على الصف الدراسي. تأكد من إدخال رمز الصف الدراسي الصحيح.',
        'invalid-code': 'رمز الصف الدراسي غير صالح.',
        'already-member': 'أنت عضو في هذا الصف  الدراسي بالفعل.',
        'join-class': 'انضم للصف الدراسي',
        'terms-and-conditions':
          'من خلال النقر على الانضمام إلى الصف الدراسي، أوافق على مشاركة بيانات تقدُّم تقييمي ومجموعتي التي تم إنشاؤها من خلال الدراسة في هذا الصف الدراسي ومعلميه في جورو.'
      }
    },
    collections: {
      edit: {
        'assign-to-course': 'تعيين إلى المساق الدراسي',
        'best-practices':
          'يستطيع الطلاب التفاعل مع المحتوى في مرحلة "المجموعة" ، فعند إنشاء مجموعة تعليمية تأكد من احتوائها على أهداف التعلم، مع الأخذ بعين الاعتبار استخدام أنواع متعددة من المصادر لعرض المفاهيم للطلاب وبطرق متعددة.\nاستخدم المصادر بشكل متسلسل لبناء المفاهيم، التقدم في مرحلة " المجموعة" يجب أن يتمّ بشكل منطقي، ويجب أن ينقل الطلاب المستهدفين من مرحلة عامة إلى مرحلة أكثر تعقيداً من الاستيعاب إذا كان ذلك مناسباً، أو أن يسمح باكتشاف مستوى الطلاب بشكل كافٍ.\n\nيمكنك أيضا للتحقق من مدى استيعاب الطلاب من خلال أسئلة جورو أو الوسائل التفاعلية الأخرى. نوصي بما يكفي من المصادر و/ أو تنوّع كاف من المصادر لتحقيق أهداف المجموعة والتأكد من أن كل مصدر له دور وهدف معين.'
      }
    },
    courses: {
      edit: {
        'assign-to-class': 'تعيين إلى الصف',
        'best-practices':
          'المساق الدراسي هو ملف يسمح لك بتنظيم المحتوى التعليمي الخاص بك على شكل وحدات ودروس. عند إنشاء مساق دراسي يجب أن تأخذ بعين الاعتبار الأسئلة الأساسية وأهداف التعلم وتنظيم المحتوى الخاص بك.\n\nتستطيع  تجميع الدروس معاً لإنشاء تجربة مختلفة لطلابك (مثال: يمكنك ترتيب الوحدات حسب التسلسل الزمني أو الموضوع أو المعيار)',
        information: {
          'course-title': 'عنوان المساق الدراسي',
          description: 'وصف'
        }
      }
    },
    questions: {
      edit: {
        'add-to': 'إضافة إلى',
        'best-practices':
          'السؤال هو مصدر يتطلب الإجابة عليه من قبل الطالب، ونحن نقدم أنواعاُ مختلفة من الأسئلة لدعم طبيعة تلك التي سيراها طلابك على ائتلاف تقييم متوازن أذكي (SBAC) و الشراكة من أجل تقييم الجاهزية للكلية والوظائف(PARCC)  والتقييمات الأخرى. \n\nيجب أن تأخذ بعين الاعتبار تنويع طريقة اختيارك لطبيعة الأسئلة من حين لآخر، حتى تُعرّض الطلاب لأنواع مختلفة من االأسئلة، إضافة إلى تزويدهم بصيغ متعددة لكي يتمكنوا من اظهار استيعابهم بطرق مختلفة.\n\nاربط الأسئلة بالمعايير والمعايير الجزئية الخاصة بها، وبمفهوم عمق المعرفة لنورمان ويب، حتى تتمكن من رؤية مدى تفاعل طلابك مع الأسئلة من خلال لوحة التحكم الخاصة بك.',
        information: {
          'question-title': 'عنوان السؤال',
          'question-type': 'نوع السؤال'
        },
        builder: {
          'add-answer-choice': '+ ضِف خيار سؤال',
          'add-hint': 'ضِف تلميحات',
          'add-explanation': 'ضِف شرح',
          answer: 'إجابة',
          'answer-instructions': {
            FIB: 'ضِف ما يصل إلى 5 ملحوظات وشرح للإجابة.',
            HS_IMG:
              'يمكنك إضافة ما يصل إلى 10 إجابات على شكل صورة واختيار إجابة صحيحة واحدة أو أكثر.',
            HS_TXT:
              'يمكنك إضافة ما يصل إلى 10 إجابات على شكل خيارات واختيار إجابة صحيحة واحدة أو أكثر.',
            HT_HL_ST:
              'عند كتابة السؤال، استخدم الأقواس للإشارة إلى الجمل المظللة. بحيث يحتوي زوج الأقواس الواحد على جملة واحدة فقط تنتهي بنقطة. مثال: بنى الخنزير الأول الصغير منزله من القش. (هاجم الذئب السيء الكبير المنزل من الأسفل.) بنى الخنزير الثاني بيته من الخشب. الحد الأقصى للأحرف: 5000',
            HT_HL_WD:
              'عند كتابة السؤال، استخدم الأقواس للإشارة إلى الكلمات المظللة. بحيث يحتوي زوج الأقواس الواحد على كلمة واحدة فقط. مثال: هاجم الذئب الشرير (الكبير) المنزل من (الأسفل). الحد الأقصى للأحرف: 5000',
            HT_RO:
              'يمكنك إضافة ما يصل إلى 10 إجابات بالترتيب الصحيح. حيث أن الترتيب سيكون عشوائيا لدى الطلاب.',
            MA:
              'يمكنك إضافة ما يصل إلى 10 إجابات وصورة وشرح وما يصل إلى 5 تلميحات.',
            MC:
              'يمكنك إضافة ما يصل إلى 10 إجابات وتحديد إجابة صحيحة واحدة. الحد الأقصى للأحرف: 200 ',
            OE: 'اكتب الإجابة الصحيحة. الحد الأقصى للأحرف: 5000.',
            'T/F': 'اختر الإجابة الصحيحة.'
          },
          'question-instructions': {
            FIB:
              'عند كتابة السؤال بصيغة "املأ الفراغ"، استخدم الأقواس لتحديد الكلمات التي يجب أن يكون مكانها فارغاً في الجملة. مثال: "هاجم (الذئب) الشرير الكبير (المنزل) من الأسفل." يمكنك إضافة صورة أيضاً.',
            HS_TXT: 'اكتب سؤالك.',
            HS_IMG: 'اكتب سؤالك.',
            HT_RO: 'اكتب سؤالك.',
            HT_HL: 'وجِه سؤالاً لطلابك.',
            MC: 'اكتب سؤالك.',
            MA: 'اكتب سؤالك.',
            OE: 'اكتب سؤالك.',
            'T/F': 'اكتب سؤالك.'
          },
          'submission-format': {
            title: 'نموذج تقديم الطالب',
            'answer-type': {
              'text-box': 'مربع النص'
            }
          },
          'feedback-grading': {
            title: 'التغذية الراجعة و العلامة',
            'from-existing-rubric': 'من سلم التقييم الحالي',
            scoring: 'العلامة',
            'maximum-points': 'الحد الأعلى لعدد النقاط',
            increment: 'الحد الأدنى لعدد النقاط',
            'rubric-error': 'يرجا إضافة سلم تقييم'
          }
        }
      }
    },
    modals: {
      'delete-bookmark': {
        confirmation: 'هل تريد حذف االإشارة المرجعية عن الـ {{type}}؟',
        'delete-error':
          'تعذر حذف الإشارة المرجعية عن هذا الـ {{type}} الآن. يرجى إعادة المحاولة بعد قليل.'
      },
      'remove-class-activity': {
        confirmation:
          'هل أنت متأكد من حذف هذا {{type}} من قائمة نشاطات الصف اليومية؟ ',
        'delete-error': 'تعذر حذف هذا {{type}} الآن، يرجى المحاولة بعد قليل.'
      },
      'delete-class': {
        legend: 'أنت على وشك حذف صفك الدراسي',
        'student-access': 'لن يتمكن الطلاب من الولوج للصف الدراسي',
        'student-data-deleted': 'سيتم حذف جميع بيانات الطالب.'
      },
      'archive-class': {
        title: 'قم بأرشفة الصف الدراسي',
        legend: 'أنت على وشك أرشفة الصف الداسي ',
        'links-not-accessible': 'سيتعذر الوصل إلى جميع الروابط المشاركة',
        'students-no-access': 'لن يتمكن الطلاب من ولوج الصف الدراسي',
        'not-add-students':
          'لن تتمكن من إضافة المزيد من الطلاب إلى الصف الدراسي',
        confirmation: 'هل أنت متأكد من أرشفة '
      },
      'delete-content': {
        legend: 'أنت على وشك حذف',
        'content-legend': '{{title}} - {{index}} {{type}} من {{parentName}}',
        'content-legend-header': '{{title}} من {{parentName}}',
        'delete-warning': 'سيتم حذف جميع المحتويات الموجودة في هذا {{type}}',
        'delete-error':
          'تعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
        confirmation:
          'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه وانقر على "حذف".'
      },
      'delete-resource': {
        legend: 'يرجى تأكيد حذف {{title}} بشكل نهائي.',
        'delete-warning': 'سيتم حذف جميع المحتويات الموجودة في هذا {{type}}',
        'delete-error':
          'تعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
        confirmation: 'هل تريد المتابعة؟ يرجى النقر على \u0027حذف نهائي\u0027.',
        'first-check': 'هذا حذف نهائي ولا يمكن التراجع عنه.',
        'second-check':
          'سيتم حذف جميع نسخ هذا المصدر في مجموعاتك ومجموعات أي مستخدم في منظمتك.'
      },
      'delete-rubric': {
        legend: 'يرجى تأكيد حذف {{title}} بشكل نهائي.',
        'delete-warning': 'سيتم حذف المحتوى من سلم التقييم هذا',
        'delete-error': 'يتعذر حذف سلم التقييم الآن، يرجى المحاولة بعد قليل. ',
        confirmation: 'هل تريد المتابعة؟ يرجى النقر على \u0027حذف نهائي\u0027.',
        'first-check': 'هذا حذف نهائي ولا يمكن التراجع عنه.'
      },
      'remove-content': {
        legend: 'أنت على وجد حذف {{title}} من {{parentName}}',
        'remove-error':
          'يتعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
        confirmation:
          'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه والنقر على "حذف".'
      },
      'remove-student': {
        title: 'حذف الطالب وبياناته',
        legend:
          'أنت على وشك حذف{{studentName}} من هذا الفصل الدراسي وحذف جميع بياناته.',
        'data-inaccessible':
          'سيتم حذف جميع البيانات الخاصة به  ولا يمكن الوصول إليها من قبل أيٍ منكم.',
        'classroom-access':
          'لن يتمكن من الوصول إلى الصفوف الدراسية أو المحتوى.',
        'data-lost': 'في حال انضمامه مرة أخرى، سيفقد جميع البيانات السابقة.',
        'remove-error':
          'تعذر حذف هذا الطالب في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
        confirmation:
          'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه وانقر على "حذف".'
      },
      'quick-remove-content': {
        legend: 'يرجى تأكيد حذف {{title}} من {{parentName}}.'
      },
      'quick-delete-content': {
        legend: 'يرجى تأكيد حذف {{title}} من {{parentName}} بشكل نهائي.',
        delete: 'حذف نهائي'
      }
    },
    resources: {
      edit: {
        'best-practices':
          ' المصادر عبارة عن وسائط متعددة بصيغ مختلفة كالفيديوهات، والمحتوى التفاعلي والمواقع الإلكترونية وصور ومستندات جوجل وغيرها. كن مبدعاً واستخدم مصادرك الخاصة  أو ابحث بدهاء في مخزون جورو الوافر من المصادر.\n\nاستخدم المصادر بصيغها المتنوعة  لجذب انتباه طلابك إضافة للشرح الكلامي لإرشادهم أثناء استخدام المصدر. \n\nكما ننصح بربط كل سؤال بالمعايير الخاصة به أو المعايير الجزئية، و مهارات القرن الواحد والعشرين. يمكنك مراقبة تفاعل الطلاب مع المصادر من خلال لوحة التحكم الخاصة بك.',
        'placeholder-message': 'ضِف المصدر لمعاينته هنا.',
        'not-implemented': 'لم تتم معاينة المصدر بعد',
        information: {
          'im-publisher': 'أنا الناشر',
          'select-a-license': 'يرجى اختيار  رخصة'
        }
      }
    }
  },
  user: {
    'active-classrooms': 'الصفوف الدراسية النشِطة',
    'archived-classrooms': 'الصفوف الدراسية المؤرشفة',
    classrooms: 'الصفوف الدراسية',
    'create-class': 'أنشئ صفاً دراسياً',
    hello: 'مرحباً، {{name}}!',
    'independent-learning': 'التعليم المستقل',
    'join-class': 'انضم للصف الدراسي',
    'joined-classes': {
      zero: 'أنت مسجِل حالياً في {{count}} صف دراسي',
      one: 'أنت مسجِل حالياً في صف دراسي واحد',
      other: 'أنت مسجِل حالياً في {{count}} صف دراسي'
    },
    'my-current-classes': 'صفوفي الدراسية الحالية',
    'manage-goals': 'إدارة الأهداف',
    'my-classes': 'صفوفي الدراسية',
    'teaching-classes': {
      zero: 'أنت تٌعلِّم حالياً {{count}} صف دراسي',
      one: 'أنت تٌعلِّم حالياً عصف دراسي واحد',
      other: 'أنت تٌعلِّم حالياً {{count}} صف دراسي'
    }
  },
  'student-landing': {
    announcement: 'إعلان',
    'browse-featured-courses': 'تصفح مساقاتنا الدراسية المميزة',
    'browse-our': 'تصفح',
    'class-code': 'رمز الصف',
    'featured-courses': 'المساقات الدراسية المميزة',
    class: {
      'assigned-course': 'المساق الدراسي المعيّن',
      'back-to': 'العودة إلى الصفوف الدراسية',
      'no-course': 'لا يوجد مساقات دراسية في هذا الصف.',
      'no-course-assigned': 'لم يتم تعييم مساق دراسي',
      'back-to-independent': 'العودة إلى التعليم المستقل.',
      report: 'تقرير',
      performance: 'أداء',
      'course-map': 'خريطة المساق الدراسي',
      unit: 'وحدة',
      lesson: 'درس',
      'class-activities': 'أنشطة الصف اليومية',
      'class-activities-tab': {
        today: 'اليوم'
      },
      'my-report': 'تقريري'
    },
    course: {
      'to-report': 'ملخص الاستخدام',
      'total-time-spent': 'إجمالي الوقت المستغرق'
    },
    'current-activity': 'النشاط الحالي',
    'resume-current-activity': 'لخِّص النشاط الحالي',
    'not-available': 'غير متوفر',
    'join-classroom': 'انضم لصف معلمك الدراسي لبدء التعلم',
    learn: 'تعلم مع صف جورو الدراسي',
    'my-performance': {
      activity: 'نشِط ',
      activities: {
        study: 'ادرس'
      },
      assessments: 'التقييمات',
      collections: 'مجموعات',
      filter: 'مُرشِح',
      'primary-text':
        'قم باختيار الأشياء التي تريد تحليلها، وسنقوم بإنشاء تقرير خاص بالأداء.',
      subject: 'موضوع',
      title: 'حلل أدائك',
      'time-period': 'فترة زمنية',
      'update-report': 'تحديث التقرير'
    },
    'my-study': 'دراستي',
    'no-classrooms':
      'لم تنضم إلى أي صف دراسي بعد . انقر على "انضم للصف" لإضافة الصف الخاص بمعلمك. بإمكانك أن تبحث عن الصفوف الدراسية المميزة تحت علامة تبويب "المكتبة".',
    'no-content-classrooms': 'لا يوجد محتوى في هذا الصف حالياً',
    welcome: 'مرحبا بكم في جورو'
  },
  'student-independent-learning': {
    'show-more': 'أظهر المزيد',
    'show-less': 'أظهر القليل',
    'no-courses':
      'ستظهر لك المساقات الدراسية التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
    'no-collections':
      'ستظهر لك المجموعات التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
    'no-assessments':
      'ستظهر لك التقييمات التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
    'no-independent-results': 'ابحث عن "المكتبة" لتعلم أشياء جديدة.',
    'no-bookmarks':
      'ستظهر المساقات الدراسية والمجموعات والتقييمات عندما يتم وضع إشارات مرجعية عليها هنا. ',
    'add-bookmark': 'ضِف إشارة مرجعية'
  },
  'teacher-landing': {
    'latest-announcement': 'أحدث إعلان',
    'latest-assessment': 'أحدث تقييم',
    'create-classroom': 'أنشئ صفاً دراسياً ثم عين المحتوى ثم قم بدعوة طلابك.',
    class: {
      'back-to': 'العودة إلى الصفوف الدراسية',
      'back-to-archived': 'العودة للصفوف الدراسية المؤرشفة ',
      'class-management': 'إدارة الصف الدراسي. ',
      'class-management-tab': {
        actions: 'أفعال',
        'assessment-min-score':
          'تقييم الحد الأدنى من النقاط للحصول على الجوائز',
        'assigned-course': 'المساق الدراسي المعيّن',
        archive: 'الأأرشيف',
        'archive-class': 'قم بأرشفة الصف.',
        'archive-classroom': 'Archive Classroom',
        'attend-class-with-code': 'احضر الصف مع رمزك الخاص.',
        'class-information': 'معلومات الصف',
        'class-name': 'اسم الصف الدراسي',
        'class-code': 'رمز الصف',
        'click-to-copy-class-code': 'انقر لنسخ رمز الصف',
        'course-information': 'معلومات المساق الدراسي',
        delete: 'حذف',
        'delete-class': 'حذف الصف',
        'download-roster': 'تنزيل القائمة',
        edit: 'تعديل',
        'email-address': 'عنوان البريد الإلكتروني',
        'first-name': 'الاسم الأول',
        'import-roster': 'استيراد القائمة',
        'last-name': 'اسم العائلة',
        message: 'رسالة',
        performance: 'أداء',
        students: 'الطلاب',
        'student-name': 'اسم الطالب',
        'student-id': 'هوية الطالب',
        teachers: 'المعلمون',
        'view-report': 'عرض التقرير',
        'students-null':
          'شارك رمز الصف مع الطلاب ليتمكنوا من الانضمام لصفك الدراسي.'
      },
      'class-activities': 'أنشطة الصف اليومية',
      'back-to-class-activities': 'العودة إلى نشاطات الصف اليومية',
      'class-activities-tab': {
        today: 'اليوم،',
        'add-from-course-map': 'ضِف من خريطة المساق الدراسي',
        'add-from-my-content': 'ضِف من المحتوى الخاص بي',
        'welcome-dca':
          'أهلاً بك في نشاطات صفك اليومية، هنا يمكنك تعيين مجموعات وتقييمات لطلابك لإكمالها اليوم. \nملاحظة: أي تقارير يتم إنشاءها ستكون متوفرة اليوم حتى آخر محاولة. '
      },
      'click-to-copy': 'انقر لنسخ رمز الصف',
      'course-map': 'خريطة المساق الدراسي',
      management: 'إدارة القوائم',
      report: 'تقرير',
      performance: 'أداء',
      'performance-tab': {
        assessments: 'التقييمات',
        collections: 'مجموعات'
      },
      'view-more': 'عرض المزيد'
    },
    'no-classrooms':
      'لم تنشئ صفوف دراسية بعد، اضغط على "أنشئ صف دراسي"، أو ابحث عن المساقات الدراسية المميزة تحت علامة التبويب "المكتبة " ',
    'no-course': 'لم تُعيِّن مساق دراسي لهذا الصف بعد.',
    teach: 'درِّس في صفوف جورو الدراسية.',
    'welcome-course-map':
      'في خريطة المساق الدراسي، يمكنك عرض محتوى المساق، وتشغيل التقيماات أو إيقافها، و إطلاق التقييمات في الوقت الحالي. كما يمكنك مشاهدة '
  },
  goals: {
    manage: {
      title: 'أهدافي!',
      'add-goal': 'ضِف هدف',
      'goal-label': 'هدف',
      'start-date-label': 'تاريخ البدء',
      'end-date-label': 'تاريخ الانتهاء',
      'type-label': 'نوع الهدف',
      'status-label': 'الحالة',
      not_started: 'لم تبدأ.',
      activated: 'مُفعَّل',
      completed: 'تم إنجازه',
      dropped: 'مهمل',
      'reflection-label': 'انعكاس',
      save: 'حفظ',
      update: 'تحديث',
      'goals-not-found':
        'لم تحدد أي أهداف بعد. يمكنك إضافة هدف بالنقر على \\"Add Goal\\" أعلاه. '
    },
    create: {
      'error-add-title': 'يرجى إدخال الهدف',
      'error-length-title': 'الحد الأقصى من الأحرف لكتابة الهدف 200 حرف',
      'error-add-start-date': 'يرجى إدخال تاريخ البدء',
      'error-add-end-date': 'يرجى إدخال تاريخ الانتهاء',
      'error-greater-end-date':
        'يجب أن يكون تاريخ الانتهاء أحدث من تاريخ البدء',
      'error-add-status': 'يرجى تحديد حالة الهدف',
      'error-length-reflection':
        'الحد الأقصى من الأحرف لكتابة مدى تأثير الهدف 2000 حرف',
      'created-success-msg': 'تم إنشاء الهدف '
    },
    delete: {
      'deleted-success-msg': 'تم حذف الهدف '
    },
    update: {
      'updated-success-msg': 'تم تحديث الهدف'
    }
  },
  'gru-add-to': {
    'add-assessment-to-lesson': 'أضف من تقييماتي.',
    'add-assessment-to-lesson-lead': 'اختر تقييماً لإضافته إلى هذا الدرس.',
    'add-collection-to-lesson': 'أضف من مجموعاتي.',
    'add-collection-to-lesson-lead': 'اختر مجموعة لإضافتها لهذا الدرس.',
    'add-to-collection': 'ضِف إلى المجموعة',
    'add-to-collection-lead': 'اختر مجموعة تريد إضافة {{contentTitle}} لها.',
    'add-to-existing-classroom': 'ضِف إلى الصف الدراسي الحالي.',
    'add-to-existing-classroom-lead': 'اختر صفاً دراسياً تريد اضافته إلى ',
    'add-to-assessment': 'ضِف إلى التقييم أو المجموعة.',
    'add-to-assessment-lead': 'اختر تقييما تريد إضافة {{contentTitle}} إليه.',
    'assessments-info':
      'التقييمات المدرجة هنا لا تنتمي إلى درس أو مساق دراسي آخر.',
    'collections-info':
      'المجموعات المدرجة هنا لا تنتمي إلى درس أو مساق دراسي آخر. '
  },
  'gru-add-rubric-to-question': {
    title: 'ضِف من سلم التقييم الخاص بي',
    lead: 'اختر سلم تقييم لإضافته لهذا السؤال',
    'no-rubrics':
      'لم تنشئ أي سلم تقييم لإرفاقه مع سؤال "الإجابة الكتابية". يمكنك إنشاء سلم تقييم تحت علامة تبويب "المحتوى الخاص بي" التي يمكن الولوج إليها من خلال ملفك الشخصي. ',
    'go-to-content': 'اذهب إلى "المحتوى الخاص بي"'
  },
  'gru-assessment-confirmation': {
    title: 'أنت على وشك بدء تقييم...',
    description: 'في هذا التقييم، {{model.title}}',
    'setting-forward': 'يمكنك التنقل إلى الأمام فقط',
    'setting-forward-backward':
      'يمكنك التنقل إلى الأمام وإلى الخلف للإجابة على الأسئلة.',
    'unlimited-attempts-left': 'لديك عدد غير محدد من المحاولات.',
    'attempts-left': {
      zero: 'لديك {{count}} من المحاولات.',
      one: 'تبقى لديك محاولة واحدة فقط.',
      other: 'لديك {{count}} من المحاولات.'
    },
    'unlimited-attempts': 'لديك عدد غير محدد من المحاولات.',
    cancel: 'إلغاء',
    continue: 'استمرار',
    start: 'ابدأ'
  },
  'gru-submit-confirmation': {
    title: 'إنهاء الاختبار وتثبيت.',
    description:
      'أنت على وشك إنهاء هذا الاختبار وإرسال جميع الأجوبة. أي سؤال لم تتم الإجابة عليه يعتبر جواباً خاطئاً. ',
    cancel: 'إلغاء',
    confirm: 'إنهاء الاختبار.',
    'finish-description': 'انقر على "إنهاء الاختبار" لتثبيت إجاباتك.'
  },
  'gru-quick-course-search': {
    'add-from-course': 'ضِف من المساق الحالي',
    'view-featured-courses': 'عرض المساقات الدراسية المميزة',
    assign: 'تعيين'
  },
  'gru-share-pop-over': {
    copy: 'نسخ',
    'ios-tooltip': 'انقر مطولاً للنسخ!',
    'multiarch-tooltip': 'اضغط على "Ctrl + C" للنسخ!',
    'safari-osx-tooltip': 'اضغط على "Ctrl + C" للنسخ.',
    'share-course': 'شارك المساق الدراسي مع إرفاق رابط',
    'share-question': 'شارك سؤالك مع إرفاق رابطو',
    'share-resource': 'شارك المصدر مع إرفاق رابط.',
    'share-assessment': 'شارك التقييم الخاص بك مع إرفاق رابط',
    'share-rubric': 'شارك سلم التقييم مع إرفاق رابط',
    'share-collection': 'شارك مجموعتك مع إرفاق رابك'
  },
  'gru-category-panel': {
    teacher: {
      title: 'للمعلمين',
      body:
        'اكتشف المحتوى المتوافق مع المعايير ونسق المحتوى وتتبع تقدم الطلاب من خلال تحليلات البيانات.',
      cta: 'شاهد القصص'
    },
    student: {
      title: 'للطلاب',
      body: 'ابتحث عن الاهتمامات وابنِ وراقب التقدم من خلال مواد التعليم. ',
      cta: 'أدخِل',
      'text-placeholder': 'أدخِل رمز الصف الدراسي'
    },
    district: {
      title: 'للمقاطعات',
      body:
        'تعاون  مع جورو لإطلاق العنان للتعليم المخصص ولمشاركة المنهاج الذي تمت مراجعته من قبل السلطات المعنية.',
      cta: 'شاهد مدى تأثيرنا'
    },
    partner: {
      title: 'للشركاء',
      body:
        'تعاون مع شركائنا في المهمة لرفع نسبة التأثير الجماعي على بيئة التعليم. ',
      cta: 'تعلم المزيد'
    }
  },
  'class.gru-class-navigation': {
    active: 'نشِط:',
    members: 'أفراد',
    greetings: 'الإعلانات',
    overview: 'خريطة المساق الدراسي',
    analytics: 'البيانات',
    teams: 'فِرَق',
    information: 'معلومات الصف االدراسي'
  },
  'class.gru-class-statistics': {
    title: 'إحصاءات الصف',
    'on-average': 'في المعدل',
    performance: 'أداء',
    completion: 'إنجاز',
    'time-spent': 'الوقت المستغرق',
    'no-performance': '-'
  },
  'gru-user-registration': {
    joinTitle: 'انضم إلى مجتمع جورو!',
    joinDescription:
      'جِد وامزج، وشارك أفضل مصادر التعليم المجانية من الروضة وحتى الصف 12. ',
    googleButton: 'أنشئ حسابك باستخدام جوجل.',
    whyGoogle: 'لماذا أنشئ حساباً باستخدام جوجل؟',
    descriptionWhyGoogle:
      'إنشاء حسابك باستخدام جوجل سيكون أسهل وأسرع ولن تحتاج إلى كلمة مرور جديدة. ',
    or: 'أو',
    noGoogleAccount: 'لا يوجد لديك حساب جوجل؟ ',
    signUpEmail: 'أنشئ حساباً باستخدام بريدك الإلكتروني.',
    haveAccount: 'هل لديك حساب بالفعل؟',
    clickLogIn: 'انقر هنا لتسجيل الدخول.'
  },
  'gru-welcome-message': {
    title: 'مرحباً بكم في متصفح جورو التعليمي!',
    'text-temporary-one':
      'يسعدنا مساعدتك خلال رحلتك في متصفح جورو التعليمي، ابحث عن أيقونة  "قم بجولة" ',
    'text-temporary-two': 'للجولات الإرشادية حول كيفية استخدام مميزاتنا. ',
    'text-one':
      'يسعدنا مساعدتك خلال رحلتك في متصفح جورو التعليمي بالطرق التالية: ',
    'text-two': {
      subtitle: 'قم بجولة',
      text: 'توفير جولات إرشادية عن كيفية استخدام ميزاتنا.  '
    },
    'text-three': {
      subtitle: 'المساعدة',
      text: 'يمكنك الحصول على المساعدة في حال وجود أي أسئلة إضافية.'
    },
    'text-four': {
      subtitle: 'جديد',
      text: 'يمكنك تحديد ميزات جديدة لتجربتها. '
    },
    'text-five': 'إذا أردت العودة إلى صفحتك الرئيسية، ببساطة انقر على',
    'dont-show-again': 'لا تُظهِر مرة أخرى'
  },
  'sign-up': {
    'step-1-title': 'مرحباً!',
    'step-1-description': 'نحن سعداء بانضمامك إلينا.',
    'step-child-title': 'ليس بهذه السرعة!',
    'step-child-subtitle': 'لا يمكننا إكمال عملية التسجيل.',
    'step-child-description-1': 'لم يتمكن جورو من إنشاء حسابك بسبب ',
    'step-child-age-requirements': 'الأحكام والشروط',
    'step-child-description-2': 'استمر في التعلم، نراك في سنوات قادمة. ',
    'step-2-title': 'معلومات أساسية.',
    'step-2-description': 'أنت لست أساسياً، لكن هذه المعلومة أساسية.',
    'log-in': 'تسجيل الدخول',
    'log-in-description': 'إذا كان لديك حساب مسبقاً.',
    'google-button': 'أنشئ حسابك عن طريق جوجل.',
    username: 'اسم المستخدم',
    dateOfBirth: {
      title: 'تاريخ الميلاد',
      day: 'اليوم',
      month: 'الشهر',
      months: {
        january: 'كانون الثاني',
        february: 'شباط',
        march: 'آذار',
        april: 'نيسان',
        may: 'أيار',
        june: 'حزيران',
        july: 'تموز',
        august: 'آب',
        september: 'أيلول',
        october: 'تشرين الأول',
        november: 'تشرين الثاني',
        december: 'كانون الأول'
      },
      year: 'السنة',
      'error-message': 'يرجى إدخال تاريخ الميلاد.'
    },
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rePassword: 'تأكيد كلمة المرور.',
    state: 'الدولة أو المقاطعة',
    district: 'المقاطعة',
    'error-username-taken': 'هذا الاسم مُستخدم، يرجى المحاولة مرة أخرى\n',
    'error-email-taken':
      'هذا البريد الإلكتروني مُستخدم، يرجى المحاولة مرة أخ\nرى',
    'error-role-message': 'يرجى اختيار  دوراً. \n',
    'error-country-message': 'يرجى اختيار بلدك.',
    'error-state-message': 'يرجى تحديد الولاية أو الإقليم.',
    'error-district-message':
      'يرجى اختيار المقاطعة من القائمة أو قم بتزويدنا بها في "أخرى" '
  },
  'gru-user-sign-up-cancel': {
    title: 'مغادرة التسجيل؟',
    'exit?': 'هل أنت متأكد من الخروج؟',
    registration_incomplete: 'لم يكتمل تسجيلك بعد.',
    leave: 'مغادرة التسجيل',
    continue: 'متابعة التسجيل'
  },
  login: {
    title: 'أهلاً بعودتك!',
    description: 'التعلم بين يديك.',
    'title-session-ends': 'انتهت صلاحية الفصل الدراسي.',
    'description-session-ends': 'يرجى تسجيل الدخول.',
    gooruAccountTitle: 'تسجيل الدخول إلى حسابك في جورو.',
    googleButton: 'تسجيل الدخول باستخدام جوجل.',
    or: 'أو',
    haveAccount: 'هل لديك حساب؟',
    signUpHere: 'أنشئ حسابك هنا!',
    forgotPassword: 'نسيت كلمة المرور؟ ',
    password: 'كلمة المرور',
    usernameOrEmail: 'اسم المستخدم أو البريد الالكتروني',
    'log-in': 'تسجيل الدخول'
  },
  'forgot-password': {
    description: 'يحدث لنا جميعاُ.',
    usernameOrEmail: 'يرجى إدخال بريدك الإلكتروني.',
    'footer-google-description-1':
      'حاول تسجيل الدخول مرة أخرى بالضغط على \\\u0027تسجيل الدخول باستخدام جوجل\\\u0027',
    'footer-description-1':
      'ستصلك رسالة إلكترونية تتضمن رابطاً لإعادة تعيين كلمة المرور.',
    'footer-description-2': 'إذا كان لديك أي أسئلة، يرجى التواصل معنا. ',
    mail: 'support@gooru.org',
    'error-email-not-exists': 'نعتذر، هذا البريد الاكتروني غير مُعرَّف',
    secondStepTitle: 'تفقّد بريدك الالكتروني.',
    'secondStepDescription-1':
      'لقد أرسلنا لك رسالة إلكترونية تتضمن رابطاً لإعادة تعيين كلمة المرور. ',
    'secondStepDescription-2': 'إذا كان لديك أي أسئلة، يرجى الاتصال'
  },
  'reset-password': {
    'new-password': 'أدخل كلمة المرور الجديدة.',
    'new-password-confirm': 'تأكيد كلمة المرور.',
    title: 'إعادة تعيين كلمة المرور.'
  },
  footer: {
    footerDescription:
      'يلتزم موقع جورو بالإبقاء على منصته التعليمية مفتوحة المصادر، وإتاحتها لبناء محتوى يحمل رخصة المشاع الإبداعي(CC0) ',
    company: 'الشركة',
    community: 'المجتمع',
    legal: 'قانوني',
    connect: 'الاتصال',
    aboutGooru: 'حول جورو',
    careers: 'الوظائف',
    supportCenter: 'مركز الدعم',
    contactUs: 'اتصل بنا',
    districts: 'المقاطعات',
    partners: 'الشركاء',
    coaches: 'المدربون',
    events: 'الأحداث',
    terms: 'الأحكام',
    privacy: 'الخصوصية',
    Copyright: 'حقوق النشر'
  },
  'grade-dropdown': {
    placeholder: 'المراحل الدراسية',
    prompt: 'اختر المرحلة الدراسية',
    'pre-k': 'تعليم ما قبل الروضة',
    elementary: 'المرحلة الابتدائية',
    'middle-school': 'المرحلة المتوسطة',
    'high-school': 'المدرسة الثانوية',
    'higher-ed': 'التعليم العالي',
    k: 'الروضة',
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5',
    sixth: '6',
    seventh: '7',
    eighth: '8',
    ninth: '9',
    tenth: '10',
    eleventh: '11',
    twelfth: '12'
  },
  'standard-dropdown': {
    placeholder: 'تصفح حسب المعيار'
  },
  'subject-dropdown': {
    placeholder: 'الموضوع (المواضيع)',
    prompt: 'اختر موضوعاً'
  },
  'search-filter': {
    courses: 'المساقات الدراسية',
    collections: 'مجموعات',
    resources: 'مصادر',
    assessments: 'التقييمات',
    questions: 'أسئلة',
    rubrics: 'سلم تقييم',
    'question-types': {
      MC: 'خيارات متعددة',
      FIB: 'املأ الفراغ',
      'T/F': 'صح أم خطأ',
      TOF: 'صح أم خطأ',
      MA: 'إجابات متعددة',
      HS_TXT: 'اختيار متعدد - نص',
      HSTXT: 'اختيارأكثر من نص ',
      HS_IMG: 'متعددة حدد - صورة',
      HSIMG: 'اختيار أكثر من صورة',
      HT_RO: 'سحب وإفلات',
      'HT\u0026RO': 'ترتيب المسك والإفلات',
      HT_HL: 'نص مظلل',
      'H-THL': 'نص مظلل',
      OE: 'إجابة كتابية'
    },
    author: {
      placeholder: 'كاتب'
    }
  },
  resource: {
    video: 'فيديو',
    webpage: 'صفحة ويب',
    interactive: 'تفاعلي',
    question: 'سؤال',
    image: 'صورة',
    text: 'نص',
    audio: 'تسجيل صوتي',
    oer: 'مصادر تعليم مفتوحة OER'
  },
  'search-result': {
    resource: 'مصدر',
    resources: 'مصادر',
    and: 'و',
    question: 'سؤال',
    questions: 'أسئلة',
    'in-this-collection': 'في هذه المجموعة',
    'search-results-for': 'نتائج البحث عن'
  },
  'gru-image-picker': {
    chooseFile: 'اختر ملف...',
    instruction: 'حمل صورة من حاسوبك.',
    restriction:
      'يجب أن تكون الصورة بصيغة  JPG أو GIF أو PNG وحجمها أقل من 5 ميغابايت.',
    submit: 'استخدم الصورة'
  },
  'gru-fib': {
    instructions:
      'يرجى كتابة إجابتك في الفراغ المناسب، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-hs-image': {
    instructions: 'يرجى اختيار الصورة الصحيحة، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-hs-text': {
    instructions: 'يرجى اختيار الإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-hot-text': {
    instructions: 'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-login-prompt': {
    title: 'مرحباً بكم في جورو!',
    instructions: 'يجب تسجيل الدخول لإكمال هذا الإجراء.',
    'existing-user': 'هل لديك حساب بالفعل؟',
    'new-user': 'هل أنت جديد هنا؟',
    'not-now': 'ليس الان',
    'sign-in': 'تسجيل الدخول'
  },
  'gru-multiple-answer': {
    instructions: 'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-multiple-choice': {
    instructions: 'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".'
  },
  'gru-open-ended': {
    instructions:
      'يرجى كتابة إجابتك في الحقل أدناه، ثم الضغط على \\"{{action}}\\". لحفظها عند الانتهاء.',
    characterLimit: 'الحد الأقصى من الأحرف.'
  },
  'gru-question-viewer': {
    answer: 'إجابة',
    question: 'سؤال'
  },
  'gru-true-false': {
    instructions: 'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
    true: 'صحيح',
    false: 'خطأ'
  },
  'gru-reorder': {
    instructions:
      'يرجى إعادة ترتيب الإجابات بشكل صحيح، ثم النقر على \\"{{action}}\\".'
  },
  player: {
    'gru-navigation': {
      'view-report': 'عرض التقرير'
    },
    'gru-navigator': {
      'see-usage-report': 'شاهد تقرير الاستخدام.'
    },
    'gru-viewer': {
      'not-iframe-url': {
        header_1: 'لا يمكن عرض هذا المصدر في جورو.',
        header_external_assessment_1: 'لا يمكن عرض هذا التقييم باستخدام جورو.',
        header_2: 'لا يمكن عرض هذا المصدر في جورو.',
        'view-resource': 'عرض المصدر',
        https_external: 'لا يمكن عرض هذا الرابط في جورو.',
        https_new_tab: 'انقر على الرابط أدناه لفتحه في صفحة تبويب جديدة.',
        footer_1: 'لماذا أرى هذه الصفحة الفارغة؟',
        footer_2: 'المصادر المضافة في جورو تأتي من آلاف الناشرين الذين',
        footer_3:
          'ينشؤون ويشاركون المحتوى الخاص بهم. تحتوي المصادر على إعدادت مختلفة تتضمن',
        footer_4: 'المتطلبات التي تنقلك إلى صفحة أخرى لعرض المحتوى.'
      }
    }
  },
  'grading-player': {
    answer: 'العمل المُقدَّم',
    'back-to': 'عودة',
    'current-response': 'الإجابة الحالية',
    'full-rubric': 'سلم تقييم كامل',
    grading: 'العلامة',
    level: 'المستوى',
    roster: 'قائمة',
    rubric: 'سلم تقييم',
    'submitted-time': 'الوقت المحدد',
    points: 'النقاط',
    prompt: 'مهمة فورية',
    'overall-comment': 'التعليق العام',
    'overall-lead': 'لخِّص ملاحظاتك على المقال ككل.',
    'time-spent': 'الوقت المستغرق',
    'total-score': 'العلامة الكاملة',
    'student-roster': {
      title: 'لائحة الطالب',
      lead: 'لقد أجبت على هذا السؤال '
    },
    'rubric-panel': {
      previous: 'الطالب السابق',
      next: 'الطالب التالي',
      'total-score': 'العلامة الكاملة',
      points: '({{total}} نقطة)'
    }
  },
  profile: {
    'gru-navigation': {
      about: 'حول',
      'about-me': 'حولي',
      content: 'محتوى',
      followers: 'متابِعون',
      library: 'المكتبة',
      'my-content': 'المحتوى الخاص بي'
    },
    edit: {
      'select-district': 'اختر مقاطعة...'
    }
  },
  'gru-data-picker': {
    score: 'العلامة',
    report: 'تقرير',
    completion: 'إنجاز',
    timeSpent: 'الوقت',
    'time-spent': 'الوقت المستغرق',
    'study-time': 'وقت الدراسة',
    reaction: 'تفاعل',
    attempts: 'محاولة'
  },
  'gru-performance-summary': {
    title: 'عنوان',
    scores: 'علامات',
    completion: 'إنجاز',
    'time-spent': 'الوقت الكلي',
    reaction: 'تفاعل',
    attempts: 'محاولات',
    redo: 'إعادة',
    resume: 'ملخص',
    study: 'ادرس الآن',
    'view-report': 'عرض التقرير',
    'not-applicable': 'غ/م',
    'not-started': 'لم تبدأ بعد'
  },
  'gru-performance': {
    'no-content': 'لا يوجد محتوى'
  },
  'gru-performance-metrics': {
    assessment: 'التقييم',
    collection: 'مجموعة',
    completion: 'إنجاز',
    report: 'تقرير',
    student: 'طالب',
    score: 'العلامة',
    'study-time': 'الوقت المستغرق'
  },
  'gru-metrics-sub-header': {
    assessment: 'التقييم',
    student: 'طالب',
    score: 'العلامة',
    report: 'تقرير',
    completion: 'إنجاز',
    'time-spent': 'الوقت'
  },
  'gru-resource-new': {
    'resource-already-exist': 'هذا المصدر موجود مسبقاً في جورو!'
  },
  'gru-assessment-report': {
    'gru-summary': {
      'total-time-spent': 'إجمالي الوقت المستغرق.'
    },
    'hidden-report': 'لقد قام معلمك بإخفاء ملخص التقرير لهذا التقييم. '
  },
  cards: {
    'gru-class-card': {
      student: {
        zero: '{{count}} طالب',
        one: '{{count}} طالب',
        other: '{{count}} الطلاب',
        'not-started': 'لم تبدأ.'
      },
      unit: {
        zero: 'لا يوجد مساق دراسي',
        one: '{{count}} وحدة',
        other: '{{count}} وحدات'
      },
      archived: {
        'request-report':
          'لا يمكن تعديل هذا الصف الدراسي لأنه مؤرشف، ويمكن الوصول إلى بيانات الصف الدراسي الحالي من خلال التقرير.',
        'report-in-progress':
          'قد يستغرق إنشاء التقرير 20 دقيقة. يرجى التحقق مرة أخرى.',
        'download-report': 'تنزيل بياناتك لهذا الصف.',
        'no-report-available': 'لم يتم تعيين محتوى لهذا الصف'
      }
    },
    'gru-course-card': {
      in: 'في',
      units: {
        zero: '{{count}} وحدات',
        one: '{{count}} وحدة',
        other: '{{count}} وحدات'
      },
      resource: {
        zero: '{{count}} مصادر',
        one: '{{count}} مصدر',
        other: '{{count}} مصادر'
      },
      and: 'و',
      question: {
        zero: '{{count}} اسئلة',
        one: '{{count}} سؤال',
        other: '{{count}} اسئلة'
      },
      'start-studying': 'بدء الدراسة'
    },
    'gru-collection-card': {
      courses: {
        zero: '{{count}} مساقات دراسية',
        one: '{{count}} مساق دراسي',
        other: '{{count}} مساقات دراسية'
      },
      students: {
        zero: '{{count}} الطلاب',
        one: '{{count}} طالب',
        other: '{{count}} الطلاب'
      },
      collections: {
        one: '{{count}} مجموعة',
        other: '{{count}} مجموعات'
      },
      assessments: {
        one: '{{count}} تقييم',
        other: '{{count}} تقييمات'
      },
      classrooms: {
        zero: '{{count}} صوف دراسية',
        one: '{{count}} صف دراسي',
        other: '{{count}} صوف دراسية'
      }
    },
    'gru-resource-card': {
      add: 'إضافة إلى'
    },
    'gru-resource-result-card': {
      skipped: 'تم التخطي عنه'
    },
    'gru-profile-card': {
      followers: 'متابِعون',
      following: 'متابَعون'
    },
    'gru-user-network-card': {
      follow: 'متابعة'
    }
  },
  'reports.gru-table-view': {
    'first-tier-header-prefix': 'س',
    student: 'طالب',
    reaction: 'تفاعل',
    reactions: 'ردود الفعل',
    score: 'العلامة',
    scores: 'علامات',
    'study-time': 'وقت الدراسة',
    time: 'الوقت',
    'time-spent': 'الوقت المستغرق',
    totals: 'مجموع'
  },
  'gru-emotion-picker': {
    'react-to-resource': 'تفاعل مع هذا المصدر'
  },
  home: {
    'no-classes-found': {
      'create-class': {
        title: 'درِّس في صفوف جورو الدراسية.',
        description: 'أنشئئ صف دراسي، عيِّن محتوى، ثم قم بدعوة الطلاب',
        'button-text': 'أنشئ صفاً دراسياً'
      },
      'join-class': {
        title: 'تعلم مع صف جورو الدراسي',
        description: 'انضم  إلى صف معلمك الدراسي، لتبدأ التعلم.',
        'button-text': 'أدخِل رمز الصف الدراسي'
      },
      'featured-courses': {
        title: 'المساقات الدراسية المميزة',
        description:
          'تصفح مساقات الرياضيات والعلوم والدراسات الاجتماعية ومهارات اللغة الإنجليزية.',
        'button-text': 'المساقات الدراسية المميزة'
      },
      'teacher-toolkit': {
        title: 'مجموعة أدوات المعلم',
        description: 'لمجموعة الأدوات هذه مصادر تساعدك في البدء. ',
        'button-text': 'مجموعة أدوات المعلم'
      }
    }
  },
  taxonomy: {
    'gru-taxonomy-selector': {
      'add-secondary': 'إضافة ثانوية',
      'choose-subject': 'اختر موضوعاً',
      'competency-subject-and-course': 'إطار الكفاءات والمساق الدراسي',
      'primary-subject-and-course': 'إطار المعايير والمساق الدراسي'
    }
  },
  validations: {
    unsavedChanges: 'لم يتم حفظ التغييرات بعد، هل تريد مغادرة هذه الصفحة؟ '
  },
  featured: {
    'featured-title': 'المساقات الدراسية المميزة',
    'featured-description':
      'يتم تنظيم المساقات الدراسية المميزة من قبل معلمين مبتكِرين، وفحصها ومراجعتها من قِبل خبراء في المحتوى التعليمي. كما يتم تطبيقها في الصفوف الدراسية مع الطلاب. \nاكتشف وامزج ونسّق المساقات التعليمية لتخصيص التعليم ورفع مستوى تفاعل الطلاب مع هذه المساقات. اضغط هنا لمعرفة المزيد عن تطوير هذه المساقات.'
  },
  'taxonomy.modals': {
    'gru-domain-picker': {
      browseSelectorText: 'ما هي النطاقات التي ستغطيها هذه الوحدة؟',
      selectedText: {
        zero: 'تم تحديد {{count}} نطاقات',
        one: 'تم تحديد {{count}} نطاق',
        other: 'تم تحديد {{count}} نطاقات'
      },
      shortcutText: 'المساق الدراسي في'
    },
    'gru-standard-picker': {
      browseSelectorText: 'ما هي المعايير التي سيتم تغطيتها؟',
      browseCompetencySelectorText: 'ما هي الكفاءات التي سيتم تغطيتها؟',
      selectedText: {
        zero: 'تم اختيار {{count}} معايير',
        one: 'تم اختيار {{count}} معيار ',
        other: 'تم اختيار {{count}} معايير'
      },
      selectedCompetencyText: {
        zero: 'تم اختيار {{count}} كفاءات',
        one: 'تم اختيار {{count}} كفاءة',
        other: 'تم اختيار {{count}} كفاءات'
      },
      shortcutText: 'تم ربط الوحدة بـ'
    }
  },
  'account-settings': {
    title: 'إعدادت الحساب',
    'account-info': 'معلومات الحساب',
    'private-info': 'معلومات خاصة',
    'email-address': 'عنوان البريد الإلكتروني',
    gender: 'الجنس',
    birthday: 'تاريخ الميلاد'
  },
  'gru-rich-text-editor': {
    bold: 'غامق',
    expression: 'تعبير',
    italic: 'مائل',
    subscript: 'حرف أو رمز أو رقم سفلي',
    superscript: 'حرف أو رمز أو رقم علوي',
    underline: 'مخطوط',
    'expressions-panel': {
      tabs: {
        calculus: 'الحساب',
        'greek-letters': 'أحرف يونانية',
        layout: 'تصميم',
        relation: 'علاقة',
        'set-theory': 'نظرية المجموعات',
        symbols: 'رموز',
        trigonometry: 'علم المثلثات'
      },
      'insert-expression': 'إدراج',
      'update-expression': 'تحديث',
      'create-expression': 'إنشاء التعبير'
    }
  },
  'gru-settings-edit': {
    'answerkey-attempts': 'مفتاح الإجابة والمحاولات',
    'answer-key': 'يمكن للطلاب رؤية مفتاح الإجابة في النهاية',
    attempts: 'محاولات',
    'attempts-unlimited': 'غير محدود',
    backwards: 'يمكن للطلاب العودة للخلف وتغيير الاجابات',
    feedback: 'یرى الطلاب ما إذا کانت إجاباتهم صحیحة أو خاطئة',
    'feedback-immediate': 'لكل سؤال وفي النهاية',
    'feedback-never': 'أبداً',
    'feedback-summary': 'في النهاية',
    'navigation-scoring': 'التنقل والعلامات',
    'disable-heading': 'فعِّل التقييم في خريطة المساق الدراسي',
    'disable-legend':
      'يمكن للطلاب تشغيل التقييم من خريطة المساق الدراسي الخاصة بهم'
  },
  'gru-icon-popover': {
    'settings-visibility-title': 'اجعل المحتوى الخاص بك مرئياً',
    'settings-visibility-content':
      'هذا يجعل المحتوى الخاص بك مرئياً في ملفك الشخصي. إذا كنت ترغب في مشاركة المساقات والمجموعات والتقييمات والمصادر و/ أو الأسئلة التي تنشئها مع الزملاء، نقترح عليك تفعيل هذه الميزة.'
  },
  'gru-take-tour': {
    text: 'جولة',
    'teacher-home': {
      stepOne: {
        title: 'قم بجولة',
        description: 'أهلاً بك في "قم بجولة" وفي صفحتك الرئيسية، لنبدأ الآن!'
      },
      stepTwo: {
        title: 'شِعار',
        description: 'ستعود إلى صفحتك الرئيسية بالنقر على الشِعار. '
      },
      stepThree: {
        title: 'شريط البحث',
        description: 'ابحث في فهرس المحتوى لدينا عن المواضيع التي تهمك.'
      },
      stepFour: {
        title: 'الصفوف الدراسية',
        description: 'العودة إلى صفحتك الرئيسية.'
      },
      stepFive: {
        title: 'مدير المحتوى',
        description: 'رابط لإنشاء المحتوى والولوج إليه بشكل سريع. '
      },
      stepSix: {
        title: 'المكتبة',
        description: 'تصفّح مساقاتنا الدراسية المميزة.'
      },
      stepSeven: {
        title: 'ملفك الشخصي',
        description:
          'يمكنك ولوج وتحديث المحتوى الخاص بك وملفك الشخصي والإعدادات.'
      },
      stepEight: {
        title: 'المساعدة',
        description: 'الذهاب إلى مركز الدعم أو تسجيل الخروج. '
      },
      stepNine: {
        title: 'الصفوف الدراسية',
        description: 'عرض قائمة الصفوف التي تُدرسها. '
      },
      stepTen: {
        title: 'الصفوف الدراسية المؤرشفة.',
        description: 'عرض قائمة الصفوف التي درَّستها في الماضي.'
      },
      stepEleven: {
        title: 'أنشئ صفاً دراسياً',
        description:
          'قم بتسمية صفك الدراسي واضغط على الزر لإنشاء صف دراسي جديد. '
      }
    },
    'student-home': {
      stepOne: {
        title: 'قم بجولة',
        description:
          'أهلا بك في "قم بجولة" وفي صفحتك الرئيسية، لنشاهد الميزات المتوفرة لك في صفحتك الرئيسية. '
      },
      stepFeaturedCourses: {
        title: 'المساقات الدراسية المميزة',
        description:
          'تصفح المساقات الدراسية المميزة في المواضيع التي تهمك في فهرس المحتوى الخاص بمتصفح التعليم.'
      },
      stepTwo: {
        title: 'شِعار',
        description: 'ستعود إلى صفحتك الرئيسية بالنقر على الشِعار. '
      },
      stepThree: {
        title: 'شريط البحث',
        description: 'ابحث عن  المواضيع التي تهمك في فهرس المحتوى.'
      },
      stepFour: {
        title: 'دراستي',
        description: 'العودة إلى صفحتك الرئيسية.'
      },
      stepFive: {
        title: 'المكتبة',
        description:
          'تصفح المساقات الدراسية المميزة في متصفح التعليم وفي مكتبات الشركاء لإيجاد عدد من المواضيع التي تهمك.'
      },
      stepSix: {
        title: 'أداء',
        description: 'اطلع على ملخص أدائك في المساقات التي سجلت فيها.'
      },
      stepSeven: {
        title: 'ملفك الشخصي',
        description: 'يمكنك تحديث وولوج المحتوى الخاص بك وملفك الشخصي'
      },
      stepEight: {
        title: 'المساعدة',
        description: 'الذهاب إلى مركز الدعم أو تسجيل الخروج. '
      },
      stepNine: {
        title: 'الإعلانات',
        description:
          'هنا سترى الإعلانات التي يرغب معلمك أو المدرسة أن تعرف عنها.'
      },
      stepTen: {
        title: 'الصفوف الدراسية',
        description: 'شاهد جميع الصفوف الدراسية التي سجلت بها. '
      },
      stepEleven: {
        title: 'التعليم المستقل',
        description:
          'ابحث عن المواضيع التي وضعت عليها إشارة مرجعية والتي تريد أن تتعلمها. '
      },
      stepTwelve: {
        title: 'انضم للصف الدراسي',
        description: 'أدخِل رمز الصف الدراسي للانضمام إليه.'
      },
      stepThirteen: {
        title: 'انتهيت!',
        description:
          'والآن اضغط على مساق دراسي سجلت به، انضم للصف الدراسي، أو ابحث عن المحتوى الذي يهمك. '
      }
    },
    'student-performance': {
      stepOne: {
        title: 'أهلا بك!',
        description:
          'مرحبا بكم في لوحة الأداء الخاصة بك. يمكنك استعراض أدائك في جميع الصفوف والمساقات الدراسية.'
      },
      stepTwo: {
        title: 'علامة تبويب تفصيل البيانات',
        description:
          'انقر على السهم لتفصيل البيانات الخاصة بأدائك حسب النشاط والفترة الزمنية والموضوع والمساق الدراسي.'
      },
      stepThree: {
        title: 'تحديث التقرير',
        description:
          'بعد تحديد المرشِّحات، انقر على "تحديث التقرير" لعرض النتائج.'
      },
      stepFour: {
        title: 'تنزيل أو طباعة',
        description: 'تنزيل التقرير.'
      },
      stepFive: {
        title: 'انتهيت!',
        description: 'امضِ قدما وحلّل أدائك!'
      }
    },
    'student-class': {
      stepOne: {
        title: 'أهلا بك!',
        description:
          'أهلا بك في صفك الدراسي، هنا ستجد نشاطات صفك اليومية وخريطة المساق الدراسي وبيانات الأداء. لنبدأ الآن'
      },
      stepTopBar: {
        title: 'المساق الدراسي، الأداء، الإكمال',
        description: 'شاهد ملخص عن المساق الدراسي والأداء العام حتى الآن. '
      },
      stepTwo: {
        title: 'أنشطة الصف اليومية',
        description: 'يمكنك ولوج ودراسة النشاطات المعينة من قَبل معلمك اليوم . '
      },
      stepThree: {
        title: 'خريطة المساق الدراسي',
        description:
          'انقر على الوحدات والدروس لإكمال المجموعات والتقييمات في المساق الدراسي.'
      },
      stepFour: {
        title: 'تقريري',
        description: 'عاين أداء سصفك الدراسي العام.'
      },
      stepFive: {
        title: 'انتهيت!',
        description:
          'ابدأ بدراة المساق الدراسي بالنقر على "خريطة المساق الدراسي" أو "النشاطات اليومية"'
      }
    },
    'teacher-class': {
      stepOne: {
        title: 'أهلا بك!',
        description:
          'أهلاً بك في صفك الدراسي، هنك يمكنك مشاهدة وتعيين نشاطات صفك اليومية وخريطة المساق وتحديث معلومات الصف ومشاهدة بيانات أداء الطلاب. لنبدأ الآن!'
      },
      stepTopBar: {
        title: 'المساق الدراسي، الأداء، الإكمال',
        description: 'شاهد ملخص عن المساق الدراسي والأداء العام حتى الآن. '
      },
      stepTwo: {
        title: 'أنشطة الصف اليومية',
        description: 'شاهد و عيِّن نشاطات اليوم لطلابك. '
      },
      stepThree: {
        title: 'خريطة المساق الدراسي',
        description:
          'شاهد و عدِّل الوحدات و الدروس والمجموعات و التقييمات المُعيَّنة في هذا المساق.'
      },
      stepFour: {
        title: 'تقريري',
        description:
          'يمكنك مشاهدة ملخص عن آداء طلابك في المساق وولوج تقاريرهم. '
      },
      stepClassManagement: {
        title: 'إدارة الصف الدراسي. ',
        description: 'عيِّن أو حدّث معلومات الصف والطلاب المسجلين فيه. '
      },
      stepFive: {
        title: 'انتهيت!',
        description: 'ولآن شارك الصف الدراسي مع طلابك.'
      }
    },
    'study-player': {
      stepOne: {
        title: 'أهلا بك!',
        description:
          'هذا هو مشغل الدراسة الخاص بك، لنلق نظرة على الميزات المتوفرة لك. '
      },
      stepTwo: {
        title: 'خريطة المساق الدراسي',
        description: 'انقر على الأيقونة في أي وقت للعودة إلى خريطة المساق.'
      },
      stepThree: {
        title: 'اسم المساق الدراسي',
        description: 'يشير إلى المساق الذي تعمل عليه.'
      },
      stepFour: {
        title: 'اقتراحات',
        description:
          'المصادر الإضافية التي من الممكن أن ترغب بالبحث عنها بناءً على ما تدرسه'
      },
      stepFive: {
        title: 'إنجاز',
        nuTitle: 'كفاءات',
        description: 'تشير إلى قدَر تقدمك في المساق. '
      },
      stepSix: {
        title: 'أداء',
        description: 'تشير إلى أدتئك في المساق'
      },
      stepSeven: {
        title: 'تفاعل مع المصدر.',
        description: 'أخبر معلمك عن رأيك في هذا المصدر.'
      },
      stepEight: {
        title: 'انتهيت!',
        description: 'ابدأ الدراسة!'
      },
      stepNine: {
        title: 'العودة إلى المجموعة',
        description:
          'انقر على الأيقونة في أي وقت للعودة إلى المجموعة أو التقييم.'
      }
    },
    library: {
      stepOne: {
        title: 'أهلا بك!',
        description: 'أهلا بك في مكتبات متصفح التعلم. '
      },
      stepTwo: {
        title: 'المساقات الدراسية المميزة',
        description:
          'ابحث في المساقات الدراسية التي طورها وطبقعا المعلمون سابقاً في صفوفهم الدراسية.'
      },
      stepThree: {
        title: 'مكتبات أخرى',
        description: 'ابحث في المحتوى الذي طوره شركاه جورو. '
      },
      stepFour: {
        title: 'معاينة',
        description: 'عاين المساق لمعرفة إذا ما كان مهم بالنسبة لك أم لا.'
      },
      stepFive: {
        title: 'مشاركة',
        description: 'شارك هذا المساق مع الآخرين.'
      },
      stepSix: {
        title: 'إشارة مرجعية',
        description: 'قم بوضع إشارة مرجعية على هذا المساق لمعاينته لاحقاً.'
      }
    },
    profile: {
      stepOne: {
        title: 'أهلا بك!',
        description:
          'أهلاً بك في ملفك الشخصي، هنا يمكنك الولوج للمحتوى الخاص بك ومعلوماتك الشخصية و المتابعين.'
      },
      stepTwo: {
        title: 'المحتوى الخاص بي',
        description: 'أنشئ محتوى جديد، وشاهد المحتوى الذي قمت بإعادة مزجه.'
      },
      stepThree: {
        title: 'حولي',
        description:
          'حدِّث معلوماتك الشخصية ومعلومات المدرسة و الصورة الشخصية. '
      },
      stepFour: {
        title: 'الأهداف',
        description:
          'ضَع و تعقب الأهداف لمساعدتك في تحقيق أهداف التعلم الخاصة بك. '
      },
      stepFive: {
        title: 'متابِعون',
        description:
          'إذا أعجبك محتوى إحدى المساقات الدراسية، يمكنك متابعة الأشخاص الذين قاموا ببنائه. كما يمكنك مشاهدة المتابعين. '
      },
      stepSix: {
        title: 'شارات',
        description:
          'شاهد الشارات التي حصلت عليها، ستحصل على شارة في حال إكمال تقييم معياري تم تعيينه من قِبل معلمك.'
      }
    }
  },
  'gru-tour': {
    'assessments-settings': {
      stepOne: {
        title: 'التنقل والعلامات',
        description:
          'يحدد هذا الإعداد كيفية انتقال الطلاب خلال تقييم معيّن ويبين ما إذا كانت إجاباتهم صحيحة أم خاطئة. هذا الإعداد لا يُظهر لهم مفتاح الإجابة.'
      },
      stepTwo: {
        title: 'مفتاح الإجابة  وعدد المحاولات.',
        description:
          'يتيح هذا الإعداد إظهار مفتاح الإجابة  ويحدد عدد المحاولات التي يملكها الطلاب في التقييم.'
      }
    },
    overview: {
      stepOne: {
        title: 'خريطة المساق الدراسي',
        description:
          'تتيح خريطة المساق الدراسي للطلاب الوصول إلى جميع التقييمات والمجموعات التي تعيّنها لهم.'
      },
      stepTwo: {
        title: 'رمز الصف',
        description:
          'لكل صف تقوم بإنشائه رمز خاص. ستعطي هذا الرمز للطلاب عندما يصبح صفك الدراسي جاهز لانضمامهم ووصولهم إلى المحتوى الخاص بك.'
      },
      stepThree: {
        title: 'مراقبة بيانات الطالب والصف.',
        description:
          'تتيح لك هذه الخطوة رؤية بيانات تقييم الصف والطالب عند استكمال الطلاب للتقييمات التي تشكّل جزءاً من المساق الدراسي.'
      },
      stepFour: {
        title: 'معلومات الصف االدراسي',
        description:
          'هنا يمكنك تعديل اسم صفك الدراسي، ونشر الإعلانات لطلابك، ورؤية أسماء الطلاب المسجلين فيه، وحذفه.'
      },
      stepFive: {
        title: 'تعديل محتوى المساق الدراسي.',
        description:
          'عندما تكون في صف دراسي، انقر هنا لتعديل أي محتوى في المساق الدراسي المعيّن لطلابك.'
      },
      stepSix: {
        title: 'رصد التقدم المحرز في الوقت الحقيقي!',
        description:
          'استخدم لوحة تحكم "الوقت الحقيقي" لرصد تقدم الصف المحرز على التقييم في نفس وقت عمله.\nانقر على أيقونة \u0027التقييم المباشر\u0027 -الموجودة إلى يسار كل تقييم- لبدء تقييم الطلاب في نفس وقت عملهم'
      }
    },
    'quick-start': {
      stepOne: {
        title: 'التنقل بين الصفوف الدراسية',
        description:
          'هذا هو شكل الصف الدراسي الذي تم إنشاؤه حديثا. للرجوع إلى الصف الدراسي في أي وقت، انقر على \u0027الصفوف الدراسية\u0027 واستخدم القائمة المنسدلة لتحديد الصفوف الدراسية التي ترغب في دخولها.'
      },
      stepTwo: {
        title: 'البدء؟ أنشئ تقييم!',
        description:
          'نقترح عليك إنشاء تقييم كوسيلة للبدء مع جورو وتقييم مستوى فهم الطلاب الحالي في صفك.'
      }
    },
    'real-time': {
      stepOne: {
        title: 'تفاصيل الإجابات',
        description: 'انقر على كل سؤال للاطلاع على تفاصيل إجابات الطلاب.'
      },
      stepTwo: {
        title: 'بيانات الطالب الفردية',
        description:
          'اختر خانة كلّ طالب للاطلاع على تقارير بيانات الطالب الفردية.'
      },
      stepThree: {
        title: 'حدد طريقة عرض',
        description:
          'اختر\u0027عرض العنوان\u0027 أو \u0027عرض القائمة\u0027 للاطلاع على خيارات عرض البيانات.'
      },
      stepFour: {
        title: 'متوسط العلامات',
        description:
          'اطلع على متوسط ​​معدل الصف المحسوب في الوقت الحقيقي لجميع الإجابات'
      },
      stepFive: {
        title: 'عرض البيانات المجهولة',
        description: 'استخدم هذا الخيار لإظهار عرض مجهول لبيانات الطالب.'
      }
    }
  },
  'gru-course-play': {
    'hide-unit-details': 'إخفاء بيانات الوحدة الوصفية',
    'view-unit-details': 'عرض بيانات الوحدة الوصفية',
    performance: 'أداء'
  },
  'gru-century-skills': {
    legends: {
      hewlett: 'نموذج هيوليت للتعمق في التعليم',
      conley: 'مفاتيح كونلي الأربعة للمعرفة',
      framework: 'إطار مهارات القرن الحادي والعشرين\n',
      national: 'المركز الوطني للبحوث من أجل الحياة والعمل.'
    },
    content: {
      groups: {
        cognitive: 'المهارات والاستراتيجيات المعرفية الرئيسية.',
        content: 'محتوى المعرفة الرئيسي',
        learning: 'مهارات وتقنيات التعلم الأساسية'
      }
    }
  },
  'gru-rubric-edit': {
    'upload-rubric': 'تحميل سلم تقييم',
    copy: {
      'success-message': 'لقد نسخت سلم التقييم {{title}}. هل تريد تعديله؟ '
    }
  },
  'gru-rubric-creation': {
    url: 'رابط',
    'upload-file': 'تحميل الملف',
    'add-category': 'ضِف فئة جديدة',
    'gru-preview-url': {
      preview: 'ضِف سلم تقييم أعلاه وعاينه هنا.'
    },
    'overall-narrative': 'تغذية راجعة كلامية.',
    'feedback-guidance': 'دليل التغذية الراجعة',
    'required-feedback': 'التغذية الراجعة مطلوبة',
    'feedback-guidance-placeholder': 'لخِّص ملاحظاتك على المقال ككل.',
    'gru-category': {
      'category-title': 'عوان الفئة',
      'category-feedback': 'عند معاينة هذه الفئة، انتبه لهذف الكاتب. ',
      'gru-scoring-levels': {
        '0': 'مثال: تخطى الاحترافية',
        '1': 'مثال: محترف',
        '2': 'مثال: قريب من الاحترافية',
        '3': 'مثال: مبتدئ',
        '4': 'مثال: غير محترف',
        best: 'أفضل',
        levels: 'المستوى',
        'new-level': 'إضافة مستوى جديد',
        scoring: 'العلامة',
        worst: 'أسوأ',
        'name-error': 'يرجى إدخال عنوان المستوى',
        'score-error': 'يرجى إدخال قيمة العلامة',
        'no-levels-error': 'يرجى وضع قيمة لمستوى واحد على الأقل.'
      }
    }
  },
  library: {
    'browse-library': 'تصفح المكتبة',
    'featured-courses': 'المساقات الدراسية المميزة',
    'gru-library-card': {
      'featured-course': 'مساق دراسي مميز'
    },
    'gru-partner-library-card': {
      course: {
        zero: '{{count}} مساق دراسي',
        one: '{{count}} مساق دراسي',
        other: '{{count}} مساقات دراسية'
      },
      collection: {
        zero: '{{count}} مجموعة',
        one: '{{count}} مجموعة',
        other: '{{count}} مجموعات'
      },
      assessment: {
        zero: '{{count}} تقييم',
        one: '{{count}} تقييم',
        other: '{{count}} تقييمات'
      },
      resource: {
        zero: '{{count}} مصدر',
        one: '{{count}} مصدر',
        other: '{{count}} مصادر'
      },
      question: {
        zero: '{{count}} سؤال',
        one: '{{count}} سؤال',
        other: '{{count}} اسئلة'
      },
      rubric: {
        zero: '{{count}} سلم تقييم',
        one: '{{count}} سلم تقييم',
        other: '{{count}} سلم تقييمي'
      }
    },
    'partner-libraries': 'مكتبات الشركاء'
  },
  'gru-study-header': {
    'lesson-legend': 'تمت إضافتك إلى الدرس',
    'resource-legend': 'أنت تتحقق من المصدر',
    'resources-collection-report': 'تقرير استخدام المجموعة',
    'resources-assessment-report': 'ملخص تقرير التقييم',
    'check-summary': 'تحقق من ملخص التقرير',
    'check-usage': 'تحقق من تقرير الاستخدام',
    'no-suggestions': 'نحن نعمل على أفضل الاقتراحات لدعم عملية التعليم',
    resource: {
      zero: 'مصدر',
      one: 'مصدر',
      other: 'مصادر'
    },
    question: {
      zero: 'سؤال',
      one: 'سؤال',
      other: 'أسئلة'
    },
    'suggestions-legend': 'لمعرفة المزيد، تحقق من هذه المصادر.'
  },
  'gru-suggest-test': {
    'pre-test-header': 'اختبار مسبق للدرس (اختياري)',
    'post-test-header': 'اختباربعد الانتهاء من الدرس (اختياري)',
    'backfill-header': 'المجموعة المقترحة (اختياري)',
    'benchmark-header': 'اختبار معياري (اختياري)',
    'resource-header': 'المصدر المقترح (اختياري)',
    'pre-test-lead':
      'يفضل الخضوع لاختبار قبل البدء بالدرس لتقييم مدى استيعاب الطالب للمفهوم الذي سيتم طرحه في هذا الدرس. يساعد هذا الاختبار الطالب في التحضير لمحتوى الدرس دون التأثير على علامة الآداء. ',
    'post-test-lead':
      'الاختبار التالي هو اختبار بعد الانتهاء من الدرس، ويفضل الخضوع له لتقييم مدى استيعاب الطالب للمفهوم الذي تم طرحه أثناء شرح الدرس، ولن يؤثرهذا الاختبار على علامة الآداء. ',
    'backfill-lead':
      'بناءً على إجاباتك في الامتحان المسبق للدرس، يُنصح بمراجعة مواد إضافية قبل البدء بالدرس، فمراجعة إحدى المواد المساندة يساعد الطالب في تعلم مادة جديدة. ',
    'benchmark-lead':
      'أنت على استعداد لإظهار مدى استيعابك من خلال الخضوع للتقييم معياري. سيتم منحك شارة في حال إكمال هذا التقييم بنجاح، لن يؤثر هذا التقييم على علامة الآداء. ',
    'resource-lead':
      'بناءً على آدائك في هذا المساق، سيعزز المصدر التالي اسيعابك له. ',
    no: 'لا، شكرا',
    'no-suggestions': 'هذا ملخص لآدائك',
    take: 'خذ {{type}}',
    'take-backfill-pretest': 'ادرس المجموعات المقترحة',
    'take-resource': 'ادرس المصدر',
    'end-of-course': 'لقد وصلت إلى نهاية المساق الدراسي.'
  },
  'student-open-ended-summary': {
    'overall-comment': 'التعليق العام',
    'overall-score': 'العلامة العامة',
    prompt: 'سؤال فوري'
  },
  'gru-performance-chart': {
    'teacher-tooltip': 'من طلابك أكمل كل التقييمات في هذا الدرس.'
  }
});
