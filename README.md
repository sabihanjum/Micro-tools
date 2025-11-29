# Quick Split 💰

A fast, simple, and elegant bill splitting calculator with tip calculation. Perfect for splitting restaurant bills, group outings, or any shared expenses.

![Quick Split Screenshot](https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=Quick+Split+Screenshot)

## ✨ Features

- **Equal Split Calculation**: Divide bills evenly among any number of people
- **Tip Calculator**: Built-in tip calculation with preset percentages (10%, 15%, 18%, 20%)
- **Real-time Validation**: Instant feedback on input errors
- **Detailed Breakdown**: See original amount, tip, total, and per-person cost
- **Mobile-First Design**: Fully responsive and optimized for mobile devices
- **Accessible**: WCAG AA compliant with keyboard navigation support
- **Lightning Fast**: < 4KB gzipped, loads instantly
- **Privacy-Focused**: All calculations happen in your browser, no data sent to servers

## 🚀 Quick Start

### Try it Online

Visit [Quick Split](https://your-deployment-url.com) to use the app immediately.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/quick-split.git
cd quick-split

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 📖 Usage

1. **Enter the total bill amount** (e.g., $100.00)
2. **Enter the number of people** (minimum 2)
3. **Select or enter a tip percentage** (use preset buttons or enter custom amount)
4. **Click Calculate** to see the breakdown
5. **View results**:
   - Original bill amount
   - Tip percentage and amount
   - Total with tip
   - Amount each person pays

### Example

- Bill: $100.00
- People: 4
- Tip: 20%

**Result**: Each person pays **$30.00**

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server with hot reload
npm run dev

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
quick-split/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # UI controller and event handlers
├── calculator.js      # Core calculation logic
├── tests/
│   ├── calculator.test.js    # Unit and property-based tests
│   └── app.test.js           # UI interaction tests
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

## 🧪 Testing

Quick Split uses a comprehensive testing strategy:

- **Unit Tests**: Test specific examples and edge cases
- **Property-Based Tests**: Verify correctness across thousands of random inputs using [fast-check](https://github.com/dubzzz/fast-check)
- **Integration Tests**: Test complete user workflows

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch
```

### Test Coverage

- ✅ 21 tests covering all core functionality
- ✅ 11 property-based tests with 100+ iterations each
- ✅ Input validation for all edge cases
- ✅ Mathematical correctness verification
- ✅ UI interaction testing

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/ folder
# Total bundle size: ~12KB uncompressed, ~4KB gzipped
```

## 🚢 Deployment

Quick Split can be deployed to any static hosting platform. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy Options

- **GitHub Pages**: Automatic deployment via GitHub Actions
- **Netlify**: One-click deploy with `netlify.toml` configuration
- **Vercel**: Zero-config deployment with `vercel.json`

```bash
# Deploy to Netlify
npm run deploy:netlify

# Deploy to Vercel
npm run deploy:vercel
```

## 🎨 Design Philosophy

Quick Split follows these principles:

- **Simplicity**: One clear purpose, executed well
- **Speed**: Minimal bundle size, instant calculations
- **Accessibility**: Usable by everyone, on any device
- **Privacy**: No tracking, no data collection, no backend
- **Reliability**: Comprehensive testing ensures correctness

## 🧮 Technical Details

### Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Build Tool**: Vite 5
- **Testing**: Vitest + fast-check
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **No Framework**: Pure JavaScript for minimal bundle size

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- First Contentful Paint: < 0.5s
- Time to Interactive: < 1s
- Bundle Size: 4KB gzipped
- Lighthouse Score: 100/100

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use ES6+ features
- Follow existing code formatting
- Add tests for new features
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/) and [fast-check](https://github.com/dubzzz/fast-check)
- Icons from [Heroicons](https://heroicons.com/)

## 📧 Contact

Have questions or suggestions? Open an issue on GitHub!

---

Made with ❤️ for splitting bills fairly
