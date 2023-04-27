const showLangtMenu = document.querySelector('#show-lang-menu');
const LangIcon = document.querySelector('.lang-icon');
const langDropDown = document.querySelector('.lang-drop-down');
const SearchIcon = document.querySelector('.search-icon');
const autocompleteInput = document.querySelector('.autocomplete');
const autocompleteItems = document.querySelector('.autocomplete-items');
window.addEventListener('click', function (e) {
    if (LangIcon && LangIcon.contains(e.target)) {
        if (langDropDown.style.display === 'block') {
            langDropDown.style.animation = 'showUp 0.35s 1';
            langDropDown.style.display = 'none';
        } else {
            langDropDown.style.animation = 'showUp 0.35s 1';
            langDropDown.style.display = 'block';
            autocompleteInput.classList.remove('autocompleteHover')
        }
    } else {
        if (langDropDown && !langDropDown.contains(e.target)) {
            langDropDown.style.display = 'none';
        }

    }
});

SearchIcon.addEventListener('click', function (e) {
    if (autocompleteInput.classList.contains('autocompleteHover')) {
        if (!autocompleteInput.contains(e.target) || !autocompleteItems.contains(e.target)) {
            autocompleteInput.classList.remove('autocompleteHover')
        }
    } else {
        autocompleteInput.classList.add('autocompleteHover')
        // langDropDown.style.animation = 'showUp 0.35s 1';
        langDropDown.style.display = 'none';
    }
});


let countries = ['ترانسفر فرودگاهی'];
autocomplete(document.getElementById("myInput"), countries);


function GetReserve(e, action) {
    console.log("e, type::GetReserve:", e, type)
}

let formData = {};
let requireField = ['date1', 'fligtNumber1', 'passenger1', 'cip1']

function GetFlight(e, type) {
    if (type === 'flight2') {
        document.getElementById('flight2Section').style.display = 'flex'
    } else {
        document.getElementById('flight2Section').style.display = 'none'
    }
    document.getElementById('form-submit-btn').disabled = true;
    requireField.forEach(item => {
        console.log("document.getElementsByName(item)", document.getElementsByName(item))
        document.getElementsByName(item)[0].value = null
    });
    formData = {}

}

;


function GetFormInfo(e) {
    formData[e.target.name] = e.target.value;

    if (document.getElementById('flight2Section').style.display === 'flex') {
        requireField = [...requireField, 'date2', 'fligtNumber2', 'passenger2', 'cip2'];
    }

    let disabled = false;
    requireField.forEach(item => {
        if (!formData[item]) {
            disabled = true;
        }
    });
    document.getElementById('form-submit-btn').disabled = disabled;

    console.log("e, type::GetFormInfo:", e.target.name, e.target.value, document.getElementById('flight2Section').style.display)
}


let selectedServices = {}

function checkServices(e, type) {
    console.log('"ttttttttt', e, type)
    if (selectedServices[type]) {
        Reflect.deleteProperty(selectedServices, type);
        document.getElementById(`${type}-select-id`).classList.remove('accordion-check')
    } else {
        selectedServices[type] = true;
        document.getElementById(`${type}-select-id`).classList.add('accordion-check')
    }

    updateDetails()

}


let addServiceFormData = {};
let prices = {
    'pet': {
        title: 'حیوان خانگی',
        price: 500000,
        group: 'pets'
    },
    'keepPet': {
        title: 'نگهداری از حیوان خانگی',
        price: 150000,
        group: 'pets'
    },
    'wheelchair': {
        title: 'نیاز به ویلچر دارم',
        price: 500000,
        group: 'wheelchair'

    },
    'wheelchairAssistant': {
        title: 'نیاز به دستیار برای ویلچر دارم',
        price: 250000,
        group: 'wheelchair'
    },
    'adult': {
        title: 'بزرگسال',
        price: 250000,
        group: 'gust'
    },
    'child': {
        title: 'کودک',
        price: 770000,
        group: 'gust'
    },
    'baby': {
        title: 'نوزاد',
        price: 0,
        group: 'gust'
    },
    'standardFood': {
        title: 'استاندارد',
        price: 0,
        group: 'meal'
    },
    'vegetarianFood': {
        title: 'گیاهی',
        price: 0,
        group: 'meal'
    },
    'lowCholesterol': {
        title: 'کلسترول پایین',
        price: 190000,
        group: 'meal'
    },
    'flower': {
        title: 'گل',
        price: 90000,
        group: 'flower'
    },
    'localSweets': {
        title: 'شیرینی محلی',
        price: 750000,
        group: 'flower'
    },
    'gift': {
        title: 'هدیه',
        price: 110000,
        group: 'flower'
    },
    'baggage': {
        title: 'چمدان',
        price: 210000,
        group: 'baggage'
    },
    'rav4': {
        title: 'تویوتا RAV4 - ظرفیت 4 نفر - 4چمدان 30kg',
        price: 0,
        group: 'transfer'
    },
    's500': {
        title: 'بنزS500 - ظرفیت 3 نفر - 3چمدان 30kg',
        price: 890000,
        group: 'transfer'
    },
    'h350': {
        title: 'ون هیوندای H350 - ظرفیت 7 نفر - 4چمدان 30kg',
        price: 10500000,
        group: 'transfer'
    },
    'insideAirport': {
        title: 'داخل فرودگاه',
        price: 76000,
        group: 'shopAssistant'
    },
    'insideCity': {
        title: 'داخل فرودگاه',
        price: 120000,
        group: 'shopAssistant'
    },
}


