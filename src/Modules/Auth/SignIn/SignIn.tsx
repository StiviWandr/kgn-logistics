import { Flex } from 'antd'
import { LoginForm } from '../Components/LoginForm/LoginForm'

export function SignIn() {
    return (
        <Flex vertical justify="center" align="center" style={{ width: '100vw', minHeight: '100vh' }}>
            <LoginForm />
        </Flex>
    )
}
