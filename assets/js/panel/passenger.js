let newItem = {
    name: '',
    family: '',
    phoneNumber: '',
    passportNumber: '',
    nationalId: '',
    gender: '',
    country: '',
    birthDay: '',
    email: ''
};
let passengersList = [{
    id: Date.now(),
    isMainPassenger: true,
    edit: true,
    name: 'نسرین',
    family: 'فودازی',
    phoneNumber: '09122269712',
    passportNumber: 'A23578964',
    nationalId: "0010563393",
    gender: "زن",
    country: '1',
    birthDay: '1368/02/23',
    email: "emailer7po@gmail.com"
}, {
    id: Date.now() + 100,
    name: 'نسرین1',
    family: 'فودازی1',
    phoneNumber: '09122269713',
    passportNumber: 'A23578965',
    nationalId: "0010563396",
    gender: "زن",
    country: '2',
    birthDay: '1368/02/24',
    email: "emailer71po@gmail.com"
}]
let passengerEdited = {};

let countryCode = [
    {key: '1', value: 'ایران'},
    {key: '2', value: 'کانادا'},
    {key: '3', value: 'آلمان'},
    {key: '4', value: 'انگلیس'},
]
let findCountryName = (key) => {
    let country = countryCode.find(item => item.key === key)
    if (country) {
        return country.value
    }
}

function addPanelPassenger() {
    newItem['id'] = new Date().getTime();
    newItem['edit'] = true;
    passengersList = passengersList.map(item => {
        item['edit'] = false;
        return item
    })
    passengerEdited = newItem;
    passengersList = [...passengersList, {...newItem}];
    createAccordion()
}

function removePassenger(index) {
    passengersList = passengersList.filter((item, i) => i !== index);
    passengersList = passengersList.map(item => {
        if (item['isMainPassenger']) {
            item['edit'] = true;
            passengerEdited = item;
        } else {
            item['edit'] = false
        }
        return item
    })

    createAccordion()
}

function editPassenger(index) {
    passengerEdited = {};
    passengersList = passengersList.map((item, i) => {
        if (index === i) {
            item['edit'] = true;
            passengerEdited = item;
        } else {
            item['edit'] = false
        }
        return item
    })
    createAccordion()
}

function cancelEditPassenger() {
    passengerEdited = {};
    passengersList = passengersList.map((item, i) => {
        item['edit'] = false;

        return item
    })
    createAccordion()
}

function savePassengerForm() {

    passengersList = passengersList.map((item, i) => {
        if(passengerEdited.id===item.id){
            passengerEdited['edit'] = false;
            console.log("passengerEdited", passengerEdited, item)
            return passengerEdited
        }else{
            return item
        }
    })
    passengerEdited={}
    createAccordion()
}

function updatePassengerFormItem(e, parameter) {
    if (['year', 'month', 'day'].includes(parameter)) {
        let birthDay = passengerEdited['birthDay'].split('/');
        if (parameter === 'day') {
            birthDay[2] = e.target.value
        } else if (parameter === 'month') {
            birthDay[1] = e.target.value
        } else {
            birthDay[0] = e.target.value
        }
        passengerEdited['birthDay'] = birthDay.join('/')
    } else if(parameter==='isMainPassenger'){
        passengerEdited[parameter] = !passengerEdited[parameter]
    }else {
        passengerEdited[parameter] = e.target.value
    }

}

function mainPassengerHeader(record, index) {
    return `
    <div class="main-passenger-header" style="padding: 15px">
                    <h5>مسافر اصلی</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="m-0"> سفارش شما بر اساس مشخصات مسافر اصلی انجام می گردد. </p>
                            ${record.edit && EditActions(record, index) || ViewActions(record, index)}
                    </div>
                  </div>
    `
}


function EditActions(record, index) {
    return `
    <div class="edit-sec d-flex justify-content-end align-items-center">
        <button class=" btn-border-blue" onclick="cancelEditPassenger()">لغو</button>
        <button class=" btn-info mx-2" onclick="savePassengerForm()">ذخیره</button>
        <a class="delete" title="Delete" data-toggle="tooltip"><span class="icon-Trash"></span></a>
      </div>
    `
}

