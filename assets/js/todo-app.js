let todos = getSavedTodos()
let id = Math.floor(Math.random() * 10000);

const filters = {
    searchText: '',
    hideCompleted: false,
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input',  (event) => {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit',  (event) => {
    event.preventDefault()
    if (event.target.elements.text.value !== '') {
        todos.push({
            id: id,
            text: event.target.elements.text.value,
            completed: false
        })
        id++;
    } else {
        return alert('Escreva alguma coisa')
    }
    saveTodos(todos)
    renderTodos(todos, filters)
    event.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change',  (event) => {
    filters.hideCompleted = event.target.checked
    renderTodos(todos, filters)
})