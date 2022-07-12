Element.prototype.getElementsByStyle = function (styleProperties) {
    result = [];
    this.querySelectorAll('*').forEach(element => {
        // browse all style properties
        hasAllProperties = true;
        for (const [key, value] of Object.entries(styleProperties)) {
            if (element.style[key] != value) {
                hasAllProperties = false;
            }
        }

        if (hasAllProperties) {
            result.push(element);
        }
    });
    return result;
}

function getElementsByText(text) {
    result = [];
    document.querySelectorAll('*').forEach(element => {
        if (element.textContent == text) {
            result.push(element);
        }
    });
    return result;
}

Element.prototype.getCalendarLink = function () {
    // title
    let title = this.getElementsByStyle({
        'fontSize': '40px'
    })[0].textContent;

    // date
    let startDate = null;
    let endDate = null;
    if (this.getElementsByClassName('typesDate').length > 0) {
        let tmpDataDate = this.getElementsByClassName('typesDate')[0]
            .parentNode.parentNode.parentNode.parentNode.parentNode
            .querySelectorAll('div:last-of-type>div[role="button"]>div:first-of-type')[0]
            .textContent;
        const regexDate = /(\w* \d{1,2}, \d{4}) (.*)-(.*)/gm; // date in english
        let dataDate;
        dataDate = regexDate.exec(tmpDataDate);

        if (dataDate == null) {
            const regexDate = /(\d{1,2} \w* \d{4}) (.*)-(.*)/gm; // get french date
            dataDate = regexDate.exec(tmpDataDate);
        }

        if (dataDate != null) {
            // start date
            startDate = new Date(dataDate[1] + ' ' + dataDate[2])
                .toISOString();

            // end date
            endDate = new Date(dataDate[1] + ' ' + dataDate[3])
                .toISOString();
        } else {
            // date with no time
            const regexDate = /(\w* \d{1,2}, \d{4})/gm; // date in english
            dataDate = regexDate.exec(tmpDataDate);

            if (dataDate == null) {
                const regexDate = /(\d{1,2} \w* \d{4})/gm; // get french date
                dataDate = regexDate.exec(tmpDataDate);
            }

            startDate = new Date(dataDate[1]).toISOString().substring(0, 10);
            endDate = new Date(dataDate[1]);
            endDate.setDate(endDate.getDate() + 1);
            endDate = endDate.toISOString().substring(0, 10);
        }
        startDate = startDate.replace(/[:\-\.]/g, '');
        endDate = endDate.replace(/[:\-\.]/g, '');
    } else {
        return null;
    }

    // details
    let details = null;
    if (getElementsByText('Property 1').length > 0) {
        details = getElementsByText('Property 1')[3]
            .parentNode.parentNode.parentNode.parentNode.parentNode
            .querySelectorAll('div:last-of-type>div[role="button"]>span')[0];
        try {
            details = details.textContent + '\n';
        } catch (error) {
            details = '';
        }
        if (document.querySelector('.notion-peek-renderer') !== null) {
            details += document.querySelector('.notion-peek-renderer').querySelector('a').href
        } else {
            details += location.href;
        }
    }

    // lieu
    let lieu = null;
    if (getElementsByText('Lieu').length > 0) {
        lieu = getElementsByText('Lieu')[3]
            .parentNode.parentNode.parentNode.parentNode.parentNode
            .querySelectorAll('div:last-of-type>div[role="button"]>span')[0];
        if (lieu != undefined) {
            lieu = lieu.textContent;
        } else {
            lieu = '';
        }
    }

    // generate link
    let link = 'https://calendar.google.com/calendar/r/eventedit?text=' + encodeURI(title).replace('#', '%23');
    if (startDate != null) {
        link += '&dates=' + startDate + '/' + endDate;
    }
    if (lieu != null) {
        link += '&location=' + encodeURI(lieu);
    }
    if (details != null) {
        link += '&details=' + encodeURI(details);
    }

    return link;
}


function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}

