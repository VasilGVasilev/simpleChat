# [VGV Chat](https://vgvchat.000webhostapp.com/)

## What's in the stack

- Styling with [SASS](https://sass-lang.com/)
- Server by [Firebase](https://firebase.google.com/)

## Development issues:

### Different layout base on deskto/mobile device


`Main issue`
- use of media queries only half solves the problem, since mobile layout adds functionality, onClick events that trigger the display of either Sidebar or Chat, which as components in desktop verison are both visible - the solution was using useReducer and different scss classes for Sidebar and Chat, first based on mobile or desktop version, second, based on whether client is currenlty viewing Sidebar or Chat


`Other issues include:` 
- flickering of main page conten '/' on initial load before PrivateGuard redirects to /login; 
solution: '/' page is not loaded with any information, we have separete '/home' for main logic
- Stop auto-zoom when filling out input in mobile Safari;
no uniform solution



## How does the app work:

### Auth

Registration and Login: 

- Utilize the firebase getAuth() related functions

Profile image:
- Update the user collection element to add photoURL, the photoURL is added via uploading img to Storage - uploadBytesResumable() and subsequently dowloading that image to the client - getDownloadURL()

    
### Updating (main CRUD operation)

![alt text](https://github.com/VasilGVasilev/simpleChat/blob/main/NBs/DBlogic.png)