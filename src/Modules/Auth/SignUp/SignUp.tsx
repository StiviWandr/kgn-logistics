import { Flex } from 'antd'
import { SignUpForm } from '../Components/SignUpForm/SignUpForm'

export function SignUp() {
    return (
        <Flex vertical justify="center" align="center" style={{ width: '100vw', minHeight: '100vh' }}>
            <SignUpForm />
        </Flex>
    )
}
