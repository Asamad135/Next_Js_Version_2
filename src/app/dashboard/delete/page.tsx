'use client'
import { useState, useEffect } from 'react';
import { Content,Button} from '@carbon/react';
import SearchInput from '@/components/SearchInput';
import TextInput from '@/components/TextInput';
import Dropdown from '@/components/Dropdown';
import DataTable from '@/components/DataTable';
import deleteStyles from '@/styles/DeleteModule.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}

interface TableHeader {
  key: string;
  header: string;
}

interface TableData {
  id: string | number;
  title: string;
  price: string;
  category: string;
  stock: number;
}

export default function DeleteModule() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [notes, setNotes] = useState<string>('');

  const headers: TableHeader[] = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'price', header: 'Price' },
    { key: 'category', header: 'Category' },
    { key: 'stock', header: 'Stock' }
  ];

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        const uniqueCategories = Array.from(new Set<string>(data.products.map((product: Product) => product.category)));
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  const formatTableData = (products: Product[]): TableData[] => {
    return products.map(({ id, title, price, category, stock }) => ({
      id,
      title,
      price: `$${price}`,
      category,
      stock
    }));
  };

  return (
    <Content>
      <div className={deleteStyles.deleteContainer}>
        <h1 className={deleteStyles.title}>Delete Products</h1>
        
        <div className={deleteStyles.controlsSection}>
          <div className={deleteStyles.fullWidth}>
            <SearchInput 
              onSearch={handleSearch}
              button={<Button onClick={() => handleSearch((document.querySelector('input[type="text"]') as HTMLInputElement)?.value || '')}>Search</Button>}
            />
             <SearchInput 
              onSearch={handleSearch}
            />
          </div>
          
          <TextInput
            labelText="Notes"
            placeholder="Enter any additional notes..."
            onChange={(value: string) => setNotes(value)}
            value={notes}
            id="delete-notes"
          />
          
          <Dropdown 
            items={categories}
            onChange={(value: string) => setSelectedCategory(value)}
            label="Select Category"
          />
        </div>

        {selectedCategory && (
          <div className={deleteStyles.tableSection}>
            <DataTable 
              data={formatTableData(filteredProducts)}
              headers={headers}
            />
          </div>
        )}
      </div>
    </Content>
  );
}