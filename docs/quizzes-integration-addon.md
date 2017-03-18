Quizzes Addon Integration
=========================
Overview here...


# Configuration
The quizzes addon is configured by setting the properties at the configuration initializer (initializers/configuration.js), 
the application loads the properties from the default configuration or host configuration file.

# Sign in notification
Every time a new session is created the quizzes token property is updated accordingly. See instance-initializer/gooru-session-service.js#tokenObserver
