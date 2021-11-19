# Firefox 

<img src="assets/1.png" alt="screenshot 1">

<img src="assets/2.png" alt="screenshot 2">


## An Introduction

This is a modification of Firefox's interface as drawn on Linux systems such that Mozilla's tinkering with the default interface does not impede my use of the browser without needing to fork the browser and deal with the hassle of maintaining a browser just to keep functionality from before I like, such as icons on the status bar. 

## Theme 
Part of this repo's content is css files intended to simply style the window, which also removes unnecessary bits of the interface that are replaced with other functionality, like the tab bar, or simply not necessary at all. 

This is broken into two chunks, per the way this is achieved by the functionality exposed by Mozilla called `legacy stylesheets`, which is split into userChrome and userContent files. The userChrome functionality is the styling of the window itself and the userContent styles the pages that are internal pages that administer or modify functionality of the browser like the `about:config` page.


### Color Scheme 

As with any comprehensive modification of a program I use on Linux, it conforms to my idiosyncratic taste in color schemes, employing the vice color scheme I have personally crafted for use in light and dark environments with plenty of blue but no need for a filter to avoid strain (possible if using colors derived from the same color as the background just lightened, with more muted text in the light grey region of the background color). 

