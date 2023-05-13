let userInfo = {
    name: 'آرمین',
    family: "منوچهری",
    day: 12,
    month: 8,
    year: 1395,
    mobileNumber: 9121234567,
    countryCode: 98,
    email:'test@gmail.com',
    sex:'male',
    nationalCode:212127192871,
    username:'arminmanochehri',
    password:123456,
    google:'connect',
    googlecalndar:'connect'
}


function setProfileInfo() {
    Object.keys(userInfo).forEach(item => {
        let element = document.getElementById('user-info-' + item)
        if (element && userInfo[item]) {
            if (['year', 'month'].includes(item)) {
                element.innerText = ' / ' + userInfo[item]
            } else if (item === 'countryCode') {
                element.innerText = userInfo[item]+'+'
            } else if (item === 'sex') {
                if(userInfo[item]==='male'){
                    element.innerText = 'مرد'
                }else{
                    element.innerText = 'زن'
                }

            } else if (item === 'google') {
                if(userInfo[item]==='connect'){
                    element.innerText = 'ارتباط'
                }else{
                    element.innerText = 'قطع ارتباط'
                }

            }
            else if (item === 'googlecalndar') {
                if(userInfo[item]==='connect'){
                    element.innerText = 'ارتباط'
                }else{
                    element.innerText = 'قطع ارتباط'
                }

            }
             else {
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