function ViewActions(record, index) {
    return `
  <div class="col-2">
      <div class="d-flex justify-content-end align-items-center e-sec">
        <a href="" class="edit mx-2">ویرایش</a>
        <a class="delete" onclick="removePassenger(${index})" title="Delete" data-toggle="tooltip" ><span class="icon-Trash"></span></a>
      </div>
    </div>  
`
}

function otherPassengerEditHeader(record, index) {
    return `
    <div class="main-passenger-header" style="padding: 15px">
                    <h5>مسافر</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="m-0">  </p>
                            ${record.edit && EditActions(record, index) || ViewActions(record, index)}
                    </div>
                  </div>
    `
}

function otherPassengerViewHeader(record, index) {
    return `
            <div class="accordion-header" style="padding: 15px">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">

                <div class="col-10">
                  <div class="row">
                    <div class="col-3">
                      <div class="d-flex flex-column align-items-start pass-info ">
                        <div class="lightgray-text">
                          نام و نام خانوادگی
                        </div>
                        <div class="gray-text">
                          ${record.name}&nbsp;${record.family}
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="d-flex flex-column align-items-start pass-info">
                        <div class="lightgray-text">
                          شماره تماس
                        </div>
                        <div class="gray-text">
                            ${record.phoneNumber}
                         </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="d-flex flex-column align-items-start pass-info">
                        <div class="lightgray-text">
                          شماره گذرنامه
                        </div>
                        <div class="gray-text">
                            ${record.passportNumber}
                        </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="d-flex flex-column align-items-start pass-info">
                        <div class="lightgray-text">
                          کد ملی
                        </div>
                        <div class="gray-text">
                             ${record.nationalId}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-2">
                  <div class="px-2">
                    <a href="" class="edit" onclick="editPassenger(${index})">ویرایش</a>
                    <a class="delete" onclick="removePassenger(${index})" title="Delete" data-toggle="tooltip" ><span class="icon-Trash"></span></a>
                  </div>
                </div>                     
              </button>
            </div>
    `
}

function otherPassengerHeader(record, index) {
    return record.edit && otherPassengerEditHeader(record, index) || otherPassengerViewHeader(record, index)
}


function viewPassengerInfo(record, index) {
    return `
                        <div id="collapse-${index}" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                      <div class="accordion-body px-5">
                        <div class="col-10">
                          <div class="row">
                            <div class="col-3">
                              <div class="d-flex flex-column align-items-start pass-info">
                                <div class="lightgray-text">
                                     جنسیت
                                </div>
                                <div class="gray-text">
                                      ${record.gender}
                                </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div class="d-flex flex-column align-items-start pass-info">
                                <div class="lightgray-text">
                                   کشور
                                </div>
                                <div class="gray-text">
                                     ${findCountryName(record.country)}
                                  </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div class="d-flex flex-column align-items-start pass-info">
                                <div class="lightgray-text">
                                  تاریخ تولد 
                                </div>
                                <div class="gray-text">
                                  1368/02/23
                                </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div class="d-flex flex-column align-items-start pass-info">
                                <div class="lightgray-text">
                                  ایمیل 
                                </div>
                                <div class="gray-text">
                                     ${record.email}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

    `
}


