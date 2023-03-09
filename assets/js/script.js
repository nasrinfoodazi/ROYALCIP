const showLangtMenu = document.querySelector('#show-lang-menu');
const LangIcon = document.querySelector('.lang-icon');
const langDropDown = document.querySelector('.lang-drop-down');
const SearchIcon = document.querySelector('.search-icon');
const autocompleteInput = document.querySelector('.autocomplete');
const autocompleteItems = document.querySelector('.autocomplete-items');
LangIcon.addEventListener('click', function () {
    if (langDropDown.style.opacity) {
        langDropDown.style.animation = 'showUp 0.35s 1';
        langDropDown.style.opacity = null;
    } else {
        langDropDown.style.animation = 'showUp 0.35s 1';
        langDropDown.style.opacity = '1';
        autocompleteInput.classList.remove('autocompleteHover')
    }
});

window.addEventListener('click', function (e) {
    if (!langDropDown.contains(e.target)) {
        if (langDropDown.style.opacity) {
            // langDropDown.style.animation = 'showUp 0.35s 1';
            langDropDown.style.opacity = null;
        }
    }
} ,true);

SearchIcon.addEventListener('click', function (e) {
    if(autocompleteInput.classList.contains('autocompleteHover')){
        if (!autocompleteInput.contains(e.target) || !autocompleteItems.contains(e.target) ) {
            autocompleteInput.classList.remove('autocompleteHover')
        }
    }else{
        autocompleteInput.classList.add('autocompleteHover')
        // langDropDown.style.animation = 'showUp 0.35s 1';
        langDropDown.style.opacity = null;
    }
});


let countries = ['ترانسفر فرودگاهی'];
autocomplete(document.getElementById("myInput"), countries);

