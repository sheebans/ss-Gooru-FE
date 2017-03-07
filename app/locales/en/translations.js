export default {
  errors: {
    description: "This field",
    inclusion: "{{description}} is not included in the list",
    exclusion: "{{description}} is reserved",
    invalid: "{{description}} is invalid",
    confirmation: "{{description}} doesn't match {{on}}",
    accepted: "{{description}} must be accepted",
    empty: "{{description}} can't be empty",
    blank: "{{description}} can't be blank",
    present: "{{description}} must be blank",
    collection: "{{description}} must be a collection",
    singular: "{{description}} can't be a collection",
    tooLong: "{{description}} is too long (maximum is {{max}} characters)",
    tooShort: "{{description}} is too short (minimum is {{min}} characters)",
    before: "{{description}} must be before {{before}}",
    after: "{{description}} must be after {{after}}",
    wrongDateFormat: "{{description}} must be in the format of {{format}}",
    wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
    notANumber: "{{description}} must be a number",
    notAnInteger: "{{description}} must be an integer",
    greaterThan: "{{description}} must be greater than {{gt}}",
    greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
    equalTo: "{{description}} must be equal to {{is}}",
    lessThan: "{{description}} must be less than {{lt}}",
    lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
    otherThan: "{{description}} must be other than {{value}}",
    odd: "{{description}} must be odd",
    even: "{{description}} must be even",
    positive: "{{description}} must be positive",
    date: "{{description}} must be a valid date",
    email: "{{description}} must be a valid email address",
    phone: "{{description}} must be a valid phone number",
    url: "{{description}} must be a valid url"
  },
  /*
   * COMMON: Translations used globally in the app or shared between components
   */
  "common": {
    "a-collection": "a collection",
    "a-course": "a course",
    "a-question": "a question",
    "a-resource": "a resource",
    "an-assessment": "an assessment",
    "about": "About",
    "about-you": "About You",
    "add": "Add",
    "add-assessment": "Create New Assessment",
    "add-century-skills": "Add 21st Century Skills",
    "add-collaborator": "Add Collaborator",
    "add-collection": "Create New Collection",
    "add-collection-item": "Create Resource or Question",
    "add-competency": "Add Competency",
    "add-content-prompt": "You haven't created <span>{{type}}</span> yet. Go on, be bold.",
    "add-course": "Create New Course",
    "add-domains-to-unit": "Add Domains to Unit",
    "add-url": "Add URL",
    "add-from-url": "Add from URL",
    "add-lessons": "Add Lessons",
    "add-new-lesson": "Create New Lesson",
    "add-new-unit": "Create New Unit",
    "add-new-resource": "Create New Resource",
    "add-new-question": "Create a new question",
    "add-question": "Create Question",
    "add-question-image": "Add Question Image",
    "add-standard": "Add Standard",
    "add-standards": "Add Standards",
    "add-standards-to-collection": "Add Standards to Collection",
    "add-to": "Add To",
    "add-to-collection-success": "You've added {{contentTitle}} to {{collectionTitle}}. Do you want to edit that {{collectionType}}?",
    "add-to-lesson-success": "You've added {{collectionTitle}} to {{lessonTitle}}. Do you want to edit that {{collectionType}}?",
    "add-type-question": "What type of question would you like to add?",
    "add-type-resource": "What type of resource is this?",
    "add-units": "Add Units",
    "advanced-editing": "Advanced Editing",
    "announcements": "Announcements",
    "anonymous_mode": "Anonymous Mode",
    "answer": "Your Answer",
    "answer-correct": "You are correct!",
    "answer-incorrect": "You are incorrect...",
    "answer-key-was-hidden": "Note: Your teacher has hidden the answer key.",
    "approved": "Approved",
    "assessment": "Assessment",
    "assessment-disabled": "You can't attempt this assessment",
    "assessment-external": "Assessment-External",
    "assessment-pl": {
      zero: "Assessments",
      one: "Assessment",
      other: "Assessments"
    },
    "assessment-title": "Assessment Title",
    "assessmentInitial": "A",
    "assessments": "Assessments",
    "assign": "Assign",
    "assign-to-class": "Assign to Classroom",
    "assign-to-course": "Assign to Course",
    "attempt": "Attempt number",
    "audience": "Audience",
    "avatarFor": "Avatar for",
    "averageScore": "Average Score",
    "back": "Back",
    "back-to-course-map": "Back to Course Map",
    "back-to-data": "Back to Data",
    "best-practices": "Best Practices",
    "beta": "Beta",
    "big-ideas": "Big Ideas",
    "biography": "Biography",
    "builder": "Editor",
    "cancel": "Cancel",
    "categories": "Categories",
    "category": "Category",
    "categoryOptions": {
      "k12": "K-12",
      "higher-ed": "Higher Education",
      "professional-dev": "Professional Development"
    },
    "century-skills": "21st Century Skills",
    "choose": "Choose",
    "choose-file":"Choose a file",
    "class": "Classroom",
    "classes": "Classrooms",
    "classScores": "Class Scores",
    "close": "Close",
    "collection": "Collection",
    "collection-pl": {
      zero: "Collections",
      one: "Collection",
      other: "Collections"
    },
    "collection-title": "Collection Title",
    "collections": "Collections",
    "collectionInitial": "C",
    "competency": "Competency",
    "competencies": "Competencies",
    "completed": "Completed",
    "confirm-copy":"Confirm & Copy",
    "content": "Content",
    "contentUnavailable": "Content not available",
    "contributed-by":"Contributed by",
    "copy": "Copy",
    "copy-to": "Copy To",
    "correct": "Correct",
    "correct-answer": "Correct Answer",
    "country": "Country",
    "course-map": "Course Map",
    "course": "Course",
    "course-title": "Course Title",
    "courses": "Courses",
    "create": "Create",
    "create-class": "+ Create classroom",
    "created-by": "Created by",
    "current-attempt":"Current Attempt",
    "delete": "Delete",
    "delete-instructions": {
      "links-inaccessible": "All share links will be inaccessible",
      "content-inaccessible": "All content will be inaccessible to the classrooms tied to it"
    },
    "depth-of-knowledge": "Depth of Knowledge",
    "description": "Description",
    "district": "District",
    "domain": "Domain",
    "domains": "Domains",
    "drag-drop-suggestions": "Or Drag and Drop Suggestions ...",
    "download-report": "Download Report",
    "edit": "Edit",
    "edit-assessment": "Edit Assessment",
    "edit-collection": "Edit Collection",
    "edit-course": "Edit Course",
    "edit-question": "Edit Question",
    "edit-resource": "Edit Resource",
    "email_support": "support@gooru.org",
    "emotions": {
      "emotion-1": "I need help",
      "emotion-2": "I don't understand",
      "emotion-3": "Meh...",
      "emotion-4": "I understand",
      "emotion-5": "I can explain"
    },
    "enter-url": "Enter URL",
    "errors": {
      "join-class-code": "Please enter the classroom code.",
      "answer-has-no-image": "Please upload an answer image.",
      "add-username": "Please enter a username.",
      "add-course-title": "Please enter the course title.",
      "add-question-answer-text": "Please enter the answer choice text.",
      "add-question-description": "Please enter the question.",
      "add-question-title": "Please enter the question title.",
      "assessment-title-presence": "Please enter the assessment title.",
      "can-not-join-class": "Oops! Unable to join classroom. Please try again shortly.",
      "assessment-not-added-to": "Oops! Unable to add assessment to lesson right now. Please try again shortly.",
      "assessment-not-copied": "Oops! Unable to copy assessment right now. Please try again shortly.",
      "assessment-not-created": "Oops! Unable to create assessment right now. Please try again shortly.",
      "assessment-not-updated": "Oops! Unable to update assessment right now. Please try again shortly.",
      "class-min-score": "The minimum score should be a number between 1 and 100",
      "class-not-created": "Oops! Unable to create classroom right now. Please try again shortly.",
      "class-title-presence": "Please give your classroom a name.",
      "collection-not-added-to": "Oops! Unable to add collection to lesson right now. Please try again shortly.",
      "collection-not-copied": "Oops! Unable to copy collection right now. Please try again shortly.",
      "collection-not-created": "Oops! Unable to create collection right now. Please try again shortly.",
      "collection-not-updated": "Oops! Unable to update collection right now. Please try again shortly.",
      "collection-title-presence": "Please enter the collection title.",
      "correct-answer-presence": "Please indicate the correct answer.",
      "course-not-copied": "Oops! Unable to copy course right now. Please try again shortly.",
      "course-not-created": "Oops! Unable to create course right now. Please try again shortly.",
      "course-not-updated": "Oops! Unable to update course right now. Please try again shortly.",
      "highlight-text-not-selected": "Please indicate the correct answer.",
      "highlight-text-wrong-format": "Incorrect question format.",
      "hotspot-text-max-choices": "You have reached the limit of answer choices.",
      "file-max-size": "Only files of size smaller than 5MB are supported",
      "file-upload-missing": "Please select a file with any of the following extensions: {{extensions}}",
      "lesson-not-copied": "Oops! Unable to copy lesson right now. Please try again shortly.",
      "lesson-not-created": "Oops! Unable to create lesson right now. Please try again shortly.",
      "lesson-not-loaded": "Oops! Unable to load lesson right now. Please try again shortly.",
      "lesson-title-required" : "Please enter the lesson title.",
      "password-confirm": "Please confirm your password.",
      "password-length": "Password must be between 5 and 14 characters.",
      "password-not-match": "Passwords do not match.",
      "password-required": "Please enter a password.",
      "password-special-characters": "Please don't use special characters.",
      "profile-not-updated": "Oops! Unable to update profile right now. Please try again shortly.",
      "question-not-added-to": "Oops! Unable to add question to {{collectionType}} right now. Please try again shortly.",
      "question-not-copied": "Oops! Unable to copy question right now. Please try again shortly.",
      "question-not-created": "Oops! Unable to create question right now. Please try again shortly.",
      "question-not-updated": "Oops! Unable to update question right now. Please try again shortly.",
      "reset-password-error": "Uh oh! Something’s not right. Unable to reset password. Please try again shortly.",
      "reset-google-account-exists": "Your email login was created with a Google account and we cannot reset a Google password. If you forgot your Google password, you will need to reset it through your Google apps.",
      "resource-description-length": "The description cannot be longer than 500 characters.",
      "resource-invalid-url": "Invalid URL.",
      "resource-missing-title": "Please enter a resource title.",
      "resource-missing-type": "Please select a resource type.",
      "resource-missing-url": "Please enter a valid URL.",
      "resource-not-added-to-collection": "Oops! Unable to add resource to collection right now. Please try again shortly.",
      "resource-not-copied": "Oops! Unable to copy resource right now. Please try again shortly.",
      "resource-not-created": "Oops! Unable to create resource right now. Please try again shortly.",
      "resource-not-updated": "Oops! Unable to update resource right now. Please try again shortly.",
      "resource-same-host-url": "Resources cannot be Gooru URLs.",
      "resource-title-length": "The title cannot be longer than 50 characters.",
      "select-correct-answer": "Please select the correct answer.",
      "search-collections-length": "Please enter at least 3 characters.",
      "sign-in-credentials-not-valid": "Uh oh! Something's not right. Please double check your username and password and try again.",
      "sign-in-google-account-exists": "Please use Google signin. We can't reset your password.",
      "sign-up-error": "Oops! Unable to sign up right now. Please try again shortly.",
      "sign-up-first-name": "Please enter your first name.",
      "sign-up-last-name": "Please enter your last name.",
      "sign-up-name-length": "Last name must have at least 2 letters.",
      "sign-up-name-only-letters": "Please enter only letters.",
      "sign-up-valid-email": "Please enter a valid email address.",
      "special-characters": "You cannot use special characters or spaces.",
      "unit-not-copied": "Oops! Unable to copy unit right now. Please try again shortly.",
      "unit-not-created": "Oops! Unable to create unit right now. Please try again shortly.",
      "unit-not-loaded": "Oops! Unable to load unit right now. Please try again shortly.",
      "unit-title-required": "Please enter the unit title.",
      "user-email-presence": "Please enter a valid email.",
      "username-length": "Username must be between 4 and 16 characters.",
      "forgot-password-gmail": "Please use Google signin. We can't reset your password."
    },
    "essential-questions": "Essential Questions",
    "explanation": "Explanation",
    "false": "False",
    "featured-courses": "Featured&ensp;Courses",
    "file-name": "File name",
    "finish": "Finish",
    "first-name": "First Name",
    "follow": "Follow",
    "followers": "Followers",
    "following": "Following",
    "forgotPassword": "Forgot Password",
    "from": "from",
    "from-my-assessments": "From My Assessments",
    "from-my-collections": "From My Collections",
    "from-my-questions": "From My Questions",
    "from-my-resources": "From My Resources",
    "hide-results": "Hide Results",
    "hints": "Hints",
    "home": "Home",
    "if_questions": "If you have any questions,",
    "information": "Information",
    "in-progress": "In Progress",
    "last-name": "Last Name",
    "last-updated": "Last Updated",
    "latest-attempt":"Latest attempt",
    "launch-anonymous": "Launch Anonymous",
    "launch-on-air": "Go Live",
    "learning-objectives": "Learning Objectives",
    "learning-target": "Micro-standard",
    "learning-target-mobile": "Micro-standard in Standard",
    "lesson": "Lesson",
    "lessonInitial": "L",
    "lesson-title": "Lesson Title",
    "lessonObj": {
      zero: "Lessons",
      one: "Lesson",
      other: "Lessons"
    },
    "libraries": "Libraries",
    "license": "License",
    "link-out":"Link-out",
    "link-out-message":"*If your resource is showing up blank in the preview above, it may need a “link-out” to another page to view the content.",
    "loading": "Loading ...",
    "login": "Log In",
    "logout": "Logout",
    "mastery": "Mastery",
    "menu": "Menu",
    "more-details": "More Details",
    "move": "Move",
    "myContent": "My Content",
    "myPerformance":"My Performance",
    "edit-narration": "Edit Narration",
    "narration": "Narration",
    "new-assessment": "New Assessment",
    "new-collection": "New Collection",
    "new-question": "New Question",
    "new-question-text": "Enter question text here",
    "new-resource": "New Resource",
    "next": "Next",
    "no": "No",
    "no-content": "No content available",
    "no-assessments-to-display": "No <span>assessments</span> to display.",
    "no-collections-to-display": "No <span>collections</span> to display.",
    "no-courses-to-display": "No <span>courses</span> to display.",
    "no-questions-to-display": "No <span>questions</span> to display.",
    "no-resources-to-display": "No <span>resources</span> to display.",
    "no-followers": "You don't have followers yet.",
    "no-results": "No results found",
    "no-results-message": "Check your spelling. We all make mistakes!<br/>Go broader and remove some filters.<br/> Or try searching for a similar word instead.",
    "no-more-attempts": "No more attempts",
    "notStarted": "Not started",
    "not-added": "Not Added",
    "not-applicable": "N/A",
    "not-following": "You're not following anyone.",
    "not-provided": "Not provided",
    "not-specified": "Not specified",
    "not_started": "Not Started",
    "nothing-to-display": "Nothing to display.",
    "number": "No.",
    "numberStudents": {
      zero: "{{count}} Students",
      one: "{{count}} Student",
      other: "{{count}} Students"
    },
    "of": "of",
    "off":"OFF",
    "on":"ON",
    "other": "Other",
    "overall-performance": "Overall Performance",
    "password": "Password",
    "pending": "Pending",
    "performance": "Show Performance",
    "play": "Play",
    "please_contact": "Please contact",
    "post-message": "Post Message",
    "preview": "Preview",
    "profile": "Profile",
    "profile-publishing": "Profile Visibility",
    "publish-to": " Make this visible to others on my profile library",
    "published-by": "Published by",
    "published-tooltip": "Badged Content",
    "publisher": "Publisher",
    "question": "Question",
    "questions": "Questions",
    "questions-OE": "Free Response Questions",
    "question-pl": {
      zero: "Questions",
      one: "Question",
      other: "Questions"
    },
    "question-title": "Question Title",
    "question-type": {
      "SA": "Single Answer",
      "MC": "Multiple Choice",
      "FIB": "Fill In the Blank",
      "T/F": "True or False",
      "T_F": "True or False",
      "MA": "Multiple Answer",
      "OE": "Free Response",
      "HS_TXT": "Multiple Select - Text",
      "HS_IMG": "Multiple Select - Image ",
      "HT_TO": "Drag and Drop Order",
      "HT_RO": "Drag and Drop Order",
      "HT_HL": "Highlight Text"
    },
    "reaction": "Reaction",
    "read-first":"<b>Read this first!</b>",
    "remaining": "{{number}} Left",
    "remix": "Remix",
    "remix-assessment": "Remix Assessment",
    "remix-assessment-lead": "You are about to remix an assessment.",
    "remix-assessment-success": "You've remixed an assessment {{assessmentTitle}}. Do you want to edit that assessment?",
    "remix-collection": "Remix Collection",
    "remix-collection-lead": "You are about to remix a collection.",
    "remix-collection-success": "You've remixed a collection {{collectionTitle}}. Do you want to edit that collection?",
    "remix-course": "Remix Course",
    "remix-course-lead": "You are about to remix a course.",
    "remix-course-success": "You've remixed a course {{courseTitle}}. Do you want to edit that course?",
    "remix-lesson": "Remix Lesson",
    "remix-lesson-lead": "You are about to remix an lesson.",
    "remix-lesson-success": "You've remixed a lesson {{lessonTitle}}.",
    "remix-question": "Remix Question",
    "remix-question-lead": "You are about to remix a question.",
    "remix-question-success": "You've remixed a question {{questionTitle}}. Do you want to edit that question?",
    "remix-resource": "Remix Resource",
    "remix-resource-lead": "You are about to remix a resource.",
    "remix-resource-success": "You've remixed a resource {{resourceTitle}}. Do you want to edit that resource?",
    "remix-unit": "Remix Unit",
    "remix-unit-lead": "You are about to remix a unit.",
    "remix-unit-success": "You've remixed a unit {{unitTitle}}.",
    "remixed-by": "Remixed by",
    "remix-warning":"Heads up! There’s a lot of awesome content in this course and making a copy will take time. Confirm you want to start the process and in 15 minutes you will find your copy of this course on your <b>Profile.</b>",
    "remove": "Remove",
    "report-in-progress": "Report in progress",
    "request-to": "Request to be reviewed for a badge",
    "request-report": "Request Report",
    "resource": "Resource",
    "resources": "Resources",
    "resource-format": {
      "image": "Image",
      "text": "Text",
      "video": "Video",
      "interactive": "Interactive",
      "webpage": "Webpage",
      "audio": "Audio",
      "question": "Question"
    },
    "resource-pl": {
      zero: "Resources",
      one: "Resource",
      other: "Resources"
    },
    "resource-title": "Resource Title",
    "resource-url": "Resource URL",
    "role": "Role",
    "save": "Save",
    "save-next": "Save and Next",
    "save-submit": "Save and Submit All",
    "save-finish": "Save and Finish",
    "school": "School",
    "school-info": "School Information",
    "score": "Score",
    "select": "Select",
    "select-a-framework": "Please first select a Standards Framework in the Course Information section above.",
    "sentence": "Sentence",
    "settings": "Settings",
    "search": "Search",
    "search-placeholder": "Search",
    "search-error-message": "Search terms need to be at least 3 letters.",
    "search-400-error-message": "Please enter a valid search term",
    "search-competency": "Search Competency",
    "search-standards": "Search Standards",
    "select-question-type": "Select Question Type",
    "select-resource-type": "Select Resource Type",
    "send-request": "Send Request",
    "show-correct-answer": "Show Correct Answer",
    "show-more-results": "Show More Results",
    "show-results": "Show Results",
    "signUp": "Sign Up",
    "sortAlphabetical": "Sort Alphabetically",
    "sortAverage": "Sort by Average",
    "state": "State or Territory",
    "standard": "Standard",
    "standards": "Standards",
    "study": "Study",
    "student": "Student",
    "student-id": "Student ID (not displayed on Profile)",
    "subject-and-framework": "Subject and Framework",
    "submit": "Submit",
    "submit-all": "Submit all",
    "swap": "Re-order",
    "suggested-resources": "Suggested Resources",
    "support": "Support",
    "start-tour": "Take a tour",
    "teach": "Teach",
    "teacher": "Teacher",
    "timeSpent": "Time Spent",
    "toggle-dropdown": "Toggle Dropdown",
    "true": "True",
    "type": "Type",
    "unexpectedError": "An unexpected error has occurred and has been reported. We're sorry for the inconvenience!",
    "unfollow": "Unfollow",
    "unit": "Unit",
    "unit-title": "Unit Title",
    "unitInitial": "U",
    "unitObj": {
      zero: "Units",
      one: "Unit",
      other: "Units"
    },
    "untitled-course": "Course 1",
    "untitled-lesson": "Untitled Lesson",
    "untitled-unit": "Untitled Unit",
    "update-thumbnail": "Update Thumbnail",
    "upload": "Upload",
    "upload-file": "Upload File",
    "upload-thumbnail": "Upload Thumbnail",
    "use-case": "Use Case",
    "valid-extensions": "Valid file extensions are: {{extensions}}",
    "verified": "Verified",
    "visibility-tooltip":"Not visible to others",
    "warnings": {
      "on-air-connection-lost": "The Go Live dashboard has lost connection and is retrying automatically. It's tempting, but please don't refresh your screen!",
      "character-limit": "You've reached the character limit."
    },
    "word": "Word",
    "yes": "Yes"
  },

  /*
   * CONTROLLERS: Translations used in a specific controller
   */
  "index": {
    "joinUs": "Join Us to <br/> Honor the Human Right to <br/> Education",
    "browseContent": {
      "title": "Hi there! What are you looking for?",
      "description_1": "I am looking for",
      "description_2": "learning materials in",
      "description_3": "or",
      "button": "Browse Content",
      "footer": {
        "description_1": "Already have an account? ",
        "description_2": " here.",
        "login": "Login"
      },
      "grades_missing_message": "Please select Grade and Subject.",
      "subjects_missing_message": "Please select Subject."
    },
    "gettingStarted": {
      "title": "Getting Started with Gooru",
      "toolkit": {
        "title": "Getting Started Toolkit",
        "description": "Welcome to Gooru! Check out these resources to learn what you can do with Gooru and get started quickly."
      },
      "classroom": {
        "title": "Stories from the Classroom",
        "description": "Learn by example through stories of teachers who say Gooru has made a difference in their classroom."
      },
      "events": {
        "title": "Check Out our Events!",
        "description": "We offer free webinars and trainings to help you get started with Gooru."
      }
    },
    "empowerStudents": {
      "title": "Empower Students to Learn Their Way",
      "find": "Find",
      "remix": "Remix",
      "share": "Share",
      "monitor": "Monitor"
    },
    "findDescription": "Browse thousands of K-12 collections made by teachers, or search over 16M resources",
    "remixDescription": "Remix collections and customize content to meet your students' needs.",
    "shareDescription": "Share collections with students through Gooru classrooms. Login is not required to access.",
    "monitorDescription": "Measure your students' engagement and progress to intervene in real-time.",
    "freeAndOpen": {
      "title": "Free and Open.<br/>Always.",
      "description": "We believe education is a human right. Gooru will always be free of cost and ads for educators and students worldwide.",
      "button": "Learn More about Our Approach"
    }
  },
  "class": {
    "info": {
      "class-info": "Classroom Information",
      "teachers": "Teachers",
      "students": "Students",
      "subject": "Subject",
      "grade": "Grade",
      "description": "Description",
      "edit-info": "Edit Information",
      "share-class": "Share Classroom",
      "invite-co-teachers": "Invite Co-teachers",
      "add-students": "Add Students",
      "class-code": "Classroom Code",
      "delete": "Delete Classroom"
    },
    "edit": {
      "assigned-course": "Assigned course",
      "basic-info": "Basic Information",
      "class-name": "Classroom Name",
      "class-greetings": "Classroom Announcements",
      "class-greetings-placeholder": "Greet your students, motivate them, or make an announcement, etc.",
      "class-minscore": "Assessment Minimum Score for Trophies (1-100%)",
      "course-map": "Course Map",
      "edit-class": "Edit Classroom Settings"
    },
    "overview": {
      "title": "Course Map",
      "locate": "Locate Me",
      "editContent": "Edit Content"
    },
    "analytics": {
      "performance": {
        "title": "View Performance",
        "better-experience-message": "For a better Gooru experience, view full Classroom Analytics in tablet or desktop.",
        "actions": {
          "share": "Share",
          "edit": "Edit Content",
          "download": "Download",
          "fullScreen": "View Full Screen",
          "exitFullScreen": "Exit Full Screen",
          "assessment": "View Assessment",
          "collection": "View Collection",
          "both": "View Both"
        },
        "teacher": {
          "metricsTable": {
            "average": "Average",
            "class-average": "Class Average"
          }
        }
      },
      "mastery": {
        "title": "View Mastery"
      }
    },
    "quick-start": {
      "title": "Assign content to this classroom.",
      "new-course": "Quickstart a New Course",
      "new-course-desc": "Start by creating a collection or assessment",
      "new-collection": "New Collection",
      "new-assessment": "New Assessment",
      "remix-a-sample": "Remix a Sample",
      "add-existing-course": "Add a Course from your Library",
      "existing-course-desc": "The quickest way to start a classroom",
      "choose-course": "Choose Course",
      "remix-from-course": "Remix a Featured Course",
      "featured-course": "View Featured Courses",
      "remix-desc": "Copy and customize a featured course for your students."
    }
  },
  "classes": {
    "classesJoined": "Classrooms I've Joined",
    "classesTaught": "Classrooms I Teach",
    "noClassesJoined": "You have not joined any classrooms",
    "noClassesTaught": "You do not have any created classrooms"
  },
  "content": {
    "assessments":{
      "edit":{
          "best-practices": "<p>An assessment is a set of scored questions which you and your students can use to monitor understanding and performance.</p><p>Use a variety of question types (including several based on the SBAC) in your assessment so students can demonstrate understanding in different ways. We recommend tagging each question to standards, micro-standards, and Webb's Depth of Knowledge.</p>"
      }
    },
    "classes": {
      "create": {
        "title": "Create a Classroom",
        "content": "Where students engage with content.",
        "class-name-input": "Name your Classroom",
        "condition-prompt": "How will students join your classroom?",
        "condition-prompt-code": "Anyone with Classroom code",
        "condition-prompt-invite": "Invite only",
        "get-started": "Get Started"
      },
      "join": {
        "title": "Join a Classroom",
        "content": "Where the journey begins.",
        "class-code-input": "Enter a Classroom Code",
        "class-not-found": "Classroom not found. Make sure you've entered the correct classroom code",
        "invalid-code": "Invalid classroom code.",
        "already-member": "You are already a member of this classroom.",
        "join-class": "Join Classroom",
        "join-not-allowed": "You are not able to join this classroom",
        "not-now": "Not now",
        "terms-and-conditions": 'By clicking Join Classroom, I agree to share my assessment and collection progress data generated from studying this Gooru classroom with the teacher(s) of this classroom.'
      }
    },
    "collections":{
      "edit":{
        "assign-to-course": "Assign to Course",
        "best-practices": "<p>Students interact with your content at the collection level. When creating a learning collection, make sure to include learning objectives, and consider using a variety of resource types to expose students to the concepts in multiple ways.</p><p>Use the sequencing of the resources to build on concepts. Progression through a collection should flow in a logical manner and take the intended audience from a general to more complex level of understanding if appropriate, or allow adequately for student exploration.</p><p>Include checks for understanding along the way via our Gooru questions or other interactives. We recommend enough resources and/or enough variety of resources to accomplish the objectives in the collection and ensuring that each resource has a role and purpose.</p>"
      }
    },
    "courses":{
      "edit":{
        "assign-to-class": "Assign to Classroom",
        "best-practices": "<p>A course is a folder that allows you to organize your learning content into units and lessons. When creating a course consider the essential questions you are addressing, the learning objectives, and organization of your content.</p><p>You can piece the lessons together to create a diverse experience for your student population (for example, you could sequence your units chronologically, by topic, or by standard).</p>",
        "information": {
          "course-title": "Course Title",
          "description": "Description"
        }
      }
    },
    "questions":{
      "edit":{
        "add-to": "Add to",
        "best-practices": "<p>A question is a resource that requires an answer from the student, and we offer a variety of question types to support the kinds of questions your students will see on SBAC, PARCC and other assessments.</p><p>Consider alternating the kinds of questions you use to offer students exposure to these question types and to provide multiple formats for demonstrating knowledge.</p><p>Tag your questions to standards, micro-standards, and Webb's Depth of Knowledge. You can see how your students are interacting with questions through the teacher dashboard.</p>",
        "information": {
          "question-title": "Question Title",
          "question-type": "Question Type"
        },
        "builder": {
          "add-answer-choice": "+ Add Answer Choice",
          "add-hint": "Add Hints",
          "add-explanation": "Add Explanation",
          "answer": "Answer",
          "answer-instructions": {
            "FIB": "Add up to 5 hints for answer and an explanation.",
            "HS_IMG": "You can add up to ten answer images and select one or more correct answers.",
            "HS_TXT": "You can add up to ten answer choices and select one or more correct answers.",
            "HT_HL_ST": "As you write the question, use brackets to indicate the highlighted sentences. One bracket can only contain one sentence at a time, using a period inside the bracket. For example, The first little pig built his house of straw. [The big bad wolf blew down the house.] The second pig built his house of wood. Character limit: 5000.",
            "HT_HL_WD": "As you write the question, use brackets for the highlighted words. One bracket can only contain one word at a time. For example, The [big] bad wolf blew [down] the house. Character limit: 5000.",
            "HT_RO": "You can add up to ten answer choices in the correct order. The order will be scrambled for students.",
            "MA": "You can add up to ten answers, an image, an explanation, and up to five hints.",
            "MC": "You can add up to ten answer choices and indicate one correct answer. Character Limit: 200.",
            "OE": "Write the correct response. Character limit: 5000.",
            "T/F": "Select the correct answer."
          },
          "question-instructions": {
            "FIB": "As you write the question, use brackets for your fill-in-the-blank answers. For example: “The big bad [wolf] blew down the [house].” You can also add an image.",
            "HS_TXT": "Write your question.",
            "HS_IMG": "Write your question.",
            "HT_RO": "Write your question.",
            "HT_HL": "Write your question prompt.",
            "MC": "Write your question.",
            "MA": "Write your question.",
            "OE": "Write your question.",
            "T/F": "Write your question."
          }
        }
      }
    },
    "modals":{
      "delete-class":{
        "legend": "You're about to delete your classroom",
        "student-access": "Students won't be able to access the classroom",
        "student-data-deleted": "All student data will be deleted"
      },
      "delete-content": {
        "legend": "You are about to delete",
        "content-legend": "<span>{{type}}</span> {{index}} - {{title}} from {{parentName}}",
        "content-legend-header": "{{title}} from {{parentName}}",
        "delete-warning": "All content in this {{type}} will be deleted",
        "delete-error": "Oops! Unable to delete {{type}} right now. Please try again shortly.",
        "confirmation": "Are you sure you want to continue? Please type “delete” below and click “delete”."
      },
      "delete-resource": {
        "legend": "Confirm you want to permanently delete <b>{{title}}</b>",
        "delete-warning": "All content in this {{type}} will be deleted",
        "delete-error": "Oops! Unable to delete {{type}} right now. Please try again shortly.",
        "confirmation": "Are you sure you want to continue? Please click “Permanently Delete”.",
        "first-check": "This is a permanent delete and cannot be undone",
        "second-check": "Copies of this resource, in your collections and any collection by other users in the community, will be deleted"
      },
      "remove-content": {
        "legend": "You are about to remove <b>{{title}}</b> from <b>{{parentName}}</b>",
        "remove-error": "Oops! Unable to remove {{type}} right now. Please try again shortly.",
        "confirmation": "Are you sure you want to continue? Please type “remove” below and click “remove”."
      },
      "remove-student": {
        "title":"Remove student and delete their data",
        "legend": "You are about to remove {{studentName}} from this classroom and delete all of their data.",
        "data-inaccessible":"All their data will be deleted and not accessible by you or them",
        "classroom-access":"They will not have access to the classroom or content",
        "data-lost":"If they re-join the class, all past data will be lost",
        "remove-error": "Oops! Unable to remove this student right now. Please try again shortly.",
        "confirmation": "Are you sure you want to continue? Please type “delete” below and click “delete”."
      },
      "quick-remove-content":{
        "legend": "Confirm you want to remove <b>{{title}}</b> from <b>{{parentName}}</b>."
      },
      "quick-delete-content":{
        "legend": "Confirm you want to permanently delete <b>{{title}}</b> from <b>{{parentName}}</b>.",
        "delete": "Permanently Delete"
      }
    },
    "resources":{
      "edit": {
        "best-practices": "<p>Resources are multimedia content in a variety of formats such as videos, interactives, websites, images, Google docs, and more. Get creative and use your own resources or get “resourceful” and search our ample supply in Gooru.</p><p>Use a variety of resource types to engage your students and include narration so you can help guide your students through the resource.</p><p>We recommend tagging each question to standards, micro-standards and 21st century skills. You can see how your students are interacting with resources through the teacher dashboard.</p>",
        "placeholder-message": "Add a resource to <span>preview it here.</span>",
        "not-implemented": "Resource format preview <span>not implemented yet.</span>",
        "information": {
          "im-publisher": "I'm the publisher",
          "select-a-license": "Please select a license"
        }
      }
    }
  },
  "user": {
    "hello":"Hello, {{name}}!",
    "hi": "Hi",
    "active-classes": "Active Classrooms",
    "my-current-classes":"My Current Classes",
    "archived-classes": "Archived Classes",
    "create-class": "Create Classroom",
    "manage-goals": "Manage Goals",
    "join-class": "Join Classroom",
    "joined-classes": {
      zero: "You're currently not enrolled in classrooms",
      one: "You're currently enrolled in 1 classroom",
      other: "You're currently enrolled in {{count}} classrooms"
    },
    "my-classes":"My Classes",
    "teaching-classes": {
      zero: " and teaching {{count}} classrooms",
      one: " and teaching 1 classroom",
      other: " and teaching {{count}} classrooms"
    }
  },
  "student-landing":{
    "announcement":"Announcement",
    "announcements":"Please be aware that the school is operating under an early release schedule due to the threat of inclement weather",
    "box-title-one": "Study from 35 Courses",
    "box-text-one": "Choose from over 35 Navigator Courses across 10 programs to study.",
    "box-title-two": "Explore what you can learn",
    "box-text-two": "Before you make a decision, explore all the courses that you can take, learn about them and see what other students have to say.",
    "box-title-three": "Success in every course you study",
    "box-text-three": "Learn with the Navigator using real-time actionable data on your performance and progress and personalized learning pathways.",
    "box-title-four": "Reach the Goals you set",
    "box-text-four": "Set your goals, plan your activities and track your progress and achieve success each time.",
    "box-title-five": "Interact with your peers and instructors",
    "box-text-five": "Learn from your peers and mentors by asking your questions and following their work.",
    "class":{
      "performance": "Performance",
      "classmates": "Classmates",
      "course-map": "Course Map",
      "unit": "Unit",
      "leson": "Leson"
    },
    "current-activity":"Current activity"
  },
  "teacher-landing": {
    "latest-announcement":"Latest Announcement",
    "latest-assessment":"Latest Assessment",
    "class": {
      "class-activities": "Daily Class Activities",
      "course-map": "Course Map",
      "performance": "Performance",
      "management": "Roster Management",
      "class-management": "Class Management",
      "class-management-tab": {
        "class-information": "Class Information",
        "course-information": "Course Information",
        "teachers": "Teachers"
      }
    }
  },
  "goals":{
    "manage":{
      "title": "My Goals!",
      "add-goal": "Add Goal",
      "goal-label": "Goal",
      "start-date-label": "Start Date",
      "end-date-label": "End Date",
      "type-label": "Goal Type",
      "status-label": "Status",
      "not_started": "Not Started",
      "activated": "Activated",
      "completed": "Completed",
      "dropped": "Dropped",
      "reflection-label": "Reflection",
      "save": "Save",
      "update": "Update",
      "goals-not-found": 'You have not set any goals yet. You can add a goal by clicking "Add Goal" button above.'
    },
    "create":{
      "error-add-title": "Please enter the Goal",
      "error-length-title": "Goal must have max 200 characters",
      "error-add-start-date": "Please enter the Start Date",
      "error-add-end-date": "Please enter the End Date",
      "error-greater-end-date": "The End Date must be greater than the Start Date",
      "error-add-status": "Please select the Goal Status",
      "error-length-reflection": "Reflection must have max 2000 characters",
      "created-success-msg": "You've created the goal {{goalTitle}}"
    },
    "delete":{
      "deleted-success-msg": "You've deleted the goal"
    },
    "update":{
      "updated-success-msg": "You've updated the goal"
    }
  },

  /*
   * COMPONENTS: Translations used in a specific component
   */
  "gru-add-to": {
    "add-assessment-to-lesson": "Add from my assessments",
    "add-assessment-to-lesson-lead": "Select an assessment to add to this lesson.",
    "add-collection-to-lesson": "Add from my collections",
    "add-collection-to-lesson-lead": "Select a collection to add to this lesson.",
    "add-to-collection": "Add to collection",
    "add-to-collection-lead": "Choose a collection you want to add {{contentTitle}} to",
    "add-to-assessment": "Add to assessment or collection",
    "add-to-assessment-lead": "Choose an assessment you want to add {{contentTitle}} to",
    "assessments-info": "The assessments listed here <b>do not</b> belong to another lesson or course",
    "collections-info": "The collections listed here <b>do not</b> belong to another lesson or course"
  },
  "gru-assessment-confirmation":{
    "title": "You are about to start an assessment...",
    "description": "In this assessment, {{model.title}}",
    "setting-forward": "You can navigate forward only",
    "setting-forward-backward": "You can navigate forward and backwards to answer questions",
    "unlimited-attempts-left": 'You have unlimited attempts',
    "attempts-left": {
      zero:"You have {{count}} attempts",
      one:"You have 1 attempt left",
      other:"You have {{count}} attempts"
    },
    "unlimited-attempts":"You have unlimited attempts",
    "cancel": "Cancel",
    "continue": "Continue",
    "start": "Start!"
  },
  "gru-submit-confirmation":{
    "title": "Finish this quiz and submit all",
    "description": "You are about to end this attempt and submit all responses. Any skipped questions will be counted as incorrect.",
    "cancel": "Cancel",
    "confirm": "Finish Quiz",
    "finish-description": "Click “Finish Quiz” to submit your responses."
  },
  "gru-quick-course-search": {
    "add-from-course": "Add from Existing Course",
    "view-featured-courses": "View Featured Courses",
    "assign": "Assign"
  },
  "gru-share-pop-over": {
    "copy": "Copy",
    "ios-tooltip": "Hold tap to copy!",
    "multiarch-tooltip": "Press Ctrl + C to copy!",
    "safari-osx-tooltip": "Press Cmd + C to copy!",
    "share-course": "Share your course with link",
    "share-question": "Share your question with link",
    "share-resource": "Share your resource with link",
    "share-assessment": "Share your assessment with link",
    "share-collection": "Share your collection with link"
  },
  "gru-category-panel": {
    "teacher": {
      "title": "For Teachers",
      "body": "Discover standards-aligned content, customize content, and track student progress through data analytics.",
      "cta": "See Stories"
    },
    "student": {
      "title": "For Students",
      "body": "Explore interests, build, and monitor progress through learning materials.",
      "cta": "Enter",
      "text-placeholder": "Enter Classroom Code"
    },
    "district": {
      "title": "For Districts",
      "body": "Collaborate with Gooru to unleash personalized learning and share a district-vetted curriculum.",
      "cta": "See Our Impact"
    },
    "partner": {
      "title": "For Partners",
      "body": "Collaborate with mission-aligned partners to increase our collective impact on the education ecosystem.",
      "cta": "Learn More"
    }
  },
  "class.gru-class-navigation": {
    "active": "Active:",
    "members": "Members",
    "greetings": "Announcements",
    "overview": "Course Map",
    "analytics": "Data",
    "teams": "Teams",
    "information": "Classroom Information"
  },
  "gru-user-registration": {
    "joinTitle": "Join the Gooru Community!",
    "joinDescription": "Find, remix, and share the best free K-12 learning resources.",
    "googleButton": "Sign up with Google",
    "whyGoogle": "Why sign up with Google",
    "descriptionWhyGoogle": "It's fast and easy. Use your existing Google account to sign in without a password.",
    "or": "Or",
    "noGoogleAccount": "Don't have a Google account?",
    "signUpEmail": "Sign up with your email address",
    "haveAccount": "Already have an account?",
    "clickLogIn": "Click here to log in."
  },
  "sign-up": {
    "step-1-title": "Hello!",
    "step-1-description": "We’re glad you’ve decided to join us.",
    "step-child-title": "Not so fast!",
    "step-child-subtitle": "We cannot complete your registration.",
    "step-child-description-1": "Gooru could not create your account due to our ",
    "step-child-age-requirements": "Terms & Conditions",
    "step-child-description-2": ". Keep learning and see you in a few years!",
    "step-2-title": "Basic Info",
    "step-2-description": "You’re not basic, but this info is.",
    "log-in": "Log In",
    "log-in-description": "if you already have an account.",
    "google-button": "Sign Up with Google",
    "username": "Username",
    "dateOfBirth": {
      "title": "Birthday",
      "day": "Day",
      "month": "Month",
      "months": {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December"
      },
      "year": "Year",
      "error-message": 'Please enter your birth date.'
    },
    "email": "Email",
    "password": "Password",
    "rePassword": "Confirm Password",
    "state": "State or Territory",
    "district": "District or Charter Organization",
    "error-username-taken": "Aww, this username is taken. Try another.",
    "error-email-taken": "This email is taken. Try another.",
    "error-role-message": 'Please select a role.',
    "error-country-message": 'Please select your country.',
    "error-state-message": 'Please select your state or territory.',
    "error-district-message": 'Please select your district/charter from the list or provide it in "Other".'
  },

  "gru-user-sign-up-cancel": {
    "title": "Leave Registration?",
    "exit?": "Are you sure you want to exit?",
    "registration_incomplete": "Your registration is not complete.",
    "leave": "Leave Registration",
    "continue": "Continue with Registration"
  },

  "login": {
    "title": "Welcome Back!",
    "description": "Learning is just around the corner.",
    "title-session-ends": "Your session expired.",
    "description-session-ends": "Please sign in.",
    "gooruAccountTitle": "Log in to your Gooru account",
    "googleButton": "Sign in with Google",
    "or": "Or",
    "haveAccount": "Do you have an account?",
    "signUpHere": "Sign Up here!",
    "forgotPassword": "Forgot your password?",
    "password": "Password",
    "usernameOrEmail": "Username or Email",
    "log-in": "Log In"
  },

  "forgot-password": {
    "description": "It happens to all of us.",
    "usernameOrEmail": "Please enter your email",
    "footer-google-description-1": "Try logging in again by pressing <a href='/sign-in'>'Sign In with Google.'</a>",
    "footer-description-1": "You will receive an email with a link to reset your password.",
    "footer-description-2": "If you have any questions, please contact ",
    "mail": "support@gooru.org",
    "error-email-not-exists": "Sorry, we don't recognize this email.",
    "secondStepTitle": "Check your email",
    "secondStepDescription-1": "We've sent you an email with a link to reset your password.",
    "secondStepDescription-2": "If you have any questions, please contact"
  },

  "reset-password": {
    "new-password": "Enter your new password",
    "new-password-confirm": "Confirm your password",
    "title": "Reset password"
  },

  "footer": {
    "footerDescription": "Gooru is committed to keeping its platform open-source and community created content CC0.",
    "company": "Company",
    "community": "Community",
    "legal": "Legal",
    "connect": "Connect",
    "aboutGooru": "About Gooru",
    "careers": "Careers",
    "supportCenter": "Support Center",
    "contactUs": "Contact Us",
    "districts": "Districts",
    "partners": "Partners",
    "coaches": "Coaches",
    "events": "Events",
    "terms": "Terms",
    "privacy": "Privacy",
    "Copyright": "Copyright"
  },

  "grade-dropdown": {
    "placeholder": "grade(s)",
    "prompt": "Select a grade",
    "pre-k": "Pre-K",
    "elementary": "Elementary",
    "middle-school": "Middle School",
    "high-school": "High School",
    "higher-ed": "Higher Ed",
    "k": "K",
    "first": "1",
    "second": "2",
    "third": "3",
    "fourth": "4",
    "fifth": "5",
    "sixth": "6",
    "seventh": "7",
    "eighth": "8",
    "ninth": "9",
    "tenth": "10",
    "eleventh": "11",
    "twelfth": "12"
  },

  "standard-dropdown": {
    "placeholder": "Browse by Standard"
  },

  "subject-dropdown": {
    "placeholder": "subject(s)",
    "prompt": "Select a subject"
  },

  "search-filter": {
    "courses": "Courses",
    "collections": "Collections",
    "resources": "Resources",
    "assessments": "Assessments",
    "questions": "Questions",
    "question-types": {
      "MC": "Multiple Choice",
      "FIB": "Fill in the Blank",
      "T/F": "True / False",
      "MA": "Multiple Answer",
      "HS_TXT": "Multiple Select - Text",
      "HS_IMG": "Multiple Select - Image",
      "HT_RO": "Drag and Drop Order",
      "HT_HL": "Hot Text- Highlight"
    },
    "author": {
      "placeholder": "Author"
    }
  },

  "resource": {
    "video": "Video",
    "webpage": "Webpage",
    "interactive": "Interactive",
    "question": "Question",
    "image": "Image",
    "text": "Text",
    "audio": "Audio",
    "oer": "OER"
  },

  "search-result": {
    "resource": "Resource",
    "resources": "Resources",
    "and": "and",
    "question": "Question",
    "questions": "Questions",
    "in-this-collection": "in this collection",
    "search-results-for": "Search Results for"
  },

  "gru-image-picker": {
    "chooseFile": "Choose a file ...",
    "instruction": "Upload an image from a file on your computer.",
    "restriction": "The image must be a JPG, GIF or PNG file smaller than 5 MB.",
    "submit": "Use Image"
  },
  "gru-fib": {
    "instructions": "Please type your answer(s) in the blank(s) provided, and click \"{{action}}\"."
  },

  "gru-hs-image": {
    "instructions": "Please select the correct image(s), and click \"{{action}}\"."
  },
  "gru-hs-text": {
    "instructions": "Please select the correct answer(s), and click \"{{action}}\"."
  },
  "gru-hot-text": {
    "instructions": "Please select the correct answer, and click \"{{action}}\"."
  },
  "gru-login-prompt": {
    "title": "Welcome to Gooru!",
    "instructions": "You need to sign in to complete that action.",
    "existing-user": "Already have an account?",
    "new-user": "New here?",
    "not-now": "Not now",
    "sign-in": "Sign in"
  },
  "gru-multiple-answer": {
    "instructions": "Please select the correct answer, and click \"{{action}}\"."
  },
  "gru-multiple-choice": {
    "instructions": "Please select the correct answer, and click \"{{action}}\"."
  },

  "gru-open-ended": {
    "instructions": "Please type your answer in the field below, and click the \"{{action}}\" button to save your response when you're done.",
    "characterLimit": "Character Limit"
  },

  "gru-question-viewer": {
    "answer": "Answer",
    "question": "Question"
  },
  "gru-true-false": {
    "instructions": "Please select the correct answer, and click \"{{action}}\".",
    "true": "True",
    "false": "False"
  },

  "gru-reorder": {
    "instructions": "Please reorder the answers in correct order, and click \"{{action}}\"."
  },

  "player": {
    "gru-navigation": {
      "view-report": "View Report"
    },
    "gru-navigator": {
      "see-usage-report": "See Usage Report"
    },
    "gru-viewer": {
      "not-iframe-url": {
        "header_1": "This resource cannot be viewed within Gooru.",
        "header_2": "Click the button below to open the resource in a new tab.",
        "view-resource": "View Resource",
        "footer_1": "Why am I seeing this blank page?",
        "footer_2": "Resources added in Gooru come from thousands of different publishers who",
        "footer_3": "create and share their content. Resources have variety of settings, including",
        "footer_4": "requirements that take you to another page to view the content."
      }
    }
  },

  "profile": {
    "gru-navigation": {
      "about": "About",
      "about-you": "About You",
      "library": "Library",
      "followers": "Followers"
    },
    "edit": {
      "select-district": "Select a district..."
    }
  },

  "gru-data-picker": {
    "score": "Score",
    "completion": "Completion",
    "timeSpent": "Time",
    "study-time": "Study Time",
    "reaction": "Reaction",
    "attempts": "Attempt"
  },
  "gru-performance-summary": {
    "title": "Title",
    "scores": "Scores",
    "completion": "Completion",
    "time-spent": "Total Time",
    "reaction": "Reaction",
    "attempts": "Attempts",
    "redo": "Redo",
    "resume": "Resume",
    "study": "Study Now",
    "view-report": "View Report",
    "not-applicable": "N/A",
    "not-started": "Not started yet"
  },
  "gru-performance": {
    "no-content": "No content available"
  },
  "gru-performance-metrics": {
    "assessment": "Assessment",
    "student": "Student",
    "score": "Score",
    "completion": "Completion",
    "study-time": "Time Spent"
  },
  "gru-metrics-sub-header": {
    "assessment": "Assessment",
    "student": "Student",
    "score": "Score",
    "completion": "Completion",
    "study-time": "Time"
  },
  "gru-resource-new": {
    "resource-already-exist": "This resource already exists in Gooru!"
  },
  "gru-assessment-report": {
    "gru-summary": {
      "total-time-spent": "Total Time Spent"
    },
    "hidden-report": "Your teacher has selected to hide your summary report for this assessment."
  },
  "cards": {
    "gru-class-card": {
      "student": {
        zero: "{{count}} Students",
        one: "{{count}} Student",
        other: "{{count}} Students",
        "not-started": "Not Started"
      },
      "unit": {
        zero: "No course",
        one: "{{count}} Unit",
        other: "{{count}} Units"
      },
      "archived":{
        "request-report":"This class is archived and cannot be modified. Existing class data can be accessed via report.",
        "report-in-progress":"Report generation can take up to 20 min. Please check back.",
        "download-report":"Download your data for this class.",
        "no-report-available":"This class has no assigned course content."
      }
    },
    "gru-course-card": {
      "in": "in",
      "units": {
        zero: "{{count}} Units",
        one: "{{count}} Unit",
        other: "{{count}} Units"
      },
      "resource": {
        zero: "{{count}} Resources",
        one: "{{count}} Resource",
        other: "{{count}} Resources"
      },
      "and": "and",
      "question": {
        zero: "{{count}} Questions",
        one: "{{count}} Question",
        other: "{{count}} Questions"
      }
    },
    "gru-resource-card": {
      "add": "Add to"
    },
    "gru-resource-result-card": {
      "skipped": "Skipped"
    },
    "gru-profile-card": {
      "followers": "Followers",
      "following": "Following"
    },
    "gru-user-network-card": {
      "follow": "Follow"
    }
  },
  "reports.gru-table-view": {
    "first-tier-header-prefix": "Q",
    "student": "Student",
    "reaction": "Reaction",
    "reactions": "Reactions",
    "score": "Score",
    "scores": "Scores",
    "study-time": "Study Time",
    "time": "Time",
    "time-spent": "Time Spent",
    "totals": "Total"
  },
  "gru-emotion-picker": {
    "react-to-resource": "React to this resource"
  },
  "home":{
    "no-classes-found":{
      "create-class":{
        "title":"Teach with a Gooru classroom",
        "description":"Created a classroom, assign content, and invite students.",
        "button-text":"Create Classroom"
      },
      "join-class":{
        "title":"Learn with a Gooru classroom",
        "description":"Join your teacher’s classroom to start learning.",
        "button-text":"Enter Classroom Code"
      },
      "featured-courses":{
        "title":"Featured Courses",
        "description":"Browse math, science, social studies, and ELA courses.",
        "button-text":"Featured Courses"
      },
      "teacher-toolkit":{
        "title":"Teacher Toolkit",
        "description":"This toolkit has resources to help you get started.",
        "button-text":"Teacher Toolkit"
      }
    }
  },
  "taxonomy": {
    "gru-taxonomy-selector": {
      "add-secondary": "Add secondary",
      "choose-subject": "Choose Subject",
      "competency-subject-and-course": "Competencies Framework and Course",
      "primary-subject-and-course": "Standards Framework and Course"
    }
  },
  "validations": {
    "unsavedChanges": "Your changes haven't been saved yet. Would you like to leave this page?"
  },
  "featured": {
    "featured-title": "Featured Courses",
    "featured-description": "Gooru’s featured courses are vetted and reviewed, educator-curated, created in classrooms, and studied by students. They were developed and implemented at innovative schools, districts, and charters, and are designed to support blended learning, flipped classrooms, project-based learning, and many other instructional models. Discover, remix, and customize courses to personalize learning and increase student engagement! Click here to  <a href='http://about.gooru.org/courses' target='_blank'>learn more</a> about the development of these courses."
  },

  "taxonomy.modals": {
    "gru-domain-picker": {
      "browseSelectorText": "What domains will this unit cover?",
      "selectedText": {
        zero: "{{count}} domains selected",
        one: "{{count}} domain selected",
        other: "{{count}} domains selected"
      },
      "shortcutText": "Course is in"
    },
    "gru-standard-picker": {
      "browseSelectorText": "What standards will be covered?",
      "browseCompetencySelectorText": "What competencies will be covered?",
      "selectedText": {
        zero: "{{count}} standards selected",
        one: "{{count}} standard selected",
        other: "{{count}} standards selected"
      },
      "selectedCompetencyText": {
        zero: "{{count}} competencies selected",
        one: "{{count}} competency selected",
        other: "{{count}} competencies selected"
      },
      "shortcutText": "Unit is tagged to"
    }
  },

  "account-settings": {
    "title": "Account Settings",
    "account-info": "Account Info",
    "private-info": "Private Info",
    "email-address": "Email Address",
    "gender": "Gender",
    "birthday": "Birthday"
  },

  "gru-rich-text-editor": {
    "bold": "Bold",
    "expression": "Expression",
    "italic": "Italic",
    "subscript": "Subscript",
    "superscript": "Superscript",
    "underline": "Underline",
    "expressions-panel": {
      "tabs": {
        "calculus": "Calculus",
        "greek-letters": "Greek Letters",
        "layout": "Layout",
        "relation": "Relation",
        "set-theory": "Set Theory",
        "symbols": "Symbols",
        "trigonometry": "Trigonometry"
      },
      "insert-expression": "Insert",
      "update-expression": "Update",
      "create-expression": "Create Expression"
    }
  },

  "gru-settings-edit": {
    "answerkey-attempts": "Answer Key and Attempts",
    "answer-key": "Students can see the answer key at the end",
    "attempts": "Attempts",
    "attempts-unlimited": "Unlimited",
    "backwards": "Students can navigate backwards and change responses",
    "feedback": "Students see if they are correct/incorrect",
    "feedback-immediate": "Per question & at the end",
    "feedback-never": "Never",
    "feedback-summary": "At the end",
    "navigation-scoring": "Navigation and Scoring",
    "disable-heading": "Activate Assessment in Course Map",
    "disable-legend": "Students can play the assessment from their course map"
  },
  "gru-icon-popover":{
    "settings-visibility-title": "Make Your Content Visible",
    "settings-visibility-content": "This setting makes your content visible via your user profile. If you wish to share the courses, collections, assessments, resources, and/or questions you create with colleagues, we suggest you turn this feature on."
  },
  "gru-tour": {
    "assessments-settings":{
      "stepOne":{
        "title":"Navigation and Scoring",
        "description":"This setting determines how students can move through an assessment and shows whether their answers are correct or incorrect. It does not show them an answer key."
      },
      "stepTwo":{
        "title":"Answer Key and Number of Attempts",
        "description":"This setting allows an answer key to be revealed and sets the number of attempts students have on the assessment."
      }
    },
    "home":{
      "stepOne":{
        "title": "Your Homepage",
        "description": "Welcome to your Gooru homepage! Here you can find a list of the classrooms you create in Gooru. Classrooms allow you to share content directly with students. You can always come back to your homepage by clicking on the Gooru icon."
      },
      "stepTwo":{
        "title": "Classes You Teach or Join",
        "description": 'Any classrooms you teach or join this school year will appear here under Active Classrooms.'
      },
      "stepThree":{
        "title": "Previous Classes",
        "description": "Any classrooms you created or joined in past school years can be found in Archived Classrooms. Content used in these classrooms can be found in your Profile, and it can be re-assigned to new classrooms for this school year."
      },
      "stepFour":{
        "title": "Create a Classroom",
        "description": "Click here to create a new classroom. Once you have content to share with students, you will assign it to them via a classroom."
      },
      "stepFive":{
        "title": "Your Profile",
        "description": "This is your Profile. Click on your profile at any time to access content you create or remix in Gooru."
      }
    },
    "overview": {
      "stepOne":{
        "title": "Course Map",
        "description": "The course map provides your students access to all assessments and collections you assign to them."
      },
      "stepTwo":{
        "title":"Class Code",
        "description":"Each classroom you create has a unique class code. You will give this code to students when you are ready for them to join your classroom and access your content."
      },
      "stepThree":{
        "title": "Monitor Student and Class Data",
        "description": "This allows you to see class and individual student assessment data when students complete assessments that are part of a course."
      },
      "stepFour":{
        "title" : "Classroom Information",
        "description" : "Here you can edit your classroom name, post announcements for your students, see the names of students enrolled in your class, and delete your classroom."
      },
      "stepFive":{
        "title": "Editing Your Course Content",
        "description": "When you are in a classroom, click here to edit any of the course content assigned to your students."
      },
      "stepSix":{
        "title": "Monitor Progress in Real-time!",
        "description": 'Use the real-time dashboard to monitor class progress on an assessment in real-time.<br><br>Click on the "Go Live" icon found to the left of every assessment to launch a real-time assessment for students. <br><br><i class="real-time-icon">'
      }
    },
    "quick-start": {
      "stepOne":{
        "title": "Navigating Your Classrooms",
        "description": 'This is a view of a newly created classroom. To get back to a classroom at any time, click on "Classrooms" and use the drop down menu to select the classroom you wish to enter.'
      },
      "stepTwo":{
        "title":"Getting Started? Create an Assessment!",
        "description":"We suggest creating an assessment as a way to get started with Gooru and to assess current levels of student understanding in your class."
      }
    },
    "real-time": {
      "stepOne": {
        "title": "Breakdown of Responses",
        "description": "Click on each question to see a breakdown of how students answered."
      },
      "stepTwo":{
        "title": "Individual Student Data",
        "description": "Select each student tile to see individual student data reports."
      },
      "stepThree":{
        "title": "Select a View",
        "description":'Select "title view" or "list view" to see options for displaying data.'
      },
      "stepFour":{
        "title": "Average Score",
        "description": "See the class average calculated in real-time for all responses."
      },
      "stepFive":{
        "title": "Project Anonymous Data",
        "description": "Use this option to project an anonymous view of student data."
      }
    }
  },
  "gru-course-play":{
    "hide-course-details": "Hide Course Details",
    "hide-unit-details": "Hide Unit Metadata",
    "view-course-details": "View Course Details",
    "view-unit-details": "View Unit Metadata",
    "performance": "Performance"
  },
  "gru-century-skills": {
    "legends": {
      "hewlett": "Hewlett Deeper Learning Model",
      "conley": "Conley Four Keys",
      "framework": "P21 Framework",
      "national": "National Research Center for Life and Work"
    },
    "content": {
      "groups": {
        "cognitive": "Key Cognitive Skills and Strategies",
        "content": "Key Content Knowledge",
        "learning": "Key Learning Skills and Techniques"
      }
    }
  }
};
