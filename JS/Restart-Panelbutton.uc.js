//在三道杠菜单添加重启浏览器选项
(function()
{
    var quitBtn = document.getElementById("appMenu-quit-button");
    if (!quitBtn) return;

    var restartBtn = document.createXULElement("toolbarbutton");
    restartBtn.setAttribute("label", "\u91cd\u65b0\u542f\u52a8");
    restartBtn.setAttribute("class", "subviewbutton subviewbutton-iconic");
    restartBtn.setAttribute("id", "restart-button");
    restartBtn.style.listStyleImage= 'url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="context-fill" fill-opacity="context-fill-opacity" d="M15,1a1,1,0,0,0-1,1V4.418A6.995,6.995,0,1,0,8,15a6.954,6.954,0,0,0,4.95-2.05,1,1,0,0,0-1.414-1.414A5.019,5.019,0,1,1,12.549,6H10a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V2A1,1,0,0,0,15,1Z"/></svg>\')';
    restartBtn.addEventListener("command", function()
    {
        const APP_START = Components.classes['@mozilla.org/toolkit/app-startup;1']
            .getService(Components.interfaces.nsIAppStartup);
        APP_START.quit(APP_START.eRestart | APP_START.eAttemptQuit);
    }, false);
    quitBtn.parentNode.insertBefore(restartBtn, quitBtn);
})();

// 三道杠添加配置文件夹
(function()
{
    var customizeBtn = document.getElementById("appMenu-customize-button");
    if (!customizeBtn) return;
  
    var ChromeBtn = document.createXULElement("toolbarbutton");
    ChromeBtn.setAttribute("label", "\u914D\u7F6E\u6587\u4EF6\u5939");
    ChromeBtn.setAttribute("class", "subviewbutton subviewbutton-iconic");
    ChromeBtn.setAttribute("id", "Chrome-button");
  
    ChromeBtn.addEventListener("command", function()
    {
        var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsIFile).reveal();
    }, false);
    customizeBtn.parentNode.insertBefore(ChromeBtn, customizeBtn);
})();