import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Space, Result } from "antd";
import { Modal, Button } from "antd";
import axios from "axios";
import noImg from "../../image/noImg.png"

import { Form, Input, InputNumber } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditOutlined } from "@ant-design/icons";
import "../../css/product.css";

const Product = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [editable, setEditable] = useState(false);
  const [img, setImage] = useState([]);
  const [tempImg, settempImg] = useState("");

  const [recordId, setRecordId] = useState();

  const showModal = () => {
    form.resetFields();
    settempImg("");
    setIsModalVisible(true);
    setEditable(false);
  };
  const editModel = (record) => {
    setEditable(true);
    setIsModalVisible(true);
    setRecordId(record._id);
    if (record.image) {
      settempImg(`http://localhost:3001/${record.image}`);
    } else {
      settempImg(null);
    }

    form.setFieldsValue({
      Name: record.name,
      Price: Number(record.price),
      Detail: record.detail,
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get("/product/getProduct").then((res) => {
      var result = res.data.data;
      setNewData(result);
    });
  }, []);

  const [newData, setNewData] = useState([]);

  const columns = [
    {
      title: "ProductId",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text ? `http://localhost:3001/${text}` : noImg} height="50px" />
      ),
    },
    {
      title: "Edit",
      dataIndex: "",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => editModel(record)} />
        </div>
      ),
    },
  ];

  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    settempImg(imageUrl);
    setImage(imageFile);
  }

  const onFinishSubmit = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", values.Name);
    bodyFormData.append("price", values.Price);
    bodyFormData.append("detail", values.Detail);
    bodyFormData.append("img", img);

    await axios.post(`/product/addProduct`, bodyFormData).then((res) => {
      if (res.data.success) {
        toast.success("Product added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.resetFields();
        axios.get("/product/getProduct").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });
        setIsModalVisible(false);
      } else {
        toast.warn(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const onFinishEdit = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", values.Name);
    bodyFormData.append("price", values.Price);
    bodyFormData.append("detail", values.Detail);
    bodyFormData.append("_id", recordId);
    bodyFormData.append("img", img);

    await axios.post(`/product/updateProduct/`, bodyFormData).then((res) => {
      if (res.data.success) {
        toast.success("Product edited successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.resetFields();
        axios.get("/product/getProduct").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });
        setIsModalVisible(false);
        setEditable(false);
      } else {
        toast.warn(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="add_button">
          <Button type="primary" onClick={showModal}>
            +Add Product
          </Button>
        </div>
        <Modal
          title="Product Description"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <div>
            <Form
              {...layout}
              name="nest-messages"
              form={form}
              onFinish={editable ? onFinishEdit : onFinishSubmit}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="Name"
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Price"
                label="Price"
                rules={[
                  {
                    type: "number",
                    required: true,

                    min: 0,
                  },
                ]}
              >
                <InputNumber controls={false} />
              </Form.Item>
              <Form.Item name="Detail" label="Detail">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="Image" label="Image">
                <label for="file-upload" class="custom-file-upload">
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={processImage}
                />
                {tempImg !== "" ? <img src={tempImg ? tempImg : noImg} width={150}></img> : null}
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                {editable ? (
                  <Button type="primary" htmlType="submit">
                    Edit
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <div>
        <Table columns={columns} dataSource={newData} scroll={{ x: 1000 }} className='data_table' />
      </div>
    </div>
  );
};

export default Product;
