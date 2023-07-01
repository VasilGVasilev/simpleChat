# [VGV Chat](https://vgvchat.000webhostapp.com/) 


## Description
### Front-End React Project
A simple chat web application that has authentication of users. Once logged-in, users can search for all other users in DB and choose to chat with them by selecting their name. The chat between current user and searched user is updated in real time. There is a feature that sets the last message of 'chat buddy' to color red if they are not selected, thus, the effect of unread messages.

## What's in the stack

- Styling with [SASS](https://sass-lang.com/)
- Server by [Firebase](https://firebase.google.com/)

## Development issues:

### Different layout base on deskto/mobile device


`Main issue`
- use of media queries only half solves the problem, since mobile layout adds functionality, onClick events that trigger the display of either Sidebar or Chat, which as components in desktop verison are both visible;  
the solution: using useReducer and different scss classes for Sidebar and Chat, first based on mobile or desktop version, second, based on whether client is currenlty viewing Sidebar or Chat


`Other issues:` 
- flickering of main page conten '/' on initial load before PrivateGuard redirects to /login;  
solution: '/' page is not loaded with any information, we have separete '/home' for main logic
- Stop auto-zoom when filling out input in mobile Safari;  
no solution: setting scale to accomodate problem will change mobile layout due to no universal mobile web layout standard



## How does the app work:

### Auth

Registration and Login: 

- Utilize the firebase getAuth() related functions

Profile image:
- Update the user collection element to add photoURL, the photoURL is added via uploading img to Storage - uploadBytesResumable() and subsequently dowloading that image to the client - getDownloadURL()

    
### Updating DB (main CRUD operation)

Registration of user creates a collection in users DB. Selecting a user to chat with, creates two sets of collections in userChats DB, one for each participant, the id of which are corresponding to the ids of the collections in chats DB.

![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/DBlogic.png)

## Learning achievements:
- First navigation through the docs of my first BaaS - Firbase
- First use of a superset of CSS - SASS
- Deep dive into state with useReducer() rendering UI based on viewport
- Learning useEffect() cleanup function relevance
- Llearning the signficance of block scoping in JS
