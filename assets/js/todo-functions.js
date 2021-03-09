

// Recupera o localStorage ou cria uma nova lista vazia (todos) 

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
}

// Salva os todos no localStorage
const saveTodos = todos => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Limpar o localStorage
document.getElementById('limpar').addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

// Remove o todo pelo id 
const removeTodo = id => {
    const todoIndex = todos.findIndex( todo => {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Adiciona o valor de completo para o toDo selecionado
const toggleTodo = id => {
    const todo = todos.find( todo => {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

// Renderiza a aplicação baseada nos filtros definidos
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter( todo => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed // retornar true ou true para esconder os todos da DOM
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter( todo => {
        return !todo.completed // retorna todos os toDos que nao estao completos
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach( todo => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Mostrar a data
const options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date()
data.innerHTML = today.toLocaleDateString("pt-BR", options);

// Gera o elemento DOM para cada toDo
const generateTodoDOM = todo => {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('p')
    const removeButton = document.createElement('i')
    const TRASH = 'fa-trash-alt'
    const data = document.getElementById('data');
    

    const getId = id => {
        const tarefaId = todos.findIndex( todo => {
            return todo.id === id
        })
        return tarefaId
    }

    checkbox.setAttribute("id", getId(todo.id))
    todoEl.appendChild(checkbox)

    removeButton.setAttribute("id", "remover")
    todoEl.appendChild(removeButton)

    todoText.setAttribute("for", getId(todo.id))
    todoEl.appendChild(todoText)


    // Adiciona a classe container no todoEl
    if (todoEl.classList) {
        todoEl.classList.add('inside-container')
    } else {
        todoEl.className += ' inside-container'
    }

    // Adiciona a classe para o botao de remover
    if (removeButton.classList) {
      removeButton.classList.add('far',TRASH)
    } else {
        removeButton.className += 'far', TRASH
    }

    // Adiciona a classe para o checkbox
    if (checkbox.classList) {
        checkbox.classList.add('checkbox')
    } else {
        checkbox.className += 'checkbox'
    }

  

    // Cria o input de checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('click',  () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Cria o texto
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)
    


    // Cria o botao de remover toDo
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    

     

    return todoEl
}

// Gera os elementos que ainda nao foram completadas na DOM
const generateSummaryDOM = incompleteTodos => {
    const summary = document.createElement('h2')
    summary.textContent = `Voce tem ${incompleteTodos.length} tarefas restando.`
    return summary


}


