#!/bin/bash

# Freddy English Tutor Setup Script
echo "🤖 Setting up Freddy English Tutor..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Copying from .env.local.example..."
    cp .env.local.example .env.local
    echo "📝 Please update .env.local with your API keys:"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   - CLERK_SECRET_KEY"
    echo "   - NEXT_PUBLIC_CONVEX_URL"
    echo "   - OPENAI_API_KEY"
    echo "   - DID_API_KEY (optional)"
fi

# Install Convex CLI if not present
if ! command -v npx convex &> /dev/null; then
    echo "📡 Installing Convex CLI..."
    npm install -g convex
fi

# Check if Convex is configured
if [ ! -f "convex/_generated/api.js" ]; then
    echo "🔧 Setting up Convex database..."
    echo "Please run the following commands to complete setup:"
    echo "1. npx convex dev"
    echo "2. Follow the prompts to create/connect your Convex project"
    echo "3. npm run dev"
else
    echo "✅ Convex is already configured"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/images
mkdir -p public/icons
mkdir -p uploads
mkdir -p __tests__/__mocks__

# Copy default assets if they don't exist
if [ ! -f "public/images/freddy-avatar.jpg" ]; then
    echo "🖼️  Default avatar image not found. Please add freddy-avatar.jpg to public/images/"
fi

if [ ! -f "public/images/logo.svg" ]; then
    echo "🖼️  Logo not found. Please add logo.svg to public/images/"
fi

# Setup Git hooks (optional)
if [ -d ".git" ]; then
    echo "🔗 Setting up Git hooks..."
    
    # Pre-commit hook for linting
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
EOF
    chmod +x .git/hooks/pre-commit
    echo "✅ Git hooks configured"
fi

# Setup complete
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Run 'npx convex dev' to setup the database"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Getting started guide"
echo "   - docs/DEVELOPMENT.md - Development setup"
echo "   - docs/DEPLOYMENT.md - Deployment instructions"
echo ""
echo "🚀 Happy coding with Freddy!"