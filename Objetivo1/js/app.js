var localStorageKeyName = 'data';

loadFromLocalStorage();

document.querySelector("#btn-add").addEventListener('click', function () {
    var name = document.getElementById("name"),
        producing_company = document.getElementById("producing_company"),
        price = document.getElementById("price");

    // Validate
    if (name.value.length === 0 || producing_company.value.length === 0 || !parseInt(price.value)) return;

    var user = {
        name: name.value,
        producing_company: producing_company.value,
        price: price.value
    };

    // Clean data
    name.value = '';
    producing_company.value = '';
    price.value = '';

    // Append to my localStorage
    appendObjectToLocalStorage(user);
})

function appendObjectToLocalStorage(obj) {
    var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

    if (dataInLocalStorage !== null) {
        users = JSON.parse(dataInLocalStorage);
    }

    users.push(obj);

    localStorage.setItem(localStorageKeyName, JSON.stringify(users));

    loadFromLocalStorage();
}

function loadFromLocalStorage() {
    var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName),
        gridBody = document.querySelector("#grid tbody");

    if (dataInLocalStorage !== null) {
        users = JSON.parse(dataInLocalStorage);
    }

    // Draw TR from TBODY
    gridBody.innerHTML = '';

    users.forEach(function (x, i) {
        var tr = document.createElement("tr"),
            tdName = document.createElement("td"),
            tdProducing_company = document.createElement("td"),
            tdPrice = document.createElement("td"),
            tdRemove = document.createElement("td"),
            btnRemove = document.createElement("button");

        tdName.innerHTML = x.name;
        tdProducing_company.innerHTML = x.producing_company;
        tdPrice.innerHTML = x.price;

        btnRemove.textContent = 'Remove';
        btnRemove.className = 'btn btn-xs btn-danger';
        btnRemove.addEventListener('click', function(){
            removeFromLocalStorage(i);
        });

        tdRemove.appendChild(btnRemove);

        tr.appendChild(tdName);
        tr.appendChild(tdProducing_company);
        tr.appendChild(tdPrice);
        tr.appendChild(tdRemove);

        gridBody.appendChild(tr);
    });
}

function removeFromLocalStorage(index){
    var users = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

    users = JSON.parse(dataInLocalStorage);

    users.splice(index, 1);

    localStorage.setItem(localStorageKeyName, JSON.stringify(users));

    loadFromLocalStorage();
    
    users.sort(users);
}
