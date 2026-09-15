import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li data-testid="todo-item" className={todo.completed ? 'completed' : ''}>
      <label>
        <input
          data-testid="todo-toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span data-testid="todo-text" title={todo.text}>
          {todo.text}
        </span>
      </label>
      <button
        data-testid="todo-delete"
        type="button"
        aria-label={`Delete "${todo.text}"`}
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
