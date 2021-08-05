
//varibles
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const ShowMillionairesByn = document.getElementById('show-millionaires');
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

    const user = data.results[0]

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
        element.innerHTML = `<strong>${item.name}</strong>${item.money}`

        main.appendChild(element)

    });

}


// format number as money
function formatMoney(number){
    return  '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    updateDOM();

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
    data.sort((a,b) => b.money - a.money);
}

//event listers 
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney())
sortBtn.addEventListener('click', formatMoney())
