Gooru Web
=============
Introducing Gooru Web  - a solution to help teachers faciliate personalized learning for students.

## Introduction
Gooru Web is the front-end of the Gooru application. Gooru’s free solution enables teachers to create, curate, and share collections of web resources on any K-12 topic. With millions of multimedia resources and quiz questions, Gooru makes it easy to discover topic-relevant and standards-aligned content to address specific students’ needs.  At Gooru, we believe education is a human right.  Now, with access to this Git repository, open-sourced under the MIT license, you can build along side us to support this mission and help students around the world reach their full potential.

Gooru Web is developed using GWTP model-view-presenter framework to simplify the GWT implementation, followed by advanced Restlet client which will communicate with the high performance Gooru Restful Services. 

## Features:
Gooru’s features fall into four major groups: Discover, Organize, Teach and Study.  Here are short descriptions of each component. 

## Discover
Discover services provide the solution to search millions of resources, collections, and question items in the Gooru Learning Catalog. The Search APIs with the indexing support allow for filtering content or the Suggest APIs to personalize the experience by taking user activity and preferences into account.

## Organize
Organize services provide the solution for the registered users to create collections (multimedia lessons) which include resources such as videos, textbooks, interactives and question items. The Organize services allow you to access content and perform CRUD operations for collections, resources and question items.

## Teach
Teach services provide the solution to manage classes, create assignments, and track collection sessions. Teachers can create multiple Classpages, which are unique pages for different student groups accessible through URL or a “Class Code”. Each Classpage can have a set of assignments, with instructions and a date.

## Library
The Gooru Library is a brand new way to discover the best collections that the Gooru community has curated across core subject areas.

## Authentication
Create new accounts on Gooru using the authentication system or Gmail connect.

## Social
Share, flag and tag content, access a flexible rating system and protect your users with abuse reporting using Gooru Social services.

## Resource Player
This module is responsible for rendering Gooru Resources. Resources can be labeled with one of the following nine categories: Video, Website, Interactive, Question, Slide, Textbook, Handout, Lesson, Exam. The Resource Player is capable of rendering all of them. This player also provides functionality for sharing a Resource via Facebook, Twitter or Email.

## Collection Player
The Gooru Collection Player is capable of rendering all types of Gooru Collections including Quizzes, and other collections with Questions. The player module contains collection navigation, narration, summary, sharing out, and adding the resource/collection to the user’s Organize page.


## Prerequisites