function addService(service, action, parameter, type) {
    if (type === 'otherAction') {
        addServiceFormData[service][parameter] = action
    } else {
        if (service && action) {
            if (!addServiceFormData[service]) {
                addServiceFormData[service] = {
                    price: 0,
                    quantity: 0
                }
            }
            if (action === 'increase') {
                addServiceFormData[service]['quantity'] = (addServiceFormData[service]['quantity'] || 0) + 1
            } else if (action === 'decrease') {
                addServiceFormData[service]['quantity'] = (addServiceFormData[service]['quantity'] || 0) - 1;
                if (!addServiceFormData[service]['quantity'] || addServiceFormData[service]['quantity'] < 0) {
                    addServiceFormData[service]['quantity'] = 0
                }
            }
            document.getElementById(`add-service-quantity-${service}`).innerHTML = addServiceFormData[service]['quantity'];
            console.log("addServiceFormData", addServiceFormData);
            updateDetails()

        }
    }
}

function updateDetails() {

    let html = ``;
    Object.keys(addServiceFormData).forEach(item => {
        if (addServiceFormData[item] && addServiceFormData[item]['quantity'] && selectedServices[prices[item]['group']] && prices[item]['price']) {
            html += `
                <div class="d-flex align-items-center justify-content-between add-service-detail-item">
                            <div class="col-9 d-flex align-items-center ">
                                <div>${prices[item]['title']}</div>
                            </div>
                            <div class="col-3 d-flex align-items-center  justify-content-end">
                                <div>${addServiceFormData[item]['quantity'] * prices[item]['price']}</div>
                                <div>&nbsp;تومان</div>
                            </div>
                        </div>
            `
        }
    });
    document.getElementById('add-service-details').innerHTML = html;
    if (html) {
        document.getElementById('add-service-details-content').style.display = 'block'
    } else {
        document.getElementById('add-service-details-content').style.display = 'none'
    }
}

let samplePassenger = {
    firstName: null,
    lastName: null,
    birthDay: null,
    mobileNumber: null,
    sex: 'male',
    nationality: 'iranian',
    id: 0,
    passportNumber: null,
    country: null,
    email: null

};
let passengers = [];

function addPassenger(state) {
    samplePassenger['id'] = new Date().getTime();
    passengers = [...passengers, {...samplePassenger}];
    generatePassengerForm({...samplePassenger}, state)
}

addPassenger('start');

