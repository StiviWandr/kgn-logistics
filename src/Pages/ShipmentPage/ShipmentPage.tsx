import React, { useState } from 'react';
import { Form, Input, Button, message, ConfigProvider, Flex, Select } from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API } from '../../utils/helpers/api/axios';
import { useAppSelector } from '../../utils/hooks/redux';

export function ShipmentPage () {
    const [qrImage, setQrImage] = useState('');
    const {userData} = useAppSelector(state => state.auth)
    const truck_type_options = [
        { value: 'Голова', label: 'Голова' },
        { value: 'Прицеп', label: 'Прицеп' },
    ]
    const initialValues = {
        recipient_phone_number: '',
        cargo_col: '',
        cargo_description: '',
        check_number: '',
        recipient_name: '',
        truck_type: '',
    };

    const validationSchema = Yup.object().shape({
        recipient_phone_number: Yup.string().required('Телефонный номер обязателен'),
        recipient_name: Yup.string().required('Имя получателя обязательно'),
        cargo_description: Yup.string().required('Описание груза обязательно'),
        check_number: Yup.string().required('Количество чеков обязательно'),
        truck_type: Yup.string().required('Тип кузова обязателен'),
        cargo_col: Yup.string().required('Количество груза обязательно'),
    });

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
        try {
            const response = await API.CRM.PROTECTED.post('/generate_qr', values, {
                responseType: 'blob',
                
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setQrImage(url);
            message.success('QR код успешно сгенерирован');
        } catch (error) {
            message.error('Ошибка при генерации QR кода');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ConfigProvider 
            theme={{
                components: {
                    Form: {
                        labelFontSize: 18,
                        verticalLabelPadding: 0
                    }
                }
            }}
        >
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                    <Form onFinish={handleSubmit}>
                        <Flex gap={10} vertical>
                            <Form.Item
                                label="Телефонный номер получателя"
                                help={touched.recipient_phone_number && errors.recipient_phone_number}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.recipient_phone_number && errors.recipient_phone_number ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="recipient_phone_number" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.recipient_phone_number} 
                                    placeholder='Например, +77775553535'
                                />
                            </Form.Item>
                            <Form.Item
                                label="ФИО получателя"
                                help={touched.recipient_name && errors.recipient_name}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.recipient_name && errors.recipient_name ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="recipient_name" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.recipient_name} 
                                    placeholder='Например, Иванов Иван Иванович'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Количество мест"
                                help={touched.cargo_col && errors.cargo_col}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.cargo_col && errors.cargo_col ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="cargo_col" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.cargo_col} 
                                    placeholder='Например, 15'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Описание груза"
                                help={touched.cargo_description && errors.cargo_description}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.cargo_description && errors.cargo_description ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="cargo_description" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.cargo_description} 
                                    placeholder='Например, Везу стекло и зеркала'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Тип кузова"
                                help={touched.truck_type && errors.truck_type}
                                validateStatus={touched.truck_type && errors.truck_type ? 'error' : ''}
                                labelCol={{ span: 24 }}
                            >
                                <Select
                                    size='large'
                                    placeholder='Выберите тип кузова'
                                    onChange={value => setFieldValue('truck_type', value)}
                                    onBlur={handleBlur}
                                    value={values.truck_type || undefined}
                                    options={truck_type_options}
                                />
                    
                                
                            </Form.Item>
                            <Form.Item
                                label="Количество чеков"
                                help={touched.check_number && errors.check_number}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.check_number && errors.check_number ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="check_number" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.check_number} 
                                    placeholder='Например, 3'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Имя"
                                labelCol={{ span: 24 }}
                            >
                                <Input 
                                    size='large' 
                                    disabled
                                    value={userData?.username} 
                                />
                            </Form.Item>
                            <Form.Item
                                label="Номер телефона"
                                labelCol={{ span: 24 }}
                            >
                                <Input 
                                    size='large' 
                                    disabled
                                    value={userData?.phone_number} 
                                />
                            </Form.Item>
                            <Form.Item
                                label="Номер машины"
                                labelCol={{ span: 24 }}
                            >
                                <Input 
                                    size='large' 
                                    disabled
                                    value={userData?.cargo_number} 
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Сгенерировать QR код
                                </Button>
                            </Form.Item>
                        </Flex>
                        
                    </Form>
                )}
            </Formik>
            <Flex justify='center' align='center' style={{marginTop: 30}}>
                {qrImage && <img src={qrImage} style={{width: '100%', maxWidth: 400}} alt="QR Code" />}
            </Flex>
            
        </ConfigProvider>
    );
}