import React, { useCallback, useMemo, useState } from 'react'

const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']

function FilterPitfall() {
  const [query, setQuery] = useState('a')
  const [result, setResult] = useState<string[]>(fruits)

  // ❌ Pitfall: missing dependency on `query` → stale closure
  const runFilter = useCallback(() => {
    const out = fruits.filter(f => f.includes(query.toLowerCase()))
    setResult(out)
  }, [])

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
      <h4>Pitfall</h4>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="type to filter" />
      <button onClick={runFilter}>Filter</button>
      <p><em>Because `query` is not in deps, filtering may use an outdated value.</em></p>
      <ul>{result.map(f => <li key={f}>{f}</li>)}</ul>
    </div>
  )
}

function FilterFixed() {
  const [query, setQuery] = useState('a')
  const [result, setResult] = useState<string[]>(fruits)

  // ✅ Fix 1: include dependency
  const runFilter = useCallback(() => {
    const out = fruits.filter(f => f.includes(query.toLowerCase()))
    setResult(out)
  }, [query])

  // ✅ Alternative Fix 2: pass the latest value at call time
  const runFilterNow = useCallback((q: string) => {
    const out = fruits.filter(f => f.includes(q.toLowerCase()))
    setResult(out)
  }, [])

  const list = useMemo(() => result.map(f => <li key={f}>{f}</li>), [result])

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
      <h4>Fixed</h4>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="type to filter" />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={runFilter}>Filter (deps: [query])</button>
        <button onClick={() => runFilterNow(query)}>Filter (pass value)</button>
      </div>
      <ul>{list}</ul>
    </div>
  )
}

const StaleClosurePitfall: React.FC = () => {
  return (
    <section>
      <h3>Stale Closure: Pitfall and Fix</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FilterPitfall />
        <FilterFixed />
      </div>
    </section>
  )
}

export default StaleClosurePitfall
