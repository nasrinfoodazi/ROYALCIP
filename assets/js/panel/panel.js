let userInfo = {
    name: 'آرمین',
    family: "منوچهری",
    day: 12,
    month: 8,
    year: 1395,
    mobileNumber: 9121234567,
    countryCode: 98

}


function setProfileInfo() {
    Object.keys(userInfo).forEach(item => {
        let element = document.getElementById('user-info-' + item)
        if (element && userInfo[item]) {
            if (['year', 'month'].includes(item)) {
                element.innerText = ' / ' + userInfo[item]
            } else if (item === 'countryCode') {
                element.innerText = userInfo[item]+'+'
            } else {
                element.innerText = userInfo[item]
            }

        }
    })
}

setProfileInfo();
function setPhoneNumber (show,hide,id){
    let element = document.getElementById(id);

    if(element){
        element.innerText = `${userInfo['countryCode']}${userInfo['mobileNumber']}+`
    }
    switchContent(show,hide);
}


function setFormInfo(list = [], switchIds = {}) {
    console.log(list)
    list.forEach(item => {
        let element = document.getElementById('user-form-' + item)
        if (element) {
            element.value = userInfo[item]
        }
    });
    switchContent(switchIds.show, switchIds.hide)
}

function editInfo(list = [], switchIds = {}) {
    list.forEach(item => {
        let element = document.getElementById('user-form-' + item)
        if (element) {
            userInfo[item] = element.value
        }
    })
    setProfileInfo()
    switchContent(switchIds.show, switchIds.hide)
}


function switchContent(show = [], hide = []) {
    show.forEach(item => {
        let element = document.getElementById(item);
        if (element) {
            element.classList.remove('content-hide');
        }
    });
    hide.forEach(item => {
        let element = document.getElementById(item);
        if (element) {
            element.classList.add('content-hide');
        }
    });
}
