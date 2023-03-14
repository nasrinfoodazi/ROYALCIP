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
    requireField.forEach(item=>{
        console.log("document.getElementsByName(item)", document.getElementsByName(item))
        document.getElementsByName(item)[0].value = null
    });
    formData={}

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
    console.log('"ttttttttt',e, type)
    if(selectedServices[type]){
        Reflect.deleteProperty(selectedServices,type);
        document.getElementById(`${type}-select-id`).classList.remove('accordion-check')
    }else{
        selectedServices[type] = true;
        document.getElementById(`${type}-select-id`).classList.add('accordion-check')
    }

}