function editPassengerInfo(record, index) {
    let birthDay = (passengerEdited?.birthDay || '1400/01/01')?.split('/');
    console.log("birthDay", birthDay)
    return `
      <div class="main-passenger-info" style="padding: 15px">
                    <div class="row ">
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for="">نام</label>
                          <input type="text" type="text" required="required" name="firstName" value="${passengerEdited.name}" onInput="updatePassengerFormItem(event,'name')">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 - ">
                        <div class="form-group">
                          <label for="">نام خانوادگی</label>
                          <input type="text" type="text" required="required" name="lastName" value="${passengerEdited.family}" onInput="updatePassengerFormItem(event,'family')">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="row">
                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">روز</label>
                              <select name="day" id="user-form-day" value="${birthDay[2]}" onInput="updatePassengerFormItem(event,'day')">
                                <option value="01" selected="01===${birthDay[2]}">1</option>
                                <option value="02" selected="02===${birthDay[2]}">2</option>
                                <option value="03" selected="03===${birthDay[2]}">3</option>
                                <option value="04" selected="04===${birthDay[2]}">4</option>
                                <option value="05" selected="05===${birthDay[2]}">5</option>
                                <option value="06" selected="06===${birthDay[2]}">6</option>
                                <option value="07" selected="07===${birthDay[2]}">7</option>
                                <option value="08" selected="08===${birthDay[2]}">8</option>
                                <option value="09" selected="09===${birthDay[2]}">9</option>
                                <option value="10" selected="10===${birthDay[2]}">10</option>
                                <option value="11" selected="11===${birthDay[2]}">11</option>
                                <option value="12" selected="12===${birthDay[2]}">12</option>
                                <option value="13" selected="13===${birthDay[2]}">13</option>
                                <option value="14" selected="14===${birthDay[2]}">14</option>
                                <option value="15" selected="15===${birthDay[2]}">15</option>
                                <option value="16" selected="16===${birthDay[2]}">16</option>
                                <option value="17" selected="17===${birthDay[2]}">17</option>
                                <option value="18" selected="18===${birthDay[2]}">18</option>
                                <option value="19" selected="19===${birthDay[2]}">19</option>
                                <option value="20" selected="20===${birthDay[2]}">20</option>
                                <option value="21" selected="21===${birthDay[2]}">21</option>
                                <option value="22" selected="22===${birthDay[2]}">22</option>
                                <option value="23" selected="23===${birthDay[2]}">23</option>
                                <option value="24" selected="24===${birthDay[2]}">24</option>
                                <option value="25" selected="25===${birthDay[2]}">25</option>
                                <option value="26" selected="26===${birthDay[2]}">26</option>
                                <option value="27" selected="27===${birthDay[2]}">27</option>
                                <option value="28" selected="28===${birthDay[2]}">28</option>
                                <option value="29" selected="29===${birthDay[2]}">29</option>
                                <option value="30" selected="30===${birthDay[2]}">30</option>
                                <option value="31" selected="31===${birthDay[2]}">31</option>
                              </select>
                              <i class="bar black"></i>

                            </div>
                          </div>
                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">ماه</label>
                              <select name="day" id="user-form-month"   onInput="updatePassengerFormItem(event,'month')"> 
                               <option value="01" selected="01===${birthDay[1]}">1</option>
                                <option value="02" selected="02===${birthDay[1]}">2</option>
                                <option value="03" selected="03===${birthDay[1]}">3</option>
                                <option value="04" selected="04===${birthDay[1]}">4</option>
                                <option value="05" selected="05===${birthDay[1]}">5</option>
                                <option value="06" selected="06===${birthDay[1]}">6</option>
                                <option value="07" selected="07===${birthDay[1]}">7</option>
                                <option value="08" selected="08===${birthDay[1]}">8</option>
                                <option value="09" selected="09===${birthDay[1]}">9</option>
                                <option value="10" selected="10===${birthDay[1]}">10</option>
                                <option value="11" selected="11===${birthDay[1]}">11</option>
                                <option value="12" selected="12===${birthDay[1]}">12</option>

                              </select>
                              <i class="bar black"></i>

                            </div>
                          </div>

                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">سال</label>
                              <select name="day" id="user-form-year" value="${birthDay[0]}" onInput="updatePassengerFormItem(event,'year')">
                                <option value="1368" selected="1368===${birthDay[0]}">1368</option>
                                <option value="1369" selected="1369===${birthDay[0]}">1369</option>
                                <option value="1370" selected="1370===${birthDay[0]}">1370</option>
                                <option value="1371" selected="1371===${birthDay[0]}">1371</option>
                                <option value="1372" selected="1372===${birthDay[0]}">1372</option>
                                <option value="1373" selected="1373===${birthDay[0]}">1373</option>
                                <option value="1374" selected="1374===${birthDay[0]}">1374</option>
                                <option value="1375" selected="1375===${birthDay[0]}">1375</option>
                                <option value="1376" selected="1376===${birthDay[0]}">1376</option>
                                <option value="1377" selected="1377===${birthDay[0]}">1377</option>
                                <option value="1378" selected="1378===${birthDay[0]}">1378</option>
                                <option value="1379" selected="1379===${birthDay[0]}">1379</option>

                              </select>
                              <i class="bar black"></i>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for="">ایمیل</label>
                          <input type="text" type="text" required="required" name="email" value="${passengerEdited.email}" onInput="updatePassengerFormItem(event,'email')">
                          <i class="bar black" ></i>
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="form-group black">
                          <label class=" black">کشور</label>
                          <select name="day" id="country"  onInput="updatePassengerFormItem(event,'country')">
                            <option selected="1===${passengerEdited.country}" value="1"  >ایران</option>
                            <option selected="2===${passengerEdited.country}" value="2">کانادا</option>
                            <option selected="3===${passengerEdited.country}" value="3">آلمان</option>
                            <option  selected="4===${passengerEdited.country}" value="4">انگلیس</option>
                          </select>
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for="">شماره موبایل</label>
                          <input type="text" type="text" required="required" name="mobile" value="${passengerEdited.phoneNumber}" onInput="updatePassengerFormItem(event,'phoneNumber')">
                          <i class="bar black"></i>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for=""> کد ملی</label>
                          <input type="text" type="text" required="required" name="id-nemiber" value="${passengerEdited.nationalId}"  onInput="updatePassengerFormItem(event,'nationalId')">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for=""> شماره گذرنامه</label>
                          <input type="text" type="text" required="required" name="pas-nemiber" value="${passengerEdited.passportNumber}"   onInput="updatePassengerFormItem(event,'passportNumber')">
                          <i class="bar black"></i>
                        </div>
                      </div>

                      <div class="col-12 col-sm-4">
                        <div class="row">
                          <div class="col-12 col-sm-6">
                            <div class="form-group black">
                              <label class=" black">جنسیت</label>
                              <select name="day" id="gender"   onInput="updatePassengerFormItem(event,'gender')">
                                <option selected="1===${passengerEdited.gender}" value="1">زن</option>
                                <option selected="2===${passengerEdited.gender}" value="2">مرد</option>

                              </select>
                              <i class="bar black"></i>
                            </div>
                          </div>
                          <div class="col-12 col-sm-6">
                            <div class="d-flex form-group">
                              <div class="form-check">
                                <label class="form-check-label black">

                                  <i class="input-helper"></i>مسافر اصلی
                                  <input type="checkbox" class="form-check-input" checked="${passengerEdited.isMainPassenger}" onchange="updatePassengerFormItem(event,'isMainPassenger')">
                                </label>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
    `
}

function GetAccordionItem(record, index) {
    return `
    <div class="accordion-item" style="border-top: 1px solid var(--light-gray)">
            
                
            ${record.isMainPassenger && mainPassengerHeader(record, index) || otherPassengerHeader(record, index)}
            ${record.edit && editPassengerInfo(record, index) || viewPassengerInfo(record, index)}
  </div>
    `
}


function createAccordion() {
    passengersList.forEach(item => {
        if (item.edit) {
            passengerEdited = item;
        }
    })
    // let newAccordionList = passengersList.map((item, index) => {
    //     return GetAccordionItem(item, index)
    // })
    let newAccordionList = '';
    passengersList.forEach((item, index) => {
        newAccordionList += GetAccordionItem(item, index)
    })
    document.getElementById('accordionPassengers').innerHTML = newAccordionList
}

createAccordion()

