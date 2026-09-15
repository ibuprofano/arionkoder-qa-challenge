import { test, expect } from '@playwright/test'
import { TodoPage } from './pages/TodoPage'

test.beforeEach(async ({ page }) => {
  const todoPage = new TodoPage(page)
  await todoPage.goto()
})

test('shows an empty state on load', async ({ page }) => {
  const todoPage = new TodoPage(page)

  await expect(todoPage.emptyState).toBeVisible()
  await expect(todoPage.todoItems).toHaveCount(0)
  await expect(todoPage.activeCount).toHaveText('0 items left')
  await expect(todoPage.clearCompletedButton).toHaveCount(0)
})

test('adds a todo via the Add button', async ({ page }) => {
  const todoPage = new TodoPage(page)

  await todoPage.addTodoViaButton('Buy milk')

  await expect(todoPage.todoItems).toHaveCount(1)
  await expect(todoPage.todoItems).toContainText('Buy milk')
  await expect(todoPage.activeCount).toHaveText('1 item left')
})

test('adds a todo via the Enter key', async ({ page }) => {
  const todoPage = new TodoPage(page)

  await todoPage.addTodoViaEnter('Walk the dog')

  await expect(todoPage.todoItems).toHaveCount(1)
  await expect(todoPage.todoItems).toContainText('Walk the dog')
  await expect(todoPage.activeCount).toHaveText('1 item left')
})

test('blocks adding an empty or whitespace-only todo', async ({ page }) => {
  const todoPage = new TodoPage(page)

  await todoPage.addButton.click()
  await expect(todoPage.todoItems).toHaveCount(0)

  await todoPage.addTodoViaButton('   ')
  await expect(todoPage.todoItems).toHaveCount(0)
  await expect(todoPage.emptyState).toBeVisible()
})

test('toggles a todo between complete and incomplete', async ({ page }) => {
  const todoPage = new TodoPage(page)
  await todoPage.addTodoViaButton('Buy milk')

  await todoPage.toggleTodo('Buy milk')
  expect(await todoPage.isTodoCompleted('Buy milk')).toBe(true)
  await expect(todoPage.activeCount).toHaveText('0 items left')

  await todoPage.toggleTodo('Buy milk')
  expect(await todoPage.isTodoCompleted('Buy milk')).toBe(false)
  await expect(todoPage.activeCount).toHaveText('1 item left')
})

test('deletes a todo', async ({ page }) => {
  const todoPage = new TodoPage(page)
  await todoPage.addTodoViaButton('Buy milk')
  await todoPage.addTodoViaButton('Walk the dog')

  await todoPage.deleteTodo('Buy milk')

  await expect(todoPage.todoItems).toHaveCount(1)
  await expect(todoPage.todoItems).toContainText('Walk the dog')
  await expect(todoPage.activeCount).toHaveText('1 item left')
})

test('filters todos by All, Active, and Completed', async ({ page }) => {
  const todoPage = new TodoPage(page)
  await todoPage.addTodoViaButton('Buy milk')
  await todoPage.addTodoViaButton('Walk the dog')
  await todoPage.addTodoViaButton('Read a book')
  await todoPage.toggleTodo('Walk the dog')

  await todoPage.filterBy('active')
  expect(await todoPage.visibleTodoTexts()).toEqual(['Buy milk', 'Read a book'])

  await todoPage.filterBy('completed')
  expect(await todoPage.visibleTodoTexts()).toEqual(['Walk the dog'])

  await todoPage.filterBy('all')
  expect(await todoPage.visibleTodoTexts()).toEqual(['Buy milk', 'Walk the dog', 'Read a book'])
})

test('clears only completed todos', async ({ page }) => {
  const todoPage = new TodoPage(page)
  await todoPage.addTodoViaButton('Buy milk')
  await todoPage.addTodoViaButton('Walk the dog')
  await todoPage.toggleTodo('Buy milk')

  await todoPage.clearCompleted()

  await expect(todoPage.todoItems).toHaveCount(1)
  await expect(todoPage.todoItems).toContainText('Walk the dog')
  await expect(todoPage.clearCompletedButton).toHaveCount(0)
})
