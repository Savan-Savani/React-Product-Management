import React, { useEffect, useState } from 'react';
import { Modal, Button, Select } from 'antd';
import axios from "axios"

import { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint.js"
import { useReactToPrint } from "react-to-print";

import { DatePicker, Space } from 'antd';
import moment from 'moment';

import { Form, Input, InputNumber, Table } from 'antd';
const Billing = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const { RangePicker } = DatePicker;
    let componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current
    // });

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    /* eslint-disable no-template-curly-in-string */

    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not a valid email!',
    //         number: '${label} is not a valid number!',
    //     },
    //     number: {
    //         range: '${label} must be between ${min} and ${max}',
    //     },
    // };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [product, setProduct] = useState([])



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [dataSource, setDataSource] = useState([{
        key: 1,
        item: '',
        ppu: 0,
        units: 0,
        description: ""
    }]);
    const [finishValue, setFinishValue] = useState([{


    }])

    const columns = [
        {
            title: 'item',
            dataIndex: 'item',
            // editable: true,
            // key: 'item'
            width: '5%',
            render: (text, record) => (

                <Select style={{ width: "100%" }}
                    // getPopupContainer={(triggerNode) => triggerNode.parentElement}
                    tokenSeparators={[',']} onChange={(e) => {
                        record.item = e
                        record.description = product.find((ele) => ele.name === e).detail
                    }}>
                    {item}
                </Select>
            ),
        },
        {
            title: 'price per unit',
            dataIndex: 'ppu',
            width: '5%',
            render: (text, record) => (
                <input type="text" style={{ width: '100%' }} onChange={(e) => HandleValueChange(record.key, e.target.value, "ppu")}></input>
            ),
        },
        {
            title: 'units',
            dataIndex: 'units',
            width: '5%',
            render: (text, record) => (
                <input type="text" style={{ width: '100%' }} onChange={(e) => {
                    record.units = e.target.value
                }}></input>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'units',
            width: '5%',
            render: (text, record) => (
                <div>
                    {record.units * record.ppu}
                </div>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'units',
            width: '3%',
            render: (text, record) => (
                <div onClick={() => { HandleDeleteItem(record.key) }}>
                    delete
                </div>
            ),
        },
    ];

    const HandleAddItem = () => {
        setDataSource([...dataSource, {
            key: dataSource[dataSource.length - 1].key + 1,
            item: 'Mike',
            ppu: dataSource.length,
            units: 1,
            description: ""
        }])
    }

    const HandleDeleteItem = (key) => {
        const temp = dataSource.filter((e) => e.key !== key);
        setDataSource(temp);
    }


    const HandleValueChange = (key, value, type) => {

        const index = dataSource.findIndex((obj => obj.key == key));
        const temp = dataSource
        temp[index][type] = value
        setDataSource(temp)

    }
    useEffect(() => {

        axios.get("/product/getProduct").then((res) => {
            var result = res.data.data
            setProduct(result)
        })
    }, [])



    const { Option } = Select;
    const details = []
    const item = [];
    for (let i = 0; i < product.length; i++) {
        item.push(<Option key={product[i].name} value={product[i].name} >{product[i].name}</Option>);
    }

    const onFinish = (values) => {
        setFinishValue([{
            address: values.user.address,
            companyname: values.user.companyname,
            gstnumber: values.user.gstnumber,
            mobilenumber: values.user.mobilenumber,

        }])

    }


    return (
        <div>
            <>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="fillup description" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} >
                        <Form.Item
                            name={['user', 'companyname']}
                            label="Company name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'address']} label="Address" >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'gstnumber']}
                            label="GST No."
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'mobilenumber']}
                            label="Mobile Number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'date']} label="Date">
                            <DatePicker defaultValue={moment()} format={dateFormatList} />
                        </Form.Item>
                        <Table dataSource={dataSource} columns={columns} scroll={{ x: 300 }} className='data_table'/>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" onClick={HandleAddItem}>
                                Add item
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" onClick={() => { console.log(dataSource) }}>
                                test
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <div>
                                {/* <button
                                    type="button"
                                    className="bg-gray-500 border border-gray-500 p-2 mb-4"
                                    onClick={handlePrint}
                                >
                                    {" "}
                                    Print Resume{" "}
                                </button>

                                <div hidden   >


                                    <ComponentToPrint ref={componentRef} />
                                </div> */}
                                {/* button to trigger printing of target component */}
                                <ReactToPrint
                                    trigger={() => <Button htmlType="submit" type="primary">Print this out!</Button>}
                                    content={() => componentRef}
                                />
                                <div style={{ display: "none" }}>


                                    <ComponentToPrint dataSource={dataSource} finishValue={finishValue} ref={(el) => (componentRef = el)} />
                                </div>
                                {/* component to be printed */}
                            </div>
                        </Form.Item>

                    </Form>
                </Modal>
            </>

        </div>
    )
}
export default Billing