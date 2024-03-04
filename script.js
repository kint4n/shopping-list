const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

// Functions
function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if(newItem === '') {
        alert(' Please enter an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    const text = document.createTextNode(newItem);

    li.appendChild(text);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
    
    // Clears form everytime we add an item
    itemInput.value = '';

    checkUI();
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

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('Are you sure you want to delete this item?'))
            e.target.parentElement.parentElement.remove();
    }

    checkUI();
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI();
}

// Remove item filter and add clear all button when list is empty
function checkUI() {
    const items = itemList.querySelectorAll('li');

    if(items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();