You can use the vagrant configuration (suggested) or install the following things properly on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [Grunt-CLI](https://github.com/gruntjs/grunt-cli)
* [Stubby](https://github.com/mrak/stubby4node)
* [Vagrant](https://www.vagrantup.com/)


## High Level Architecture
This project is built on top of EmberJS 2.x and Ember CLI
![Alt text](high-level-architecture.png)

#### Technology stack
* Ember CLI
* Ember 2.x
* Ember Simple Auth
* Ember i18n
* Handlebars
* SASS
* Boostrap
* jQuery
* Grunt
* Stubby

#### Project Structure
This project follows the project structure suggested by Ember CLI

#### Communication Layer - Custom Adapters and Serializers
EmberJS 2.x implements by default json:api specification for REST communication, custom EmberJS adapters and serializers are necessary to communitate and match the current Gooru's API end points convention. 

#### API-SDK Layer
The SDK layer is defined with intention to create an abstraction layer or abstraction level to hide the implementation details of the use of Ember Data. As part of this idea is to encapsulate the use of Ember Data in order to avoid as much as possible the use of Ember Data everywhere in code, so we can have a single entrance point to communicate with Gooru's API end-points.

#### Authentication and Authorization
The library ember-simple-auth is used for authentication and authorization, it also track the user client session. See [Ember Simple Auth](http://ember-simple-auth.com/)

#### Internationalization
The library ember-i18n is used for internationalization, it is fully integrated with Ember-CLI. 

See [ember-i18n](https://github.com/jamesarosen/ember-i18n/wiki)

#### Application Logger
 Ember.Logger is used for logging application messages.
 
 See 
 * [Ember Logger](http://emberjs.com/api/classes/Ember.Logger.html)
 * [Ember Debugging](http://guides.emberjs.com/v2.0.0/configuring-ember/debugging/)

## Installation

* `git clone https://github.com/Gooru/Gooru-FE.git` this repository
* change into the new directory
* Install dependencies `npm install` and `bower install`
* Or use vagrant instance `vagrant up` 



## Running / Development

### Development environment
* Install [Vagrant](http://www.vagrantup.com/downloads)
* Install [vagrant-fsnotify](http://www.rubydoc.info/gems/vagrant-fsnotify#Installation) 
* `vagrant up` to setup your vagrant instance
* `vagrant ssh` to ssh to the vagrant instance
* `cd /vagrant` to access the project folder

Useful commands [Vagrant CLI](https://docs.vagrantup.com/v2/cli/index.html)
* `vagrant provision` to install tools on vm
* `vagrant halt` stops vm
* `vagrant destroy` destroys the vm 


### Installing dependencies
* `npm install`
* `bower install`

### Running the app with ember
* `ember server --proxy http://localhost:8882` to run it using the stubby server
* Visit your app at [http://localhost:4200](http://localhost:4200). 
* Or visit your app at [http://192.168.33.10:4200/](http://192.168.33.10:4200/) when using vagrant

* `vagrant fsnotify` this is necessary so file changes (at host) are notified (to guest) while running the app 

### Running the app with grunt tasks
* `grunt run` to run it using the stubby server, this task starts up stubby server and proxy ember to it
* `grunt run:qa` to run it proxying to the qa server.

### Coding standards
This application follows [Ember CLI standards and conventions](http://www.ember-cli.com/user-guide/#naming-conventions) and it also uses JSHint (http://jshint.com/) _"JSHint is a program that flags suspicious usage in programs written in JavaScript."_

See 
* [JSHint Options](http://jshint.com/docs/options/). 
* A new project has been started [JSCS](http://jscs.info/rules) for javascript code style validations, this project would move to it once it is fully integrated with ember cli

JSHint rules will be enforced while running application tests.

### Code Documentation
Code should be really well documented, please use [jsDoc](http://usejsdoc.org/)

See
* @typedef for type definition

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Git strategy
`Git Flow` strategy was selected, look at [Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/) and [Git Flow Cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)

### Running Tests
This project uses Ember Tests
See 
* [Ember Tests](http://guides.emberjs.com/v2.0.0/testing/) 
* [QUnit](https://api.qunitjs.com/)
* [Testem](https://github.com/airportyh/testem)
* [Ember QUnit](https://github.com/rwjblue/ember-qunit)

* `ember test`
* `ember test --server` to let the test running
* `ember test --filter your_pattern` to execute some tests only

Testem is configured to proxy ajax request to the stubby server, make sure your stubby server is running
You can also execute the test using grunt tasks

### Running Tests with grunt tasks
 * `grunt test` which start the stubby and run the test by using `ember test`
 * `grunt test:server` which start the stubby and run the test by using `ember test --server`
 * `grunt test:cli` which start the stubby and run the test by using `ember test --silent --reporter xunit`
 

### Code Coverage
More than 80% of coverage is mandatory for this project 

### Mocking the api server - Stubby
* `grunt stubby:server` To startup a mocked API Server. Then make sure to run ember with the --proxy option to point to the Stubby server.

### Configuring a proxy server
It is possible to proxy a server so you can connect to a different environment

* `ember server --proxy your_server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Continuous Integration
We have setup Bamboo as continuous integration server
* when publishing a feature branch a bamboo build is triggered
* when a feature is finished and changes are merge to develop, another build is performed and the app is deployed

### Deploying

*QA deployment*
At this point develop branch is deployed by Bamboo to the configured QA servers

*Production deployment*
TBD

