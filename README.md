# To-Do List

A minimal React + TypeScript to-do list app, built with Vite, and its automated Playwright test suite.

## Requirements

- Node.js 20+

## Running the app

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
```

## Running the tests

The suite uses [Playwright Test](https://playwright.dev/) with the Page Object Model pattern (`tests/pages/TodoPage.ts`). It starts the dev server automatically — no need to run `npm run dev` yourself first.

```bash
npm test                                    # run everything, headless, in parallel, full speed
npm test -- --headed                        # run everything with a visible browser
npm test -- --workers=1                     # run everything one test at a time, in order
npm test -- tests/todo.spec.ts              # run a single spec file
npm test -- -g "toggles a todo"             # run a single test by name
```

A report opens automatically in your browser after every local run (pass or fail). To reopen the last report without rerunning anything:

```bash
npm run report
```

### Watching tests run step by step

Two purpose-built modes give a much clearer view of execution than headed mode alone:

```bash
npm run test:ui       # Playwright's UI mode - visual timeline, watch mode, time-travel through a run
npm run test:debug    # Playwright Inspector - pauses before each action, step through manually
```

You can also slow down a headed run instead, via the `SLOWMO` environment variable (milliseconds of delay added before each action):

```bash
SLOWMO=500 npm test -- --headed --workers=1
```

On Windows PowerShell:

```powershell
$env:SLOWMO=500; npm test -- --headed --workers=1
```

All of the flags above can be combined, e.g. `SLOWMO=500 npm test -- tests/todo.spec.ts -g "toggles a todo" --headed --workers=1`.

## What the tests cover

- **`tests/todo.spec.ts`** — the app's core behavior: empty state on load, adding a todo (via button and via Enter), rejecting empty/whitespace input, toggling complete/incomplete, deleting, filtering (All/Active/Completed), and clearing completed todos.
- **`tests/accessibility.spec.ts`** — an automated [axe-core](https://github.com/dequelabs/axe-core) scan of the page, asserting zero detectable accessibility violations. Full scan results are attached to the HTML report for every run.