// get calendar link in full page
waitForElementToDisplay(".notion-scroller>div.whenContentEditable", function () {
    setTimeout(() => { // timeout to wait title to change (notion latency)
        let tmpTitle = document.body.getElementsByStyle({
            'fontSize': '40px'
        })[0].textContent;

        if (tmpTitle != document.title) {
            getCalendarLinkInPopup();
            return;
        }


        calendarLink = document.body.getCalendarLink();
        if (calendarLink != null) {
            let addToCalendar = document.createElement('div');
            addToCalendar.style.cssText = "max-width: 100%;width: 900px;user-select: none;transition: background 20ms ease-in 0s;display: flex;align-items: center;height: 34px;border-radius: 3px;";
            addToCalendar.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768" style="width: 16px;height: 16px;display: block;fill: rgba(55, 53, 47, 0.4);flex-shrink: 0;backface-visibility: hidden;display: inline-block;margin-right: 8px;margin-left: 6px;"><g id="icomoon-ignore"></g><path d="M544 416v192c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-352c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-352c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h192c17.664 0 32-14.336 32-32s-14.336-32-32-32h-192c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v352c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h352c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32zM342.624 470.624l297.376-297.376v114.752c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-4.352-0.864-8.48-2.432-12.256s-3.872-7.296-6.912-10.336c-0.032-0.032-0.032-0.032-0.064-0.064-2.944-2.944-6.464-5.312-10.336-6.912-3.776-1.568-7.904-2.432-12.256-2.432h-192c-17.664 0-32 14.336-32 32s14.336 32 32 32h114.752l-297.376 297.376c-12.512 12.512-12.512 32.768 0 45.248s32.768 12.512 45.248 0z"></path></svg><a class="notion-link-token notion-enable-hover" href="' + calendarLink + '" target="_blank" style="cursor: pointer;border-bottom: 0.05em solid rgba(55, 53, 47, 0.4);border-top-color: rgba(55, 53, 47, 0.4);border-right-color: rgba(55, 53, 47, 0.4);border-left-color: rgba(55, 53, 47, 0.4);opacity: 0.7;color: inherit;overflow-wrap: break-word;text-decoration: inherit;line-height: 120%;font-size: 14px;">Add to calendar</a>';

            if (document.getElementsByClassName('notion-peek-renderer').length == 0) { // add link in full evenement page
                const parentNode = document.querySelector(".whenContentEditable > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > div > div");
                parentNode.insertBefore(addToCalendar, parentNode.firstElementChild);
            }
        }
    }, 500);
}, 100, 9000);


function getCalendarLinkInPopup() {
    waitForElementToDisplay(".notion-peek-renderer .typesDate", function () {
        calendarLink = document.querySelector('.notion-peek-renderer').getCalendarLink();
        if (calendarLink != null) {
            let addToCalendar = document.createElement('div');
            addToCalendar.style.cssText = "max-width: 100%;width: 900px;user-select: none;transition: background 20ms ease-in 0s;display: flex;align-items: center;height: 34px;border-radius: 3px;";
            addToCalendar.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768" style="width: 16px;height: 16px;display: block;fill: rgba(55, 53, 47, 0.4);flex-shrink: 0;backface-visibility: hidden;display: inline-block;margin-right: 8px;margin-left: 6px;"><g id="icomoon-ignore"></g><path d="M544 416v192c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-352c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-352c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h192c17.664 0 32-14.336 32-32s-14.336-32-32-32h-192c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v352c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h352c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32zM342.624 470.624l297.376-297.376v114.752c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-4.352-0.864-8.48-2.432-12.256s-3.872-7.296-6.912-10.336c-0.032-0.032-0.032-0.032-0.064-0.064-2.944-2.944-6.464-5.312-10.336-6.912-3.776-1.568-7.904-2.432-12.256-2.432h-192c-17.664 0-32 14.336-32 32s14.336 32 32 32h114.752l-297.376 297.376c-12.512 12.512-12.512 32.768 0 45.248s32.768 12.512 45.248 0z"></path></svg><a href="' + calendarLink + '" target="_blank" style="cursor: pointer;border-bottom: 0.05em solid rgba(55, 53, 47, 0.4);border-top-color: rgba(55, 53, 47, 0.4);border-right-color: rgba(55, 53, 47, 0.4);border-left-color: rgba(55, 53, 47, 0.4);opacity: 0.7;color: inherit;overflow-wrap: break-word;text-decoration: inherit;line-height: 120%;font-size: 14px;">Add to calendar</a>';

            // add link in semi full evenement page
            addToCalendar.style.cssText += "max-width: 100%;width: 100%;";
            const parentNode = document.querySelector(".whenContentEditable > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(1) > div > div");
            parentNode.insertBefore(addToCalendar, parentNode.firstElementChild);
        }
    }, 100, 9000);
}

waitForElementToDisplay(".notion-selectable.notion-page-block.notion-collection-item", function () {
    let allcalendarCard = document.querySelectorAll('.notion-selectable.notion-page-block.notion-collection-item');

    allcalendarCard.forEach(function (card) {
        card.onclick = getCalendarLinkInPopup;
    });
}, 100, 9000);
