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


Understand useEffect clean up
see articles
https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount
https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/