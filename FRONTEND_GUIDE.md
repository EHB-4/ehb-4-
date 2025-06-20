# EHB Frontend Development Guide

## 🚀 Ultra-Fast Frontend Setup

This guide is for the optimized frontend-only development environment with ultra-fast Cursor AI performance.

## Quick Start

```bash
# Optimize for frontend development
npm run frontend-optimize

# Start development server
npm run dev

# Generate a new component
npm run gen:component MyComponent

# Generate component with hook
npm run gen:component MyComponent useMyComponent
```

## Available Commands

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check
- `npm run format` - Format code with Prettier

### Frontend Optimization

- `npm run frontend-optimize` - Optimize for frontend development
- `npm run ultra-fast-frontend` - Ultra-fast frontend setup

### Component Generation

- `npm run gen:component <name>` - Generate new component
- `npm run gen:component <name> <hook>` - Generate component with hook
- `npm run gen:page <name>` - Generate new page
- `npm run gen:api <name>` - Generate new API route

### Testing

- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

### AI Features

- `npm run ai-setup` - Setup AI automation
- `npm run ai-test` - Generate AI-powered tests
- `npm run ai-review` - AI code review

## Project Structure

```
app/                    # Next.js App Router
├── components/        # Reusable React components
│   ├── ui/           # UI components
│   └── frontend/     # Frontend-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   └── frontend/     # Frontend utilities
├── styles/           # CSS and styling files
├── types/            # TypeScript types
│   └── frontend/     # Frontend types
└── __tests__/        # Test files
    ├── components/   # Component tests
    └── hooks/        # Hook tests
```

## Frontend Development Guidelines

### Components

- Use TypeScript for all components
- Follow functional component pattern
- Implement proper prop interfaces
- Use Tailwind CSS for styling
- Add comprehensive JSDoc comments

### Example Component

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Hooks

- Create custom hooks for reusable logic
- Use proper TypeScript types
- Implement proper error handling
- Add comprehensive documentation

### Example Hook

```tsx
import { useState, useEffect } from 'react';

interface UseCounterProps {
  initialValue?: number;
  step?: number;
}

export const useCounter = ({ initialValue = 0, step = 1 }: UseCounterProps = {}) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
```

## Backend Features (DISABLED)

The following backend features are disabled for ultra-fast frontend development:

- ❌ MongoDB setup and operations
- ❌ Database migrations
- ❌ Backend API development
- ❌ Docker services
- ❌ Database queries
- ❌ Authentication backend
- ❌ File upload backend

## Benefits of Frontend-Only Mode

- ⚡ **Ultra-fast Cursor AI performance**
- 🚀 **Faster development server startup**
- 🤖 **Optimized AI suggestions for frontend**
- 📦 **Smaller bundle size**
- 🎯 **Focused development experience**
- 🔧 **Reduced complexity**
- ⚡ **Faster file indexing**
- 🚀 **Quicker code completion**

## AI Features

### Component Generation

```bash
npm run gen:component MyButton
```

This generates:

- `components/MyButton.tsx` - Component file
- `__tests__/components/MyButton.test.tsx` - Test file

### Hook Generation

```bash
npm run gen:component MyButton useMyButton
```

This generates:

- `components/MyButton.tsx` - Component file
- `hooks/useMyButton.ts` - Hook file
- `__tests__/components/MyButton.test.tsx` - Test file

### AI Code Review

- Automatic code review suggestions
- Performance optimization tips
- Accessibility improvements
- TypeScript best practices

## Performance Guidelines

### Images

- Use Next.js Image component for optimization
- Implement lazy loading
- Use appropriate image formats

### Styling

- Use Tailwind CSS utility classes
- Implement CSS-in-JS sparingly
- Optimize for bundle size

### Components

- Use React.memo for expensive components
- Implement proper code splitting
- Use dynamic imports for large components

### Testing

- Write unit tests for all components
- Use React Testing Library
- Maintain good test coverage

## Accessibility Guidelines

- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers
- Follow WCAG 2.1 guidelines

## Cursor AI Optimization

The project is optimized for ultra-fast Cursor AI performance:

- **Auto-Activation**: Automatically activates AI features
- **Auto-Run**: Runs relevant scripts automatically
- **Auto-Accept**: Accepts AI suggestions automatically
- **Frontend Focus**: Optimized for frontend development
- **Reduced Complexity**: Backend features disabled

## Troubleshooting

### Cursor AI Slow Performance

1. Run `npm run frontend-optimize`
2. Ensure backend features are disabled
3. Check `.cursorrules` configuration
4. Restart Cursor AI

### Component Generation Issues

1. Check if component name is valid
2. Ensure components directory exists
3. Verify TypeScript configuration

### Development Server Issues

1. Clear `.next` cache: `npm run clean`
2. Restart development server
3. Check for TypeScript errors

## Next Steps

1. **Start Development**: Run `npm run dev`
2. **Create Components**: Use `npm run gen:component`
3. **Write Tests**: Use generated test templates
4. **Optimize Performance**: Follow performance guidelines
5. **Ensure Accessibility**: Follow accessibility guidelines

## Support

For issues or questions:

- Check the logs in `logs/` directory
- Review the optimization configuration
- Ensure all dependencies are installed
- Verify TypeScript configuration

---

**Happy Frontend Development! 🚀**
