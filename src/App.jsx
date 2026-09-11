import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    fetch('/campus-map-CLEAN.svg')
      .then((res) => res.text())
      .then((svgText) => {
        containerRef.current.innerHTML = svgText

        const svg = d3.select(containerRef.current).select('svg')
        svg.attr('width', '100%').attr('height', '100%')

        const g = svg.select('g')

        const zoom = d3.zoom()
          .scaleExtent([0.5, 8])
          .on('zoom', (event) => {
            g.attr('transform', event.transform)
          })

        svg.call(zoom)
      })
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  )
}

export default App