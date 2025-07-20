

## 📁 Project Structure

```
freddy-english-tutor/
├── main-app/                    # Main application (port 3000)
├── admin-site/                  # Admin panel (port 3001)
├── docs/                        # Documentation
└── scripts/                     # Utility scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management

### Backend & AI
- **OpenAI API** - GPT models for conversation
- **D-ID API** - AI avatar generation
- **Convex** - Real-time database
- **LangChain** - RAG implementation

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Playwright** - E2E testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- D-ID API key
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/freddy-english-tutor.git
   cd freddy-english-tutor
   ```

2. **Install dependencies**
   ```bash
   # Main app
   cd main-app
   npm install
   
   # Admin site
   cd ../admin-site
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy environment files
   cp main-app/.env.local.example main-app/.env.local
   cp admin-site/.env.local.example admin-site/.env.local
   ```

4. **Configure environment variables**
   - Add your API keys to `.env.local` files
   - Configure database connections
   - Set up authentication providers

5. **Start development servers**
   ```bash
   # Main app (port 3000)
   cd main-app
   npm run dev
   
   # Admin site (port 3001)
   cd ../admin-site
   npm run dev
   ```

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - System architecture overview
- [Development](./DEVELOPMENT.md) - Development guidelines
- [API Reference](./API_REFERENCE.md) - API documentation
- [Deployment](./DEPLOYMENT.md) - Deployment instructions
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](./TROUBLESHOOTING.md) guide
2. Search existing [Issues](../../issues)
3. Create a new issue with detailed information

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with learning management systems
- [ ] Real-time collaboration features
