# 🤝 Contributing to StudyBuddy

Thank you for your interest in contributing to StudyBuddy! We welcome contributions from developers of all skill levels. This document provides guidelines and information to help you contribute effectively.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🤟 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or bun package manager
- Git
- A GitHub account

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/StudyBuddy.git
   cd StudyBuddy
   ```

3. **Set up upstream remote**:
   ```bash
   git remote add upstream https://github.com/ameerhmz/StudyBuddy.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

5. **Create environment file**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

6. **Start development servers**:
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   npm run server
   ```

## 🛠️ How to Contribute

### Types of Contributions

- **🐛 Bug Fixes**: Fix existing issues
- **✨ Features**: Add new functionality
- **📚 Documentation**: Improve docs, tutorials, or examples
- **🎨 UI/UX**: Improve design and user experience
- **🔧 Maintenance**: Code refactoring, performance improvements
- **🧪 Testing**: Add or improve tests

### Finding Issues to Work On

1. Check the [Issues](https://github.com/ameerhmz/StudyBuddy/issues) page
2. Look for issues labeled `good first issue` or `help wanted`
3. Comment on the issue to indicate you're working on it
4. Wait for maintainer approval before starting

## 📝 Development Guidelines

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Write clear, concise comments
- Keep functions small and focused
- Use consistent formatting

### React Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Optimize re-renders with `React.memo` when needed
- Use TypeScript for type safety (when applicable)
- Follow component composition patterns

### CSS Guidelines

- Use CSS modules or styled-components
- Follow BEM naming convention
- Ensure mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

Examples:
```
feat(auth): add user registration
fix(chatbot): resolve API timeout issue
docs(readme): update installation instructions
```

### Branch Naming

Use descriptive branch names:

```
feature/add-dark-mode
fix/login-validation
docs/update-api-docs
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Guidelines

- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error scenarios
- Include integration tests for API calls
- Test responsive design on multiple devices

## 📤 Submitting Changes

### Pull Request Process

1. **Update your fork** with the latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following the guidelines above

4. **Test your changes** thoroughly

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill out the PR template
   - Link any related issues

### PR Requirements

- ✅ Tests pass
- ✅ Code follows style guidelines
- ✅ Documentation updated if needed
- ✅ Mobile responsiveness verified
- ✅ No console errors or warnings
- ✅ Descriptive commit messages

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser and OS** information
- **Console errors** or logs

### Feature Requests

For feature requests, please provide:

- **Clear description** of the proposed feature
- **Use case** and benefits
- **Mockups or examples** if possible
- **Implementation ideas** if you have them

## 📞 Getting Help

If you need help or have questions:

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Email**: ameerhmz5@gmail.com

## 🎯 Recognition

Contributors will be recognized in:
- The contributors list in README.md
- Release notes for significant contributions
- Special mentions for outstanding work

Thank you for contributing to StudyBuddy! 🚀