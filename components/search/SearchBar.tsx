import { Search, Filter } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  onSearch: (query: string, category: string, minRating: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [minRating, setMinRating] = React.useState('');

  const handleSearch = () => {
    onSearch(query, category, minRating);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="books">Books</SelectItem>
        </SelectContent>
      </Select>
      <Select value={minRating} onValueChange={setMinRating}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Min Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any Rating</SelectItem>
          <SelectItem value="4">4+ Stars</SelectItem>
          <SelectItem value="3">3+ Stars</SelectItem>
          <SelectItem value="2">2+ Stars</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Search
      </Button>
    </div>
  );
}
