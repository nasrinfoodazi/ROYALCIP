let userInfo = {
    name: 'آرمین',
    family: "منوچهری",
    day: 12,
    month: 8,
    year: 1395,
    mobileNumber: 9121234567,
    countryCode: 98,
    email: 'test@gmail.com',
    sex: 'male',
    nationalCode: 212127192871,
    username: 'arminmanochehri',
    password: 123456,
    google: 'connect',
    googlecalndar: 'connect',
    passportNumber:24323423,
    passportCountry:98
}


function setProfileInfo() {
    Object.keys(userInfo).forEach(item => {
        let element = document.getElementById('user-info-' + item)
        if (element && userInfo[item]) {
            if (['year', 'month'].includes(item)) {
                element.innerText = ' / ' + userInfo[item]
            } else if (item === 'countryCode') {
                element.innerText = userInfo[item] + '+'
            } else if (item === 'sex') {
                if (userInfo[item] === 'male') {
                    element.innerText = 'مرد'
                } else {
                    element.innerText = 'زن'
                }

            } else if (item === 'google') {
                if (userInfo[item] === 'connect') {
                    element.innerText = 'متصل است'
                } else {
                    element.innerText = 'متصل نیست'
                }

            } else if (item === 'googlecalndar') {
                if (userInfo[item] === 'connect') {
                    element.innerText = 'متصل است'
                } else {
                    element.innerText = 'متصل نیست'
                }

            } else {
                element.innerText = userInfo[item]
            }

        }
    })
}

setProfileInfo();

function setPhoneNumber(show, hide, id) {
    let element = document.getElementById(id);

    if (element) {
        element.innerText = `${userInfo['countryCode']}${userInfo['mobileNumber']}+`
    }
    switchContent(show, hide);
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


function onchangeSwitch(e, labelId) {
    let getLabel = document.getElementById(labelId);
    if (getLabel) {
        getLabel.innerText = (e?.target?.checked || e.checked) && 'روشن' || 'خاموش'
    }
}

[
    {
        input: 'status-3',
        label: 'switch-label-3'
    },
    {
        input: 'status-2',
        label: 'switch-label-2'
    },
    {
        input: 'status-1',
        label: 'switch-label-1'
    }
].forEach(item => {
    let e = document.getElementById(item.input);
    console.log("item", item)
    if (e) {
        // console.log("eeeee", e.checked)
        onchangeSwitch(e, item.label)
    }

})




function setGoogle(parameter) {
    userInfo[parameter] = userInfo[parameter] === 'connect' && 'disconnect' || 'connect';
    let element = document.getElementById('user-info-' + parameter);
    let elementAction = document.getElementById('user-action-' + parameter);
    if (element)
        element.innerText = userInfo[parameter] === 'connect' && 'متصل است' || 'متصل نیست'


    if (elementAction)
        elementAction.innerText = userInfo[parameter] === 'connect' && 'قطع ارتباط' || 'اتصال'

}
