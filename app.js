
//varibles
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const ShowMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


//data array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


//get random user from api
async function getRandomUser (){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 1000000)
   };

   addData(newUser);
}

function addData(obj){
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data){
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`

        main.appendChild(element)

    });

}



//double money
function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });

    updateDOM();
}

//sort users by richest 
function sortByRichest(){
    console.log(1,2,3)
    data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//filters out millionaires
function ShowMillionaires(){
    data = data.filter(user => user.money > 1000000);
    
    updateDOM();
}

//calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc,user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML=`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}

// format number as money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listers 
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
ShowMillionairesBtn.addEventListener('click', ShowMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)
