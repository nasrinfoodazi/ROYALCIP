const showLangtMenu = document.querySelector('#show-lang-menu');
const LangIcon = document.querySelector('.lang-icon');
const langDropDown = document.querySelector('.lang-drop-down');

LangIcon.addEventListener('mouseenter', function () {
    
  langDropDown.style.animation = 'showUp 0.35s 1';
  langDropDown.style.opacity = '1';
  div.style.display = 'block';
  });

  LangIcon.addEventListener('mouseleave', function () {
    langDropDown.style.opacity = '0';
    div.style.display = 'none';
  });
  
