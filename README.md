# A fullstack Chat App with Create React App: React, SASS, Firebase

A website with authentication and real-time update of messages developed via SASS, React, Firebase and Cypress. Once logged-in, users can search for all other users in DB and choose to chat with them by selecting their name. A feature sets the last message of a user to color red if they are not selected - the effect of unread messages.

## [Go to Website](https://vgvchat.tech/)

[![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/vgv-chat.png)](https://vgvchat.tech/)

---

[![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/hello-azis.png)](https://vgvchat.tech/)


## What's in the stack

- React Toolchain [Create React App](https://create-react-app.dev/)
- Shared Server by [Hostinger](https://www.hostinger.com/)
- Styling with [SASS](https://sass-lang.com/)
- Server by [Firebase](https://firebase.google.com/)

Features:

- Full responsiveness
- Credential authentication
- Image upload using Firebase
- Client form validation and handling using my own custom form
- Search algorithm by chat buddy name

## Learning achievements:


**I have made my very own custom solution for mobile responsiveness, namely, show/hide sidebar depending on being on desktop or mobile device resolution.**

[see here](https://github.com/VasilGVasilev/simpleChat/blob/main/simplechat/src/pages/Home/Home.js
)

Also:
- Basic understanding of implementing a BaaS
- First use of a superset of CSS - SASS
- Deep dive into state with **useReducer()** rendering UI based on viewport
- Learning useEffect() cleanup function relevance
- First project with unit tests (Cypress)
- Learned the useEffect hook cleanup functionality [see](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/useEffectCleanup.png)


## How does the app work:

### Auth

Registration and Login: 

- Utilize the firebase getAuth() related functions

Profile image:
- Update the user collection element to add photoURL, the photoURL is added via uploading img to Storage - uploadBytesResumable() and subsequently dowloading that image to the client - getDownloadURL()

    
### Updating DB (main CRUD operation)

Registration of user creates a collection in users DB. Selecting a user to chat with, creates two sets of collections in userChats DB, one for each participant, the id of which are corresponding to the ids of the collections in chats DB.

![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/DBlogic.png)


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


## Lighthouse score:
![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/lighthouse.png)


