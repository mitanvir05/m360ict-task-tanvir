import { Table, Button, Space, Card, Divider } from "antd";
import { useGetProductsQuery } from "../features/products/productsApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading } = useGetProductsQuery({
    limit: showAll ? 0 : pageSize,
    skip: showAll ? 0 : (page - 1) * pageSize,
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <div>
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="h-16 w-16 object-contain rounded-md shadow-sm"
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <span className="font-medium text-gray-800">{title}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="text-green-700 font-semibold">${price}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Product) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/products/${record.id}`)}
          >
            View
          </Button>
          <Button
            type="default"
            className="border-blue-500 text-blue-500 hover:!text-white hover:!bg-blue-500"
            onClick={() => navigate(`/products/${record.id}/edit`)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card bordered={false} className="shadow-md rounded-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">🛍️ Product List</h1>
        <Divider />
        <Table
          columns={columns}
          dataSource={data?.products}
          loading={isLoading}
          pagination={
            showAll
              ? false
              : {
                  current: page,
                  pageSize: pageSize,
                  total: data?.total,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  onChange: (newPage, newPageSize) => {
                    if (newPageSize !== pageSize) {
                      setPageSize(newPageSize);
                      setPage(1);
                    } else {
                      setPage(newPage);
                    }
                  },
                }
          }
          scroll={{ x: 600 }}
          rowKey="id"
          bordered
        />

        <div className="flex justify-end mt-4">
          <Button type="default" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Paginated" : "Show All"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductList;
