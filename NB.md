ES7 React/Redux/React-native snippets' extension added

vscode has emmet support to write js directly, instead of jsx which will eventually be transpiled by babel to browser readable js

The ::placeholder CSS pseudo-element represents the placeholder text in an <input> or <textarea> element.

The CSS overflow property controls what happens to content that is too big to fit into an area.

The object-fit CSS property sets how the content of a replaced element, such as an <img> or <video>, should be resized to fit its container. With other words, how to show the image that you are using so that it fits naturally the shape you are trying to fit it in.

The CSS Gap property is used to create space between the items. Unlike Margin and Padding, it only works with the CSS Grid, CSS Flexbox, and CSS multi-column layouts.

Components give us the modularity of rendering. Ex. when we refresh chat due to incoming message, other components stay the same

calc()
height: calc(100% - 160px); // INCLUDE PADDING AND MARGINS INTO CALC -> .chatInfo 70px + .input 70px + .messages padding 20px

&.
Add a Class or an ID

Since & references the top-most selector, it can be extended with additional classes and/or an id like the pseudo class selectors. So let’s say there is a selector of .feature-class and we have an instance where it will be paired with .style-class (<div className='feature-class style-class'>), which changes the look of it. From within the .feature-class declaration block, we would have a child declaration that starts like this: &.style-class with its own declaration block. Sass will replace & with .feature-class, which becomes .feature-class.style-class in our generated CSS. 
Thus, the 'style-class' part will apply only for elements that have both 'feature-class' and 'style-class':

Written in Sass

    .feature-class {
        color: #0090B2;
        &:hover {
          color: #FF7A00;
        }
        &:active {
          color: #B25500;
        }
        &.style-class {
          color: #00CEFF;
          &:hover {
            color: #0090B2;
          }
          &:active {
            color: #FF7A00;
          }
        }
      }


relative vs absolute position

    default position is static

    if you want to move child set it to relative and it will move relative to its former position regarding its parent

    if you set child to absolute, it will be auto relative to html, not parent, to resolve that set parent to relative, thus, child is absolute within the relative parent scope

mixin and @include
    Mixins allow you to define styles that can be re-used throughout your stylesheet. 
    Mixins are defined using the @mixin at-rule, which is written @mixin <name> { ... }
    Mixins are included into the current context using the @include at-rule, which is written @include <name>

@content SASS directive:
    @mixin mobile{
        @media screen and (max-width: 480px) {
            @content;
        }
    }

    .logo{
        font-weight:bold;
        @include  tablet{
            display: none;
        }
    }

    @content inside @mixin is like a placeholder telling SASS preprocessor that some properties are to be overwritten when screen width is below 480px. These properties are declared in the @include part. For example, putting @include in .logo results in overriding the display property of .logo, making it invisible when width is below 480.

    Summary: @content in set in @mixin and filled with properties on each @include, thus, modifying specific classes rather than saying @media and redefining whole CSS for one major shift (ex. hidding logo for small resolutions)
    
delcare variables
    $darkColor: #2f2d52; 



How React renders:
First, it renders the return of the component (after commit phase)
Second, if there is useEffect, component is mounted (after commit phase)
Third, it awaits user click -> click is received
Fourth, it sets in motion setState if useState is used - React schedules an update to the component state.
Fifth, it renders new content reflecting on new state
Sixth, it sets new value of state, which is done during re-render -state updates are asynchronous, you cannot rely on the new state value being immediately available after calling setState
Seventh, it triggers cleanup handler (unmounting)
Eigth, it calls useEffect handler (callback) 

Note the specific calling with useEffect:

First component
  useEffect is mounted via its handler/callback
Second component
  useFffect is unmounted via the clean-up, but it is the first instance of useEffect, namely, before useEffect is mounted on the current second component, useEffect cleans up the closure for the previous component.


Understand useEffect clean up
see articles
https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount

both run after component mount, but useEffect runs even later -> after first render
Thus, a crucial difference how we should perceive hooks not only compared to lifecycle methods but in general:
Hooks force us to think more from the user's perpective, useEffect runs only after 'paint' (initial render) has set

https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/

If you click on a button that fetches info via useEffect and click again on the same button before the info of the first call is rendered you will come across an error:
Warning! Can't perform a React state update on an unmounted component.

the reason for this unmounting is that you are utilizing useEffect a second time via second button click and subsequent fetch while the inital one is still there. Where is that -> in a closure (useEffect uses closures). That info is unresolved, unmanaged and can cause memory leaks. Thus, comes in handy the cleanup functionality of useEffect.
useEffect(()=>{
  <!-- mounting -->
  <!-- some fetch or subscription to be done -->
  return 
  <!-- unmounting -->
  <!-- if explicit function is needed to unsubscribe -->
})

https://blog.logrocket.com/useeffect-hook-complete-guide/#utilizing-cleanup-functions

“The question is not ‘when does this effect run,’ the question is ‘with which state does this effect synchronize?’ ”

useEffect

https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928

React converting the component tree and flushing the result to the rendering environment:
    * The “render” phase: create React elements ---React.createElement---
    * The “reconciliation” phase: compare previous elements with the new ones 
    * The “commit” phase: update the DOM


Important when using Firebase:
 - initialize firebase functionality on app
 - initialize firebase functionality on project



On useEffect hook and cleanup functions:
  In React, useEffect hook is used to manage side effects in functional components. It allows you to perform some operation after a component renders or updates. When you use useEffect hook to perform a real-time operation such as fetching data from an API or subscribing to a real-time data stream, it is important to also include a cleanup function to avoid memory leaks and other unwanted behavior.

  A cleanup function is a function that is called when the component unmounts or when the dependency array of useEffect changes. It is used to clean up any resources or subscriptions that were created by the useEffect hook, so that they do not remain active after the component is no longer being rendered.

  When dealing with a real-time operation in useEffect, it is important to use a cleanup function to prevent the real-time operation from continuing after the component has been unmounted. For example, if you are subscribing to a real-time data stream, you should unsubscribe from the stream in the cleanup function to avoid memory leaks or other unwanted behavior.

Why do we unsubscribe from onAuthStateChanged? memory leak, but see more detailed reason!

1:15:00

Block scoping
  when I refactored createUserWithEmailAndPassword to be in a separate services module and I had to use higher order function register = () => {createUserWithEmailAndPassword} that returns createUserWithEmailAndPassword, I had to figure out how arguments are to be passed in.
  Since authServices imports getAuth() as auth, which is later used in createUserWithEmailAndPassword(auth, email, password), I had to figure a way to pass in auth. It seems that variables are attached to a block scope and are accessible down the chain of nested blocks, however deep they go.
  Another example in Back-End Softuni is:
    exports.modelValidator = (Model) => async (req, res, next) => {
        try {
            await Model.validate(req.body);

            next();
        } catch (error) {
            console.log(error);
            res.status(400).send(Object.values(error)[0]);
        }
    };
  see how Model is passed in as an argument in modelValidator(), then not passed in in async(), but still used in the resulting block { try { await Model}}.

onClick={handleClick}

  onClick always requires a function wrapped in an arrow function or a reference to a function expression, thus, handleClick has to be a predeclared likewise:

    const handleSubmit = (e) => {}
    return(
      onClick={handleClick}
    )

    OR

    return(
      onClick={()=>handleClick()}
    )
