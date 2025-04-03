'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Loading,
  Content
} from '@carbon/react';
import styles from './Extract.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  brand: string;
}

interface TableRow {
  id: string;
  cells: { id: string; value: any; }[];
}

export default function Extract() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const headers = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'price', header: 'Price' },
    { key: 'category', header: 'Category' },
    { key: 'brand', header: 'Brand' },
  ];

  const handleRowClick = (row: TableRow) => {
    const id = row.cells.find(cell => cell.id.includes('id'))?.value;
    router.push(`/dashboard/extract/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  const tableRows = products.map(product => ({
    id: String(product.id),
    title: product.title,
    price: product.price,
    category: product.category,
    brand: product.brand
  }));

  return (
    <Content className={styles.container}>
      <h1 className={styles.title}>Product List</h1>
      <DataTable 
        rows={tableRows} 
        headers={headers}
      >
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()} useZebraStyles>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow 
                  {...getRowProps({ row })} 
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: 'pointer' }}
                >
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </Content>
  );
}