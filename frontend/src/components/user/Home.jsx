import React from 'react'
import Sidebar from './Sidebar'
import UserProfile from './UserProfile'

const Home = () => {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
                <UserProfile />
            </div>
        </div>
    )
}

export default Home