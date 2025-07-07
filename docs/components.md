# Component Documentation

## Overview

This document describes the reusable components available in the EHB Next.js 04 application.

## UI Components

### Button

A reusable button component with various styles and states.

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>;
```

### Input

A form input component with validation support.

```tsx
import { Input } from '@/components/ui/Input';

<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>;
```

### Modal

A modal dialog component.

```tsx
import { Modal } from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={onClose}>
  <h2>Modal Title</h2>
  <p>Modal content goes here</p>
</Modal>;
```

## Layout Components

### Header

The main application header.

### Sidebar

Navigation sidebar component.

### Footer

Application footer component.

## Form Components

### Form

A form wrapper with validation.

### FormField

Individual form field component.

## Data Components

### DataTable

A table component for displaying data.

### Pagination

Pagination component for large datasets.

## Utility Components

### Loading

Loading spinner component.

### ErrorBoundary

Error boundary for catching React errors.

### Toast

Notification toast component.
