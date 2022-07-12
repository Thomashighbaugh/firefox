function getElementsByStyle(styleProperties) {
    result = [];
    document.querySelectorAll('*').forEach(element => {
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

function getCalendarLink() {
    //  title
    let title = getElementsByStyle({
        'fontSize': '40px'
    })[0].textContent;

    // date
    let tmpDataDate = document.getElementsByClassName('typesDate')[0]
        .parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelectorAll('div:last-of-type>div[role="button"]>div:first-of-type')[0]
        .textContent;
    const regexDate = /(\w* \d{1,2}, \d{4}) (.*)-(.*)/gm;
    let dataDate;
    dataDate = regexDate.exec(tmpDataDate)

    // start date
    let startDate = new Date(dataDate[1] + ' ' + dataDate[2])
        .toISOString()
        .replace(/[:\-\.]/g, '');

    // end date
    let endDate = new Date(dataDate[1] + ' ' + dataDate[3])
        .toISOString()
        .replace(/[:\-\.]/g, '');

    // details
    let details = getElementsByText('Property 1')[3]
        .parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelectorAll('div:last-of-type>div[role="button"]>span')[0]
        .textContent;

    // lieu
    let lieu = getElementsByText('Lieu')[3]
        .parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelectorAll('div:last-of-type>div[role="button"]>span')[0]
        .textContent;

    // generate link
    return 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + encodeURI(title) + '&dates=' + startDate + '/' + endDate + '&details=' + encodeURI(details) + '&location=' + encodeURI(lieu);
}

console.log(getCalendarLink());