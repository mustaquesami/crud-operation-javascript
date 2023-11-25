let nameElm = document.querySelector("#name");
let groupElm = document.querySelector("#group");
let phoneElm = document.querySelector("#phone");
let emailElm = document.querySelector("#email");
let btnSave = document.querySelector("#btnSave");
let errorElm = document.querySelector(".error");
let successElm = document.querySelector(".success");
let btnDelete = document.querySelector("#btnDelete");
let checkAll = document.querySelector("#checkAll");

let data = JSON.parse(localStorage.getItem("data")) || [];

//Data insurt function------------------
btnSave.addEventListener("click",()=>{
    const name = toCapitalize(nameElm.value);
    const group = groupElm.value;
    const phone = phoneElm.value
    const email = emailElm.value.toLowerCase();
    if(name===""||group===""||phone===""||email===""){
        errorElm.innerHTML ="All fields are required";
    }else{
        const personObj={
            name: name,
            group: group,
            phone: phone,
            email: email
        }
        data.push(personObj);
        localStorage.setItem("data",JSON.stringify(data));
        successElm.innerHTML = "Data inserted successfully";
        displayData();
        nameElm.value = "";
        groupElm.value = "";
        phoneElm.value = "";
        emailElm.value = "";
        errorElm.innerHTML="";
        setTimeout(() => {
            successElm.innerHTML="";
        }, 3000);
        nameElm.focus();
    }
})
//------------------------------------
//Data display function
const displayData = () => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    let tableElm = document.querySelector(".table");
    tableElm.innerHTML = "";

    if (data.length > 0) {
        btnDelete.removeAttribute("hidden");

        data.map((value, index) => {
            let inputElm = document.createElement("input");
            inputElm.setAttribute("type", "checkbox");
            inputElm.setAttribute("id", "checkData");
            inputElm.setAttribute("value", index);

            let trElm = document.createElement("tr");

            let tdCheckbox = document.createElement("td");
            tdCheckbox.appendChild(inputElm);
            trElm.appendChild(tdCheckbox);

            let tdNum = document.createElement("td");
            tdNum.innerHTML = index + 1;
            trElm.appendChild(tdNum);

            let tdName = document.createElement("td");
            tdName.innerHTML = `<div class="editDiv" contenteditable="true">${value.name}</div>`;
            trElm.appendChild(tdName);
            
            let tdGroup = document.createElement("td");
            tdGroup.innerHTML = `<div class="editDiv" contenteditable="true">${value.group}</div>`;
            trElm.appendChild(tdGroup);
            
            let tdPhone = document.createElement("td");
            tdPhone.innerHTML = `<div class="editDiv" contenteditable="true">${value.phone}</div>`;
            trElm.appendChild(tdPhone);

            let tdEmail = document.createElement("td");
            tdEmail.innerHTML = `<div class="editDiv" contenteditable="true">${value.email}</div>`;
            trElm.appendChild(tdEmail);

            tableElm.appendChild(trElm);
            checkAll.removeAttribute("hidden");
        });
    } else {
        btnDelete.setAttribute("hidden","hidden");
        checkAll.setAttribute("hidden","hidden")
        let trElm = document.createElement("tr");
        trElm.innerHTML = "<td>No data found</td>";
        tableElm.appendChild(trElm);
    }
};
displayData();

//Delete option---------------
btnDelete.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#checkData:checked");
    if(checkboxes.length>0){
        for (let i = checkboxes.length - 1; i >= 0; i--) {
            const index = parseInt(checkboxes[i].value);
            data.splice(index, 1);
        }
        localStorage.setItem("data", JSON.stringify(data));
        displayData();
    }else{
        alert("No item selected");
    }
});

//Select all function
checkAll.addEventListener("change",()=>{
    checkData = document.querySelectorAll("#checkData");
    checkData.forEach((value)=>{
        value.checked = checkAll.checked;
    })
})
//

//-----------------------------

//Capitalize function--------
const toCapitalize = (text) =>{
    let textArr = text.split(" ");
    for(let i=0; i<textArr.length;i++){
        textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1).toLowerCase();
    }
    return textArr.join(" ");
}
//--------------------------