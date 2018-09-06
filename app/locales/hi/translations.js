import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
  'errors': {
    'description': 'यह फील्ड',
    'inclusion': '{{description}} सूची में शामिल नहीं है',
    'exclusion': '{{description}} आरक्षित है',
    'invalid': '{{description}} अमान्य है',
    'confirmation': '{{description}} {{on}} से मेल नहीं खाता है',
    'accepted': '{{विवरण}} स्वीकार किया जाना चाहिए',
    'empty': '{{description}} रिक्त नहीं रह सकता है',
    'blank': '{{description}} रिक्त नहीं रह सकता है',
    'present': '{{description}} रिक्त होना चाहिए',
    'collection': '{{description}} एक संकलन होना चाहिए',
    'singular': '{{description}} संकलन नहीं हो सकता है',
    'tooLong': '{{description}} बहुत लंबा है (अधिकतम {{max}} अक्षर है)',
    'tooShort': '{{description}} बहुत छोटा है (न्यूनतम {{min}} अक्षर है)',
    'before': '{{description}} {{before}} से पहले होना चाहिए',
    'after': '{{description}} {{after}} के बाद होना चाहिए',
    'wrongDateFormat': '{{description}} {{format}} के प्रारूप में होना चाहिए',
    'wrongLength': '{{description}} गलत लंबाई है ({{is}} अक्षर होने चाहिए)',
    'notANumber': '{{description}} एक संख्या होनी चाहिए',
    'notAnInteger': '{{description}} एक पूर्णांक होना चाहिए',
    'greaterThan': '{{description}} {{gt}} से अधिक होना चाहिए',
    'greaterThanOrEqualTo': '{{description}} {{gte}} से अधिक या बराबर होना चाहिए',
    'equalTo': '{{description}} {{is}} के बराबर होना चाहिए',
    'lessThan': '{{description}} {{lt}} से कम होना चाहिए',
    'lessThanOrEqualTo': '{{description}} {{lte}} से कम या बराबर होना चाहिए',
    'otherThan': '{{description}} {{value}} से अधिक होना चाहिए',
    'odd': '{{description}} विषम होना चाहिए',
    'even': '{{description}} सम होना चाहिए',
    'positive': '{{description}} धनात्मक होना चाहिए',
    'date': '{{description}} एक वैध तिथि होनी चाहिए',
    'email': '{{description}} एक वैध ईमेल पता होना चाहिए',
    'phone': '{{description}} एक वैध फोन नंबर होना चाहिए',
    'url': '{{description}} एक वैध यूआरएल होना चाहिए'
  },
  'common': {
    'relevance': 'प्रासंगिकता',
    'engagement': 'अनुबंध',
    'efficacy': 'प्रभावोत्पादकता',
    'grid': 'ग्रिड',
    'list': 'सूची',
    'first': 'प्रथम',
    'last': 'अंतिम',
    'name': 'नाम',
    'content-name': 'सामग्री का नाम',
    'lastName': 'अंतिम नाम',
    'firstName': 'प्रथम नाम',
    'filter-by': 'फ़िल्टर',
    'more': 'अधिक',
    'avg-score': 'औसत अंक',
    'frq': 'एफआर ',
    'responses': 'प्रतिक्रिया',
    'gooru-suggestions': 'Gooru सुझाव',
    'suggestion-made-to': 'सुझाव दिया गया',
    'student-selected': 'छात्र चुने गए',
    'no-suggest-result-message': 'कोई मेल खाने वाली सामग्री मिली',
    'no-suggest-results-message': 'आप संबंधित सामग्री को खोज और ढूंढ सकते हैं।',
    'no-suggest-search-results-message': 'अपनी वर्तनी की जाँच करें। हम सब गलतियाँ करते हैं! या इसके बजाय एक समान शब्द खोजने की कोशिश करें।',
    'a-collection': 'एक संकलन',
    'a-course': 'एक पाठ्यक्रम',
    'a-question': 'एक प्रश्न',
    'a-resource': 'एक संसाधन',
    'a-rubric': 'एक सुर्खी',
    'all-completed': 'सब पूरा हो गया',
    'an-assessment': 'एक मूल्यांकन',
    'about': 'के बारे में',
    'about-you': 'आपके बारे में',
    'about-me': 'मेरे बारे में',
    'accept': 'स्वीकार',
    'ignore': 'ध्यान न दे',
    'add': 'जोड़ें',
    'add-assessment': 'नया मूल्यांकन बनाएं',
    'add-century-skills': '21 वीं सदी के कौशल जोड़ें',
    'add-collaborator': 'सहयोगी जोड़ें',
    'add-collection': 'नया संकलन बनाएं',
    'add-collection-item': 'संसाधन या प्रश्न बनाएँ',
    'add-competency': 'योग्यता जोड़ें',
    'add-content-prompt': 'आपने अभी तक <span> {{type}} </span> नहीं बनाया है। चलिए साहसी बनिए।',
    'add-course': 'नया पाठ्यक्रम बनाएं',
    'add-domains-to-unit': 'इकाई में डोमेन जोड़ें',
    'add-url': 'यू आर एल जोड़िये',
    'add-from-url': 'यूआरएल से जोड़ें',
    'add-lessons': 'पाठ जोड़ें',
    'add-new-lesson': 'नया पाठ बनाएं',
    'add-new-unit': 'नई इकाई बनाएं',
    'add-new-resource': 'नया संसाधन बनाएं',
    'add-new-question': 'एक नया प्रश्न बनाएं',
    'add-question': 'प्रश्न बनाएं',
    'add-question-image': 'प्रश्न चित्र जोड़ें',
    'add-rubric': 'नई सुर्खी जोड़ें',
    'add-standard': 'मानक जोड़ें',
    'add-standards': 'मानकों को जोड़ें',
    'add-standards-to-collection': 'संकलन में मानकों को जोड़ें',
    'add-to': 'में जोड़े',
    'add-to-classroom': 'कक्षा में जोड़ें',
    'add-to-daily-class': 'दैनिक कक्षा की गतिविधियों में जोड़ें',
    'add-to-collection-success': 'आपने {{contenttitle}} को {{collectiontitle}} में जोड़ा है। क्या आप उस {{collectiontype}} को संपादित करना चाहते हैं?',
    'add-to-lesson-success': 'आपने {{collectiontitle}} को {{lessontitle}} में जोड़ा है। क्या आप उस {{collectiontype}} को संपादित करना चाहते हैं?',
    'add-type-question': 'आप किस प्रकार का प्रश्न जोड़ना चाहते हैं?',
    'add-type-resource': 'यह किस प्रकार का संसाधन है?',
    'add-units': 'इकाइयों को जोड़ें',
    'added': 'जोड़ा गया',
    'advanced-editing': 'उन्नत संपादन',
    'announcements': 'घोषणाएं',
    'anonymous_mode': 'अज्ञात मोड',
    'answer': 'आपका उत्तर',
    'answer-correct': 'आप सही हैं!',
    'answer-incorrect': 'आप गलत हैं...',
    'answer-key-was-hidden': 'नोट: आपके शिक्षक ने उत्तर कुंजी छिपा दी है।',
    'approved': 'मंजूर किया गया',
    'archive': 'पुरालेख',
    'assessment': 'मूल्यांकन',
    'assessment-disabled': 'आप इस मूल्यांकन का प्रयास नहीं कर सकते हैं',
    'assessment-external': 'मूल्यांकन-बाहरी',
    'assessment-pl': {
      'zero': 'मूल्यांकन',
      'one': 'मूल्यांकन',
      'other': 'मूल्यांकन'
    },
    'assessment-title': 'मूल्यांकन शीर्षक',
    'assessmentInitial': 'ए',
    'assessments': 'मूल्यांकन',
    'assign': 'निरूपण करना',
    'assign-to-class': 'कक्षा को निरुपित करें',
    'assign-to-course': 'पाठ्यक्रम के लिए निरुपित करें',
    'attempt': 'प्रयास संख्या',
    'audience': 'दर्शक',
    'avatarFor': 'के लिए अवतार',
    'averageScore': 'औसत अंक',
    'back': 'वापस',
    'back-to-assessment': 'मूल्यांकन पर वापस',
    'back-to-collection': 'संकलन पर वापस',
    'back-to-course-map': 'पाठ्यक्रम मानचित्र पर वापस',
    'back-to-data': 'डेटा पर वापस',
    'back-to-report': 'रिपोर्ट पर वापस',
    'best-practices': 'सर्वोत्तम प्रथाएं',
    'beta': 'बीटा',
    'big-ideas': 'बड़े विचार',
    'biography': 'जीवनी',
    'bookmark': 'बुकमार्क',
    'bookmarks': 'बुकमार्क',
    'bookmarked-content-success': 'यह बुकमार्क {{contenttype}} आपके स्वतंत्र अध्ययन पृष्ठ में जोड़ा जाएगा।',
    'bookmarked-success': 'सभी बुकमार्क की गई सामग्री स्वतंत्र अध्ययन पृष्ठ में जोड़ दी जाएगी।',
    'builder': 'संपादक',
    'cancel': 'रद्द करना',
    'categories': 'वर्ग',
    'category': 'वर्ग',
    'categoryOptions': {
      'k12': 'के-12',
      'higher-ed': 'उच्च शिक्षा',
      'professional-dev': 'व्यावसायिक विकास'
    },
    'century-skills': '21 वीं सदी के कौशल',
    'choose': 'चयन करें',
    'choose-file': 'एक फ़ाइल का चयन करें',
    'class': 'कक्षा',
    'classScores': 'कक्षा के अंक',
    'click-unBookmark': 'अनबुकमार्क पर क्लिक करें',
    'close': 'बंद करे',
    'collection': 'संकलन',
    'collection-pl': {
      'zero': 'संकलन',
      'one': 'संकलन',
      'other': 'संकलन'
    },
    'collection-title': 'संकलन शीर्षक',
    'collections': 'संकलन',
    'collectionInitial': 'सी',
    'competency': 'क्षमता',
    'competencies': 'दक्षताएं',
    'completed': 'पूरा कर लिया है',
    'completion': 'समापन',
    'community': 'समुदाय',
    'confirm': 'पुष्टि करें',
    'confirm-copy': 'पुष्टि करें और प्रतिलिपि बनाएँ',
    'content': 'सामग्री',
    'content-manager': 'सामग्री प्रबंधक',
    'contentUnavailable': 'सामग्री उपलब्ध नहीं',
    'contentUnavailabletoday': 'कोई मौजूदा गतिविधियां नहीं। पाठ्यक्रम मानचित्र या मेरी सामग्री से दैनिक कक्षा की गतिविधियों को जोड़ें।',
    'contentUnavailableyesterday': 'कोई गतिविधि नहीं जोड़ी गई थी।',
    'contributed-by': 'के द्वारा योगदान दिया गया',
    'copy': 'प्रतिलिपि',
    'copy-to': 'को प्रतिलिपि',
    'correct': 'सही ',
    'correct-answer': 'सही उत्तर',
    'correct-answers': 'सही उत्तर',
    'incorrect-answers': 'गलत उत्तर',
    'rubric-graded': 'रूब्रिक श्रेणीबद्ध',
    'rubric-needs-grading': 'रूब्रिक के ग्रेडिंग की जरूरत है',
    'not-answered': 'जवाब नहीं दिया',
    'rubric-not-answered': 'रूब्रिक का उत्तर नहीं दिया गया',
    'country': 'देश',
    'course-map': 'पाठ्यक्रम मानचित्र',
    'course': 'पाठ्यक्रम',
    'course-title': 'पाठ्यक्रम का शीर्षक',
    'courses': 'पाठ्यक्रम',
    'create': 'सर्जन करना',
    'createClass': 'कक्षा सृजित करें',
    'created-by': 'के द्वारा सृजित की गई',
    'create-rubric': 'नई सुर्खी बनाएं',
    'current-attempt': 'वर्तमान प्रयास',
    'currently-studying': 'अभी अध्ययन कर रहा है',
    'delete': 'हटाएं',
    'delete-instructions': {
      'links-inaccessible': 'सभी शेयर लिंक अगम्य होंगे',
      'content-inaccessible': 'सभी सामग्री इसके साथ बंधी कक्षाओं के लिए अगम्य होगी'
    },
    'depth-of-knowledge': 'ज्ञान की गहराई',
    'description': 'विवरण',
    'disappear-after-login': 'यह {{loginnumber}} लॉगिन के बाद गायब हो जाएगा',
    'disappear-next-login': 'यह अगले लॉगिन पर दिखाई नहीं देगा',
    'district': 'जिला',
    'domain': 'डोमेन',
    'domains': 'डोमेन',
    'download': 'डाउनलोड',
    'download-print': 'डाउनलोड / प्रिंट',
    'drag-drop-suggestions': 'या खींचना और छोड़ना सुझाव...',
    'download-report': 'रिपोर्ट डाउनलोड करें',
    'edit': 'संपादित करें',
    'showassessments': 'मूल्यांकन दिखाएं',
    'showcollections': 'संकलन दिखाएं',
    'showlessons': 'पाठ दिखाएं',
    'collapse': 'गिरावट',
    'expand': 'विस्तार',
    'edit-assessment': 'मूल्यांकन संपादित करें',
    'edit-collection': 'संकलन संपादित करें',
    'edit-course': 'पाठ्यक्रम संपादित करें',
    'edit-question': 'प्रश्न संपादित करें',
    'edit-resource': 'संसाधन संपादित करें',
    'edit-rubric': 'सुर्खी संपादित करें',
    'email_support': 'support@gooru.org',
    'emotions': {
      'emotion-1': 'मुझे सहायता चाहिए',
      'emotion-2': 'मुझे समझ में नहीं आता',
      'emotion-3': 'मेह ...',
      'emotion-4': 'मै समझता हुँ',
      'emotion-5': 'में समझा सकता हूँ'
    },
    'enter-url': 'यूआरएल दर्ज करें',
    'enrolled-students': 'नामांकित छात्र',
    'errors': {
      'join-class-code': 'कृपया कक्षा कोड दर्ज करें।',
      'answer-has-no-image': 'कृपया एक उत्तर चित्र अपलोड करें।',
      'add-username': 'कृपया उपयोगकर्तानाम दर्ज करें।',
      'add-course-title': 'कृपया पाठ्यक्रम का शीर्षक दर्ज करें।',
      'add-question-answer-text': 'कृपया उत्तर विकल्प टेक्स्ट दर्ज करें।',
      'add-question-description': 'कृपया प्रश्न दर्ज करें।',
      'add-question-title': 'कृपया प्रश्न शीर्षक दर्ज करें।',
      'assessment-title-presence': 'कृपया मूल्यांकन शीर्षक दर्ज करें।',
      'can-not-join-class': 'उफ़! कक्षा में शामिल होने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'assessment-not-added-to': 'उफ़! अभी पाठ को मूल्यांकन से जोड़ने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'assessment-not-copied': 'उफ़! अभी मूल्यांकन की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'assessment-not-created': 'उफ़! अभी मूल्यांकन करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'assessment-not-updated': 'उफ़! अभी मूल्यांकन को अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'category-title-presence': 'कृपया वर्ग का शीर्षक दर्ज करें।',
      'class-min-score': 'न्यूनतम अंक 1 और 100 के बीच एक संख्या होना चाहिए',
      'class-not-created': 'उफ़! अभी कक्षा बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'class-title-presence': 'कृपया अपने कक्षा को एक नाम दें।',
      'collection-not-added-to': 'उफ़! अभी पाठ में संकलन को जोड़ने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'collection-not-copied': 'उफ़! अभी संकलन की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'collection-not-created': 'उफ़! अभी संकलन बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'collection-not-updated': 'उफ़! अभी संकलन को अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'collection-title-presence': 'कृपया संकलन शीर्षक दर्ज करें।',
      'correct-answer-presence': 'कृपया सही उत्तर इंगित करें।',
      'course-not-copied': 'उफ़! अभी पाठ्यक्रम की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'course-not-created': 'उफ़! अभी कोर्स बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'course-not-updated': 'उफ़! अभी पाठ्यक्रम अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'highlight-text-not-selected': 'कृपया सही उत्तर इंगित करें।',
      'highlight-text-wrong-format': 'गलत प्रश्न प्रारूप।',
      'hotspot-text-max-choices': 'आप उत्तर विकल्पों की सीमा तक पहुंच गए हैं।',
      'file-max-size': 'केवल 5 एमबी से छोटे आकार की फाइलें समर्थित हैं',
      'file-upload-missing': 'कृपया निम्न में से किसी भी एक्सटेंशन के साथ एक फ़ाइल का चयन करें: {{extension}}',
      'getting-next-resource': 'आपका उत्तर सबमिट करने में त्रुटि हुई। कृपया पुन: प्रयास करें।',
      'lesson-not-copied': 'उफ़! अभी पाठ की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'lesson-not-created': 'उफ़! अभी पाठ सृजित करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'lesson-not-loaded': 'उफ़! अभी पाठ लोड करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'lesson-title-required': 'कृपया पाठ शीर्षक दर्ज करें।',
      'password-confirm': 'कृपया अपने पासवर्ड की पुष्टि करें।',
      'password-length': 'पासवर्ड 5 और 14 अक्षरों के बीच होना चाहिए।',
      'password-not-match': 'पासवर्ड मेल नहीं खाते।',
      'password-required': 'कृपया पासवर्ड दर्ज करें।',
      'password-special-characters': 'कृपया विशेष अक्षरों का उपयोग न करें।',
      'profile-not-updated': 'उफ़! अभी प्रोफ़ाइल अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'question-not-added-to': 'उफ़! अभी {{collectiontype}} पर प्रश्न जोड़ने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'question-not-copied': 'उफ़! अभी प्रश्न की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'question-not-created': 'उफ़! अभी प्रश्न बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'question-not-updated': 'उफ़! अभी प्रश्न को अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'reset-password-error': 'उह ओह! कुछ ठीक नहीं है। पासवर्ड रीसेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'reset-google-account-exists': 'आपका ईमेल लॉगिन Google खाते के साथ बनाया गया था और हम एक Google पासवर्ड रीसेट नहीं कर सकते हैं। अगर आप अपना Google पासवर्ड भूल गए हैं, तो आपको इसे अपने Google ऐप्स के माध्यम से रीसेट करना होगा।',
      'resource-description-length': 'वर्णन 500 अक्षरों से अधिक नहीं हो सकता है।',
      'resource-invalid-url': 'अवैध यूआरएल।',
      'resource-missing-title': 'कृपया एक संसाधन शीर्षक दर्ज करें।',
      'resource-missing-type': 'कृपया एक संसाधन प्रकार का चयन करें।',
      'resource-missing-url': 'कृपया एक मान्य यूआरएल दर्ज कीजिए।',
      'resource-not-added-to-collection': 'उफ़! अभी संकलन में संसाधन जोड़ने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'resource-not-copied': 'उफ़! अभी संसाधन की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'resource-not-created': 'उफ़! अभी संसाधन बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'resource-not-updated': 'उफ़! अभी संसाधन को अपडेट करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'resource-same-host-url': 'संसाधन gooru यूआरएल नहीं हो सकता है।',
      'resource-title-length': 'शीर्षक 50 अक्षरों से अधिक नहीं हो सकता है।',
      'rubric-title-presence': 'कृपया सुर्खी शीर्षक दर्ज करें।',
      'rubric-url-presence': 'कृपया सुर्खी यूआरएल दर्ज करें।',
      'select-correct-answer': 'कृपया सही उत्तर का चयन करें।',
      'search-collections-length': 'कृपया कम से कम 3 अक्षर दर्ज करें।',
      'sign-in-credentials-not-valid': 'उह ओह! कुछ ठीक नहीं है। कृपया अपना उपयोगकर्ता नाम और पासवर्ड दोबार जांचें और पुनः प्रयास करें।',
      'sign-in-google-account-exists': 'कृपया Google साइन इन का उपयोग करें। हम आपका पासवर्ड रीसेट नहीं कर सकते हैं।',
      'sign-up-error': 'उफ़! अभी साइन अप करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'sign-up-first-name': 'कृपया अपना प्रथम नाम दर्ज करें।',
      'sign-up-last-name': 'कृपया अपना अंतिम नाम दर्ज करें।',
      'sign-up-name-length': 'अंतिम नाम में कम से कम 2 अक्षर होने चाहिए।',
      'sign-up-name-only-letters': 'कृपया केवल अक्षर दर्ज करें।',
      'sign-up-valid-email': 'कृपया एक वैध ईमेल एड्रेस डालें।',
      'special-characters': 'आप विशेष अक्षरों या रिक्त स्थान का उपयोग नहीं कर सकते हैं।',
      'unit-not-copied': 'उफ़! अभी इकाई की प्रतिलिपि बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'unit-not-created': 'उफ़! अभी इकाई बनाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'unit-not-loaded': 'उफ़! अभी इकाई लोड करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
      'unit-title-required': 'कृपया इकाई शीर्षक दर्ज करें।',
      'user-email-presence': 'कृपया अपना मान्य ईमेल लिखें।',
      'username-length': 'उपयोगकर्ता नाम 4 से 254 अक्षरों के बीच होना चाहिए।',
      'forgot-password-gmail': 'कृपया Google साइन इन का उपयोग करें। हम आपका पासवर्ड रीसेट नहीं कर सकते हैं।'
    },
    'essential-questions': 'आवश्यक प्रश्न',
    'example': 'उदाहरण:',
    'exit': 'बाहर जाएं',
    'explanation': 'व्याख्या',
    'explore': 'का पता लगाएं',
    'false': 'असत्य',
    'featured-courses': 'विशेष रूप से प्रदर्शित पाठ्यक्रम',
    'file-name': 'फ़ाइल का नाम',
    'finish': 'समाप्त',
    'first-name': 'पहला नाम',
    'follow': 'का पालन करें',
    'followers': 'अनुयायी',
    'following': 'निम्नलिखित',
    'forgotPassword': 'पासवर्ड भूल गए',
    'from': 'से',
    'from-my-assessments': 'मेरे मूल्यांकन से',
    'from-my-collections': 'मेरे संकलन से',
    'from-my-questions': 'मेरे प्रश्नों से',
    'from-my-resources': 'मेरे संसाधनों से',
    'hide-results': 'परिणाम छुपाएं',
    'hints': 'संकेत',
    'home': 'होम',
    'if_questions': 'अगर आपके पास कोई प्रश्न है,',
    'information': 'जानकारी',
    'in-progress': 'चालू है',
    'instructor': 'प्रशिक्षक',
    'last-name': 'अंतिम नाम',
    'last-updated': 'आखिरी अपडेट',
    'latest-attempt': 'नवीनतम प्रयास',
    'launch-anonymous': 'अज्ञात लॉन्च करें',
    'launch-on-air': 'गो लाइव',
    'learning-objectives': 'सीखने के उद्देश्य',
    'learning-target': 'सूक्ष्म-मानक',
    'learning-target-mobile': 'मानक में सूक्ष्म-मानक',
    'lesson': 'पाठ',
    'lessonInitial': 'एल',
    'lesson-title': 'पाठ शीर्षक',
    'lessonObj': {
      'zero': 'पाठ',
      'one': 'पाठ',
      'other': 'पाठ'
    },
    'libraries': 'पुस्तकालय',
    'license': 'लाइसेंस',
    'link': 'लिंक',
    'link-out': 'लिंक-आउट',
    'link-out-message': '* यदि आपका संसाधन ऊपर दिए गए पूर्वावलोकन में खाली दिखाई दे रहा है, तो सामग्री को देखने के लिए किसी अन्य पृष्ठ पर \'लिंक-आउट\' की आवश्यकता हो सकती है।',
    'live-assessments': 'लाइव मूल्यांकन',
    'loading': 'लोड हो रहा है ...',
    'login': 'लॉग इन करें',
    'logout': 'लॉग आउट करें',
    'mastery': 'प्रवीणता',
    'menu': 'मेन्यू',
    'more-details': 'अधिक जानकारी',
    'move': 'चाल',
    'myContent': 'मेरी सामग्री',
    'myProfile': 'मेरा स्थान',
    'library': 'पुस्तकालय',
    'myPerformance': 'मेरा प्रदर्शन',
    'edit-narration': 'विवरण संपादित करें',
    'narration': 'विवरण',
    'new-assessment': 'नया मूल्यांकन',
    'new-collection': 'नया संकलन',
    'new-question': 'नया प्रश्न',
    'new-question-text': 'यहां प्रश्न का टेक्स्ट दर्ज करें',
    'new-fib-question-text': '[उत्तर] के साथ प्रश्न दर्ज करें',
    'new-resource': 'नया संसाधन',
    'next': 'आगामी',
    'no': 'नहीं',
    'no-archived': 'आपके पास कोई संकलित कक्षा नहीं है।',
    'no-content': 'कोई सामग्री उपलब्ध नहीं है',
    'no-content-my-report': 'अभी तक कोई रिपोर्ट उपलब्ध नहीं है। एक बार अध्ययन शुरू करने के बाद, आपकी रिपोर्ट उपलब्ध हो जाएगी।',
    'no-assessments-to-display': 'प्रदर्शित करने के लिए <span> मूल्यांकन </span> नहीं है।',
    'no-collections-to-display': 'प्रदर्शित करने के लिए कोई <span> संकलन </span> नहीं है।',
    'no-courses-to-display': 'प्रदर्शित करने के लिए कोई <span> पाठ्यक्रम </span> नहीं है।',
    'no-questions-to-display': 'प्रदर्शित करने के लिए कोई <span> प्रश्न </span> नहीं है।',
    'no-resources-to-display': 'प्रदर्शित करने के लिए कोई <span> संसाधन </span> नहीं है।',
    'no-rubrics-to-display': 'प्रदर्शित करने के लिए कोई <span> सुर्खी </span> नहीं है।',
    'no-followers': 'आपके पास अभी तक अनुयायी नहीं हैं।',
    'no-independent-results': 'जब आप अपने बुकमार्क किए गए {{contenttype}} की खोज शुरू करते हैं, तो वे यहां दिखाई देंगे।',
    'no-results': 'कोई परिणाम नहीं मिला',
    'no-available-results': 'परिणाम उपलब्ध नहीं हैं',
    'no-results-message': 'अपनी वर्तनी की जाँच करें। हम सभी गलतियां करते हैं! <br/> व्यापक हो जाएं और कुछ फ़िल्टर हटा दें। <br/> या इसकी बजाय एक समान शब्द खोजने की कोशिश करें।',
    'no-more-attempts': 'और कोई प्रयास नहीं',
    'no-dca-student': 'आपके शिक्षक ने अभी तक दैनिक कक्षा की गतिविधियों के लिए कोई संकलन या मूल्यांकन निरुपित नहीं किया है।',
    'no-dca-teacher': 'कोई मौजूदा गतिविधियां नहीं। पाठ्यक्रम मानचित्र या मेरी सामग्री से दैनिक कक्षा की गतिविधियों को जोड़ें।',
    'notScored': 'स्कोर नहीं किया गया',
    'notStarted': 'शुरू नही हुआ',
    'not-added': 'नहीं जोड़ा गया',
    'not-applicable': 'लागू नहीं',
    'not-following': 'आप किसी का अनुसरण नहीं कर रहे हैं।',
    'not-provided': 'नहीं दिया गया',
    'not-specified': 'निर्दिष्ट नहीं है',
    'not_started': 'शुरू नही हुआ',
    'nothing-to-display': 'दिखाने के लिये कुछ नहीं।',
    'number': 'नहीं।',
    'numberStudents': {
      'zero': '{{गिनती}} छात्र',
      'one': '{{गिनती}} छात्र',
      'other': '{{गिनती}} छात्र'
    },
    'of': 'का',
    'off': 'बंद',
    'on': 'चालू',
    'other': 'अन्य',
    'overall-performance': 'सम्पूर्ण प्रदर्शन',
    'password': 'पासवर्ड',
    'pending': 'विचाराधीन',
    'performance': 'प्रदर्शन दिखाएं',
    'performance-dashboard': 'प्रदर्शन डैशबोर्ड',
    'personal-information': 'व्यक्तिगत जानकारी',
    'play': 'प्ले',
    'please_contact': 'कृपया संपर्क करें',
    'post-message': 'संदेश भेजें',
    'preview': 'पूर्वावलोकन',
    'profile': 'प्रोफ़ाइल',
    'profile-publishing': 'प्रोफ़ाइल दृश्यता',
    'publish-to': 'इसे मेरी प्रोफाइल लाइब्रेरी पर दूसरों के लिए दृश्यमान बनाएं',
    'published-by': 'द्वारा प्रकाशित',
    'published-tooltip': 'बैज सामग्री',
    'publisher': 'प्रकाशक',
    'question': 'प्रश्न',
    'questions': 'प्रश्न',
    'questions-OE': 'मुफ्त अनुक्रिया प्रश्न',
    'question-pl': {
      'zero': 'प्रश्न',
      'one': 'प्रश्न',
      'other': 'प्रश्न'
    },
    'question-title': 'प्रश्न शीर्षक',
    'question-type': {
      'SA': 'एकल उत्तर',
      'MC': 'बहुविकल्पी',
      'FIB': 'रिक्त स्थान भरें',
      'T/F': 'सही या गलत',
      'T_F': 'सही या गलत',
      'MA': 'एकाधिक उत्तर',
      'OE': 'मुफ़्त अनुक्रिया',
      'HS_TXT': 'एकाधिक चयन - पाठ',
      'HS_IMG': 'एकाधिक चयन - छवि',
      'HT_TO': 'खींचें और ड्रॉप अनुक्रम',
      'HT_RO': 'खींचें और ड्रॉप अनुक्रम',
      'HT_HL': 'टेक्स्ट हाइलाइट करें'
    },
    'reaction': 'प्रतिक्रिया',
    'read-first': '<b> इसे पहले पढ़ें! </b>',
    'remaining': '{{number}} छोड़ गए',
    'remix': 'रीमिक्स',
    'remix-assessment': 'मूल्यांकन को रीमिक्स करें',
    'remix-assessment-lead': 'आप एक मूल्यांकन को रीमिक्स करने वाले हैं।',
    'remix-assessment-success': 'आपने {{मूल्यांकन शीर्षक}} एक मूल्यांकन को रीमिक्स किया है। क्या आप उस मूल्यांकन को संपादित करना चाहते हैं?',
    'remix-collection': 'संकलन को रीमिक्स करें',
    'remix-collection-lead': 'आप एक संकलन को रीमिक्स करने जा रहे हैं।',
    'remix-collection-success': 'आपने {{collectiontitle}} एक संकलन को रीमिक्स किया है। क्या आप उस संकलन को संपादित करना चाहते हैं?',
    'remix-course': 'पाठ्यक्रम को रीमिक्स करें',
    'remix-course-lead': 'आप एक पाठ्यक्रम को रीमिक्स करने जा रहे हैं।',
    'remix-course-success': 'आपने {{coursetitle}} एक पाठ्यक्रम को रीमिक्स किया है। क्या आप उस पाठ्यक्रम को संपादित करना चाहते हैं?',
    'remix-lesson': 'पाठ को रीमिक्स करें',
    'remix-lesson-lead': 'आप एक पाठ को रीमिक्स करने जा रहे हैं।',
    'remix-lesson-success': 'आपने एक पाठ {{lessontitle}} को रीमिक्स किया है।',
    'remix-question': 'प्रश्न को रीमिक्स करें',
    'remix-question-lead': 'आप एक प्रश्न को रीमिक्स करने जा रहे हैं।',
    'remix-question-success': 'आपने एक प्रश्न {{questiontitle}} को रीमिक्स किया है। क्या आप उस प्रश्न को संपादित करना चाहते हैं?',
    'remix-resource': 'संसाधन को रीमिक्स करें',
    'remix-resource-lead': 'आप संसाधन को रीमिक्स करने जा रहे हैं।',
    'remix-resource-success': 'आपने संसाधन {{resourcetitle}} को रीमिक्स किया है। क्या आप उस संसाधन को संपादित करना चाहते हैं?',
    'remix-unit': 'इकाई को रीमिक्स करें',
    'remix-unit-lead': 'आप एक इकाई को रीमिक्स करने जा रहे हैं।',
    'remix-unit-success': 'आपने एक इकाई {{unittitle}} को रीमिक्स किया है।',
    'remixed-by': 'के द्वारा रीमिक्स किया गया',
    'remix-warning': 'सचेत रहें! इस पाठ्यक्रम में बहुत सी अच्छी सामग्री है और एक प्रतिलिपि बनाने में समय लगेगा। पुष्टि करें कि आप प्रक्रिया शुरू करना चाहते हैं और 15 मिनट में आपको इस पाठ्यक्रम की अपनी प्रति अपनी <b> प्रोफ़ाइल पर मिल जाएगी। </b>',
    'remove': 'हटाएं',
    'report': 'रिपोर्ट करें',
    'report-in-progress': 'रिपोर्ट प्रगति पर है',
    'request-to': 'बैज के लिए अनुरोध की समीक्षा की जाएगी',
    'request-report': 'रिपोर्ट के लिए अनुरोध करें',
    'resource': 'संसाधन',
    'resources': 'साधन',
    'resource-format': {
      'image': 'छवि',
      'text': 'टेक्स्ट',
      'video': 'वीडियो',
      'interactive': 'इंटरैक्टिव',
      'webpage': 'वेब पृष्ठ',
      'audio': 'ऑडियो',
      'question': 'प्रश्न'
    },
    'resource-pl': {
      'zero': 'साधन',
      'one': 'संसाधन',
      'other': 'साधन'
    },
    'resource-title': 'संसाधन शीर्षक',
    'resource-url': 'संसाधन यूआरएल',
    'role': 'भूमिका',
    'rubric': 'सुर्खी',
    'rubric-creation': 'सुर्खी का सृजन',
    'rubrics': 'सुर्खियाँ',
    'rubric-title': 'सुर्खी शीर्षक',
    'save': 'सहेजें',
    'save-next': 'सहेजें और अगला',
    'save-submit': 'सहेजें और सब सबमिट करें',
    'save-finish': 'सहेजें और खत्म करें',
    'school': 'स्कूल',
    'school-info': 'स्कूल की जानकारी',
    'score': 'स्कोर',
    'select': 'चयन करें',
    'select-a-framework': 'कृपया पहले उपरोक्त पाठ्यक्रम सूचना अनुभाग में मानकों के ढांचे का चयन करें।',
    'sentence': 'वाक्य',
    'settings': 'सेटिंग्स',
    'search': 'खोज करें',
    'search-placeholder': 'खोज करें',
    'search-placeholder-text': 'खोज...',
    'search-error-message': 'खोज शब्द में कम से कम 3 अक्षर होने चाहिए।',
    'search-400-error-message': 'कृपया वैध खोज शब्द दर्ज करें',
    'search-competency': 'खोज योग्यता',
    'search-standards': 'खोज मानक',
    'select-question-type': 'प्रश्न के प्रकार का चयन करें',
    'select-resource-type': 'संसाधन के प्रकार का चयन करें',
    'send-request': 'अनुरोध भेजें',
    'share': 'साझा करें',
    'show-correct-answer': 'सही उत्तर दिखाएं',
    'show-more-results': 'और अधिक परिणाम दिखाएं',
    'show-results': 'परिणाम दिखाएं',
    'signUp': 'साइन अप करें',
    'sortAlphabetical': 'वर्णानुक्रम के अनुसार क्रमबद्ध करें',
    'sortAverage': 'औसत के अनुसार क्रमबद्ध करें',
    'sort-most-recently': 'हाल ही में अद्यतन द्वारा क्रमबद्ध करें',
    'state': 'राज्य या क्षेत्र',
    'state-territory': 'राज्य/क्षेत्र',
    'standard': 'मानक',
    'standards': 'मानक',
    'study': 'अध्ययन',
    'study-now': 'अभी अध्ययन करें',
    'student': 'छात्र',
    'student-id': 'छात्र आईडी (प्रोफ़ाइल पर प्रदर्शित नहीं की जायेगी)',
    'studen-id-display': 'छात्र आईडी (प्रोफ़ाइल पर प्रदर्शित नहीं की जाएगी, अज्ञात मोड में प्रदर्शित की जाएगी)',
    'subject-and-framework': 'विषय और ढांचा',
    'subject': 'विषय',
    'submit': 'सबमिट करें',
    'submit-all': 'सब सबमिट करें',
    'submitAll': 'सब सबमिट करें',
    'submit-finish': 'सबमिट करें और खत्म करें',
    'swap': 'फिर से क्रम जमाएं',
    'suggestion': 'सुझाव',
    'suggestions': 'सुझाव',
    'suggested-resources': 'सुझाए गए संसाधन',
    'support': 'समर्थन',
    'start-tour': 'दौरा करें',
    'take-me-there': 'मुझे वहां ले चलें',
    'teach': 'सिखाएं',
    'teacher': 'अध्यापक',
    'timeSpent': 'बिताया गया समय ',
    'toggle-dropdown': 'ड्रॉपडाउन को टॉगल करें',
    'tools': 'टूल',
    'true': 'सच',
    'type': 'प्रकार',
    'unBookmark': 'अनबुकमार्क करें',
    'unexpectedError': 'एक अनपेक्षित त्रुटि आई है और इसकी सूचना दी गई है। असुविधा के लिए हमें खेद है!',
    'unfollow': 'अनुसरण न करें',
    'unit': 'इकाई',
    'unit-title': 'इकाई शीर्षक',
    'unitInitial': 'यू',
    'unitObj': {
      'zero': 'इकाइयां',
      'one': 'इकाई',
      'other': 'इकाइयां'
    },
    'untitled-course': 'पाठ्यक्रम 1',
    'untitled-lesson': 'शीर्षक रहित पाठ',
    'untitled-unit': 'शीर्षक रहित इकाई',
    'update-thumbnail': 'थंबनेल अपडेट करें',
    'update-photo': 'फोटो अपडेट करें',
    'upload': 'अपलोड करें',
    'upload-file': 'फाइल अपलोड करें',
    'upload-thumbnail': 'थंबनेल अपलोड करें',
    'upload-photo': 'फोटो अपलोड करें',
    'remove-photo': 'तस्वीर हटाएं',
    'use-case': 'बड़े अक्षर का उपयोग करें',
    'valid-extensions': 'मान्य फ़ाइल एक्सटेंशन हैं: {{extension}}',
    'verified': 'सत्यापित',
    'visibility-tooltip': 'दूसरों के लिए दृश्यमान नहीं है',
    'visibility-available': 'दूसरों के लिए दृश्यमान',
    'warnings': {
      'on-air-connection-lost': 'लाइव लाइव डैशबोर्ड कनेक्शन खो गया है और स्वचालित रूप से पुनः प्रयास कर रहा है। यह लुभाने वाला है, लेकिन कृपया अपनी स्क्रीन रीफ्रेश न करें!',
      'character-limit': 'आप अक्षरों की सीमा तक पहुंच गए हैं।'
    },
    'word': 'शब्द',
    'yes': 'हाँ',
    'change-score': 'स्कोर बदलें'
  },
  'index': {
    'joinUs': '<br/> शिक्षा <br/> के मानवाधिकार का सम्मान करने के लिए हमसे जुड़ें',
    'browseContent': {
      'title': 'नमस्ते! आप क्या ढूंढ रहे हैं?',
      'description_1': 'मैं ढूंढ रहा हूँ',
      'description_2': 'में सीखने की सामग्री',
      'description_3': 'या',
      'button': 'सामग्री ब्राउज़ करें',
      'footer': {
        'description_1': 'क्या आपका खाता पहले से है?',
        'description_2': ' यहाँ।',
        'login': 'लॉग इन करें'
      },
      'grades_missing_message': 'कृपया वर्ग और विषय का चयन करें।',
      'subjects_missing_message': 'कृपया विषय का चयन करें।'
    },
    'gettingStarted': {
      'title': 'Gooru के साथ शुरू करना',
      'toolkit': {
        'title': 'टूलकिट शुरू करना',
        'description': 'Gooru में आपका स्वागत है! यह जानने के लिए संसाधन को जांचें कि आप Gooru के साथ क्या कर सकते हैं और जल्दी से शुरू करें।'
      },
      'classroom': {
        'title': 'कक्षा से कहानियां',
        'description': 'उदाहरण के द्वारा शिक्षकों की कहानियों के माध्यम से सीखें जो कहते हैं कि Gooru ने अपनी कक्षा में अंतर पैदा किया है।'
      },
      'events': {
        'title': 'हमारे कार्यक्रमों की जांच करें!',
        'description': 'हम आपको Gooru शुरू करने में मदद करने के लिए मुफ्त वेबिनार और प्रशिक्षण प्रदान करते हैं।'
      }
    },
    'empowerStudents': {
      'title': 'छात्रों को अपना रास्ता सीखने के लिए सशक्त बनाना',
      'find': 'ढूंढें',
      'remix': 'रीमिक्स',
      'share': 'साझा करें',
      'monitor': 'मॉनिटर'
    },
    'findDescription': 'शिक्षकों द्वारा किए गए हजारों के-12 संचयन ब्राउज़ करें, या 16 मिलियन से अधिक संसाधनों को खोजें',
    'remixDescription': 'संकलन को रीमिक्स करें और अपने छात्रों की आवश्यकताओं को पूरा करने के लिए सामग्री को अनुकूलित करें।',
    'shareDescription': 'Gooru कक्षाओं के माध्यम से छात्रों के साथ संकलन साझा करें। प्रवेश करने के लिए लॉगिन की आवश्यकता नहीं है।',
    'monitorDescription': 'वास्तविक समय में हस्तक्षेप करने के लिए अपने छात्रों का काम और प्रगति को मापें।',
    'freeAndOpen': {
      'title': 'मुफ्त और खुला। <br/> हमेशा।',
      'description': 'हमें विश्वास है कि शिक्षा एक मानव अधिकार है। Gooru हमेशा दुनिया भर में शिक्षकों और छात्रों के लिए मुफ्त और विज्ञापन मुक्त होगा।',
      'button': 'हमारे दृष्टिकोण के बारे में और जानें'
    }
  },
  'class': {
    'info': {
      'class-info': 'कक्षा की जानकारी',
      'teachers': 'शिक्षक ',
      'students': 'छात्र',
      'subject': 'विषय',
      'grade': 'वर्ग',
      'description': 'विवरण',
      'edit-info': 'जानकारी संपादित करें',
      'share-class': 'कक्षा साझा करें',
      'invite-co-teachers': 'सह-शिक्षकों को आमंत्रित करें',
      'add-students': 'छात्रों को जोड़ें',
      'class-code': 'कक्षा कोड',
      'delete': 'कक्षा हटाएं'
    },
    'edit': {
      'assigned-course': 'पाठ्यक्रम का निरूपण करें',
      'basic-info': 'मूलभूत जानकारी',
      'class-name': 'कक्षा का नाम',
      'class-greetings': 'कक्षा की घोषणाएं',
      'class-greetings-placeholder': 'अपने छात्रों का स्वागत करें, उन्हें प्रेरित करें, या घोषणा करें, इत्यादि।',
      'class-minscore': 'ट्रॉफी के लिए न्यूनतम स्कोर मूल्यांकन (1-100%)',
      'course-map': 'पाठ्यक्रम मानचित्र',
      'edit-class': 'कक्षा सेटिंग्स संपादित करें'
    },
    'overview': {
      'title': 'पाठ्यक्रम मानचित्र',
      'locate': 'मेरा ठिकाना ढूंढें ',
      'edit-content': 'सामग्री संपादित करें',
      'add-to-daily-class-activities': 'दैनिक कक्षा की गतिविधियों में जोड़ें',
      'course-map': {
        'rescope-toggle': 'पूरा पाठ्यक्रम मानचित्र दिखाएं',
        'rescope-info': 'इस पाठ्यक्रम को विशेष रूप से गणित आधार पाठ्यक्रम से आपके लिए वैयक्तिकृत किया गया है। मूल पाठ्यक्रम देखने के लिए, इस विशेषता को सक्षम करें।',
        'custom-msg': 'हम विशेष रूप से आपकी प्रवीणता के आधार पर इस पाठ्यक्रम को वैयक्तिकृत कर रहे हैं। व्यक्तिगत पाठ्यक्रम मानचित्र देखने के लिए कृपया थोड़ी देर में वापस आएं।',
        'route0-bannerdesc': 'आपकी योग्यता प्रोफ़ाइल के अनुसार, कुछ दक्षताएं हैं जिन्हें आपको मास्टर करने की आवश्यकता है ताकि आप इस कोर्स में अच्छा प्रदर्शन कर सकें। हमारे पास एक मार्ग है जो हम आपको इन दक्षताओं को मास्टर करने के लिए सलाह देते हैं। विवरण देखने के लिए यहां क्लिक करें।'
      }
    },
    'analytics': {
      'performance': {
        'title': 'प्रदर्शन देखें',
        'better-experience-message': 'बेहतर Gooru अनुभव के लिए, टैबलेट या डेस्कटॉप में पूर्ण कक्षा विश्लेषण देखें।',
        'no-content': 'आपके छात्रों ने अभी तक पाठ्यक्रम का अध्ययन शुरू नहीं किया है।',
        'actions': {
          'share': 'साझा करें',
          'edit': 'सामग्री संपादित करें',
          'download': 'डाउनलोड',
          'fullScreen': 'पूर्ण स्क्रीन देखें',
          'exitFullScreen': 'पूर्ण स्क्रीन से बाहर निकलें',
          'assessment': 'मूल्यांकन देखें',
          'collection': 'संकलन देखें',
          'both': 'दोनों देखें'
        },
        'teacher': {
          'metricsTable': {
            'average': 'औसत',
            'class-average': 'कक्षा औसत'
          }
        },
        'grade-items': 'वर्ग के लिए आइटम',
        'gru-grade-items': {
          'students': {
            'zero': '{{गिनती}} छात्र',
            'one': '{{गिनती}} छात्र',
            'other': '{{गिनती}} छात्र',
            'not-started': 'शुरू नही हुआ'
          }
        }
      },
      'mastery': {
        'title': 'निपुणता देखें'
      }
    },
    'quick-start': {
      'title': 'इस कक्षा को सामग्री का निरूपण करें।',
      'new-course': 'एक नया पाठ्यक्रम क्विकस्टार्ट करें',
      'new-course-desc': 'एक नया पाठ्यक्रम, संकलन या मूल्यांकन बनाकर शुरू करें',
      'course': 'नया पाठ्यक्रम',
      'new-collection': 'नया संकलन',
      'new-assessment': 'नया मूल्यांकन',
      'remix-a-sample': 'नमूना रीमिक्स करें',
      'add-existing-course': 'अपनी लाइब्रेरी से एक पाठ्यक्रम जोड़ें',
      'existing-course-desc': 'कक्षा शुरू करने का सबसे तेज़ तरीका',
      'choose-course': 'पाठ्यक्रम का चयन करें',
      'remix-from-course': 'चुनिंदा पाठ्यक्रम का रीमिक्स करें',
      'featured-course': 'चुनिंदा पाठ्यक्रम देखें',
      'remix-desc': 'अपने छात्रों के लिए एक विशेष पाठ्यक्रम की प्रतिलिपि बनाएं और अनुकूलित करें'
    }
  },
  'classes': {
    'classesJoined': 'कक्षाएं जिनमें मैं शामिल हूँ',
    'classesTaught': 'कक्षाओं जिनमें मैं सिखाता हूँ',
    'noClassesJoined': 'आप किसी भी कक्षा में शामिल नहीं हुए हैं',
    'noClassesTaught': 'आपके पास कोई भी सृजित कक्षा नहीं है'
  },
  'content': {
    'assessments': {
      'edit': {
        'best-practices': '<p> एक मूल्यांकन स्कोर किए गए प्रश्नों का एक सेट है जिसे आप और आपके छात्र समझ बूझ और प्रदर्शन की निगरानी के लिए उपयोग कर सकते हैं। </p> <p> अपने मूल्यांकन में विभिन्न प्रकार के प्रश्न प्रकार (जिनमे कई एसबीएसी के आधार पर हैं) का उपयोग करें ताकि छात्र विभिन्न तरीकों से अपनी समझ का प्रदर्शन कर सकें। हम मानकों, सूक्ष्म-मानकों, और वेब के ज्ञान की गहराई के लिए प्रत्येक प्रश्न को टैग करने की सलाह देते हैं। </p>'
      }
    },
    'classes': {
      'create': {
        'title': 'कक्षा बनाएं',
        'content': 'जहां छात्र सामग्री के साथ व्यस्त रहते हैं।',
        'class-name-input': 'अपनी कक्षा को एक नाम दें',
        'condition-prompt': 'छात्र आपकी कक्षा में कैसे शामिल होंगे?',
        'condition-prompt-code': 'कक्षा कोड के साथ कोई भी व्यक्ति',
        'condition-prompt-invite': 'केवल आमंत्रण',
        'get-started': 'शुरू करें'
      },
      'join': {
        'title': 'एक नई कक्षा में शामिल हों',
        'content': 'जहां यात्रा शुरू होती है।',
        'not-now': 'अभी नहीं',
        'class-code-input': 'कक्षा कोड दर्ज करें',
        'class-not-found': 'कक्षा नहीं मिली। सुनिश्चित करें कि आपने सही कक्षा कोड दर्ज किया है।',
        'invalid-code': 'अवैध कक्षा कोड।',
        'already-member': 'आप पहले से ही इस कक्षा के सदस्य हैं।',
        'join-class': 'कक्षा में शामिल हों',
        'terms-and-conditions': 'कक्षा में शामिल होने पर क्लिक करके, मैं इस कक्षा के शिक्षक(ओं) के साथ इस Gooru कक्षा में अध्ययन करने से उत्पन्न मेरे मूल्यांकन और संकलन प्रगति डेटा को साझा करने के लिए सहमत हूं।'
      }
    },
    'collections': {
      'edit': {
        'assign-to-course': 'पाठ्यक्रम के लिए निरुपित करें',
        'best-practices': '<p> छात्र संकलन सामग्री पर आपकी सामग्री के साथ इंटरेक्ट करते हैं। सीखने के संकलन को बनाते समय, सीखने के उद्देश्यों को शामिल करना सुनिश्चित करें, और छात्रों को कई तरीकों से अवधारणाओं के सामने उजागर करने के लिए विभिन्न संसाधन प्रकारों का उपयोग करने पर विचार करें। </p> <p> अवधारणाओं पर निर्माण के लिए संसाधनों के अनुक्रम का उपयोग करें। एक संकलन के माध्यम से प्रगति को तार्किक तरीके से प्रवाहित होते रहना चाहिए और उचित श्रोताओं को ठीक से समझने के लिए सामान्य से अधिक जटिल स्तर पर ले जाना चाहिए, या छात्र अन्वेषण के लिए पर्याप्त रूप से समय देना चाहिए। </p> <p> हमारे Gooru के माध्यम से समझने के लिए प्रश्न या अन्य इंटरैक्टिव जैसी कुछ जांचें शामिल हैं। हम संकलन में उद्देश्यों को पूरा करने के लिए पर्याप्त संसाधनों और/या पर्याप्त प्रकार के संसाधनों की अनुशंसा करते हैं और यह सुनिश्चित करते हैं कि प्रत्येक संसाधन की अपनी भूमिका और उद्देश्य हो। </p>'
      }
    },
    'courses': {
      'edit': {
        'assign-to-class': 'कक्षा को निरुपित करें',
        'best-practices': '<p> एक पाठ्यक्रम एक फ़ोल्डर है जिसमें आप अपनी सीखने की सामग्री को इकाइयों और पाठों में व्यवस्थित करते हैं। पाठ्यक्रम बनाते समय आवश्यक प्रश्नों पर विचार करें जैसे जिन्हें आप संबोधित कर रहे हैं, सीखने के उद्देश्य और आपकी सामग्री का संगठन। </p> <p> आप अपने छात्रों के लिए एक विविध अनुभव बनाने के लिए पाठों को एक साथ जोड़ सकते हैं (उदाहरण के लिए,  आप अपनी इकाइयां क्रमिक रूप से, विषय के आधार पर, या मानक के आधार अनुक्रम कर सकते हैं)। </p>',
        'information': {
          'course-title': 'पाठ्यक्रम का शीर्षक',
          'description': 'विवरण'
        }
      }
    },
    'questions': {
      'edit': {
        'add-to': 'में जोड़ें',
        'best-practices': '<p> एक प्रश्न एक संसाधन है जिसके लिए छात्र से एक उत्तर की आवश्यकता होती है, और हम आपके छात्रों को एसबीएसी, पीआरसीसी और अन्य आकलनों पर विभिन्न प्रकार के प्रश्नों का समर्थन करने के लिए विभिन्न प्रकार के प्रश्न प्रदान करते हैं। </p> <p> छात्रों के इन प्रश्नों के संपर्क में आने के लिए और ज्ञान का प्रदर्शन करने के लिए कई प्रारूप प्रदान करने के लिए आपके द्वारा उपयोग किए जाने वाले प्रश्नों के प्रकार पर विचार करें। </p> <p> अपने प्रश्नों को मानकों, सूक्ष्म मानकों और वेब की ज्ञान की गहराई में टैग करें। आप देख सकते हैं कि आपके छात्र शिक्षक डैशबोर्ड के माध्यम से प्रश्नों के साथ कैसे इंटरेक्शन कर रहे हैं। </p>',
        'information': {
          'question-title': 'प्रश्न शीर्षक',
          'question-type': 'प्रश्न प्रकार'
        },
        'builder': {
          'add-answer-choice': '+ उत्तर विकल्प जोड़ें',
          'add-hint': 'संकेत जोड़ें',
          'add-explanation': 'स्पष्टीकरण जोड़ें',
          'answer': 'उत्तर',
          'answer-instructions': {
            'FIB': 'उत्तर और स्पष्टीकरण के लिए 5 संकेत जोड़ें।',
            'HS_IMG': 'आप दस उत्तर छवियों को जोड़ सकते हैं और एक या अधिक सही उत्तरों का चयन कर सकते हैं।',
            'HS_TXT': 'आप दस उत्तर विकल्प जोड़ सकते हैं और एक या अधिक सही उत्तरों का चयन कर सकते हैं।',
            'HT_HL_ST': 'सवाल लिखने के समय, हाइलाइट किए गए वाक्यों को इंगित करने के लिए ब्रैकेट का उपयोग करें। एक ब्रैकेट में ब्रैकेट के अंदर की अवधि का उपयोग करके, एक समय में केवल एक वाक्य हो सकता है। उदाहरण के लिए, पहले छोटे सुअर ने अपने भूसे के घर का निर्माण किया। [बड़े बुरे भेड़िये ने घर को तोड़दिया।] दूसरे सुअर ने लकड़ी से अपने घर का निर्माण किया। अक्षर सीमा: 5000',
            'HT_HL_WD': 'सवाल लिखने के समय, हाइलाइट किए गए शब्दों को इंगित करने के लिए ब्रैकेट का उपयोग करें। एक ब्रैकेट में एक समय में केवल एक शब्द हो सकता है। उदाहरण के लिए, [बड़े] बुरे भेड़िये ने घर को तोड़ दिया। अक्षर सीमा: 5000',
            'HT_RO': 'आप सही क्रम में दस उत्तर विकल्प जोड़ सकते हैं। छात्रों के लिए अनुक्रम उल्टा-पुल्टा हो जाएगा।',
            'MA': 'आप दस उत्तर, एक छवि, एक स्पष्टीकरण, और पांच संकेत तक जोड़ सकते हैं।',
            'MC': 'आप दस उत्तर विकल्प जोड़ सकते हैं और एक सही उत्तर इंगित कर सकते हैं। अक्षर सीमा: 200',
            'OE': 'सही प्रतिक्रिया लिखें। अक्षर सीमा: 5000',
            'T/F': 'सही उत्तर का चयन करें।'
          },
          'question-instructions': {
            'FIB': 'प्रश्न लिखने के समय आप खाली-स्थान-भरें उत्तरों के लिए ब्रैकेट का उपयोग करें। उदाहरण के लिए: \'बड़े बुरे [भेड़िये] ने [घर] तोड़ दिया।\' आप एक छवि भी जोड़ सकते हैं।',
            'HS_TXT': 'अपना प्रश्न लिखें',
            'HS_IMG': 'अपना प्रश्न लिखें',
            'HT_RO': 'अपना प्रश्न लिखें',
            'HT_HL': 'अपना प्रश्न संकेत लिखें।',
            'MC': 'अपना प्रश्न लिखें',
            'MA': 'अपना प्रश्न लिखें',
            'OE': 'अपना प्रश्न लिखें',
            'T/F': 'अपना प्रश्न लिखें'
          },
          'submission-format': {
            'title': 'छात्र सबमिट करने का प्रारूप',
            'answer-type': {
              'text-box': 'टेक्स्ट बॉक्स'
            }
          },
          'feedback-grading': {
            'title': 'फीडबैक और ग्रेडिंग',
            'from-existing-rubric': 'मौजूदा सुर्खी से',
            'scoring': 'स्कोरिंग',
            'maximum-points': 'अधिकतम अंक',
            'increment': 'वृद्धि',
            'rubric-error': 'कृपया एक सुर्खी जोड़ें'
          }
        }
      }
    },
    'modals': {
      'delete-bookmark': {
        'confirmation': 'क्या आप इस {{type}} को अनबुकमार्क करना चाहते हैं?',
        'delete-error': 'उफ़! इस {{type}} को अभी अनबुकमार्क करने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।'
      },
      'remove-class-activity': {
        'confirmation': 'क्या आप वाकई अपनी दैनिक कक्षा गतिविधियों से इस {{type}} को हटाना चाहते हैं?',
        'delete-error': 'उफ़! अभी इस {{type}} को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।'
      },
      'delete-class': {
        'legend': 'आप अपनी कक्षा को हटाने वाले हैं',
        'student-access': 'छात्र कक्षा तक पहुंचने में सक्षम नहीं होंगे',
        'student-data-deleted': 'सभी छात्र डेटा हटा दिया जाएगा'
      },
      'archive-class': {
        'title': 'संग्रह कक्षा',
        'legend': 'आप अपनी कक्षा को संग्रहित करने वाले हैं',
        'links-not-accessible': 'सभी साझा लिंक पहुंच योग्य नहीं होंगे',
        'students-no-access': 'छात्र कक्षा तक पहुंचने में सक्षम नहीं होंगे',
        'not-add-students': 'आप कक्षा में अधिक छात्रों को जोड़ने में सक्षम नहीं होंगे',
        'confirmation': 'क्या आप वाकई संग्रह करना चाहते हैं?'
      },
      'delete-content': {
        'legend': 'आप हटाने जा रहे हैं',
        'content-legend': '<span> {{type}} </span> {{index}} - {{titlename}} से {{title}}',
        'content-legend-header': '{{titlename}} से {{title}}',
        'delete-warning': 'इस {{type}} में सभी सामग्री हटा दी जाएगी',
        'delete-error': 'उफ़! अभी {{type}} को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
        'confirmation': 'क्या आप वाकई जारी रखना चाहते हैं? कृपया नीचे \'हटाएं\' टाइप करें और \'हटाएं\' पर क्लिक करें।'
      },
      'delete-resource': {
        'legend': 'पुष्टि करें कि आप स्थायी रूप से हटाना चाहते हैं <b> {{title}} </b>',
        'delete-warning': 'इस {{type}} में सभी सामग्री हटा दी जाएगी',
        'delete-error': 'उफ़! अभी {{type}} को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
        'confirmation': 'क्या आप वाकई जारी रखना चाहते हैं? कृपया \'स्थायी रूप से हटाएं\' पर क्लिक करें।',
        'first-check': 'यह एक स्थायी हटाना है और इसे पूर्ववत नहीं किया जा सकता है',
        'second-check': 'इस संसाधन की प्रतियां, आपके संकलन में और समुदाय में अन्य उपयोगकर्ताओं द्वारा किए गए किसी भी संकलन में से हटा दी जाएंगी'
      },
      'delete-rubric': {
        'legend': 'पुष्टि करें कि आप स्थायी रूप से हटाना चाहते हैं <b> {{title}} </b>',
        'delete-warning': 'इस सुर्खी में सभी सामग्री हटा दी जाएगी',
        'delete-error': 'उफ़! अभी सुर्खी को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
        'confirmation': 'क्या आप वाकई जारी रखना चाहते हैं? कृपया \'स्थायी रूप से हटाएं\' पर क्लिक करें।',
        'first-check': 'यह एक स्थायी हटाना है और इसे पूर्ववत नहीं किया जा सकता है'
      },
      'remove-content': {
        'legend': 'आप <b> {{titlename}} </b> से <b> {{title}} </b> को हटाने वाले हैं </b>',
        'remove-error': 'उफ़! अभी {{type}} को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
        'confirmation': 'क्या आप वाकई जारी रखना चाहते हैं? कृपया नीचे \'हटाएं\' टाइप करें और \'हटाएं\' पर क्लिक करें।'
      },
      'remove-student': {
        'title': 'छात्र को हटाकर और उसका डेटा मिटाएं',
        'legend': 'आप इस कक्षा से {{studentname}} को हटाने वाले हैं और उनके सभी डेटा मिटा सकते हैं।',
        'data-inaccessible': 'उनके सभी डेटा मिटा दिए जाएंगे और आपके या उनके पास उपलब्ध नहीं होंगे',
        'classroom-access': 'उन्हें कक्षा या सामग्री तक पहुंच नहीं होगी',
        'data-lost': 'यदि वे कक्षा में फिर से शामिल हो जाते हैं, तो सभी पिछले डेटा खो जाएंगे',
        'remove-error': 'उफ़! अभी इस छात्र को हटाने में असमर्थ। कृपया जल्द ही पुनः प्रयास करें।',
        'confirmation': 'क्या आप वाकई जारी रखना चाहते हैं? कृपया नीचे \'हटाएं\' टाइप करें और \'हटाएं\' पर क्लिक करें।'
      },
      'quick-remove-content': {
        'legend': 'पुष्टि करें कि आप <b> {{titlename}} </b> से <b> {{titlename}} </b> को हटाना चाहते हैं।'
      },
      'quick-delete-content': {
        'legend': 'पुष्टि करें कि आप <b> {{titlename}} </b> से स्थायी रूप से <b> {{title}} </b> को मिटाना चाहते हैं।',
        'delete': 'स्थायी रूप से मिटाना'
      }
    },
    'resources': {
      'edit': {
        'best-practices': '<p> संसाधन विभिन्न प्रकार के प्रारूपों जैसे वीडियो, इंटरैक्टिव, वेबसाइट्स, छवियाँ, गूगल डॉक्स आदि में मल्टीमीडिया सामग्री हैं। रचनात्मक बनें और अपने संसाधनों का उपयोग करें या \'संसाधन\' प्राप्त करें और Gooru में हमारी पर्याप्त आपूर्ति खोजें। </p> <p> अपने छात्रों को शामिल करने के लिए विभिन्न संसाधन प्रकारों का उपयोग करें और विवरण शामिल करें ताकि आप संसाधन के माध्यम से अपने छात्रों का मार्गदर्शन करने में सहायता कर सकें। </p> <p> हम प्रत्येक प्रश्न को मानकों, सूक्ष्म मानकों और 21वीं शताब्दी के कौशल में टैग करने की सलाह देते हैं। आप देख सकते हैं कि आपके छात्र शिक्षक डैशबोर्ड के माध्यम से संसाधनों के साथ कैसे बातचीत कर रहे हैं। </p>',
        'placeholder-message': '<span> पूर्वावलोकन करने के लिए संसाधन जोड़ें। </span>',
        'not-implemented': 'संसाधन प्रारूप पूर्वावलोकन <span> अभी तक लागू नहीं किया गया है। </span>',
        'information': {
          'im-publisher': 'मैं प्रकाशक हूँ',
          'select-a-license': 'कृपया एक लाइसेंस का चयन करें'
        }
      }
    }
  },
  'user': {
    'active-classrooms': 'सक्रिय कक्षाएं',
    'archived-classrooms': 'संग्रहीत कक्षाएं',
    'classrooms': 'कक्षाएं',
    'rgo': 'RGO',
    'create-class': 'कक्षा बनाएं',
    'hello': 'हैलो, {{name}}!',
    'independent-learning': 'स्वतंत्र रूप से सीखना',
    'join-class': 'कक्षा में शामिल हों',
    'joined-classes': {
      'zero': 'आप वर्तमान में {{count}} कक्षाओं में नामांकित हैं',
      'one': 'आप वर्तमान में 1 कक्षा में नामांकित हैं',
      'other': 'आप वर्तमान में {{count}} कक्षाओं में नामांकित हैं'
    },
    'my-current-classes': 'मेरी वर्तमान कक्षाएं',
    'manage-goals': 'लक्ष्यों का प्रबंधन करें',
    'my-classes': 'मेरी कक्षाएं',
    'teaching-classes': {
      'zero': 'आप वर्तमान में {{count}} कक्षाओं को पढ़ा रहे हैं',
      'one': 'आप वर्तमान में 1 कक्षा पढ़ा रहे हैं',
      'other': 'आप वर्तमान में {{count}} कक्षाओं को पढ़ा रहे हैं'
    }
  },
  'student-landing': {
    'announcement': 'घोषणा',
    'browse-featured-courses': 'हमारे फीचर्ड पाठ्यक्रम को ब्राउज़ करें',
    'browse-our': 'हमारे ब्राउज़ करें',
    'class-code': 'कक्षा कोड',
    'featured-courses': 'फीचर्ड पाठ्यक्रम',
    'class': {
      'assigned-course': 'पाठ्यक्रम का निरूपण करें',
      'back-to': 'कक्षाओं में वापस जाएं',
      'no-course': 'इस कक्षा में कोई संबंधित पाठ्यक्रम नहीं है।',
      'no-course-assigned': 'कोई पाठ्यक्रम निरुपित नहीं किया गया है',
      'back-to-independent': 'स्वतंत्र शिक्षा के लिए वापस जाएं',
      'report': 'रिपोर्ट करें',
      'performance': 'प्रदर्शन',
      'course-map': 'पाठ्यक्रम मानचित्र',
      'unit': 'इकाई',
      'lesson': 'पाठ',
      'class-activities': 'कक्षा की दैनिक गतिविधियां',
      'class-activities-tab': {
        'today': 'आज'
      },
      'my-report': 'मेरी रिपोर्ट',
      'my-location': 'मेरी रिपोर्ट'
    },
    'course': {
      'to-report': 'उपयोग सारांश',
      'total-time-spent': 'कुल बिताया गया समय'
    },
    'current-activity': 'वर्तमान कार्य',
    'resume-current-activity': 'वर्तमान गतिविधि फिर से शुरू करें',
    'not-available': 'लागू नहीं',
    'join-classroom': 'सीखने के लिए अपने शिक्षक की कक्षा में शामिल हों',
    'learn': 'एक Gooru कक्षा के साथ सीखें',
    'my-performance': {
      'activity': 'गतिविधि',
      'activities': {
        'study': 'अध्ययन'
      },
      'assessments': 'मूल्यांकन',
      'collections': 'संकलन',
      'filter': 'फिल्टर',
      'primary-text': 'उन चीजों का चयन करें जिनका आप विश्लेषण करना चाहते हैं और हम एक अनुकूलित प्रदर्शन रिपोर्ट तैयार करेंगे।',
      'subject': 'विषय',
      'title': 'अपने प्रदर्शन का विश्लेषण करें',
      'time-period': 'समय सीमा',
      'update-report': 'रिपोर्ट अपडेट करें'
    },
    'study-player': 'अध्ययन प्लेयर',
    'my-study': 'मेरा अध्ययन',
    'no-classrooms': 'आप अभी तक किसी भी कक्षा में शामिल नहीं हुए हैं। अपने शिक्षक की कक्षा को जोड़ने के लिए \'</br> कक्षा में शामिल हों\' पर क्लिक करें। आप लाइब्रेरी टैब के नीचे </br> एक फीचर्ड पाठ्यक्रम भी खोज सकते हैं।',
    'no-content-classrooms': 'इस कक्षा में वर्तमान में कोई सामग्री उपलब्ध नहीं है',
    'welcome': 'Gooru में आपका स्वागत है।'
  },
  'student-independent-learning': {
    'show-more': 'और अधिक दिखाएं',
    'show-less': 'कम दिखाएं',
    'no-courses': 'जब आप अपने बुकमार्क किए गए पाठ्यक्रमों की खोज शुरू करते हैं, तो वे यहां दिखाई देंगे।',
    'no-collections': 'जब आप अपने बुकमार्क किए गए संकलनों की खोज शुरू करते हैं, तो वे यहां दिखाई देंगे।',
    'no-assessments': 'जब आप अपने बुकमार्क किए गए मूल्यांकनों की खोज शुरू करते हैं, तो वे यहां दिखाई देंगे।',
    'no-independent-results': 'कुछ नया सीखने के लिए लाइब्रेरी का अन्वेषण करें।',
    'no-bookmarks': 'जब आप पाठ्यक्रम, संकलन और मूल्यांकन का बुकमार्क करना शुरू करते हैं, तो वे यहां दिखाई देंगे।',
    'add-bookmark': 'बुकमार्क जोड़ें'
  },
  'teacher-landing': {
    'latest-announcement': 'नवीनतम घोषणा',
    'latest-assessment': 'नवीनतम मूल्यांकन',
    'create-classroom': 'कक्षा बनाएं, सामग्री का निरूपण करें, छात्रों को आमंत्रित करें',
    'navigator-banner': {
      'title': 'गणित के लिए नेविगेटर',
      'description': 'Utilizing this GPS for Learning technology, we have designed Navigator for Math to ensure that every student can gain confidence and accelerate their learning in math.<br/>Navigator for Math is a course of study covering all math concepts from grades 2-12. Students are routed and rerouted through an individualized pathway designed to build on their current knowledge, as well as fill gaps in their understanding. Through this comprehensive and personalized learning experience, every student can become fully prepared for more advanced math.',
      'join': 'डेमो कक्षा में शामिल हों',
      'success-message': 'आप नेविगेटर कक्षा के सह-शिक्षक के रूप में सफलतापूर्वक शामिल हो गए हैं',
      'error-message': 'कक्षा में शामिल होने में समस्या है'
    },
    'class': {
      'manage': 'संचालन',
      'reports': 'रिपोर्ट',
      'daily-activites': 'दैनिक गतिविधियां',
      'courses': 'Course',
      'back-to': 'कक्षाओं में वापस जाएं',
      'back-to-archived': 'संग्रहीत कक्षाओं में वापस जाएं',
      'class-management': 'कक्षा प्रबंधन',
      'class-management-tab': {
        'actions': 'कार्रवाई',
        'assessment-min-score': 'ट्राफियों के लिए न्यूनतम स्कोर मूल्यांकन',
        'assigned-course': 'पाठ्यक्रम का निरूपण करें',
        'archive': 'पुरालेख',
        'archive-class': 'कक्षा संग्रह करें',
        'archive-classroom': 'कक्षा संग्रह करें',
        'attend-class-with-code': 'कोड के साथ कक्षा में भाग लें',
        'class-information': 'कक्षा की जानकारी',
        'class-name': 'कक्षा का नाम',
        'class-code': 'कक्षा कोड',
        'click-to-copy-class-code': 'कक्षा कोड कॉपी करने के लिए क्लिक करें',
        'course-information': 'पाठ्यक्रम संबंधी जानकारी',
        'delete': 'हटाएं',
        'delete-class': 'कक्षा मिटाएं',
        'download-roster': 'रोस्टर डाउनलोड करें',
        'edit': 'संपादित करें',
        'email-address': 'ईमेल पता',
        'first-name': 'पहला नाम',
        'import-roster': 'रोस्टर को इम्पोर्ट करें',
        'last-name': 'अंतिम नाम',
        'message': 'संदेश',
        'performance': 'प्रदर्शन',
        'students': 'छात्र',
        'student-name': 'छात्र का नाम',
        'student-id': 'छात्र की आईडी',
        'teachers': 'शिक्षक ',
        'view-report': 'रिपोर्ट देखें',
        'students-null': 'छात्रों के साथ कक्षा कोड साझा करें ताकि वे आपकी कक्षा में शामिल हो सकें।'
      },
      'class-activities': 'कक्षा की दैनिक गतिविधियां',
      'back-to-class-activities': 'कक्षा की दैनिक गतिविधियों पर वापस जाएं',
      'class-activities-tab': {
        'today': 'आज:',
        'yesterday': 'बीता कल:',
        'month': 'महीना:',
        'add-from-course-map': 'पाठ्यक्रम मानचित्र से जोड़ें',
        'add-from-my-content': 'मेरी सामग्री से जोड़ें',
        'welcome-dca': 'अपनी कक्षा की दैनिक गतिविधियों में आपका स्वागत है जहां आप छात्रों को आज पूरा करने के लिए संकलन और मूल्यांकन का निरूपण कर सकते हैं। कृपया ध्यान दें: उत्पन्न की गई कोई भी रिपोर्ट आज के सबसे हालिया प्रयास के लिए उपलब्ध होगी।'
      },
      'click-to-copy': 'कक्षा कोड कॉपी करने के लिए क्लिक करें',
      'course-map': 'पाठ्यक्रम मानचित्र',
      'management': 'रोस्टर प्रबंधन',
      'report': 'रिपोर्ट करें',
      'performance': 'प्रदर्शन',
      'performance-tab': {
        'assessments': 'मूल्यांकन',
        'collections': 'संकलन'
      },
      'view-more': 'और देखें'
    },
    'no-classrooms': 'आपने अभी तक कोई कक्षा नहीं बनाई है। लाइब्रेरी टैब के अंतर्गत एक फीचर्ड पाठ्यक्रम के लिए \'कक्षा बनाएं\' पर क्लिक करें या </br> खोजें।',
    'no-course': 'आपने अभी तक इस </br> कक्षा में पाठ्यक्रम का निरूपण नहीं किया है।',
    'teach': 'एक Gooru कक्षा के साथ सिखाएं',
    'welcome-course-map': 'यह आपका पाठ्यक्रम मानचित्र है जहां आप पाठ्यक्रम देख सकते हैं, मूल्यांकन चालू या बंद कर सकते हैं और रीयल-टाइम में मूल्यांकन लॉन्च कर सकते हैं। आप समग्र वर्ग के प्रदर्शन और समापन को भी देख सकते हैं। कक्षा प्रदर्शन के विस्तृत दृश्य के लिए, अपनी कक्षा के रिपोर्ट टैब पर जाएं।',
    'welcome-rescoped-course-map': 'इस पाठ्यक्रम को कक्षा में प्रत्येक छात्र के लिए व्यक्तिगत बनाया गया है। आप छात्र के सीखने के मार्ग (अक्षर - और>) पर क्लिक करके कक्षा प्रबंधन पृष्ठ में प्रत्येक छात्र के पाठ्यक्रम मानचित्र को देख सकते हैं।',
    'welcome-premium-course-map': 'यह एक अत्यधिक क्यूरेटेड कोर्स है जो विद्यार्थियों को अपने वर्तमान स्तर के बावजूद त्वरित समय सीमा में एक निश्चित ग्रेड स्तर पर रहने में मदद करने के लिए डिज़ाइन किया गया है। कक्षा में प्रत्येक छात्र के लिए यह कोर्स वैयक्तिकृत किया जाएगा। आप छात्र की सूची से छात्र का चयन करके प्रत्येक छात्र के पाठ्यक्रम मानचित्र देख सकते हैं।'
  },
  'goals': {
    'manage': {
      'title': 'मेरा लक्ष्य!',
      'add-goal': 'लक्ष्य जोड़ें',
      'goal-label': 'लक्ष्य',
      'start-date-label': 'आरंभ करने की तिथि',
      'end-date-label': 'अंतिम तिथि',
      'type-label': 'लक्ष्य प्रकार',
      'status-label': 'स्थिति',
      'not_started': 'शुरू नही हुआ',
      'activated': 'सक्रिय',
      'completed': 'पूरा कर लिया है',
      'dropped': 'गिरा',
      'reflection-label': 'प्रतिबिंब',
      'save': 'सहेजें',
      'update': 'अद्यतन करें',
      'goals-not-found': 'आपने अभी तक कोई लक्ष्य निर्धारित नहीं किया है। आप ऊपर \'लक्ष्य जोड़ें\' बटन पर क्लिक करके एक लक्ष्य जोड़ सकते हैं।'
    },
    'create': {
      'error-add-title': 'कृपया लक्ष्य दर्ज करें',
      'error-length-title': 'लक्ष्य में अधिकतम 200 अक्षर होने चाहिए',
      'error-add-start-date': 'कृपया प्रारंभ तिथि दर्ज करें',
      'error-add-end-date': 'कृपया समाप्ति तिथि दर्ज करें',
      'error-greater-end-date': 'समाप्ति तिथि प्रारंभ तिथि से अधिक होनी चाहिए',
      'error-add-status': 'कृपया लक्ष्य की स्थिति का चयन करें',
      'error-length-reflection': 'प्रतिबिंब में अधिकतम 2000 अक्षर होने चाहिए',
      'created-success-msg': 'आपने लक्ष्य {{goaltitle}} बनाया है'
    },
    'delete': {
      'deleted-success-msg': 'आपने लक्ष्य मिटा दिया है'
    },
    'update': {
      'updated-success-msg': 'आपने लक्ष्य अद्यतन किया है'
    }
  },
  'gru-add-to': {
    'add-assessment-to-lesson': 'मेरे मूल्यांकनों से जोड़ें',
    'add-assessment-to-lesson-lead': 'इस पाठ में जोड़ने के लिए एक मूल्यांकन का चयन करें।',
    'add-collection-to-lesson': 'मेरे संकलन से जोड़ें',
    'add-collection-to-lesson-lead': 'इस पाठ में जोड़ने के लिए एक संकलन का चयन करें।',
    'add-to-collection': 'संकलन में जोड़े',
    'add-to-collection-lead': 'वह संकलन चुनें जिसमें आप {{contenttitle}} जोड़ना चाहते हैं',
    'add-to-existing-classroom': 'मौजूदा कक्षा में जोड़ें',
    'add-to-existing-classroom-lead': 'उस कक्षा का चयन करें जिसमें आप जोड़ना चाहते हैं',
    'add-to-assessment': 'मूल्यांकन या संकलन में जोड़ें',
    'add-to-assessment-lead': 'वह मूल्यांकन चुनें जिसमें आप {{contenttitle}} जोड़ना चाहते हैं',
    'assessments-info': 'यहां सूचीबद्ध मूल्यांकन अन्य पाठ या पाठ्यक्रम से संबंधित <b>नहीं</b> हैं',
    'collections-info': 'यहां सूचीबद्ध संकलन अन्य पाठ या पाठ्यक्रम से संबंधित <b>नहीं</b> हैं'
  },
  'gru-add-rubric-to-question': {
    'title': 'मेरी सुर्खीयों से जोड़ें',
    'lead': 'इस प्रश्न में जोड़ने के लिए एक सुर्खी का चयन करें।',
    'no-rubrics': 'आपने अभी तक कोई भी सुर्खी नहीं बनाई है जिसे इस मुफ्त प्रतिक्रिया प्रश्न से जोड़ा जा सके। आप मेरी सामग्री के तहत सुर्खी बना सकते हैं जिसे आपकी प्रोफ़ाइल से एक्सेस किया जा सकता है।',
    'go-to-content': 'मेरी सामग्री पर जाएं'
  },
  'gru-assessment-confirmation': {
    'title': 'आप एक मूल्यांकन शुरू करने वाले हैं...',
    'description': 'इस मूल्यांकन में, {{model.title}}',
    'setting-forward': 'आप केवल आगे नेविगेट कर सकते हैं',
    'setting-forward-backward': 'आप प्रश्नों के उत्तर देने के लिए आगे और पीछे नेविगेट कर सकते हैं',
    'unlimited-attempts-left': 'आपके पास असीमित प्रयास हैं',
    'attempts-left': {
      'zero': 'आपके पास {{count}} प्रयास हैं',
      'one': 'आपके पास 1 प्रयास शेष है',
      'other': 'आपके पास {{count}} प्रयास हैं'
    },
    'unlimited-attempts': 'आपके पास असीमित प्रयास हैं',
    'cancel': 'रद्द करना',
    'continue': 'जारी रहें',
    'start': 'प्रारंभ!',
    'submit': 'जमा करें!'
  },
  'gru-submit-confirmation': {
    'title': 'इस प्रश्नोत्तरी को खत्म करें और सभी सबमिट करें',
    'description': 'आप इस प्रयास को समाप्त करने वाले हैं और सभी प्रतिक्रियाएं सबमिट कर रहे हैं। किसी भी छोड़े गए प्रश्न को गलत के रूप में गिना जाएगा।',
    'cancel': 'रद्द करना',
    'confirm': 'प्रश्नोत्तरी खत्म करें',
    'finish-description': 'अपने उत्तर सबमिट करने के लिए \'प्रश्नोत्तरी खत्म करें\' पर क्लिक करें।'
  },
  'gru-quick-course-search': {
    'add-from-course': 'मौजूदा पाठ्यक्रम में से जोड़ें',
    'view-featured-courses': 'चुनिंदा पाठ्यक्रम देखें',
    'assign': 'निरूपण करना'
  },
  'gru-share-pop-over': {
    'copy': 'प्रतिलिपि',
    'ios-tooltip': 'कॉपी करने के लिए टैप करके होल्ड करें!',
    'multiarch-tooltip': 'कॉपी करने के लिए ctrl + c दबाएं!',
    'safari-osx-tooltip': 'कॉपी करने के लिए cmd + c दबाएं!',
    'share-course': 'लिंक के साथ अपना पाठ्यक्रम साझा करें',
    'share-question': 'लिंक के साथ अपना प्रश्न साझा करें',
    'share-resource': 'लिंक के साथ अपने संसाधन साझा करें',
    'share-assessment': 'लिंक के साथ अपना मूल्यांकन साझा करें',
    'share-rubric': 'लिंक के साथ अपनी सुर्खियाँ साझा करें',
    'share-collection': 'लिंक के साथ अपने संकलन साझा करें'
  },
  'gru-category-panel': {
    'teacher': {
      'title': 'शिक्षकों के लिए',
      'body': 'मानक-संरेखित सामग्री की खोज करें, सामग्री को कस्टमाइज़ करें, और डेटा विश्लेषण के माध्यम से छात्र की प्रगति को ट्रैक करें।',
      'cta': 'कहानियां देखें'
    },
    'student': {
      'title': 'छात्रों के लिए',
      'body': 'सीखने की सामग्री के माध्यम से अपने शौक, निर्माण, और प्रगति की निगरानी करें।',
      'cta': 'दर्ज करें',
      'text-placeholder': 'कक्षा कोड दर्ज करें'
    },
    'district': {
      'title': 'जिलों के लिए',
      'body': 'वैयक्तिकृत शिक्षा को मुक्त करने और जिलावार निरीक्षित पाठ्यक्रम साझा करने के लिए Gooru के साथ सहयोग करें।',
      'cta': 'हमारे प्रभाव देखें'
    },
    'partner': {
      'title': 'भागीदारों के लिए',
      'body': 'शिक्षा पारिस्थितिकी तंत्र पर हमारे सामूहिक प्रभाव को बढ़ाने के लिए मिशन-संरेखित भागीदारों के साथ सहयोग करें।',
      'cta': 'और अधिक जानें'
    }
  },
  'class.gru-class-navigation': {
    'active': 'सक्रिय:',
    'members': 'सदस्य',
    'greetings': 'घोषणाएं',
    'overview': 'पाठ्यक्रम मानचित्र',
    'analytics': 'डेटा',
    'teams': 'टीम',
    'information': 'कक्षा की जानकारी'
  },
  'class.gru-class-statistics': {
    'title': 'कक्षा के आंकड़े',
    'on-average': 'औसतन',
    'performance': 'प्रदर्शन',
    'completion': 'समापन',
    'time-spent': 'बिताया गया समय ',
    'no-performance': '-'
  },
  'gru-user-registration': {
    'joinTitle': 'Gooru समुदाय में शामिल हों!',
    'joinDescription': 'सर्वोत्तम मुफ्त के-12 सीखने के संसाधन ढूंढें, रीमिक्स करें और साझा करें।',
    'googleButton': 'गूगल से साइन अप करें',
    'whyGoogle': 'गूगल से साइन अप क्यों करें',
    'descriptionWhyGoogle': 'यह तेज़ और आसान है। पासवर्ड के बिना साइन इन करने के लिए अपने मौजूदा गूगल खाते का उपयोग करें।',
    'or': 'या',
    'noGoogleAccount': 'क्या गूगल खाता नहीं है?',
    'signUpEmail': 'अपने ईमेल एड्रेस से साइन इन करें',
    'haveAccount': 'क्या आपके पास पहले से एक खाता मौजूद है?',
    'clickLogIn': 'लॉग इन करने के लिए यहां क्लिक करें।'
  },
  'gru-welcome-message': {
    'title': 'Gooru लर्निंग नेविगेटर में आपका स्वागत है!',
    'text-temporary-one': 'जैसे-जैसे आप लर्निंग नेविगेटर में जाते हैं, हम आपकी यात्रा का समर्थन करने में प्रसन्न हैं। दौरा करें आइकन देखें',
    'text-temporary-two': 'निर्देशित दौरे के लिए हमारी सुविधाओं का उपयोग करने के लिए।',
    'text-one': 'जैसे-जैसे आप लर्निंग नेविगेटर में जाते हैं, हम हम निम्नलिखित तरीकों से आपकी यात्रा का समर्थन करने में प्रसन्न हैं:',
    'text-two': {
      'subtitle': 'दौरा करें',
      'text': ': हमारी सुविधाओं का उपयोग करने के तरीके पर निर्देशित दौरा प्रदान करता है।'
    },
    'text-three': {
      'subtitle': 'मदद',
      'text': ': अतिरिक्त प्रश्नों के लिए आपका तुरंत समर्थन।'
    },
    'text-four': {
      'subtitle': 'नया',
      'text': ': आपके प्रयास करने के लिए नई सुविधाओं की पहचान करता है।'
    },
    'text-five': 'किसी भी समय यदि आप अपने होम पेज पर वापस आना चाहते हैं, तो बस क्लिक करें',
    'dont-show-again': 'दोबारा ना दिखाएं'
  },
  'sign-up': {
    'step-1-title': 'नमस्कार!',
    'step-1-description': 'हमें खुशी है कि आपने हमसे जुड़ने का निरयन किया है।',
    'step-child-title': 'इतनी जल्दी नही!',
    'step-child-subtitle': 'हम आपका पंजीकरण पूरा नहीं कर सकते हैं।',
    'step-child-description-1': 'हमारे नियम एवं शर्तों के कारण Gooru आपका खाता नहीं बना सका',
    'step-child-age-requirements': '--',
    'step-child-description-2': 'सीखते रहें और खुद को कुछ सालों में देखें!',
    'step-2-title': 'बुनियादी जानकारी',
    'step-2-description': 'आप बुनियादी नहीं हैं, लेकिन यह जानकारी है।',
    'log-in': 'लॉग इन करें',
    'log-in-description': 'यदि आपके पास पहले से ही एक खाता है।',
    'google-button': 'गूगल से साइन अप करें',
    'username': 'उपयोगकर्ता नाम',
    'dateOfBirth': {
      'title': 'जन्मदिन',
      'day': 'दिन',
      'month': 'महीना',
      'months': {
        'january': 'जनवरी',
        'february': 'फरवरी',
        'march': 'मार्च',
        'april': 'अप्रैल',
        'may': 'मई',
        'june': 'जून',
        'july': 'जुलाई',
        'august': 'अगस्त',
        'september': 'सितंबर',
        'october': 'अक्टूबर',
        'november': 'नवंबर',
        'december': 'दिसंबर'
      },
      'year': 'वर्ष',
      'error-message': 'कृपया अपनी जन्मतिथि भरें।'
    },
    'email': 'ईमेल',
    'password': 'पासवर्ड',
    'rePassword': 'पासवर्ड की पुष्टि कीजिये',
    'state': 'राज्य या क्षेत्र',
    'district': 'जिला या चार्टर संगठन',
    'error-username-taken': 'ओह, यह उपयोगकर्ता नाम उपयोग में है। कोई दूसरा आज़माएं।',
    'error-email-taken': 'यह ईमेल उपयोग में है। कोई दूसरा आज़माएं।',
    'error-role-message': 'कृपया एक भूमिका का चयन करें।',
    'error-country-message': 'कृपया अपना देश चुनें।',
    'error-state-message': 'कृपया अपना राज्य या क्षेत्र चुनें।',
    'error-district-message': 'कृपया सूची से अपना जिला/चार्टर चुनें या इसे \'अन्य\' में प्रदान करें।'
  },
  'gru-user-sign-up-cancel': {
    'title': 'पंजीकरण छोड़ना है?',
    'exit?': 'क्या आप निसंदेह बाहर निकलना चाहते हैं?',
    'registration_incomplete': 'आपका पंजीकरण पूरा नहीं हुआ है।',
    'leave': 'पंजीकरण छोड़ना है ',
    'continue': 'पंजीकरण करना जारी रखें'
  },
  'login': {
    'title': 'वापसी पर स्वागत है!',
    'description': 'सीखना बस अब नजदीक ही है।',
    'title-session-ends': 'आपका सत्र समाप्त हो गया',
    'description-session-ends': 'कृपया साइन इन करें।',
    'gooruAccountTitle': 'अपने Gooru खाते में लॉग इन करें',
    'googleButton': 'गूगल से साइन इन करें',
    'or': 'या',
    'haveAccount': 'क्या आपका खाता है?',
    'signUpHere': 'यहाँ साइन अप करें!',
    'forgotPassword': 'क्या आप पासवर्ड भूल गए?',
    'password': 'पासवर्ड',
    'usernameOrEmail': 'उपयोगकर्ता का नाम या ईमेल',
    'log-in': 'लॉग इन करें'
  },
  'forgot-password': {
    'description': 'ऐसा सभी के साथ होता है।',
    'usernameOrEmail': 'अपना ईमेल दर्ज करें',
    'footer-google-description-1': '<a href='/sign-in'> 'Google से साइन इन दबाकर फिर से लॉग इन करने का प्रयास करें।' </a>',
    'footer-description-1': 'आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक के साथ एक ईमेल प्राप्त होगा।',
    'footer-description-2': 'यदि आपके कोई प्रश्न हैं, तो कृपया संपर्क करें',
    'mail': 'support@gooru.org',
    'error-email-not-exists': 'क्षमा करें, हम इस ईमेल को नहीं पहचानते हैं।',
    'secondStepTitle': 'अपने ईमेल की जाँच करें',
    'secondStepDescription-1': 'हमने आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक के साथ एक ईमेल भेजा है।',
    'secondStepDescription-2': 'यदि आपके कोई प्रश्न हैं, तो कृपया संपर्क करें'
  },
  'reset-password': {
    'new-password': 'अपना नया पासवर्ड दर्ज करें',
    'new-password-confirm': 'अपने पासवर्ड की पुष्टि करें',
    'title': 'पासवर्ड रीसेट करें'
  },
  'footer': {
    'footerDescription': 'Gooru अपने प्लेटफार्म पर ओपन-सोर्स और सामुदायिक निर्मित सामग्री CCO रखने के लिए प्रतिबद्ध है।',
    'company': 'कंपनी',
    'community': 'समुदाय',
    'legal': 'कानूनी',
    'connect': 'जुड़िये',
    'aboutGooru': 'Gooru के बारे में',
    'careers': 'कैरियर्स',
    'supportCenter': 'समर्थन केंद्र',
    'contactUs': 'हमसे संपर्क करें',
    'districts': 'जिले',
    'partners': 'भागीदार',
    'coaches': 'कोच',
    'events': 'आयोजन',
    'terms': 'शर्तें',
    'privacy': 'एकांत',
    'Copyright': 'कॉपीराइट'
  },
  'grade-dropdown': {
    'placeholder': 'ग्रेड',
    'prompt': 'एक ग्रेड का चयन करें',
    'pre-k': 'प्री-के',
    'elementary': 'प्राथमिक',
    'middle-school': 'माध्यमिक पाठशाला',
    'high-school': 'उच्च विद्यालय',
    'higher-ed': 'उच्च शिक्षा',
    'k': 'के',
    'first': '1',
    'second': '2',
    'third': '3',
    'fourth': '4',
    'fifth': '5',
    'sixth': '6',
    'seventh': '7',
    'eighth': '8',
    'ninth': '9',
    'tenth': '10',
    'eleventh': '1 1',
    'twelfth': '12'
  },
  'standard-dropdown': {
    'placeholder': 'मानक के क्रम में ब्राउज़ करें'
  },
  'subject-dropdown': {
    'placeholder': 'विषय',
    'prompt': 'एक विषय चुनिए'
  },
  'search-filter': {
    'courses': 'पाठ्यक्रम',
    'collections': 'संकलन',
    'resources': 'साधन',
    'assessments': 'मूल्यांकन',
    'questions': 'प्रश्न',
    'rubrics': 'सुर्खियाँ',
    'question-types': {
      'MC': 'बहुविकल्पी',
      'FIB': 'रिक्त स्थान भरें',
      'T/F': 'सही/गलत',
      'TOF': 'सही या गलत',
      'MA': 'एकाधिक उत्तर',
      'HS_TXT': 'एकाधिक चयन - पाठ',
      'HSTXT': 'एकाधिक चयन टेक्स्ट',
      'HS_IMG': 'एकाधिक चयन - छवि',
      'HSIMG': 'एकाधिक चयन छवि',
      'HT_RO': 'खींचें और ड्रॉप अनुक्रम',
      'HT&RO': 'खींचें और ड्रॉप क्रम',
      'HT_HL': 'हॉट टेक्स्ट- हाइलाइट करें',
      'H-THL': 'हॉट-टेक्स्ट हाइलाइट',
      'OE': 'मुफ़्त अनुक्रिया'
    },
    'author': {
      'placeholder': 'लेखक'
    }
  },
  'resource': {
    'video': 'वीडियो',
    'webpage': 'वेब पृष्ठ',
    'interactive': 'इंटरैक्टिव',
    'question': 'प्रश्न',
    'image': 'छवि',
    'text': 'टेक्स्ट',
    'audio': 'ऑडियो',
    'oer': 'OER'
  },
  'search-result': {
    'resource': 'संसाधन',
    'resources': 'साधन',
    'and': 'तथा',
    'question': 'प्रश्न',
    'questions': 'प्रश्न',
    'in-this-collection': 'इस संकलन में',
    'search-results-for': 'के लिए खोज परिणाम'
  },
  'gru-image-picker': {
    'chooseFile': 'एक फाइल चुनें...',
    'instruction': 'अपने कंप्यूटर पर एक फ़ाइल से एक छवि अपलोड करें।',
    'restriction': 'छवि 5 एमबी से कम एक jpg, gif या png फ़ाइल होनी चाहिए।',
    'submit': 'छवि का प्रयोग करें'
  },
  'gru-fib': {
    'instructions': 'कृपया दिए गए रिक्त स्थान में अपना उत्तर टाइप करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-hs-image': {
    'instructions': 'कृपया सही छवि का चयन करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-hs-text': {
    'instructions': 'कृपया सही उत्तर चुनें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-hot-text': {
    'instructions': 'कृपया सही उत्तर का चयन करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-login-prompt': {
    'title': 'Gooru में आपका स्वागत है!',
    'instructions': 'आपको उस क्रिया को पूरा करने के लिए साइन इन करने की आवश्यकता है।',
    'existing-user': 'क्या आपके पास पहले से एक खाता मौजूद है?',
    'new-user': 'यहाँ नये हैं?',
    'not-now': 'अभी नहीं',
    'sign-in': 'साइन इन करें'
  },
  'gru-multiple-answer': {
    'instructions': 'कृपया सही उत्तर का चयन करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-multiple-choice': {
    'instructions': 'कृपया सही उत्तर का चयन करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'gru-open-ended': {
    'instructions': 'कृपया नीचे दी गई फील्ड में अपना उत्तर टाइप करें, और जब आप पूरा कर लें तो अपनी प्रतिक्रिया को सहेजने के लिए \'{{action}}\' बटन पर क्लिक करें।',
    'characterLimit': 'अक्षरसीमा'
  },
  'gru-question-viewer': {
    'answer': 'उत्तर',
    'question': 'प्रश्न'
  },
  'gru-true-false': {
    'instructions': 'कृपया सही उत्तर का चयन करें, और \'{{action}}\' पर क्लिक करें।',
    'true': 'सच',
    'false': 'असत्य'
  },
  'gru-reorder': {
    'instructions': 'कृपया सही क्रम में उत्तरों को पुन: व्यवस्थित करें, और \'{{action}}\' पर क्लिक करें।'
  },
  'player': {
    'gru-navigation': {
      'view-report': 'रिपोर्ट देखें'
    },
    'gru-navigator': {
      'see-usage-report': 'उपयोग रिपोर्ट देखें'
    },
    'gru-viewer': {
      'not-iframe-url': {
        'header_1': 'यह संसाधन Gooru के भीतर नहीं देखा जा सकता है।',
        'header_external_assessment_1': 'यह मूल्यांकन Gooru के भीतर नहीं देखा जा सकता है।',
        'header_2': 'संसाधन को एक नए टैब में खोलने के लिए नीचे दिए गए बटन पर क्लिक करें।',
        'view-resource': 'संसाधन देखें',
        'https_external': 'यह लिंक Gooru के भीतर नहीं देखा जा सकता है।',
        'https_new_tab': 'इसे एक नए टैब में खोलने के लिए नीचे दिए गए लिंक पर क्लिक करें।',
        'footer_1': 'मैं यह खाली पृष्ठ क्यों देख रहा हूं?',
        'footer_2': 'Gooru में जोड़े गए संसाधन हजारों विभिन्न प्रकाशकों से आते हैं',
        'footer_3': 'अपनी सामग्री बनाएं और साझा करें। संसाधनों में विभिन्न प्रकार की सेटिंग्स हैं जिनमे वे आवश्यकताएं भी शामिल हैं ',
        'footer_4': 'जो सामग्री को देखने के लिए आपको दूसरे पृष्ठ पर ले जाती हैं।'
      }
    }
  },
  'grading-player': {
    'answer': 'सबमिट किया गया कार्य',
    'back-to': 'वापस',
    'current-response': 'वर्तमान प्रतिक्रिया',
    'full-rubric': 'पूर्ण सुर्खी',
    'grading': 'ग्रेडिंग',
    'level': 'स्तर',
    'roster': 'रोस्टर',
    'rubric': 'सुर्खी',
    'submitted-time': 'सबमिट करने का समय',
    'points': 'अंक',
    'prompt': 'टास्क प्रॉम्प्ट',
    'overall-comment': 'समग्र टिप्पणी',
    'overall-lead': 'निबंध पर पूरी तरह से अपनी प्रतिक्रिया सारांशित करें।',
    'time-spent': 'बिताया गया समय ',
    'total-score': 'कुल स्कोर',
    'student-roster': {
      'title': 'छात्रों की सूची',
      'lead': 'इस सवाल का जवाब दिया गया है'
    },
    'rubric-panel': {
      'previous': 'पिछला छात्र',
      'next': 'अगला छात्र',
      'total-score': 'कुल स्कोर',
      'points': '({{कुल}} अंक)'
    }
  },
  'profile': {
    'gru-navigation': {
      'about': 'के बारे में',
      'about-me': 'मेरे बारे में',
      'content': 'सामग्री',
      'followers': 'अनुयायी',
      'library': 'पुस्तकालय',
      'my-content': 'मेरी सामग्री',
      'following': 'निम्नलिखित',
      'proficiency': 'प्रवीणता'
    },
    'edit': {
      'select-district': 'एक जिले का चयन करें...'
    },
    'proficiency': {
      'is-empty': 'अभी तक कोई डेटा उपलब्ध नहीं है। एक बार अध्ययन शुरू करने के बाद, आपका डेटा उपलब्ध हो जाएगा।',
      'expand-chart': 'चार्ट का विस्तार करें',
      'mastered': 'महारत हासिल है',
      'in-progress': 'चालू है',
      'not-started': 'शुरू नही हुआ'
    }
  },
  'gru-data-picker': {
    'score': 'स्कोर',
    'report': 'रिपोर्ट करें',
    'completion': 'समापन',
    'timeSpent': 'समय',
    'time-spent': 'बिताया गया समय ',
    'study-time': 'पढ़ाई का समय',
    'reaction': 'प्रतिक्रिया',
    'attempts': 'प्रयास'
  },
  'gru-performance-summary': {
    'title': 'शीर्षक',
    'scores': 'स्कोर',
    'completion': 'समापन',
    'time-spent': 'कुल समय',
    'reaction': 'प्रतिक्रिया',
    'attempts': 'प्रयास',
    'redo': 'फिर करें',
    'resume': 'बायोडाटा',
    'study': 'अभी अध्ययन करें',
    'view-report': 'रिपोर्ट देखें',
    'not-applicable': 'लागू नहीं',
    'not-started': 'अभी तक शुरू नहीं हुआ'
  },
  'gru-performance': {
    'no-content': 'कोई सामग्री उपलब्ध नहीं है'
  },
  'gru-performance-metrics': {
    'assessment': 'मूल्यांकन',
    'collection': 'संकलन',
    'completion': 'समापन',
    'report': 'रिपोर्ट करें',
    'student': 'छात्र',
    'score': 'स्कोर',
    'study-time': 'बिताया गया समय '
  },
  'gru-metrics-sub-header': {
    'assessment': 'मूल्यांकन',
    'student': 'छात्र',
    'score': 'स्कोर',
    'report': 'रिपोर्ट करें',
    'completion': 'समापन',
    'time-spent': 'समय'
  },
  'gru-resource-new': {
    'resource-already-exist': 'यह संसाधन पहले से ही Gooru में मौजूद है!'
  },
  'gru-assessment-report': {
    'gru-summary': {
      'total-time-spent': 'कुल बिताया गया समय '
    },
    'hidden-report': 'आपके शिक्षक ने इस मूल्यांकन के लिए आपकी सारांश रिपोर्ट छिपाने के लिए चुना है।'
  },
  'cards': {
    'gru-class-card': {
      'student': {
        'zero': '{{गिनती}} छात्र',
        'one': '{{गिनती}} छात्र',
        'other': '{{गिनती}} छात्र',
        'not-started': 'शुरू नही हुआ'
      },
      'unit': {
        'zero': 'कोई पाठ्यक्रम नहीं है',
        'one': '{{गिनती}} इकाई',
        'other': '{{गिनती}} इकाइयां'
      },
      'archived': {
        'request-report': 'इस वर्ग को संग्रहीत किया गया है और संशोधित नहीं किया जा सकता है। रिपोर्ट के माध्यम से मौजूदा वर्ग डेटा का उपयोग किया जा सकता है।',
        'report-in-progress': 'रिपोर्ट बनाने में 20 मिनट तक लग सकते हैं। कृपया वापस जांचें।',
        'download-report': 'इस कक्षा के लिए अपना डेटा डाउनलोड करें।',
        'no-report-available': 'इस वर्ग में कोई निश्चित पाठ्यक्रम सामग्री नहीं है।'
      }
    },
    'gru-course-card': {
      'in': 'में',
      'units': {
        'zero': '{{गिनती}} इकाइयां',
        'one': '{{गिनती}} इकाई',
        'other': '{{गिनती}} इकाइयां'
      },
      'resource': {
        'zero': '{{count}} संसाधन',
        'one': '{{गिनती}} संसाधन',
        'other': '{{count}} संसाधन'
      },
      'and': 'तथा',
      'question': {
        'zero': '{{count}} प्रश्न',
        'one': '{{गिनती}} प्रश्न',
        'other': '{{count}} प्रश्न'
      },
      'start-studying': 'अध्ययन शुरू करें'
    },
    'gru-collection-card': {
      'courses': {
        'zero': '{{गिनती}} पाठ्यक्रम',
        'one': '{{गिनती}} पाठ्यक्रम',
        'other': '{{गिनती}} पाठ्यक्रम'
      },
      'students': {
        'zero': '{{गिनती}} छात्र',
        'one': '{{गिनती}} छात्र',
        'other': '{{गिनती}} छात्र'
      },
      'collections': {
        'one': '{{count}} संकलन',
        'other': '{{count}} संकलन'
      },
      'assessments': {
        'one': '{{गिनती}} मूल्यांकन',
        'other': '{{गिनती}} मूल्यांकन'
      },
      'classrooms': {
        'zero': '{{count}} कक्षाएं',
        'one': '{{गिनती}} कक्षा',
        'other': '{{count}} कक्षाएं'
      }
    },
    'gru-resource-card': {
      'add': 'में जोड़ें'
    },
    'gru-resource-result-card': {
      'skipped': 'को छोड़ दिया'
    },
    'gru-profile-card': {
      'followers': 'अनुयायी',
      'following': 'निम्नलिखित'
    },
    'gru-user-network-card': {
      'follow': 'का पालन करें'
    }
  },
  'reports.gru-table-view': {
    'first-tier-header-prefix': 'क्यू',
    'student': 'छात्र',
    'reaction': 'प्रतिक्रिया',
    'reactions': 'प्रतिक्रियाएं',
    'score': 'स्कोर',
    'scores': 'स्कोर',
    'study-time': 'पढ़ाई का समय',
    'time': 'समय',
    'time-spent': 'बिताया गया समय ',
    'totals': 'कुल'
  },
  'gru-emotion-picker': {
    'react-to-resource': 'इस संसाधन पर प्रतिक्रिया दें'
  },
  'home': {
    'no-classes-found': {
      'create-class': {
        'title': 'एक Gooru कक्षा के साथ सिखाएं',
        'description': 'कक्षा बनाएं, सामग्री निरुपित करें, और छात्रों को आमंत्रित करें।',
        'button-text': 'कक्षा बनाएं'
      },
      'join-class': {
        'title': 'एक Gooru कक्षा के साथ सीखें',
        'description': 'सीखने के लिए अपने शिक्षक की कक्षा में शामिल हों।',
        'button-text': 'कक्षा कोड दर्ज करें'
      },
      'featured-courses': {
        'title': 'फीचर्ड पाठ्यक्रम',
        'description': 'गणित, विज्ञान, सामाजिक अध्ययन, और ELA पाठ्यक्रम को ब्राउज़ करें।',
        'button-text': 'फीचर्ड पाठ्यक्रम'
      },
      'teacher-toolkit': {
        'title': 'शिक्षक टूलकिट',
        'description': 'इस टूलकिट में शुरू करने में आपकी सहायता के लिए संसाधन हैं।',
        'button-text': 'शिक्षक टूलकिट'
      }
    }
  },
  'taxonomy': {
    'gru-taxonomy-selector': {
      'add-secondary': 'माध्यमिक जोड़ें',
      'choose-subject': 'विषय चुनें',
      'competency-subject-and-course': 'दक्षता ढांचा और पाठ्यक्रम',
      'primary-subject-and-course': 'मानक ढांचा और पाठ्यक्रम'
    }
  },
  'validations': {
    'unsavedChanges': 'आपके परिवर्तन अभी तक सहेजे नहीं गए हैं। क्या आप इस पेज को छोड़ना चाहेंगे?'
  },
  'featured': {
    'featured-title': 'फीचर्ड पाठ्यक्रम',
    'featured-description': 'फीचर्ड पाठ्यक्रमों को अभिनव शिक्षकों द्वारा तैयार किया जाता है, सामग्री विशेषज्ञों द्वारा जांच और समीक्षा की जाती है, और छात्रों के लिए कक्षाओं में इसे लागू किया जाता है। सीखने को वैयक्तिकृत करने और छात्र जुड़ाव बढ़ाने के लिए पाठ्यक्रमों की खोज, रीमिक्स और कस्टमाइज़ करें! <a href='http://about.gooru.org/courses' target='_blank'> इन पाठ्यक्रमों के विकास के बारे में और जानें </a>।'
  },
  'taxonomy.modals': {
    'gru-domain-picker': {
      'browseSelectorText': 'इस इकाई में कौन से डोमेन शामिल होंगे?',
      'selectedText': {
        'zero': '{{count}} डोमेन चुने गए',
        'one': '{{count}} डोमेन चयनित हैं',
        'other': '{{count}} डोमेन चुने गए'
      },
      'shortcutText': 'पाठ्यक्रम में है'
    },
    'gru-standard-picker': {
      'browseSelectorText': 'कौन से मानकों को कवर किया जाएगा?',
      'browseCompetencySelectorText': 'क्या दक्षताओं को कवर किया जाएगा?',
      'selectedText': {
        'zero': '{{count}} मानकों का चयन किया गया',
        'one': '{{count}} मानक चुना गया',
        'other': '{{count}} मानकों का चयन किया गया'
      },
      'selectedCompetencyText': {
        'zero': '{{count}} योग्यताएं चयनित हैं',
        'one': '{{count}} योग्यता चयनित है',
        'other': '{{count}} योग्यताएं चयनित हैं'
      },
      'shortcutText': 'इकाई को टैग किया गया है'
    }
  },
  'account-settings': {
    'title': 'खाते की सेटिंग',
    'account-info': 'खाते की जानकारी',
    'private-info': 'निजी जानकारी',
    'email-address': 'ईमेल पता',
    'gender': 'लिंग',
    'birthday': 'जन्मदिन'
  },
  'gru-rich-text-editor': {
    'bold': 'साहसिक',
    'expression': 'अभिव्यक्ति',
    'italic': 'तिरछा',
    'subscript': 'सबस्क्रिप्ट',
    'superscript': 'सुपरस्क्रिप्ट',
    'underline': 'रेखांकित करना',
    'expressions-panel': {
      'tabs': {
        'calculus': 'गणना',
        'greek-letters': 'ग्रीक अक्षर',
        'layout': 'ख़ाका',
        'relation': 'रिश्ता',
        'set-theory': 'समुच्चय सिद्धान्त',
        'symbols': 'प्रतीक',
        'trigonometry': 'त्रिकोणमिति'
      },
      'insert-expression': 'डालें',
      'update-expression': 'अद्यतन करें',
      'create-expression': 'अभिव्यक्ति बनाएं'
    }
  },
  'gru-settings-edit': {
    'answerkey-attempts': 'उत्तर कुंजी और प्रयास',
    'answer-key': 'छात्र अंत में उत्तर कुंजी देख सकते हैं',
    'attempts': 'प्रयास',
    'attempts-unlimited': 'असीमित',
    'backwards': 'छात्र पीछे की ओर नेविगेट कर सकते हैं और उत्तर बदल सकते हैं',
    'feedback': 'छात्र देखें कि वे सही हैं या गलत हैं',
    'feedback-immediate': 'प्रति प्रश्न और अंत में',
    'feedback-never': 'कभी नहीँ',
    'feedback-summary': 'अतं मै',
    'navigation-scoring': 'नेविगेशन और स्कोरिंग',
    'disable-heading': 'पाठ्यक्रम मानचित्र में मूल्यांकन सक्रिय करें',
    'disable-legend': 'छात्र अपने पाठ्यक्रम मानचित्र से मूल्यांकन प्ले कर सकते हैं'
  },
  'gru-icon-popover': {
    'settings-visibility-title': 'अपनी सामग्री को दृश्यमान बनाएं',
    'settings-visibility-content': 'यह सेटिंग आपकी सामग्री को आपकी उपयोगकर्ता प्रोफ़ाइल के माध्यम से दृश्यमान बनाती है। यदि आप सहकर्मियों के साथ बनाए गए पाठ्यक्रम, संकलन, मूल्यांकन, संसाधन, और/या प्रश्न साझा करना चाहते हैं, तो हमारा सुझाव है कि आप इस सुविधा को चालू करें।'
  },
  'gru-take-tour': {
    'text': 'दौरा',
    'teacher-home': {
      'stepOne': {
        'title': 'दौरा करें',
        'description': 'एक दौरे में और आपके होमपेज पर आपका स्वागत है! चलिए अब शुरू करें!'
      },
      'stepTwo': {
        'title': 'लोगो',
        'description': 'लोगो पर क्लिक करने से आप अपने होमपेज पर लौट सकते हैं।'
      },
      'stepThree': {
        'title': 'खोज पट्टी',
        'description': 'आपके लिए रुचि रखने वाले विषयों के लिए हमारी सामग्री सूची खोजें।'
      },
      'stepFour': {
        'title': 'कक्षाएं',
        'description': 'अपने होमपेज पर लौटें।'
      },
      'stepFive': {
        'title': 'सामग्री प्रबंधक',
        'description': 'अपनी सामग्री बनाने और एक्सेस करने के लिए त्वरित लिंक।'
      },
      'stepSix': {
        'title': 'पुस्तकालय',
        'description': 'हमारे फीचर्ड पाठ्यक्रम ब्राउज़ करें।'
      },
      'stepSeven': {
        'title': 'आपकी प्रोफाइल',
        'description': 'अपनी सामग्री, उपयोगकर्ता प्रोफ़ाइल और सेटिंग्स तक पहुंचें और अपडेट करें।'
      },
      'stepEight': {
        'title': 'समर्थन',
        'description': 'समर्थन केंद्र एक्सेस करें या लॉगआउट करें।'
      },
      'stepNine': {
        'title': 'कक्षाएं',
        'description': 'वर्तमान में आप जिन कक्षाओं में पढ़ा रहे हैं उनकी एक सूची देखें।'
      },
      'stepTen': {
        'title': 'संग्रहीत कक्षाएं',
        'description': 'अतीत में सिखाई गई कक्षाओं की एक सूची देखें।'
      },
      'stepEleven': {
        'title': 'कक्षा बनाएं',
        'description': 'अपनी कक्षा को नाम दें और नई कक्षा बनाने के लिए बटन पर क्लिक करें।'
      }
    },
    'student-home': {
      'stepOne': {
        'title': 'दौरा करें',
        'description': 'एक दौरे में और आपके होमपेज पर आपका स्वागत है! आइए आपके होमपेज पर उपलब्ध सुविधाओं को देखते हैं।'
      },
      'stepFeaturedCourses': {
        'title': 'फीचर्ड पाठ्यक्रम',
        'description': 'रुचि रखने वाले विषयों के लिए लर्निंग नेविगेटर की सामग्री सूची में विशेषीकृत पाठ्यक्रम को ब्राउज़ करें।'
      },
      'stepTwo': {
        'title': 'लोगो',
        'description': 'लोगो पर क्लिक करने से आप अपने होमपेज पर लौट सकते हैं।'
      },
      'stepThree': {
        'title': 'खोज पट्टी',
        'description': 'रुचि रखने वाले विषयों के लिए हमारी सामग्री सूची खोजें।'
      },
      'stepFour': {
        'title': 'मेरा अध्ययन',
        'description': 'अपने होमपेज पर लौटें।'
      },
      'stepFive': {
        'title': 'पुस्तकालय',
        'description': 'रुचि रखने वाले विषयों के लिए लर्निंग नेविगेटर के विशेष पाठ्यक्रम और साझेदार लाइब्रेरी को ब्राउज़ करें।'
      },
      'stepSix': {
        'title': 'प्रदर्शन',
        'description': 'आपके द्वारा नामांकित पाठ्यक्रमों में अपने प्रदर्शन का सारांश देखें।'
      },
      'stepSeven': {
        'title': 'आपकी प्रोफाइल',
        'description': 'अपनी सामग्री और उपयोगकर्ता प्रोफ़ाइल को उपयोग और अद्यतन करें।'
      },
      'stepEight': {
        'title': 'समर्थन',
        'description': 'समर्थन केंद्र एक्सेस करें या लॉगआउट करें।'
      },
      'stepNine': {
        'title': 'घोषणाएं',
        'description': 'यहां आप घोषणाएं देखेंगे जो कि आपका शिक्षक या स्कूल जानना चाहेगा।'
      },
      'stepTen': {
        'title': 'कक्षाएं',
        'description': 'उन सभी कक्षाओं को देखें जिनमें आप नामांकित हैं।'
      },
      'stepEleven': {
        'title': 'स्वतंत्र रूप से सीखना',
        'description': 'उन विषयों का पता लगाएं जिन्हें आपने बुकमार्क किया है और आप इसके बारे में अधिक जानना चाहते हैं।'
      },
      'stepTwelve': {
        'title': 'कक्षा में शामिल हों',
        'description': 'कक्षा में शामिल होने के लिए कक्षा कोड दर्ज करें।'
      },
      'stepThirteen': {
        'title': 'ख़त्म!',
        'description': 'अब आगे बढ़ें और उस पाठ्यक्रम पर क्लिक करें जिसमें आपने नामांकन किया है, कक्षा में शामिल हों, या आपकी रुचि वाली सामग्री की खोज करें।'
      }
    },
    'student-performance': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'आपके प्रदर्शन डैशबोर्ड में आपका स्वागत है। आप देख सकते हैं कि आप सभी कक्षाओं और पाठ्यक्रमों में कैसा प्रदर्शन कर रहे हैं।'
      },
      'stepTwo': {
        'title': 'फ़िल्टर टैब',
        'description': 'गतिविधि, समय अवधि, विषय, और पाठ्यक्रम द्वारा अपने प्रदर्शन को फ़िल्टर करने के लिए तीर पर क्लिक करें।'
      },
      'stepThree': {
        'title': 'रिपोर्ट अपडेट करें',
        'description': 'एक बार जब आप अपने फ़िल्टर चुनते हैं, तो परिणाम प्रदर्शित करने के लिए अद्यतन रिपोर्ट पर क्लिक करें।'
      },
      'stepFour': {
        'title': 'डाउनलोड / प्रिंट',
        'description': 'अपनी रिपोर्ट डाउनलोड करें।'
      },
      'stepFive': {
        'title': 'ख़त्म!',
        'description': 'आगे बढ़ें और अपने प्रदर्शन का विश्लेषण करें!'
      }
    },
    'student-class': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'आपकी कक्षा में आपका स्वागत है। यहां आपको अपनी कक्षा की दैनिक गतिविधियां, पाठ्यक्रम मानचित्र और प्रदर्शन डेटा मिलेगा। आइए शुरू करें!'
      },
      'stepTopBar': {
        'title': 'पाठ्यक्रम, प्रदर्शन, समापन',
        'description': 'अब तक अपने पाठ्यक्रम और समग्र प्रदर्शन का सारांश देखें।'
      },
      'stepTwo': {
        'title': 'कक्षा की दैनिक गतिविधियां',
        'description': 'अपने शिक्षक द्वारा निरुपित आज की गतिविधियों का उपयोग और अध्ययन करें।'
      },
      'stepThree': {
        'title': 'पाठ्यक्रम मानचित्र',
        'description': 'पाठ्यक्रम में संकलन और मूल्यांकन को पूरा करने के लिए इकाइयों और पाठों पर क्लिक करें।'
      },
      'stepFour': {
        'title': 'मेरी रिपोर्ट',
        'description': 'अपने समग्र वर्ग प्रदर्शन की समीक्षा करें।'
      },
      'stepFive': {
        'title': 'ख़त्म!',
        'description': 'पाठ्यक्रम मानचित्र या दैनिक गतिविधियों पर क्लिक करके पाठ्यक्रम का अध्ययन शुरू करें।'
      }
    },
    'teacher-class': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'आपकी कक्षा में आपका स्वागत है। यहां आप अपनी कक्षा की दैनिक गतिविधियों, पाठ्यक्रम मानचित्र, कक्षा की जानकारी अद्यतन करने और छात्र प्रदर्शन डेटा की समीक्षा करने में सक्षम होंगे। आइए शुरू करें!'
      },
      'stepTopBar': {
        'title': 'पाठ्यक्रम, प्रदर्शन, समापन',
        'description': 'अपने अब तक के पाठ्यक्रम और समग्र छात्र प्रदर्शन का सारांश देखें।'
      },
      'stepTwo': {
        'title': 'कक्षा की दैनिक गतिविधियां',
        'description': 'अपने छात्रों की आज की गतिविधियों को देखें और उन्हें निरुपित करें।'
      },
      'stepThree': {
        'title': 'पाठ्यक्रम मानचित्र',
        'description': 'पाठ्यक्रम में निर्दिष्ट इकाइयों, पाठ, संकलन या मूल्यांकन को देखें या संपादित करें।'
      },
      'stepFour': {
        'title': 'मेरी रिपोर्ट',
        'description': 'पाठ्यक्रम में आपका छात्र कैसा प्रदर्शन कर रहा है उसका सारांश देखें और उनकी रिपोर्ट तक पहुंचें।'
      },
      'stepClassManagement': {
        'title': 'कक्षा प्रबंधन',
        'description': 'अपनी कक्षा की जानकारी और कक्षा में नामांकित छात्रों का निरूपण या अद्यतन करें।'
      },
      'stepFive': {
        'title': 'ख़त्म!',
        'description': 'अब आगे बढ़ें और अपने छात्रों के साथ कक्षा साझा करें।'
      }
    },
    'study-player': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'यह आपका अध्ययन कार्यक्षेत्र है। चलिए अब आप के लिए उपलब्ध सुविधाओं को देखते हैं।'
      },
      'stepTwo': {
        'title': 'पाठ्यक्रम मानचित्र',
        'description': 'अपने पाठ्यक्रम मानचित्र पर वापस जाने के लिए किसी भी समय आइकन पर क्लिक करें।'
      },
      'stepThree': {
        'title': 'पाठ्यक्रम का नाम',
        'description': 'उस पाठ्यक्रम को इंगित करता है जिस पर आप काम कर रहे हैं।'
      },
      'stepFour': {
        'title': 'सुझाव',
        'description': 'आप जो वर्तमान में पढ़ रहे हैं उसके आधार पर अतिरिक्त संसाधन जिन्हें आप एक्सप्लोर करना चाहते हैं।'
      },
      'stepFive': {
        'title': 'समापन',
        'nuTitle': 'दक्षताएं',
        'description': 'इंगित करता है कि आपने कितना पाठ्यक्रम पूरा कर लिया है।'
      },
      'stepSix': {
        'title': 'प्रदर्शन',
        'description': 'इंगित करता है कि आप पाठ्यक्रम में कैसा प्रदर्शन कर रहे हैं।'
      },
      'stepSeven': {
        'title': 'संसाधन पर प्रतिक्रिया दें',
        'description': 'अपने शिक्षक को यह बताएं कि आप इस संसाधन के बारे में क्या सोचते हैं।'
      },
      'stepEight': {
        'title': 'ख़त्म!',
        'description': 'अध्ययन शुरू करें!'
      },
      'stepNine': {
        'title': 'संकलन पर वापस जाएं',
        'description': 'अपने संकलन या मूल्यांकन पर वापस जाने के लिए किसी भी समय आइकन पर क्लिक करें।'
      }
    },
    'library': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'लर्निंग नेविगेटर में लाइब्रेरी में आपका स्वागत है।'
      },
      'stepTwo': {
        'title': 'फीचर्ड पाठ्यक्रम',
        'description': 'शिक्षकों द्वारा कक्षाओं में विकसित और कार्यान्वित किये गए पाठ्यक्रमों का पता लगाएं।'
      },
      'stepThree': {
        'title': 'अन्य पुस्तकालय',
        'description': 'Gooru के भागीदारों द्वारा विकसित सामग्री का पता लगाएं।'
      },
      'stepFour': {
        'title': 'पूर्वावलोकन',
        'description': 'यह देखने के लिए पाठ्यक्रम का पूर्वावलोकन करें कि क्या यह आपकी रूचि का है।'
      },
      'stepFive': {
        'title': 'साझा करें',
        'description': 'दूसरों के साथ इस पाठ्यक्रम को साझा करें।'
      },
      'stepSix': {
        'title': 'बुकमार्क',
        'description': 'बाद में इसकी समीक्षा करने के लिए इस पाठ्यक्रम को बुकमार्क करें।'
      }
    },
    'profile': {
      'stepOne': {
        'title': 'स्वागत है!',
        'description': 'आपकी प्रोफाइल में आपका स्वागत है। यहां आप अपनी सामग्री, व्यक्तिगत जानकारी और अपने अनुयायियों तक पहुंच सकते हैं।'
      },
      'stepTwo': {
        'title': 'मेरी सामग्री',
        'description': 'नई सामग्री बनाएं और उस सामग्री को देखें जिसे आपने रीमिक्स किया है।'
      },
      'stepThree': {
        'title': 'मेरे बारे में',
        'description': 'अपनी व्यक्तिगत जानकारी, स्कूल की जानकारी और अपनी प्रोफाइल तस्वीर अद्यतन करें।'
      },
      'stepFour': {
        'title': 'लक्ष्य',
        'description': 'अपने सीखने के मील के पत्थर को प्राप्त करने में आपकी सहायता के लिए लक्ष्य निर्धारित करें और ट्रैक करें।'
      },
      'stepFive': {
        'title': 'अनुयायी',
        'description': 'अगर आपको किसी की सामग्री पसंद है, तो आप उनका अनुसरण कर सकते हैं। आप यह भी देख सकते हैं कि आपका अनुसरण कौन कर रहा है।'
      },
      'stepSix': {
        'title': 'बैज',
        'description': 'आपके द्वारा प्राप्त किए गए बैज की समीक्षा करें। यदि आप अपने शिक्षक द्वारा निर्दिष्ट बेंचमार्क मूल्यांकन पूरा करते हैं तो आपको बैज प्राप्त होता है।'
      }
    }
  },
  'gru-tour': {
    'assessments-settings': {
      'stepOne': {
        'title': 'नेविगेशन और स्कोरिंग',
        'description': 'यह सेटिंग निर्धारित करती है कि छात्र मूल्यांकन के माध्यम से कैसे आगे बढ़ सकते हैं और दिखाते हैं कि उनके उत्तर सही हैं या गलत हैं। यह उन्हें उत्तर कुंजी नहीं दिखाता है।'
      },
      'stepTwo': {
        'title': 'उत्तर कुंजी और प्रयासों की संख्या',
        'description': 'यह सेटिंग उत्तर कुंजी को प्रकट करने की अनुमति देती है और मूल्यांकन पर छात्रों के प्रयासों की संख्या निर्धारित करती है।'
      }
    },
    'overview': {
      'stepOne': {
        'title': 'पाठ्यक्रम मानचित्र',
        'description': 'पाठ्यक्रम मानचित्र आपके छात्रों को आपके द्वारा आवंटित सभी मूल्यांकन और संकलन तक पहुंच प्रदान करता है।'
      },
      'stepTwo': {
        'title': 'कक्षा कोड',
        'description': 'आपके द्वारा बनाई गई प्रत्येक कक्षा में एक अद्वितीय कक्षा कोड होता है। आप इस कोड को छात्रों को देंगे जब आप उन्हें अपनी कक्षा में शामिल होने और अपनी सामग्री तक पहुंचने के लिए तैयार करते हैं।'
      },
      'stepThree': {
        'title': 'छात्र और कक्षा डेटा की निगरानी करें',
        'description': 'यह आपको कक्षा और व्यक्तिगत छात्र मूल्यांकन डेटा देखने की अनुमति देता है जब छात्र पाठ्यक्रम का हिस्सा हैं जो मूल्यांकन पूरा करते हैं।'
      },
      'stepFour': {
        'title': 'कक्षा की जानकारी',
        'description': 'यहां आप अपनी कक्षा के नाम को संपादित कर सकते हैं, अपने छात्रों के लिए घोषणाएं पोस्ट कर सकते हैं, अपनी कक्षा में नामांकित छात्रों के नाम देख सकते हैं, और अपनी कक्षा को मिटा भी सकते हैं।'
      },
      'stepFive': {
        'title': 'अपनी पाठ्यक्रम सामग्री को संपादित करना',
        'description': 'जब आप कक्षा में हों, तो अपने छात्रों को दी गई किसी भी पाठ्यक्रम की सामग्री को संपादित करने के लिए यहां क्लिक करें।'
      },
      'stepSix': {
        'title': 'वास्तविक समय में प्रगति की निगरानी!',
        'description': '\' data-trtype=\'TM\'> मूल्यांकन की कक्षा प्रगति की वास्तविक समय में निगरानी के लिए रीयल-टाइम डैशबोर्ड का उपयोग करें। <br> <br> छात्रों के लिए वास्तविक समय निर्धारण लॉन्च करने के लिए प्रत्येक मूल्यांकन के बाईं ओर \'गो लाइव\' आइकन पर क्लिक करें। <br> <br> <i class = \'real-time-icon\'>'
      }
    },
    'quick-start': {
      'stepOne': {
        'title': 'अपने कक्षाओं को नेविगेट करें',
        'description': 'यह नव निर्मित कक्षा का एक दृश्य है। किसी भी समय कक्षा में वापस जाने के लिए, \'कक्षाओं\' पर क्लिक करें और उस कक्षा का चयन करने के लिए जिसे आप दर्ज करना चाहते हैं, ड्रॉप डाउन मेनू का उपयोग करें।'
      },
      'stepTwo': {
        'title': 'शुरू कर रहे हैं? एक मूल्यांकन बनाएं!',
        'description': 'हम Gooru के साथ शुरू करने और अपनी कक्षा में छात्र समझ के वर्तमान स्तर का मूल्यांकन  करने के तरीके के रूप में मूल्यांकन बनाने का सुझाव देते हैं।'
      }
    },
    'real-time': {
      'stepOne': {
        'title': 'प्रतिक्रियाओं का विश्लेषण',
        'description': 'छात्रों के उत्तर का विश्लेषण देखने के लिए प्रत्येक प्रश्न पर क्लिक करें।'
      },
      'stepTwo': {
        'title': 'व्यक्तिगत छात्र डेटा',
        'description': 'व्यक्तिगत छात्र डेटा रिपोर्ट देखने के लिए प्रत्येक छात्र टाइल का चयन करें।'
      },
      'stepThree': {
        'title': 'दृश्य का चयन करें',
        'description': 'डेटा प्रदर्शित करने के विकल्पों को देखने के लिए \'शीर्षक दृश्य\' या \'सूची दृश्य\' का चयन करें।'
      },
      'stepFour': {
        'title': 'औसत अंक',
        'description': 'सभी प्रतिक्रियाओं के लिए वास्तविक समय में गणना की गई कक्षा औसत देखें।'
      },
      'stepFive': {
        'title': 'परियोजना अज्ञात डेटा',
        'description': 'छात्र डेटा के अज्ञात दृश्य को प्रोजेक्ट करने के लिए इस विकल्प का उपयोग करें।'
      }
    }
  },
  'gru-course-play': {
    'hide-unit-details': 'इकाई मेटाडेटा छुपाएं',
    'view-unit-details': 'इकाई मेटाडेटा देखें',
    'performance': 'प्रदर्शन'
  },
  'gru-century-skills': {
    'legends': {
      'hewlett': 'हेवलेट डीपर लर्निंग मॉडल',
      'conley': 'कोनली फोर कीज़',
      'framework': 'पी21 ढांचा',
      'national': 'जीवन और कार्य के लिए राष्ट्रीय शोध केंद्र'
    },
    'content': {
      'groups': {
        'cognitive': 'महत्वपूर्ण संज्ञानात्मक कौशल और रणनीतियों',
        'content': 'मुख्य सामग्री ज्ञान',
        'learning': 'मुख्य सीखने के कौशल और तकनीकें'
      }
    }
  },
  'gru-rubric-edit': {
    'upload-rubric': 'सुर्खी अपलोड करें',
    'copy': {
      'success-message': 'आपने सुर्खी {{title}} की प्रतिलिपि बनाई है। क्या आप उस सुर्खी को संपादित करना चाहते हैं?'
    }
  },
  'gru-rubric-creation': {
    'url': 'यूआरएल',
    'upload-file': 'फाइल अपलोड करें',
    'add-category': 'नया वर्ग जोड़ें',
    'gru-preview-url': {
      'preview': 'ऊपर सुर्खी जोड़ें और यहां पूर्वावलोकन करें'
    },
    'overall-narrative': 'समग्र कथा प्रतिक्रिया',
    'feedback-guidance': 'प्रतिक्रिया मार्गदर्शन',
    'required-feedback': 'प्रतिक्रिया की आवश्यकता है',
    'feedback-guidance-placeholder': 'निबंध पर पूरी तरह से अपनी प्रतिक्रिया सारांशित करें।',
    'gru-category': {
      'category-title': 'वर्ग शीर्षक',
      'category-feedback': 'चूंकि आप इस श्रेणी की समीक्षा कर रहे हैं, लेखक के उद्देश्य पर सावधानीपूर्वक ध्यान दें।',
      'gru-scoring-levels': {
        '0': 'उदाहरण: प्रवीणता से अधिक',
        '1': 'उदाहरण: बैठक की प्रवीणता',
        '2': 'उदाहरण: प्रवीणता के करीब',
        '3': 'उदाहरण: प्रवीणता शुरू करना',
        '4': 'उदाहरण: प्रवीणता का कोई प्रमाण नहीं',
        'best': 'श्रेष्ठतम',
        'levels': 'स्तर',
        'new-level': 'नया स्तर जोड़ें',
        'scoring': 'स्कोरिंग',
        'worst': 'सबसे खराब',
        'name-error': 'कृपया स्तर का शीर्षक दर्ज करें।',
        'score-error': 'कृपया स्कोर मान दर्ज करें।',
        'no-levels-error': 'कृपया कम से कम एक स्तर के लिए एक मूल्य निर्धारित करें।'
      }
    }
  },
  'library': {
    'browse-library': 'लाइब्रेरी ब्राउज़ करें',
    'featured-courses': 'फीचर्ड पाठ्यक्रम',
    'gru-library-card': {
      'featured-course': 'फीचर्ड पाठ्यक्रम'
    },
    'gru-partner-library-card': {
      'course': {
        'zero': '{{गिनती}} पाठ्यक्रम',
        'one': '{{गिनती}} पाठ्यक्रम',
        'other': '{{गिनती}} पाठ्यक्रम'
      },
      'collection': {
        'zero': '{{count}} संकलन',
        'one': '{{count}} संकलन',
        'other': '{{count}} संकलन'
      },
      'assessment': {
        'zero': '{{गिनती}} मूल्यांकन',
        'one': '{{गिनती}} मूल्यांकन',
        'other': '{{गिनती}} मूल्यांकन'
      },
      'resource': {
        'zero': '{{गिनती}} संसाधन',
        'one': '{{गिनती}} संसाधन',
        'other': '{{count}} संसाधन'
      },
      'question': {
        'zero': '{{गिनती}} प्रश्न',
        'one': '{{गिनती}} प्रश्न',
        'other': '{{count}} प्रश्न'
      },
      'rubric': {
        'zero': '{{गिनती}} सुर्खी',
        'one': '{{गिनती}} सुर्खी',
        'other': '{{गिनती}} सुर्खी'
      }
    },
    'partner-libraries': 'साथी पुस्तकालय'
  },
  'gru-study-header': {
    'lesson-legend': 'आप वर्तमान में पाठ पर हैं',
    'resource-legend': 'आप इस संसाधन की जांच कर रहे हैं।',
    'resources-collection-report': 'संचयन उपयोग रिपोर्ट',
    'resources-assessment-report': 'मूल्यांकन सारांश रिपोर्ट',
    'check-summary': 'अपनी सारांश रिपोर्ट की जांच करें',
    'check-usage': 'अपनी उपयोग रिपोर्ट की जांच करें',
    'no-suggestions': 'हम आपके सीखने का समर्थन करने के लिए सर्वोत्तम सुझावों पर काम कर रहे हैं',
    'resource': {
      'zero': 'संसाधन',
      'one': 'संसाधन',
      'other': 'साधन'
    },
    'question': {
      'zero': 'प्रश्न',
      'one': 'प्रश्न',
      'other': 'प्रश्न'
    },
    'suggestions-legend': 'और जानने के लिए, इन संसाधनों की जांच करें।'
  },
  'gru-suggest-test': {
    'pre-test-header': 'प्री-टेस्ट (वैकल्पिक)',
    'post-test-header': 'पोस्ट-टेस्ट (वैकल्पिक)',
    'backfill-header': 'सुझाया गया संकलन (वैकल्पिक)',
    'benchmark-header': 'बेंचमार्क-परीक्षण (वैकल्पिक)',
    'resource-header': 'सुझाया गया संसाधन (वैकल्पिक)',
    'signature_collection-header': 'सुझाया गया संकलन (वैकल्पिक)',
    'signature_collection-lead': 'इस पाठ्यक्रम पर आपके प्रदर्शन के आधार पर, निम्नलिखित संकलन आपकी समझ को बढ़ा सकता है।',
    'signature_assessment-header': 'सुझाए गए मूल्यांकन (वैकल्पिक)',
    'signature_assessment-lead': 'इस पाठ्यक्रम पर आपके प्रदर्शन के आधार पर, निम्नलिखित मूल्यांकन आपकी समझबूझ को बढ़ा सकता है।',
    'pre-test-lead': 'इस पाठ में अवधारणाओं की अपनी वर्तमान समझ को मापने के लिए एक प्री-टेस्ट का सुझाव दिया जाता है। प्री-टेस्ट आपको पाठ में सामग्री को तैयार करने में मदद कर सकता है। प्री-टेस्ट आपके पाठ्यक्रम प्रदर्शन स्कोर को प्रभावित नहीं करेगा।',
    'post-test-lead': 'प्रस्तुत की गई जानकारी की आपकी समझ को मापने के लिए निम्नलिखित पोस्ट-टेस्ट का सुझाव दिया गया है। पोस्ट-टेस्ट आपके पाठ्यक्रम प्रदर्शन स्कोर को प्रभावित नहीं करेगा।',
    'backfill-lead': 'आपकी प्री-टेस्ट की प्रतिक्रियाओं के आधार पर, पाठ शुरू करने से पहले अतिरिक्त सामग्री की समीक्षा करना उपयोगी हो सकता है। सहायक सामग्री की समीक्षा करने से छात्रों को नई चीजें सीखने में मदद मिल सकती है।',
    'benchmark-lead': 'अब आप बेंचमार्क मूल्यांकन करके अपनी समझबूझ का प्रदर्शन करने के लिए तैयार हैं। आप सफलतापूर्वक बेंचमार्क को पूरा करने के बाद बैज अर्जित करेंगे। बेंचमार्क आपके पाठ्यक्रम प्रदर्शन स्कोर को प्रभावित नहीं करेगा।',
    'resource-lead': 'इस पाठ्यक्रम पर आपके प्रदर्शन के आधार पर, निम्नलिखित संसाधन आपकी समझबूझ को बढ़ा सकता है।',
    'no': 'जी नहीं, धन्यवाद',
    'no-suggestions': 'यहां आपके प्रदर्शन का सारांश दिया गया है।',
    'take': '{{type}} लें',
    'take-signature-collection': ' सुझाव दिए गए संकलन का अध्ययन करें',
    'take-signature-assessment': ' सुझाव दिए गए मूल्यांकन का अध्ययन करें',
    'take-backfill-pretest': ' सुझाव दिए गए संकलन का अध्ययन करें',
    'take-resource': 'संसाधन का अध्ययन करें',
    'end-of-course': 'आप पाठ्यक्रम के अंत तक पहुंच गए हैं।'
  },
  'gru-content-suggestion': {
    'header': 'हमारे पास आपके लिए एक सुझाव है!',
    'suggestion-text': {
      'collection': 'इस विषय पर आपके प्रदर्शन के आधार पर, हम सलाह देते हैं कि आप हमारे सुझाए गए संग्रह से गुजरें जो आपको मास्टरी प्राप्त करने में मदद करेगा।',
      'assessment': 'इस विषय पर आपके प्रदर्शन के आधार पर, हम सलाह देते हैं कि आप हमारे सुझाए गए मूल्यांकन से गुजरें जो आपको मास्टरी प्राप्त करने में मदद करेगा।'
    }
  },
  'student-open-ended-summary': {
    'overall-comment': 'समग्र टिप्पणी',
    'overall-score': 'समग्र स्कोर',
    'prompt': 'प्रश्न संकेत'
  },
  'gru-performance-chart': {
    'teacher-tooltip': 'आपके छात्रों ने इस पाठ के सभी मूल्यांकन पूरे कर लिए हैं'
  },
  'report': {
    'external-assessment-report': {
      'note': 'मूल्यांकन के लिए छात्र रिपोर्ट स्कोर के साथ यह एक बाहरी मूल्यांकन है। व्यक्तिगत प्रश्न स्तर डेटा उपलब्ध नहीं है।',
      'wish': 'बधाई हो! आपने स्कोर किया',
      'reference': 'इस बाहरी मूल्यांकन का उपयोग किया जा सकता है'
    },
    'competency-report': {
      'title': 'योग्यता रिपोर्ट',
      'no-subject': 'कोई विषय असाइन नहीं किया गया'
    },
    'domain-report': 'डोमेन रिपोर्ट'
  },
  'self-report': {
    'your-score': 'आपका स्कोर',
    'update-error': 'स्कोर अपडेट करने में समस्या',
    'validation-error': 'वैध स्कोर दर्ज करें',
    'enter-score': 'अपना स्कोर यहां दर्ज करें'
  }
});
