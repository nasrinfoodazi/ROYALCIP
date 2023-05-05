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


function setFormInfo(list=[], switchIds={}){
    console.log(list)
    list.forEach(item=>{
        let element = document.getElementById('user-form-'+item)
        if(element){
            element.value = userInfo[item]
        }
    })
    switchContent(switchIds.show, switchIds.hide)
}
function editInfo(list=[], switchIds={}){
    list.forEach(item=>{
        let element = document.getElementById('user-form-'+item)
        if(element){
            userInfo[item] = element.value
        }
    })
    setProfileInfo()
    switchContent(switchIds.show, switchIds.hide)
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
