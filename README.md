# ReactProjectDefense

## What's in the stack

- Styling with [SASS](https://sass-lang.com/)
- Server by [Firebase](https://firebase.google.com/)

## Development issues:

- Start Front-End in ./project:


- Start Back-End in ./server:



## How does the app work:

### Auth

Registration and Login: 
    Utilize the firebase getAuth() related functions

Profile image:
    Update the user collection element to add photoURL, the photoURL is added via uploading img to Storage - uploadBytesResumable() and subsequently dowloading that image to the client - getDownloadURL()

    
### Updating (main CRUD operation)

![alt text](https://cdn-icons-png.flaticon.com/512/14/14558.png)