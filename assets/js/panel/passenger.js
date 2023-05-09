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
    isMainPassenger:true,
    edit:true,
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
    passengersList=passengersList.map(item=>{
        item['edit'] = false;
        return item
    })
    passengersList = [...passengersList, {...newItem}];
    createAccordion()
}
function removePassenger(index){
    passengersList=passengersList.filter((item,i)=>i!==index);
    passengersList=passengersList.map(item=>{
        if(item['isMainPassenger']){
            item['edit']=true
        }else{
            item['edit']=false
        }
        return item
    })
    createAccordion()
}

function mainPassengerHeader(record, index) {
    return `
    <div class="main-passenger-header">
                    <h5>مسافر اصلی</h5>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="m-0"> سفارش شما بر اساس مشخصات مسافر اصلی انجام می گردد. </p>
                      <div class="edit-sec d-flex justify-content-end align-items-center">
                        <button class=" btn-border-blue">لغو</button>
                        <button class=" btn-info mx-2">ذخیره</button>
                        <a class="delete" title="Delete" data-toggle="tooltip"><span class="icon-Trash"></span></a>
                      </div>
                    </div>
                  </div>
    `
}




function otherPassenger(record, index) {
    return `
            <div class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">

                        <div class="col-10">
                          <div class="row">
                            <div class="col-3">
                              <div class="d-flex flex-column align-items-start pass-info">
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
                            <a href="" class="edit">ویرایش</a>
                            <a class="delete" onclick="removePassenger(${index})" title="Delete" data-toggle="tooltip" ><span class="icon-Trash"></span></a>
                          </div>
                        </div>                      </button>
                    </div>
    `
}


function viewPassengerInfo(record, index){
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


function editPassengerInfo(record, index){
    let birthDay = (record?.birthDay || '1400/01/01')?.split('/');
    console.log("birthDay", birthDay)
    return`
      <div class="main-passenger-info">
                    <div class="row ">
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for="">نام</label>
                          <input type="text" type="text" required="required" name="firstName" value="${record.name}">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 - ">
                        <div class="form-group">
                          <label for="">نام خانوادگی</label>
                          <input type="text" type="text" required="required" name="flastName" value="${record.family}">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="row">
                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">روز</label>
                              <select name="day" id="user-form-day" value="${birthDay[2]}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                              </select>
                              <i class="bar black"></i>

                            </div>
                          </div>
                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">ماه</label>
                              <select name="day" id="user-form-month" value="${birthDay[2]}"> 
                                <option value="1">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>

                              </select>
                              <i class="bar black"></i>

                            </div>
                          </div>

                          <div class="col-12 col-sm-4">
                            <div class="form-group black">
                              <label class=" black">سال</label>
                              <select name="day" id="user-form-year" value="${birthDay[0]}">
                                <option value="1368">1368</option>
                                <option value="1369">1369</option>
                                <option value="1370">1370</option>
                                <option value="1371">1371</option>
                                <option value="1372">1372</option>
                                <option value="1373">1373</option>
                                <option value="1374">1374</option>
                                <option value="1375">1375</option>
                                <option value="1376">1376</option>
                                <option value="1377">1377</option>
                                <option value="1378">1378</option>
                                <option value="1379">1379</option>

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
                          <input type="text" type="text" required="required" name="email" value="${record.email}">
                          <i class="bar black" ></i>
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="form-group black">
                          <label class=" black">کشور</label>
                          <select name="day" id="country" value="${record.country}">
                            <option value="1">ایران</option>
                            <option value="2">کانادا</option>
                            <option value="3">آلمان</option>
                            <option value="4">انگلیس</option>
                          </select>
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for="">شماره موبایل</label>
                          <input type="text" type="text" required="required" name="mobile" value="${record.phoneNumber}">
                          <i class="bar black"></i>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for=""> کد ملی</label>
                          <input type="text" type="text" required="required" name="id-nemiber" value="${record.nationalId}">
                          <i class="bar black"></i>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 ">
                        <div class="form-group">
                          <label for=""> شماره گذرنامه</label>
                          <input type="text" type="text" required="required" name="pas-nemiber" value="${record.passportNumber}">
                          <i class="bar black"></i>
                        </div>
                      </div>

                      <div class="col-12 col-sm-4">
                        <div class="row">
                          <div class="col-12 col-sm-6">
                            <div class="form-group black">
                              <label class=" black">جنسیت</label>
                              <select name="day" id="gender" value="${record.gender}">
                                <option value="1">زن</option>
                                <option value="2">مرد</option>

                              </select>
                              <i class="bar black"></i>
                            </div>
                          </div>
                          <div class="col-12 col-sm-6">
                            <div class="d-flex form-group">
                              <div class="form-check">
                                <label class="form-check-label black">

                                  <i class="input-helper"></i>مسافر اصلی
                                  <input type="checkbox" class="form-check-input" checked="${record.isMainPassenger}">
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
    <div class="accordion-item">
            
                
            ${record.isMainPassenger && mainPassengerHeader(record, index) || otherPassenger(record, index)}
            ${record.edit && editPassengerInfo(record, index) || viewPassengerInfo(record, index)}
  </div>
    `
}


function createAccordion() {
    let newAccordionList = passengersList.map((item, index) => {
        return GetAccordionItem(item, index)
    })
    document.getElementById('accordionPassengers').innerHTML = newAccordionList
}

createAccordion()

