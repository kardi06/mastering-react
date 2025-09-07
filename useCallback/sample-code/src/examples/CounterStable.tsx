import React, { useCallback, useState } from 'react'

const CounterStable: React.FC = () => {
  const [count, setCount] = useState(0)

  // Stable identity across renders
  const increment = useCallback(() => {
    setCount(c => c + 1) // functional update keeps deps empty
  }, [])

  return (
    <section>
      <h3>Counter with a Stable Handler</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <p><em>Tip:</em> open DevTools console to watch renders.</p>
    </section>
  )
}

export default CounterStable
