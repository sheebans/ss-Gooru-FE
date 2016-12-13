Gooru third party integration
=============================
This document explains how other application could integrate with Gooru

# The basics about the integration process
Gooru provides this url `/integration/my-key?...` to 3rd party applications to integrate with Gooru, the controller receives several
parameters to indicate the application key, token and navigation flow.

`appKey`: this path param is used to identify the 3rd party application key
`token` (optional): this query param is used to authenticate against Gooru, useful for SSO integrations
`page`: this query params is used to indicate which page will be presented to the user after validating the app key and token, each page could have additional parameters


Example: `/integration/teams?token=any-token&page=class-info&classId=123`


# Supported flows
Gooru support integration for several sections, each section could receive different parameters

## Class information flow
Integrates with the class information page.

`classId`: indicates the Gooru class identifier

Example: Example: `/integration/teams?token=any-token&page=class-info&classId=123`

## Student analytics page
Integrates with the student analytics page.

`classId`: indicates the Gooru class identifier

Example: Example: `/integration/teams?token=any-token&page=student-data&classId=123`

## Teacher analytics page
Integrates with the teacher analytics page.

`classId`: indicates the Gooru class identifier

Example: Example: `/integration/teams?token=any-token&page=teacher-data&classId=123`

## Course map page
Integrates with the user course map page for both teachers and students

`classId`: indicates the Gooru class identifier
`unitId` (optional): used to specified the location within the course map
`lessonId` (optional): used to specified the location within the course map, it should be provided with the unitId as well
`collectionId` (optional): used to specified the location within the course map, it should be provided with the unit and lesson id params

Example: Example: `/integration/teams?token=any-token&page=teacher-data&classId=123&unitId=10&lessonId=20&collectionId=30`
