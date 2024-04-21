import React, { useState } from 'react';
import { Form, Input, Button, message, ConfigProvider, Flex, Select } from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API } from '../../utils/helpers/api/axios';

export function ShipmentPage () {
    const [qrImage, setQrImage] = useState('');
    const truck_type_options = [
        { value: 'Голова', label: 'Голова' },
        { value: 'Прицеп', label: 'Прицеп' },
    ]
    const initialValues = {
        phone_number: '',
        cargo_number: '',
        cargo_description: '',
        check_number: '',
        truck_type: '',
    };

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string().required('Телефонный номер обязателен'),
        cargo_number: Yup.string().required('Количество груза обязательно'),
        cargo_description: Yup.string().required('Описание груза обязательно'),
        check_number: Yup.string().required('Количество чеков обязательно'),
        truck_type: Yup.string().required('Тип кузова обязателен'),
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
                                label="Телефонный номер"
                                help={touched.phone_number && errors.phone_number}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.phone_number && errors.phone_number ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="phone_number" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.phone_number} 
                                    placeholder='Например, +77775553535'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Количество мест"
                                help={touched.cargo_number && errors.cargo_number}
                                labelCol={{ span: 24 }}
                                validateStatus={touched.cargo_number && errors.cargo_number ? 'error' : ''}
                            >
                                <Input 
                                    size='large' 
                                    name="cargo_number" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    value={values.cargo_number} 
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