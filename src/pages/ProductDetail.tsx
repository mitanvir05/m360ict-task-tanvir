import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../features/products/productsApi';
import { Button, Card } from 'antd';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(Number(id));
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card
        title={data?.title}
        className="w-full max-w-md"
        cover={<img alt={data?.title} src={data?.thumbnail} />}
      >
        <p className="mb-2"><strong>Price:</strong> ${data?.price}</p>
        <p className="mb-4"><strong>Description:</strong> {data?.description}</p>
        <Button type="primary" onClick={() => navigate('/')}>
          Back to List
        </Button>
      </Card>
    </div>
  );
};

export default ProductDetail;
