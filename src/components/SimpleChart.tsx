'use client';

import { useEffect, useState } from 'react';

// Simple chart data interface - what each bar needs
interface ChartData {
  time: number;           // When this 15-minute period happened
  open: number;          // Gas price at start (in Gwei)
  high: number;          // Highest gas price (in Gwei)
  low: number;           // Lowest gas price (in Gwei) 
  close: number;         // Gas price at end (in Gwei)
}

interface SimpleChartProps {
  data: ChartData[];     // Array of 15-minute gas price data
  networkName: string;   // Which network (ethereum, polygon, etc.)
}

export default function SimpleChart({ data, networkName }: SimpleChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Find min and max prices for scaling
  const allPrices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

  // Function to convert price to height percentage
  const getHeight = (price: number) => {
    return ((price - minPrice) / priceRange) * 80 + 10; // 10-90% range
  };

  // Function to format time for display
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#222', 
      padding: '20px', 
      borderRadius: '10px',
      marginBottom: '20px'
    }}>
      {/* Chart title */}
      <h3 style={{ 
        fontSize: '1.4rem', 
        marginBottom: '15px', 
        textTransform: 'capitalize',
        color: 'white'
      }}>
        {networkName} Gas Price Chart (15-min intervals)
      </h3>
      
      {/* Explanation for beginners */}
      <div style={{ 
        fontSize: '0.9rem', 
        color: '#888', 
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#333',
        borderRadius: '5px'
      }}>
        <strong>How to read this chart:</strong><br/>
        • <span style={{color: '#00ff88'}}>Green bars</span> = Gas price went UP during that 15 minutes<br/>
        • <span style={{color: '#ff4444'}}>Red bars</span> = Gas price went DOWN during that 15 minutes<br/>
        • Hover over any bar to see exact prices (Open, High, Low, Close)
      </div>

      {/* Simple bar chart container */}
      <div style={{
        height: '300px',
        backgroundColor: '#1a1a1a',
        borderRadius: '5px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '20px',
          bottom: '20px',
          width: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: '#888'
        }}>
          <span>{maxPrice.toFixed(1)}</span>
          <span>{((maxPrice + minPrice) / 2).toFixed(1)}</span>
          <span>{minPrice.toFixed(1)}</span>
        </div>

        {/* Chart bars */}
        <div style={{
          marginLeft: '60px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '2px',
          position: 'relative'
        }}>
          {data.slice(-20).map((item, index) => { // Show last 20 bars
            const isUp = item.close >= item.open;
            const bodyHeight = Math.abs(getHeight(item.close) - getHeight(item.open));
            const bodyTop = Math.min(getHeight(item.close), getHeight(item.open));
            const wickTop = getHeight(item.high);
            const wickBottom = getHeight(item.low);
            
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: '260px',
                  position: 'relative',
                  cursor: 'pointer',
                  maxWidth: '20px'
                }}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Wick (thin line showing high-low range) */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: `${wickBottom}%`,
                  width: '2px',
                  height: `${wickTop - wickBottom}%`,
                  backgroundColor: isUp ? '#00ff88' : '#ff4444',
                  transform: 'translateX(-50%)'
                }} />
                
                {/* Body (thick bar showing open-close range) */}
                <div style={{
                  position: 'absolute',
                  left: '20%',
                  bottom: `${bodyTop}%`,
                  width: '60%',
                  height: `${Math.max(bodyHeight, 2)}%`, // Minimum 2% height
                  backgroundColor: isUp ? '#00ff88' : '#ff4444',
                  border: hoveredBar === index ? '2px solid white' : 'none'
                }} />
                
                {/* Hover tooltip */}
                {hoveredBar === index && (
                  <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#000',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    border: '2px solid #555',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    <div style={{ marginBottom: '4px', fontWeight: 'bold', color: '#00ff88' }}>
                      📊 {formatTime(item.time)}
                    </div>
                    <div style={{ marginBottom: '2px' }}>
                      <span style={{ color: '#888' }}>Open:</span> {item.open.toFixed(2)} Gwei
                    </div>
                    <div style={{ marginBottom: '2px' }}>
                      <span style={{ color: '#888' }}>High:</span> {item.high.toFixed(2)} Gwei
                    </div>
                    <div style={{ marginBottom: '2px' }}>
                      <span style={{ color: '#888' }}>Low:</span> {item.low.toFixed(2)} Gwei
                    </div>
                    <div>
                      <span style={{ color: '#888' }}>Close:</span> {item.close.toFixed(2)} Gwei
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Show data count for beginners */}
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#666', 
        marginTop: '10px',
        textAlign: 'center'
      }}>
        Showing last 20 of {data.length} data points • Each bar = 15 minutes
      </div>
    </div>
  );
}