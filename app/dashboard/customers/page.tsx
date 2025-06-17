import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    orders: 5,
    totalSpent: 1299.99,
    lastOrder: '2024-03-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    orders: 3,
    totalSpent: 799.99,
    lastOrder: '2024-03-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    orders: 8,
    totalSpent: 2499.99,
    lastOrder: '2024-03-13',
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 