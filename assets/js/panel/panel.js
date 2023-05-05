let userInfo = {
    name:'آرمین',
    family:"منوچهری",

}


function setProfileInfo(){
    Object.keys(userInfo).forEach(item=>{
        let element = document.getElementById('user-info-'+item)
        if(element){
            element.innerText = userInfo[item]
        }
    })
}
setProfileInfo()


function setFormInfo(list=[], show, hide){
    console.log(list)
    list.forEach(item=>{
        let element = document.getElementById('user-form-'+item)
        if(element){
            element.value = userInfo[item]
        }
    })
    switchContent([show], [hide])
}
function editInfo(list=[], show, hide){
    list.forEach(item=>{
        let element = document.getElementById('user-form-'+item)
        if(element){
            userInfo[item] = element.value
        }
    })
    setProfileInfo()
    switchContent([show], [hide])
}


function switchContent(show=[], hide=[]){
    show.forEach(item=>{
        let element = document.getElementById(item);
        if(element){
            element.classList.remove('content-hide');
        }
    });
    hide.forEach(item=>{
        let element = document.getElementById(item);
        if(element){
            element.classList.add('content-hide');
        }
    });
}
