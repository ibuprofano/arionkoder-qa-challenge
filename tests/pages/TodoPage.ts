import type { Locator, Page } from '@playwright/test'

export type TodoFilter = 'all' | 'active' | 'completed'

export class TodoPage {
  readonly page: Page
  readonly input: Locator
  readonly addButton: Locator
  readonly todoItems: Locator
  readonly activeCount: Locator
  readonly clearCompletedButton: Locator
  readonly emptyState: Locator

  constructor(page: Page) {
    this.page = page
    this.input = page.getByTestId('todo-input')
    this.addButton = page.getByTestId('todo-add-button')
    this.todoItems = page.getByTestId('todo-item')
    this.activeCount = page.getByTestId('active-count')
    this.clearCompletedButton = page.getByTestId('clear-complete')
    this.emptyState = page.getByTestId('empty-state')
  }

  async goto() {
    await this.page.goto('/')
  }

  async addTodoViaButton(text: string) {
    await this.input.fill(text)
    await this.addButton.click()
  }

  async addTodoViaEnter(text: string) {
    await this.input.fill(text)
    await this.input.press('Enter')
  }

  private itemByText(text: string): Locator {
    return this.todoItems.filter({ hasText: text })
  }

  async toggleTodo(text: string) {
    await this.itemByText(text).getByTestId('todo-toggle').click()
  }

  async deleteTodo(text: string) {
    await this.itemByText(text).getByTestId('todo-delete').click()
  }

  async isTodoCompleted(text: string): Promise<boolean> {
    return this.itemByText(text).getByTestId('todo-toggle').isChecked()
  }

  async filterBy(filter: TodoFilter) {
    await this.page.getByTestId(`filter-${filter}`).click()
  }

  async clearCompleted() {
    await this.clearCompletedButton.click()
  }

  async visibleTodoTexts(): Promise<string[]> {
    return this.todoItems.getByTestId('todo-text').allTextContents()
  }
}
