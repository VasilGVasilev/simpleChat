**Server-side vs Client-side**

The first big thing to understand about this is that there are now 2 places where the URL is interpreted, whereas there used to be only 1 in 'the old days'. In the past, when life was simple, some user sent a request for http://example.com/about to the server, which inspected the path part of the URL, determined the user was requesting the about page, and then sent back that page.

With client-side routing, which is what React Router provides, things are less simple. At first, the client does not have any JavaScript code loaded yet. So the very first request will always be to the server. That will then return a page that contains the needed script tags to load React and React Router, etc. Only when those scripts have loaded does phase 2 start. In phase 2, when the user clicks on the 'About us' navigation link, for example, the URL is changed locally only to http://example.com/about (made possible by the History API), but no request to the server is made. Instead, React Router does its thing on the client-side, determines which React view to render, and renders it. Assuming your about page does not need to make any REST calls, it's done already. You have transitioned from Home to About Us without any server request having fired.

So basically when you click a link, some JavaScript runs that manipulates the URL in the address bar, without causing a page refresh, which in turn causes React Router to perform a page transition on the client-side.

But now consider what happens if you copy-paste the URL in the address bar and e-mail it to a friend. **Your friend has not loaded your website yet. In other words, she is still in phase 1. No React Router is running on her machine yet.** So her browser will make a server request to http://example.com/about.

And this is where your trouble starts. Until now, you could get away with just placing a static HTML at the webroot of your server. But that would give 404 errors for all other URLs when requested from the server. Those same URLs work fine on the client-side, because there React Router is doing the routing for you, but they fail on the server-side unless you make your server understand them.

![full article](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually)

P.S. Next.js solves all this with its superior routing system