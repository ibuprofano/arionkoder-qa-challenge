import { useMemo, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import type { Filter, Todo } from './types'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  function addTodo(text: string) {
    const newTodo: Todo = { id: crypto.randomUUID(), text, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos])
  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <main className="todo-app">
      <h1>To-Do List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <Footer
        activeCount={activeCount}
        hasCompleted={hasCompleted}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </main>
  )
}

export default App
