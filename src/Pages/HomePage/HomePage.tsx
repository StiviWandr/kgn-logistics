import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const navigate = useNavigate()
    return (
        <>
            <Flex style={{ minHeight: '100%', minWidth: '100%' }} align="center" justify="center">
                <Flex gap={200} vertical style={{width: '100%'}}>
                    <Button style={{height: 200, fontSize: 50}} size="large" block onClick={()=>navigate('/shipment')}>Погрузка</Button>
                    <Button style={{height: 200, fontSize: 50}} size="large" block onClick={()=>navigate('/unloading')}>Выгрузка</Button>
                </Flex>
            </Flex>
        </>
    )
}
