'use client';

import { useEffect, useState } from 'react';
import SimpleChart from './SimpleChart';

interface GasData {
  gasPrice: number;
  timestamp: number;
}

interface ChainData {
  ethereum: GasData | null;
  polygon: GasData | null;
  arbitrum: GasData | null;
}

// Chart data interface - what each candlestick needs
interface CandlestickData {
  time: number;           // When this 15-minute period happened
  open: number;          // Gas price at start (in Gwei)
  high: number;          // Highest gas price (in Gwei)
  low: number;           // Lowest gas price (in Gwei) 
  close: number;         // Gas price at end (in Gwei)
}

export default function Dashboard() {
  const [chainData, setChainData] = useState<ChainData>({
    ethereum: null,
    polygon: null,
    arbitrum: null
  });
  const [selectedChain, setSelectedChain] = useState<'ethereum' | 'polygon' | 'arbitrum'>('ethereum');
  const [loading, setLoading] = useState(true);
  // Chart data for each network
  const [chartData, setChartData] = useState<{
    ethereum: CandlestickData[];
    polygon: CandlestickData[];
    arbitrum: CandlestickData[];
  }>({
    ethereum: [],
    polygon: [],
    arbitrum: []
  });

  // Generate realistic demo chart data for beginners to see
  const generateDemoChartData = (basePrice: number, networkName: string): CandlestickData[] => {
    const data: CandlestickData[] = [];
    const now = Date.now();
    
    // Create 48 data points (48 * 15 minutes = 12 hours of data)
    for (let i = 47; i >= 0; i--) {
      // Each point is 15 minutes (900,000 milliseconds) apart
      const time = now - (i * 15 * 60 * 1000);
      
      // Create realistic price movement
      const volatility = networkName === 'ethereum' ? 5 : networkName === 'polygon' ? 15 : 2;
      const trend = Math.sin(i / 10) * volatility; // Gentle wave pattern
      const randomness = (Math.random() - 0.5) * volatility; // Random spikes
      
      // Calculate the 4 prices for this 15-minute candle
      const open = basePrice + trend + randomness;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * (volatility / 2);
      const low = Math.min(open, close) - Math.random() * (volatility / 2);
      
      data.push({
        time,
        open: Math.max(1, open), // Don't let prices go below 1
        high: Math.max(1, high),
        low: Math.max(1, low),
        close: Math.max(1, close),
      });
    }
    
    return data;
  };

  // Simple function to fetch gas prices
  const fetchGasPrice = async (chain: string) => {
    try {
      // Using a simple public API for gas prices
      const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken`);
      const data = await response.json();
      
      if (data.status === '1') {
        return {
          gasPrice: parseFloat(data.result.ProposeGasPrice),
          timestamp: Date.now()
        };
      }
    } catch (error) {
      console.error(`Error fetching ${chain} gas price:`, error);
    }
    
    // Return demo data if API fails
    return {
      gasPrice: Math.floor(Math.random() * 50) + 10,
      timestamp: Date.now()
    };
  };

  useEffect(() => {
    const updateGasPrices = async () => {
      setLoading(true);
      
      const ethereum = await fetchGasPrice('ethereum');
      const polygon = { gasPrice: Math.floor(Math.random() * 100) + 20, timestamp: Date.now() };
      const arbitrum = { gasPrice: Math.floor(Math.random() * 10) + 1, timestamp: Date.now() };
      
      setChainData({ ethereum, polygon, arbitrum });
      
      // Generate chart data for each network (for demo purposes)
      setChartData({
        ethereum: generateDemoChartData(ethereum.gasPrice, 'ethereum'),
        polygon: generateDemoChartData(polygon.gasPrice, 'polygon'),
        arbitrum: generateDemoChartData(arbitrum.gasPrice, 'arbitrum'),
      });
      
      setLoading(false);
    };

    updateGasPrices();
    
    // Update every 30 seconds
    const interval = setInterval(updateGasPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Gas Price Tracker
          </h1>
          <p style={{ color: '#888' }}>
            Simple gas price monitoring for Ethereum networks
          </p>
        </div>

        {/* Chain Selector */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {(['ethereum', 'polygon', 'arbitrum'] as const).map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  backgroundColor: selectedChain === chain ? '#0066cc' : '#333',
                  color: 'white',
                  textTransform: 'capitalize'
                }}
              >
                {chain}
              </button>
            ))}
          </div>
        </div>

        {/* Main Gas Price Display */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '10px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textTransform: 'capitalize' }}>
              {selectedChain} Gas Price
            </h2>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div>Loading...</div>
              </div>
            ) : chainData[selectedChain] ? (
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#00ff88', marginBottom: '10px' }}>
                  {chainData[selectedChain]!.gasPrice} Gwei
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                  Last updated: {formatTime(chainData[selectedChain]!.timestamp)}
                </div>
              </div>
            ) : (
              <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Interactive Gas Price Chart */}
        <SimpleChart 
          data={chartData[selectedChain]} 
          networkName={selectedChain}
        />

        {/* All Chains Comparison */}
        <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
            All Networks
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {(['ethereum', 'polygon', 'arbitrum'] as const).map((chain) => (
              <div
                key={chain}
                style={{
                  padding: '20px',
                  backgroundColor: selectedChain === chain ? '#0066cc20' : '#333',
                  border: selectedChain === chain ? '2px solid #0066cc' : '2px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedChain(chain)}
              >
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  marginBottom: '10px', 
                  textTransform: 'capitalize' 
                }}>
                  {chain}
                </h3>
                
                {chainData[chain] ? (
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88' }}>
                      {chainData[chain]!.gasPrice} Gwei
                    </div>
                    <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '5px' }}>
                      {formatTime(chainData[chain]!.timestamp)}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: '#888' }}>Loading...</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}