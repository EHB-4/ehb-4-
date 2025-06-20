import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  test('should render correctly', () => {
    render(<MyComponent>Test Content</MyComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<MyComponent className="custom-class">Test</MyComponent>);
    const element = screen.getByText('Test');
    expect(element.parentElement).toHaveClass('custom-class');
  });
});
