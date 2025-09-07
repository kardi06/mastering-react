import React, { useCallback, useMemo, useState } from 'react'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback'

const dataset = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`)

const DebouncedSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>(dataset)

  const search = useCallback((q: string) => {
    const out = dataset.filter(d => d.toLowerCase().includes(q.toLowerCase()))
    setResults(out)
  }, [])

  const [debouncedSearch] = useDebouncedCallback(search, 300)
  const list = useMemo(() => results.map((r) => <li key={r}>{r}</li>), [results])

  return (
    <section>
      <h3>Debounced Search (with useCallback)</h3>
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          const q = e.target.value
          setQuery(q)
          debouncedSearch(q)
        }}
        style={{ width: 240 }}
      />
      <p>Results: {results.length}</p>
      <ul>{list}</ul>
    </section>
  )
}

export default DebouncedSearch
