const showLangtMenu = document.querySelector('#show-lang-menu');
const LangIcon = document.querySelector('.lang-icon');
const langDropDown = document.querySelector('.lang-drop-down');
const SearchIcon = document.querySelector('.search-icon');
const autocompleteInput = document.querySelector('.autocomplete');
const autocompleteItems = document.querySelector('.autocomplete-items');
window.addEventListener('click', function (e) {
    if (LangIcon && LangIcon.contains(e.target)) {
        if (langDropDown.style.opacity) {
            langDropDown.style.animation = 'showUp 0.35s 1';
            langDropDown.style.opacity = null;
        } else {
            langDropDown.style.animation = 'showUp 0.35s 1';
            langDropDown.style.opacity = '1';
            autocompleteInput.classList.remove('autocompleteHover')
        }
    } else {
        if (langDropDown && !langDropDown.contains(e.target)) {
            langDropDown.style.opacity = null;
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
        langDropDown.style.opacity = null;
    }
});


let countries = ['ترانسفر فرودگاهی'];
autocomplete(document.getElementById("myInput"), countries);


function GetReserve(e, type) {
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
        title : 'حیوان خانگی',
        price:500000,
        group:'pets'
    },
    'keepPet': {
        title : 'نگهداری از حیوان خانگی',
        price:150000,
        group:'pets'
    },
    'wheelchair': {
        title : 'نیاز به ویلچر دارم',
        price:500000,
        group:'wheelchair'

    },
    'wheelchairAssistant': {
        title : 'نیاز به دستیار برای ویلچر دارم',
        price:250000,
        group:'wheelchair'
    },
    'adult': {
        title : 'بزرگسال',
        price:250000,
        group:'gust'
    },
    'child': {
        title : 'کودک',
        price:770000,
        group:'gust'
    },
    'baby': {
        title : 'نوزاد',
        price:0,
        group:'gust'
    },
    'standardFood': {
        title : 'استاندارد',
        price:0,
        group:'meal'
    },
    'vegetarianFood': {
        title : 'گیاهی',
        price:0,
        group:'meal'
    },
    'lowCholesterol': {
        title : 'کلسترول پایین',
        price:190000,
        group:'meal'
    },
    'flower': {
        title : 'گل',
        price:90000,
        group:'flower'
    },
    'localSweets': {
        title : 'شیرینی محلی',
        price:750000,
        group:'flower'
    },
    'gift': {
        title : 'هدیه',
        price:110000,
        group:'flower'
    },
    'baggage': {
        title : 'چمدان',
        price:210000,
        group:'baggage'
    },
    'rav4': {
        title : 'تویوتا RAV4 - ظرفیت 4 نفر - 4چمدان 30kg',
        price:0,
        group:'transfer'
    },
    's500': {
        title : 'بنزS500 - ظرفیت 3 نفر - 3چمدان 30kg',
        price:890000,
        group:'transfer'
    },
    'h350': {
        title : 'ون هیوندای H350 - ظرفیت 7 نفر - 4چمدان 30kg',
        price:10500000,
        group:'transfer'
    },
}

function addService(service, type) {
    if (service && type) {
        if (!addServiceFormData[service]) {
            addServiceFormData[service] = {
                price: 0,
                quantity: 0
            }
        }
        if (type === 'increase') {
            addServiceFormData[service]['quantity'] = (addServiceFormData[service]['quantity'] || 0) + 1
        } else if (type === 'decrease') {
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

function updateDetails() {

    let html = ``;
    Object.keys(addServiceFormData).forEach(item=>{
        if(addServiceFormData[item] && addServiceFormData[item]['quantity'] && selectedServices[prices[item]['group']] && prices[item]['price']){
            html+=`
                <div class="d-flex align-items-center justify-content-between add-service-detail-item">
                            <div class="col-9 d-flex align-items-center ">
                                <div>${prices[item]['title']}</div>
                            </div>
                            <div class="col-3 d-flex align-items-center  justify-content-end">
                                <div>${addServiceFormData[item]['quantity']*prices[item]['price']}</div>
                                <div>&nbsp;تومان</div>
                            </div>
                        </div>
            `
        }
    });
    document.getElementById('add-service-details').innerHTML=html;
    if(html){
        document.getElementById('add-service-details-content').style.display='block'
    }else{
        document.getElementById('add-service-details-content').style.display='none'
    }
}
