# userChrome.css

![Screenshot](./assets/20200719_050237.png)

## Firefox Customizations

The files contained here style my personal Firefox configuration using CSS (a language I know a little too well for my sanity it seems) and style the browser window itself, not specific webpages
as many extensions seem to do and what most of the available Firefox themes do so incredibly plainly, without any overhaul of the main window, that I have given up on them all together (despite
being the individual who is responsible for the Cyberpunk theme associated with the GTK3 theme). Thus here is my Firefox customization tailored specifically to my needs, desires and of course the specific GTK and AwesomeWM theme utilized in these dotfiles.

### Not Included in Makefile

Firefox userChrome.css stylesheets are dependent upon the profile of the Firefox user after installation, contained within the user' s .mozilla directory. These profiles, even if an account is synced,
are generated at installation and contain a random string of characters as the beginning of their name that prevent me from using the typical `ln -svf firefox/userChrome.css /path/to/profile` method
generally employed in these dotfiles and thus they must be manually linked for now.

### Potential Solutions

It may be possible to:

- Use git-crypt to encrypt the majority of the files within a profile and then create a link between the .mozilla directory and the profile saved within, this has security implications and I am
  not sure how well firefox would take to importing the profile, but it offers one solution.

- Rename profiles dynamically generated with shell commands and wildcards to a standard name first in the Makefile and then create a link between the (probably first created) chrome directory within the profile
  and the userChrome.css file.

### Plugin In Dependencies

This customization assumes that I have logged into my firefox sync account (which is handy for people who reinstall as much as I do) and thus my plugins have downloaded and that _extremely annoying_ series of
popups associated with each plugin have seized my processor for the 10 seconds or so that seems to affect all machines I have used. However, there may come a time when I lack the memory of which plugins I need
and I have made a new sync account, or other people may wish to adapt these modifications to their own needs and want to know where in the h&%# the tab bar went so here are the needed plugins to run these
modifications while still enjoying a robust browsing experience.

- Tree Style Tab - a sidebar that shows the tabs in a heirarchical format that makes seeing how they relate to one another easier than the traditional horizontal bar. I may replace this, as styling it is a bit of a nightmare,
  but it is the best balance of simple to use and yet power I have seen. Plus it offers its own extensions, one of which enables it to also show the bookmarks within it and thus cutting the needs for another horizational bar
  which is best displayed vertically in a heirarchical arrangement.

- Tab Suspender - While not needed for the styles provided here, this prevents my habit of opening new tabs constantly from creating a processor meltdown from occurring, which is especially likely when I am using development servers
  opened from another program like an IDE or terminal. It also is as decent way to mitigate lower spec hardware without resorting to using some archiac Linux setup (though if you wish to resort to that, first try Alpine, I find it works great with
  XFCE in that context)

- MySessions - also not for the visual theme, but being that a large part of the visual theme is the tab sidebar, one should probably have some tab infrastructure plugins. This plugin enables the saving of the URLs of tabs from specific sessions
  that one can later restore as a group, great for returning to a complete context at a later time and it enables on disk back ups that make it redundant in a way similar to the userChrome.css making the restoration of this **ACTUALLY FUNCTIONALLY DIFFERENT THEME**

### Features

- Sidebar automatically minimizes when not focused by hovering

- Removes top clutter by - removing the tab bar and its associated garishness - minimizing the size of the navigation bar - with menu bar displayed, the size of it is not offsetting to the viewport in the browser window

## Tree Style Tab Customizations

In order to get the Firefox window to be as consistent as possible with the rest of the configurations in this repo, I created some custom style rules based off the suggestions provided in the perferences section of that add-on and the provided link. Because not all of these were easily derived from the source material, especially styling the sidebar-container which took looking at the extensions source code (not a hard process but still frustrating considering the depth of other instructions) I have backed them up here in their own style sheet for purposes of reproducing the configuration even if there exists no easy way, that I know of at present, of automating this process.
