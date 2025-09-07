import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import CounterStable from './examples/CounterStable'
import MemoizedChildList from './examples/MemoizedChildList'
import StaleClosurePitfall from './examples/StaleClosurePitfall'
import DebouncedSearch from './examples/DebouncedSearch'

const LinkItem: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <li style={{ marginBottom: 6 }}>
    <NavLink to={to}>{label}</NavLink>
  </li>
)

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', margin: '2rem auto', maxWidth: 900 }}>
      <h1>React <code>useCallback</code> — Interactive Lab</h1>
      <p>Try the demos and open the console to observe re-render behavior.</p>

      <h2>Examples</h2>
      <ul>
        <LinkItem to="/counter-stable" label="Counter with stable handler" />
        <LinkItem to="/memoized-child" label="Memoized child receiving a callback" />
        <LinkItem to="/stale-closure" label="Stale closure: pitfall & fix" />
        <LinkItem to="/debounced-search" label="Debounced search (custom hook)" />
      </ul>

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/counter-stable" element={<CounterStable />} />
        <Route path="/memoized-child" element={<MemoizedChildList />} />
        <Route path="/stale-closure" element={<StaleClosurePitfall />} />
        <Route path="/debounced-search" element={<DebouncedSearch />} />
      </Routes>
    </div>
  )
}

export default App
