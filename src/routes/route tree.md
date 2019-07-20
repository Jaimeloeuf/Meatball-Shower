# Route Tree
This document, documents the routes for this Single Page Application.

## Notes
Everything not listed but clickable is an action trigger.  
Paths must be URL encodable and all actions should prefer a URL route based approach rather than action trigger, so that every "screen" or more actions can be easily bookmarked. If the actions are not defined in the URL route, it will mean that the route is un-bookmarkable, which may be a bad UI/UX descision.  
If [Default] is added in front of a route part, it means it is the default child route of its parent route.

## Routes
- about
- login
- signup
- :userID
    - [Default]
    - create-controls
    - training
    - game
    - game-over

## Legend for route params
- userID
    - This is the unique identifier for each user
    - Created by simply taking the user's email address' front portion
        - E.g.  jaimeloeuf@gmail.com  ==  jaimeloeuf