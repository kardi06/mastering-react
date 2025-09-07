import React, { memo, useCallback, useMemo, useState } from 'react'

type Item = { id: number; label: string }

const Row = memo(function Row({ item, onSelect }: { item: Item; onSelect: (id: number) => void }) {
  console.log('Row render:', item.id)
  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span>{item.label}</span>
      <button onClick={() => onSelect(item.id)}>Select</button>
    </li>
  )
})

const MemoizedChildList: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [useCb, setUseCb] = useState(true)

  const items = useMemo<Item[]>(
    () => Array.from({ length: 5 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` })),
    []
  )

  // Toggle between inline and memoized callback to compare renders
  const handleSelect = useCb
    ? useCallback((id: number) => setSelected(id), [])
    : (id: number) => setSelected(id)

  return (
    <section>
      <h3>Memoized Child Receiving a Callback</h3>
      <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" checked={useCb} onChange={e => setUseCb(e.target.checked)} />
        Use useCallback
      </label>

      <p>Selected: {selected ?? 'None'}</p>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {items.map(item => (
          <Row key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
      <p>Toggle the checkbox and watch the console: fewer row re-renders with <code>useCallback</code>.</p>
    </section>
  )
}

export default MemoizedChildList