function generatePassengerForm(newPassenger, state) {
    console.log("newPassenger", newPassenger)

    let pHtml = `
    <div class="accordion-item" id="passenger-accordion-item-${newPassenger['id']}">
                                    <div class="accordion-header d-flex align-items-center justify-content-between"
                                         id="passenger-${newPassenger['id']}">
                                        <div class="accordion-button-custom collapsed" type="button"
                                             data-bs-toggle="collapse" aria-expanded="false"
                                             data-bs-target="#passenger-collapse-${newPassenger['id']}"
                                             aria-controls="passenger-collapse-${newPassenger['id']}">
                                            <div class="d-flex align-items-center justify-content-between accordion-header-custom">
                                                <div class="d-flex align-items-center">
                                                    <div class="accordion-title" id="passenger-title-${newPassenger['id']}">اطلاعات مسافر
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                             <div class="site-action-icon" style="display: none" id="passenger-edit-${newPassenger['id']}">
                                                <div class="edit-icon"></div>
                                            </div>
                                                 <div class="site-action-icon" style="display: none" id="passenger-delete-${newPassenger['id']}" onclick="deletePassenger(${newPassenger['id']})">
                                                <div class="delete-icon"></div>
                                            </div>
                                            <div class="accordion-arrow-icon" ">
                                                <div class="arrow-down-icon"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center">
                                            <div class="divider" style="width: 99%"></div>
                                        </div>
                                    </div>
                                    <div id="passenger-collapse-${newPassenger['id']}" class="accordion-collapse collapse"
                                         aria-labelledby="passenger-${newPassenger['id']}">
                                        <div class="accordion-body accordion-body-custom">
                                            <div class="row">

                                                <div class="col-12">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                               name="sex" id="passenger-male-${newPassenger['id']}"
                                                               value="male" checked>
                                                        <label class="form-check-label radio-label"
                                                        onchange="updatePassengerInfo(event, ${newPassenger['id']})"
                                                               for="passenger-male-${newPassenger['id']}">آقا</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                        onchange="updatePassengerInfo(event, ${newPassenger['id']})"
                                                               name="sex" id="passenger-female-${newPassenger['id']}"
                                                               value="female">
                                                        <label class="form-check-label radio-label"
                                                               for="passenger-female-${newPassenger['id']}">خانم</label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" required="required" name="firstName"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <label class="control-label">نام</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" required="required" name="lastName"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <label class="control-label">نام خاخوادگی</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" required="required" name="birthDay"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <div class="site-icon form-input-icon">
                                                            <div class="calender-gray-icon "></div>
                                                        </div>
                                                        <label class="control-label">تاریخ تولد</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" class="ltr-data input-icon"
                                                               required="required" name="mobileNumber"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <div class="form-input-icon phone-number-code">
                                                            <div class="d-flex align-items-center" style="height: 18px">

                                                                <div class="site-icon" style="height: 16px">
                                                                    <div class="flag-iran-icon"></div>
                                                                </div>
                                                                <div class="d-flex" style="margin-left: 5px">+98</div>
                                                            </div>
                                                        </div>
                                                        <label class="control-label">شماره تلفن همراه</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 ">
                                                    <div class="form-group">
                                                        <input type="text" class="ltr-data input-icon"
                                                               name="email"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <div class="form-input-icon">
                                                            *اختیاری
                                                        </div>
                                                        <label class="control-label">ایمیل</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                               name="nationality"
                                                               onchange="updatePassengerInfo(event, ${newPassenger['id']})"
                                                               id="passenger-nationality-iranian-${newPassenger['id']}"
                                                               value="iranian" checked>
                                                        <label class="form-check-label radio-label"
                                                               for="passenger-iranian-${newPassenger['id']}">ایرانی</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                         onchange="updatePassengerInfo(event, ${newPassenger['id']})"
                                                               name="nationality"
                                                               id="passenger-nationality-foreign-${newPassenger['id']}"
                                                               value="foreign">
                                                        <label class="form-check-label radio-label"
                                                               for="passenger-foreign-${newPassenger['id']}">خارجی</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" id="nationality-${newPassenger['id']}" style="display: none">
                                                 <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" required="required" name="country"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <label class="control-label">کشور</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6">
                                                    <div class="form-group">
                                                        <input type="text" required="required" name="passportNumber"
                                                               onkeyup="updatePassengerInfo(event, ${newPassenger['id']})"/>
                                                        <label class="control-label">شماره گذرنامه</label><i
                                                            class="bar"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `;


    let getAccordion = document.getElementById('accordionPanelPassengers');
    getAccordion.insertAdjacentHTML('beforeend', pHtml);
    if(state!=='start'){
        document.getElementById(`passenger-edit-${newPassenger['id']}`).style.display='inline-block';
        document.getElementById(`passenger-delete-${newPassenger['id']}`).style.display='inline-block';
    }
};


function deletePassenger( id) {
    document.getElementById(`passenger-accordion-item-${id}`).remove();
    passengers = passengers.filter(item=>item.id!==id);
    console.log("passengers", passengers)
}
function updatePassengerInfo(event, id) {
    let findPassenger = passengers.find(item => item.id === id);
    if (findPassenger) {
        console.log("event.target.name", event.target.name, event.target.value)
        findPassenger[event.target.name] = event.target.value;
        passengers = passengers.map(item => {
            if (item.id === id) {
                return findPassenger
            }
            return item
        });
        document.getElementById(`passenger-title-${id}`).innerText = 'اطلاعات مسافر';
        document.getElementById(`nationality-${id}`).style.display = 'none';
        if (findPassenger['firstName'] || findPassenger['lastName']) {
            let fullName = '';
            if (findPassenger['firstName']) {
                fullName += findPassenger['firstName']
            }
            if (findPassenger['lastName']) {
                fullName += ' ' + findPassenger['lastName']
            }
            document.getElementById(`passenger-title-${id}`).innerText = fullName
        }

        if(findPassenger['nationality']==="foreign"){
            document.getElementById(`nationality-${id}`).style.display = 'flex';
        }
        console.log("events, id", findPassenger, passengers)
    }

}




function sendContactUs(){
    let contactUsForm = document.getElementById('contact-us-form');
    let contactUsSend = document.getElementById('contact-us-send');
    if(contactUsForm && contactUsSend){
        contactUsForm.classList.add('contact-us-hide')
        contactUsSend.classList.remove('contact-us-hide')
    }
}

