import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/Button';

describe('Button', () => {
  test('should render correctly', () => {
    render(<Button>Test Content</Button>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const element = screen.getByText('Test');
    expect(element.parentElement).toHaveClass('custom-class');
  });
});
