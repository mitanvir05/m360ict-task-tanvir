import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useGetCategoriesQuery, useUpdateProductMutation } from '../features/products/productsApi';
import { Form, Input, Button, Select, Card, Space, message } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(Number(id));
  const { data: categories = [] } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (productData) {
        form.setFieldsValue({
            ...productData,
            reviews: (productData.reviews || []).map((r) =>
              typeof r === 'object' && r !== null ? r.comment || '' : r
            ),
          });
          
    }
  }, [productData, form]);

  const onFinish = async (values: any) => {
    console.log('Edited Product:', values);
    try {
      await updateProduct({ id: Number(id), body: values }).unwrap();
      message.success('Product updated successfully!');
      navigate('/');
    } catch (error) {
      message.error('Failed to update product.');
    }
  };

  if (productLoading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="p-6 flex justify-center bg-gray-100 min-h-screen">
      <Card title="Edit Product" className="w-full max-w-3xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ reviews: [] }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input title!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input price!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select category!' }]}>
            <Select placeholder="Select a category">
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Form.Item>

          
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                <label className="font-medium">Reviews</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Missing review' }]}
                    >
                      <Input placeholder="Review" />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Review
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;
