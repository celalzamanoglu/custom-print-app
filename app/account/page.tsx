'use client';

import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Card,
  Image,
} from '@nextui-org/react';

// Define a type for the order status
type OrderStatus = 'Delivered' | 'Processing' | 'Shipped' | 'Pending';

const categories = ['Orders', 'Payment Method', 'Settings'];

const orders: {
  id: number;
  date: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
}[] = [
  {
    id: 1,
    date: '2023-05-01',
    product: 'Custom Logo Paper',
    quantity: 500,
    total: 149.99,
    status: 'Delivered',
  },
  {
    id: 2,
    date: '2023-05-15',
    product: 'Kraft Paper Sheets',
    quantity: 1000,
    total: 199.99,
    status: 'Processing',
  },
  {
    id: 3,
    date: '2023-06-02',
    product: 'Printed Greaseproof Paper',
    quantity: 750,
    total: 224.99,
    status: 'Shipped',
  },
  {
    id: 4,
    date: '2023-06-20',
    product: 'Custom Design Paper',
    quantity: 250,
    total: 99.99,
    status: 'Pending',
  },
];

const statusColorMap: Record<OrderStatus, 'success' | 'primary' | 'secondary' | 'warning'> = {
  Delivered: 'success',
  Processing: 'primary',
  Shipped: 'secondary',
  Pending: 'warning',
};

const savedDesigns = [
  {
    id: 1,
    name: 'Coffee Shop Logo',
    image: '/path/to/design1.jpg',
    paperSize: '10x10cm',
    printColor: 'Black',
    paperColor: 'White',
  },
  {
    id: 2,
    name: 'Bakery Wrapping',
    image: '/path/to/design2.jpg',
    paperSize: '15x20cm',
    printColor: 'Brown',
    paperColor: 'Kraft',
  },
  {
    id: 3,
    name: 'Restaurant Menu',
    image: '/path/to/design3.jpg',
    paperSize: '20x30cm',
    printColor: 'Red',
    paperColor: 'Cream',
  },
];

export default function Account() {
  const [activeCategory, setActiveCategory] = useState('Orders');

  const renderContent = () => {
    switch (activeCategory) {
      case 'Orders':
        return (
          <Table aria-label="Orders table">
            <TableHeader>
              <TableColumn>ORDER ID</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>TOTAL</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip color={statusColorMap[order.status as OrderStatus]} variant="flat">
                      {order.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Payment Method':
        return <p>Payment Method content will be displayed here.</p>;
      case 'Settings':
        return <p>Settings content will be displayed here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome John Doe</h1>
      <p className="text-xl mb-8">
        Manage your orders, access saved designs, update payment methods, and adjust your account
        settings.
      </p>

      <ButtonGroup className="mb-8 w-full">
        {categories.map((category) => (
          <Button
            key={category}
            className={`flex-1 ${
              activeCategory === category ? 'bg-[#1c1c1e] text-white' : 'bg-white text-[#1c1c1e]'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      <div className="mt-8 mb-12">{renderContent()}</div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Saved Designs</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {savedDesigns.map((design) => (
            <Card key={design.id} className="min-w-[200px] max-w-[250px]">
              <Image src={design.image} alt={design.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{design.name}</h3>
                <p className="text-sm">Size: {design.paperSize}</p>
                <p className="text-sm">Print Color: {design.printColor}</p>
                <p className="text-sm">Paper Color: {design.paperColor}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
