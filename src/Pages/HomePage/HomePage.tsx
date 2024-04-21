import { Button, Flex } from 'antd'

export function HomePage() {
    return (
        <>
            <Flex style={{ minHeight: '100%', minWidth: '100%' }} align="center" justify="center">
                <Flex gap={30}>
                    <Button size="large">Погрузка</Button>
                    <Button size="large">Выгрузка</Button>
                </Flex>
            </Flex>
        </>
    )
}
