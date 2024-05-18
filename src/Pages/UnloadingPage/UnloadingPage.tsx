import { useState } from 'react';
import UsersModule from '../../Modules/Users/UsersModule'
import PageHead from '../../Routes/PageHead'
import { API } from '../../utils/helpers/api/axios';
import { Button, Card, Input, Typography, message } from 'antd';

export function UnloadingPage() {
        const [phoneNumber, setPhoneNumber] = useState('');
        const [results, setResults] = useState([]);
    
        const handleSearch = async () => {
            try {
                const response = await API.CRM.PROTECTED.post('/get_info_by_phone', {
                    phone_number: phoneNumber
                });
                setResults(response.data);
            } catch (error) {
                message.error('Ошибка при поиске данных');
            }
        };
    
        const handleSendSMS = async (recipient: any, shipmentId: number) => {
            try {
                await API.CRM.PROTECTED.post('/send_sms', {
                    recipient,
                    shipmentId: shipmentId
                });
                handleSearch()
                message.success('СМС отправлено успешно');
            } catch (error) {
                message.error('Ошибка при отправке СМС');
            }
        };
    
        return (
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <Input.Search
                    placeholder="Введите номер телефона"
                    enterButton="Поиск"
                    size="large"
                    onSearch={handleSearch}
                    onChange={e => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                {results.map((item: any, index) => (
                    <Card key={index} title={`Товар: ${item.cargo_description}`} style={{ marginTop: '20px' }}>
                        <Typography.Text type='success'>Количество отправленных СМС: {item.sms_sent_counter}</Typography.Text>
                        <p>ФИО получателя: {item.recipient_name}</p>
                        <p>Телефон получателя: {item.recipient_phone_number}</p>
                        <p>Описание груза: {item.cargo_description}</p>
                        <p>Количество чеков: {item.check_number}</p>
                        <p>Тип кузова: {item.truck_type}</p>
                        <p>Количество груза: {item.cargo_col}</p>
                        <p>Дата заполнения: {item.fill_date}</p>
                        <p>ФИО водителя: {item.driver_username}</p>
                        <p>Номер телефона водителя: {item.driver_phone_number}</p>
                        <p>Номер фуры: {item.car_number}</p>
                        <Button style={{backgroundColor: 'green'}} type="primary" onClick={() => handleSendSMS(item.recipient_phone_number, item.id)}>
                            Отправить СМС
                        </Button>
                    </Card>
                ))}
            </div>
        );
    };
