function loadTableData(){
    fetch(`download.json`)
    .then(res => res.json())
    .then(data => displayTableData(data))
}

const displayTableData =(data) =>{
    // console.log(data.person)
    const tableData = document.getElementById('tableBodyData')
    data.slice(0,10).forEach(person =>{
        // console.log(person.rank)
        const amountIns = person.financialAssets[0].sharePrice;
        const amount = parseFloat(amountIns).toFixed(2)
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <th scope="row">${person.personName}<i class="fa-solid fa-eye ps-2" onclick="loadSingleBillionaire(${person.rank})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></th>
        <td scope="row">${person.countryOfCitizenship}</td>
        <td scope="row">${person.source}</td>
        <td scope="row">${person.rank}</td>
        <td scope="row">$${amount}</td>
        `
        tableData.appendChild(tr)
    })
    const total = data.slice(0,10).reduce((p, c)=>{
        const amountIns = c.financialAssets[0].sharePrice;
        const amount = parseFloat(amountIns).toFixed(2);
        return parseFloat(p) + parseFloat(amount);
    },0)
    document.getElementById('totalAmount').innerText = total.toFixed(2);
}
// modal area

const loadSingleBillionaire = async (rank) => {
        // console.log(rank);
    fetch(`download.json`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            // const rankToFind = 5; // replace 5 with the rank you want
            const persons = data.find((person) => person.rank === rank);
            if (persons) {
                displaySinglePerson(persons)
            } 
            else {
              console.log(`No person found with rank ${rank}`);
            }
          })
          .catch((error) => console.error(error));
}
const displaySinglePerson = (person) =>{

    const modalBody = document.getElementById('modal-body')
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="w-100 text-center">
    <img src="${person.person.squareImage}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text"></p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
    `
    modalBody.appendChild(div)
}
// load data 
const LoadData = async (seeAll) =>{
    const url = `download.json`
    const res= await fetch(url)
    const data = await res.json()
    displayData(data , seeAll)
}
const displayData =(users, seeAll) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''
    const SeeAllBtn = document.getElementById('SeeAllBtn')
    if(seeAll && users.length >= 9){
        users = users.slice(0,9);
        SeeAllBtn.classList.remove('d-none')
        SeeAllBtn.style.marginTop = '10px'
    }
    else{
        SeeAllBtn.classList.add('d-none')
    }
    // console.log(users)
    users.forEach(user => {
        // console.log(user)
        const div = document.createElement('div');
        div.classList.add('col')
        div.style.color = 'white';
        div.innerHTML = `
        <div class="card mb-3 bg-black m-2 p-2">
            <p class="text-center card-name">${user.personName}</p>
            <div class="row g-0">
                <div class="col-md-4 col-12 text-center pe-2">
                ${user.person.squareImage ? `<img class="rounded-circle img-fluid" src="${user.person.squareImage}"  class="img-fluid rounded-start" alt="...">` :'Not Found'}
                    
                    <p>Source: ${user.financialAssets ? user.financialAssets[0].companyName : 'not Found'}</p>
                </div>
                <div class="col-md-8 col-12">
                    <div class="card-body">
                      <h5 class="card-title">Citizenship: ${user.countryOfCitizenship ? user.countryOfCitizenship : 'not Found'}</h5>
                      <p class="card-text">State: ${user.state ? user.state :'Not Found'}</p>
                      <p class="card-text">City: ${user.city ? user.city : "Not Found"}</p>
                      <p class="card-text">Share Price: ${user.financialAssets ? parseFloat(user.financialAssets[0].sharePrice).toFixed(2) : 'not found'}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(div)
    });
}

document.getElementById('SeeAllBtn').addEventListener('click', function(){
    LoadData()
})
// load data
LoadData(9);
// table data 
loadTableData()