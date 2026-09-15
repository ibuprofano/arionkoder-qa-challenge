import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { TodoPage } from './pages/TodoPage'

test('has no automatically detectable accessibility violations', async ({ page }, testInfo) => {
  const todoPage = new TodoPage(page)
  await todoPage.goto()
  await todoPage.addTodoViaButton('Buy milk')

  const results = await new AxeBuilder({ page }).analyze()

  await testInfo.attach('axe-results', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  })

  expect(results.violations).toEqual([])
})
