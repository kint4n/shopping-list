const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if(newItem === '') {
        alert(' Please enter an item');
        return;
    }

    // Check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('.edit-mode');
        itemToEdit.remove();
        isEditMode = false;

    }

    // Create item DOM element
    addItemToDOM(newItem);
    
    //Add item to local storage
    addItemToStorage(newItem);
    
    // Clears form everytime we add an item
    itemInput.value = '';

    checkUI();
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    const text = document.createTextNode(item);

    li.appendChild(text);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    
    return icon;
}

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage(item);

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage() {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
    else {
        setItemToEdit(e.target);
    }

}

function setItemToEdit(item) {
    isEditMode = true;

    // Only 1 item can be selected to be updated at a time
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';

    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;

}

function removeItem(item) {
    if(confirm('Do you want to delete this item?')) {
        // Remove item from DOM
        item.remove();

        // Remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI();

    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    if(confirm('Do you want to clear all your items?')) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        // Clear from local storage
        localStorage.removeItem('items');
    }

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        // const itemName = item.firstChild.textContent;
        const itemName = item.textContent.toLowerCase();
        
        // Checks per substring
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
            
        }
    });
}

// Remove item filter and clear all button when list is empty
function checkUI() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if(items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    isEditMode = false;
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
}

// Initialize App
function init() {
    // Event listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    checkUI();
}

init();
