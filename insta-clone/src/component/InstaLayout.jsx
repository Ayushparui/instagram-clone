import { Outlet } from 'react-router-dom'


function InstaLayout() {
    return (
        <main className='App'>
            <Outlet />
        </main>
    )
}

export default InstaLayout;