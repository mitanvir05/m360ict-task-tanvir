import { Table, Button } from 'antd';
import { useGetProductsQuery } from '../features/products/productsApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      render: (text: string) => <img src={text} alt="thumbnail" className="w-16 h-16 object-cover" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => navigate(`/products/${record.id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
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
  );
};

export default ProductList;
