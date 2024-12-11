const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD"){
            newOption.selected = "selected" //selected attribute ka naam aur value dono hai
        }
        else if (select.name == "to" && currCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("click", (evt)=>{
        updateFlag(evt.target); //jo bhi change laya uski location hai evt.target
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode]; //currCode = INR, countryCode = IN
    let newSrc =  `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); //form ke submit hone se page refresh hota hai so this prevents that
    let amount = document.querySelector(".amount input");
    if (amount.value < 0){
        alert("bakchodi nai");
        amount.value = 1;
    }
    else if (amount.value == ""){
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount = (amount.value)*rate;

    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
