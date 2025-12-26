import React, { useState, useEffect, use } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([ ])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [ id ])


    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-6 mb-6 bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
                    <img 
                        className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-orange-300" 
                        src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" 
                        alt="" 
                    />

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2" title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="text-gray-700 flex items-center gap-2" title="Address">
                            <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 mb-6" role="list" aria-label="Stats">
                    <div className="flex-1 text-center bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4 shadow-md border border-orange-200" role="listitem">
                        <div className="text-3xl font-bold text-orange-600">{profile?.totalMeals}</div>
                        <div className="text-sm font-medium text-gray-700">Total Meals</div>
                    </div>
                    <div className="flex-1 text-center bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-4 shadow-md border border-red-200" role="listitem">
                        <div className="text-3xl font-bold text-red-600">{profile?.customersServed}</div>
                        <div className="text-sm font-medium text-gray-700">Customers Served</div>
                    </div>
                </div>
            </section>

            <hr className="border-gray-300" />

            <section className="max-w-4xl mx-auto px-4 py-8" aria-label="Videos">
                <div className="grid grid-cols-3 gap-2">
                    {videos.map((v) => (
                        <div key={v.id} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200">
                            <video
                                className="w-full h-full object-cover"
                                src={v.video} 
                                muted
                            />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Profile