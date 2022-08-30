const todoTitle = document.getElementById('title');
const todoDesc = document.getElementById('description');
const submitTodoButton = document.getElementById('submit');
const mainList = document.getElementById('main');
const myAlert = document.getElementById('alert');
myAlert.style.display = 'none';
const toastify = (msg) => {
    myAlert.children[0].innerHTML = msg;
    myAlert.style.display = 'flex';
    myAlert.children[1].addEventListener('click', () => {myAlert.style.display = 'none';});
}



const lcTodos = localStorage.getItem('todosList');
const parsedLcTodos = JSON.parse(lcTodos) || [];
console.log(parsedLcTodos)

let savedTodos = [...parsedLcTodos];

const createNewTodo = (title, desc , id , checked) => {
    const listItem = document.createElement('li');
    listItem.id = id;
    const newTodoTitle = document.createElement('h3');
    const todoTitleInput =document.createElement('input');

    newTodoTitle.appendChild(todoTitleInput);

    todoTitleInput.className = "title-input";
    todoTitleInput.disabled = true;

    todoTitleInput.defaultValue = title;
    newTodoTitle.style.backgroundColor = 'cadetblue';
    newTodoTitle.style.borderRadius = '5px';
    newTodoTitle.style.width = '500px';
    if(checked) {newTodoTitle.style.backgroundColor = 'green'};
    if(checked) {newTodoTitle.style.borderRadius = '5px'};
    if(checked) {newTodoTitle.style.width = '500px'};
    const newTodoDesc = document.createElement('p');
    newTodoDesc.innerHTML = desc;
    const newTodoDel = document.createElement('button');
    newTodoDel.innerHTML = 'delete';
    newTodoDel.style.backgroundColor = 'rgb(193, 207, 207)';
    newTodoDel.style.borderRadius = '5px';
    newTodoDel.style.marginRight = '2px';
    const newTodoEdit = document.createElement('button');
    newTodoEdit.innerHTML = 'edit';
    newTodoEdit.style.backgroundColor = 'rgb(193, 207, 207)';
    newTodoEdit.style.borderRadius = '5px';
    newTodoEdit.style.marginRight = '2px';
    const newTodoUpdate = document.createElement('button');
    newTodoUpdate.innerHTML = 'check';
    newTodoUpdate.style.backgroundColor = 'rgb(193, 207, 207)';
    newTodoUpdate.style.borderRadius = '5px';
    newTodoUpdate.style.marginRight = '2px';
    
    listItem.appendChild(newTodoTitle);
    listItem.appendChild(newTodoDesc);
    listItem.appendChild(newTodoDel);
    listItem.appendChild(newTodoEdit);
    listItem.appendChild(newTodoUpdate);
    mainList.appendChild(listItem); 
};
    
savedTodos.forEach(todo => createNewTodo(todo.title, todo.desc, todo.id, todo.checked));

const handleCreateNewTodo = (e) => {
    e.preventDefault();
    if (!todoTitle.value) return toastify('please enter something...');
    const newTodo = {
        id: Date.now(),
        title: todoTitle.value,
        desc: todoDesc.value,
        checked: false,
    };

    savedTodos.push(newTodo);
    localStorage.setItem('todosList', JSON.stringify(savedTodos))

    createNewTodo(newTodo.title, newTodo.desc, newTodo.id, newTodo.checked)
};

submitTodoButton.addEventListener('click' , handleCreateNewTodo);

mainList.addEventListener('click', (g) => {
    if (g.target.innerText === "delete") {
        const todoEl = g.target.parentElement;
        const filtredTodos = savedTodos.filter(
            (item) => item.id !== Number(todoEl.id)
        );
        localStorage.setItem("todosList", JSON.stringify(filtredTodos));
        location.reload();
    } else if (g.target.innerText === "check") {
        const todoEl = g.target.parentElement;
        const filtredTodo = savedTodos.filter(
            (item) => item.id === Number(todoEl.id)
        );
        const updateFiltredTodo = { ...filtredTodo[0], checked: true};
        const filtredTodos = savedTodos.filter(
            (item) => item.id !== Number(todoEl.id)
        );
        const updatedSavedTodos = [...filtredTodos, updateFiltredTodo];
        localStorage.setItem('todosList', JSON.stringify(updatedSavedTodos));
        location.reload();
        } else if (g.target.innerText === "edit") {
            const todoEl = g.target.parentElement;
            todoEl.children[0].children[0].disabled = false;
            todoEl.children[0].children[0].select();
            todoEl.children[0].children[0].style.backgroundColor = "rgb(193, 207, 207)";
            todoEl.children[0].children[0].style.width = "200px";
            g.target.innerText = "save";
            g.target.addEventListener('click', () => {
                const filtredTodo = savedTodos.filter(
                    (item) => item.id === Number(todoEl.id)
                );
                const updateFiltredTodo = { ...filtredTodo[0], title: todoEl.children[0].children[0].value};
                const filtredTodos = savedTodos.filter(
                    (item) => item.id !== Number(todoEl.id)
                );
                const updatedSavedTodos = [...filtredTodos, updateFiltredTodo];
                localStorage.setItem('todosList', JSON.stringify(updatedSavedTodos));
                location.reload();  
            })
        }
});