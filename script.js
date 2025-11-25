const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const dropdowns =document.querySelectorAll(".dropdown select");
let btn =document.querySelector("form button");
let fromcurr =document.querySelector(".from select");
let tocurr =document.querySelector(".to select");

for(let select of dropdowns){
    for(let currCodes in countryList){
        let newOptions =document.createElement("option");
        newOptions.innerText=currCodes;
        newOptions.value=currCodes;
        select.append(newOptions);
        if(select.name === "from" && currCodes === "USD"){
            newOptions.selected="selected";
        }else if (select.name === "to" && currCodes === "INR"){
            newOptions.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}
const updateFlag=(element)=>{
    let currcode =element.value;
    let countrycode = countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src =newsrc;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const fromCurrency = fromcurr.value.toLowerCase();
    const toCurrency = tocurr.value.toLowerCase();

    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;
    console.log(URL);

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurrency][toCurrency];

        console.log("Rate:", rate);

        document.querySelector(".msg").innerText =
            `${amtval} ${fromCurrency.toUpperCase()} = ${(amtval * rate).toFixed(2)} ${toCurrency.toUpperCase()}`;

    } catch (error) {
        console.log("Error:", error);
    }
});

