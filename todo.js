// selector

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter')
// const trashButton = document.querySelector('.trash')


// add Event listener
document.addEventListener('DOMContentLoaded', getLocalStorageTodo)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', trashCheck);
todoFilter.addEventListener('click', todoDisplay);


// function
function addTodo(event){
    event.preventDefault();

    // Create todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create todo todoList
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-li')
    newTodo.innerText = todoInput.value;
    // append to div
    todoDiv.appendChild(newTodo);

    // todo save to local storage

    saveLocalStorageTodo(todoInput.value)
    

    // create Check Mark Button
    const checkTodo = document.createElement('button');
    checkTodo.classList.add('check');
    checkTodo.innerHTML = `<i class="fas fa-check"></i>`;
    // append to div
    todoDiv.appendChild(checkTodo);

    // Create trash Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    // append to div
    todoDiv.appendChild(trashButton);
    // append to todo-list UL
    todoList.appendChild(todoDiv);
    // clear input value every time
    todoInput.value = '';
}

function trashCheck(e){
    const item = e.target;
    if(item.classList[0] == 'trash') {
        const itemParent = item.parentElement;
        // animation
        itemParent.classList.add('fall');
        // call removeLocalStorageTodo function
        removeLocalStorageTodo(itemParent)

        itemParent.addEventListener('transitionend', function(){

            itemParent.remove()
        })
        
    }
    if(item.classList[0] === 'check') {
        const itemParent = item.parentElement;
        itemParent.classList.toggle('complete');
    }
}

// Display through requirments

function todoDisplay(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'complete':
                if(todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none'
                }
                break;
            case 'incomplete':
                if(!todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none'
                } 
                break;
        }
    })
}

// Item save to Local Storage for using later

function saveLocalStorageTodo(todo) {
    // Check if any todos already exist in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Display Local Storge things;

function getLocalStorageTodo(){
    // Check if any todos already exist in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    todos.forEach(function(todo){
        // Create todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create todo todoList
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-li')
    newTodo.innerText = todo;
    // append to div
    todoDiv.appendChild(newTodo);

    // create Check Mark Button
    const checkTodo = document.createElement('button');
    checkTodo.classList.add('check');
    checkTodo.innerHTML = `<i class="fas fa-check"></i>`;
    // append to div
    todoDiv.appendChild(checkTodo);

    // Create trash Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    // append to div
    todoDiv.appendChild(trashButton);
    // append to todo-list UL
    todoList.appendChild(todoDiv);
    })

}

//  delete things form local storage by order

function removeLocalStorageTodo(todo) {
     // Check if any todos already exist in local storage
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     } else{
         todos = JSON.parse(localStorage.getItem('todos'));
     };
     
     const todoIndex = todo.childNodes[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem('todos', JSON.stringify(todos));
}