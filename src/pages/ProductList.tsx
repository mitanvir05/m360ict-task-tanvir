import { Table, Button, Space } from 'antd';
import { useGetProductsQuery } from '../features/products/productsApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Product) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/products/${record.id}`)}>
            View
          </Button>
          <Button onClick={() => navigate(`/products/${record.id}/edit`)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="bg-white p-4 rounded shadow">
        <Table
          columns={columns}
          dataSource={data?.products}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize,
            total: data?.total,
            onChange: (p) => setPage(p),
          }}
          rowKey="id"
          bordered
        />
      </div>
    </div>
  );
};

export default ProductList;
