import type { Filter } from '../types'

interface FooterProps {
  activeCount: number
  hasCompleted: boolean
  filter: Filter
  onFilterChange: (filter: Filter) => void
  onClearCompleted: () => void
}

const FILTERS: Filter[] = ['all', 'active', 'completed']

function Footer({ activeCount, hasCompleted, filter, onFilterChange, onClearCompleted }: FooterProps) {
  return (
    <footer>
      <span data-testid="active-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div data-testid="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            data-testid={`filter-${f}`}
            aria-pressed={filter === f}
            className={filter === f ? 'active' : ''}
            onClick={() => onFilterChange(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button data-testid="clear-completed" type="button" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default Footer
