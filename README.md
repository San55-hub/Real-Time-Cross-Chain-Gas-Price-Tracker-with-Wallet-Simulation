# Simple Gas Price Tracker

A beginner-friendly Next.js app that shows gas prices for Ethereum networks.

## 🚀 What it does

- Shows current gas prices for Ethereum, Polygon, and Arbitrum
- Updates automatically every 30 seconds
- Simple, clean interface
- No complex setup required

## 🛠️ Tech Stack (Simple!)

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - For better code
- **CSS-in-JS** - Simple inline styles
- **lightweight-charts** - Beautiful candlestick charts

## 🚦 Getting Started

### What you need
- Node.js 18 or newer
- Basic knowledge of React

### Installation
```bash
# Download the project
git clone <your-repo-url>
cd gas-tracker

# Install dependencies (only 4!)
npm install

# Start the app
npm run dev
```

Open http://localhost:3000 to see your app!

## 📂 Project Structure (Simple!)

```
gas-tracker/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   └── layout.tsx        # App layout
│   └── components/
│       └── Dashboard.tsx     # Main component (everything in one file!)
├── package.json              # Dependencies (only 4!)
└── README.md                # This file
```

## 🎨 Features

### ✅ What the app does:
1. **Shows Gas Prices** - Displays current gas prices in Gwei
2. **Three Networks** - Ethereum, Polygon, Arbitrum
3. **Auto Updates** - Refreshes every 30 seconds
4. **Click to Switch** - Click any network to see its details
5. **Interactive Charts** - Beautiful candlestick charts showing 15-minute gas price intervals
6. **Simple Design** - Clean, beginner-friendly interface

### 🎯 Perfect for beginners because:
- **Two simple components** - Dashboard.tsx (main) + GasChart.tsx (chart)
- **Basic React concepts** - useState, useEffect, useRef, basic styling
- **Minimal libraries** - Just React, Next.js, and one chart library
- **Simple state management** - No external state libraries
- **Inline styles** - Easy to understand CSS
- **Demo data** - Works even without real API
- **Lots of comments** - Every line explained for learning

## 🔧 How it works

### The main component (`Dashboard.tsx`) does:
1. **Fetches data** using simple `fetch()` calls
2. **Shows loading** while getting data
3. **Updates every 30 seconds** using `setInterval`
4. **Switches between networks** using button clicks
5. **Shows data** in a clean grid layout
6. **Generates demo chart data** for realistic 15-minute intervals

### The chart component (`GasChart.tsx`) does:
1. **Creates a candlestick chart** using lightweight-charts library
2. **Shows 15-minute intervals** - each candle = 15 minutes of data
3. **Displays OHLC data** - Open, High, Low, Close prices
4. **Color codes candles** - Green = price up, Red = price down
5. **Handles window resize** to stay responsive
6. **Explains everything** with beginner-friendly comments

### Key concepts you'll learn:
- `useState` for managing data
- `useEffect` for side effects
- `useRef` for accessing DOM elements
- `fetch` for getting data from APIs
- Basic CSS styling with JavaScript objects
- Component structure and props
- Chart library integration
- Data visualization concepts

## 🎓 Great for Learning

This project is perfect if you're learning:
- **React basics** - State, effects, components, refs
- **Next.js fundamentals** - File-based routing, client components
- **TypeScript basics** - Interfaces, type safety
- **API integration** - Fetching and displaying data
- **CSS in JavaScript** - Styling components
- **Data visualization** - Charts and candlestick patterns
- **Component communication** - Passing data between components

## 🚀 Next Steps

Once you understand this project, you could:
1. Add more networks
2. Create a chart component
3. Add a transaction cost calculator
4. Style it with Tailwind CSS
5. Add real-time WebSocket updates

## 🔧 Customization

### Change update frequency:
```typescript
// In Dashboard.tsx, line 64
const interval = setInterval(updateGasPrices, 30000); // 30 seconds
```

### Add new networks:
```typescript
// Add to the chains array
{(['ethereum', 'polygon', 'arbitrum', 'your-new-chain'] as const).map(...)}
```

### Modify styling:
```typescript
// All styles are inline CSS objects - easy to modify!
style={{ backgroundColor: '#your-color' }}
```

## 📊 Understanding Candlestick Charts (For Beginners)

### What is a Candlestick? 🕯️
Each "candle" shows gas price movement over 15 minutes:
- **Green candle** = Gas price went UP during those 15 minutes
- **Red candle** = Gas price went DOWN during those 15 minutes

### The 4 Parts of Each Candle:
1. **Open** - Gas price at the START of 15 minutes
2. **Close** - Gas price at the END of 15 minutes  
3. **High** - HIGHEST gas price during those 15 minutes
4. **Low** - LOWEST gas price during those 15 minutes

### How to Read the Chart:
- **Hover over any candle** to see exact OHLC values
- **Tall candles** = Lots of price movement (volatile)
- **Short candles** = Stable prices
- **Long wicks** (thin lines) = Price spikes that didn't last

## 📱 Screenshots

The app shows:
- **Header** with title and description
- **Network buttons** to switch between chains
- **Main display** showing selected network's gas price
- **Interactive candlestick chart** with 15-minute intervals
- **Grid view** showing all networks at once

## 🤝 Contributing

This is a learning project! Feel free to:
- Fork and experiment
- Add features
- Simplify further
- Share what you learned

## 📝 License

MIT License - use it however you want!

---

**Perfect for beginners** - Simple, clean, and educational! 🎓