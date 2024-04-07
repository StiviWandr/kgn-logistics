
import UsersModule from '../../Modules/Users/UsersModule'
import PageHead from '../../Routes/PageHead'

export function UsersPage() {
    return (
        <>
            <PageHead title="Список пользователей" />
            <UsersModule />
        </>
    )
}
