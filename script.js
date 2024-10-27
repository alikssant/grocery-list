const itemForm = document.getElementById("item-form")
const itemInput = document.getElementById("item-input")
const itemList = document.getElementById("item-list")
const itemFilter = document.getElementById("filter")
const clearButton = document.getElementById("clear")
const items = itemList.querySelectorAll("li")
const formControl = document.querySelector(".form-control")

function displayItems(){
    const itemsFromStorage = getItemFromStorage()
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI()
}

itemInput.addEventListener('focus', () => {
    itemInput.style.border = "4px solid green"
});
itemInput.addEventListener('blur', () => {
    itemInput.style.border = ""
});


function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value
    //Validate input
    if (newItem === "")
    {
        alert("Please add an item")
        return
    }
//Create list item
    // const li = document.createElement('li')
    // li.appendChild(document.createTextNode(newItem))
    // // const li = document.createElement('li');
    // // li.innerText = newItem; // Or li.textContent = newItem
    // const button = createButton('remove-item btn-link text-red')
    // li.appendChild(button)

    // //add li to DOM
    // itemList.appendChild(li)

    addItemToDOM(newItem)

    addItemtoStorage(newItem)

    checkUI()
    itemInput.value = ''
}
function addItemToDOM(item){
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))
    // const li = document.createElement('li');
    // li.innerText = newItem; // Or li.textContent = newItem
    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    //add li to DOM
    itemList.appendChild(li)
}

function addItemtoStorage(item){
    const itemsFromStorage = getItemFromStorage()
   

    itemsFromStorage.push(item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function createButton(classes)
{
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    
    
    return button
}

function createIcon(classes)
{
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

function getItemFromStorage(){
    let itemsFromStorage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []

    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage


}

function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }
}

function removeItem(item){
    if (confirm('Are you sure?')) {
        //Remove item from DOM
        item.remove()

        //Remove item from storage
        removeItemFromStorage(item.textContent)
        checkUI()
    }
    
    // if (e.target.parentElement.classList.contains('remove-item'))
    // {
    //     if (confirm("Are you sure to delete?")) {
    //         e.target.parentElement.parentElement.remove()

    //         checkUI()
    //     }
       
    // }

}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemFromStorage()

    //Filter out item to be removed

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
    
    //re-set to localStorage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function clearItems(){
    if (confirm('Are you sure to delete all of items?')) {
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
        }
        //Clear from LocalStorage
        localStorage.removeItem('items')
        checkUI()
    }
}

function filterItems(e){
    const items = itemList.querySelectorAll("li")
    const text = e.target.value.toLowerCase()

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        } else{
            item.style.display = 'none'
        }

    })
}

function checkUI(){
    const items = itemList.querySelectorAll("li")
    if (items.length === 0)
    {
        clearButton.style.display = 'none'
        itemFilter.style.display = 'none'
    }
    else{
        clearButton.style.display = 'block'
        itemFilter.style.display = 'block'
    }

}

//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', onClickItem)
clearButton.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

checkUI()