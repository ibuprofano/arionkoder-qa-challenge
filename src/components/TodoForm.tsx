import { useState } from 'react'
import type { FormEvent } from 'react'

const MAX_TODO_LENGTH = 100

interface TodoFormProps {
  onAdd: (text: string) => void
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form data-testid="todo-form" onSubmit={handleSubmit}>
      <input
        data-testid="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="New todo"
        maxLength={MAX_TODO_LENGTH}
      />
      <button data-testid="todo-add-button" type="submit">
        Add
      </button>
    </form>
  )
}

export default TodoForm
