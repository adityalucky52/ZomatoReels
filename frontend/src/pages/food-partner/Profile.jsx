import React, { useState, useEffect, use } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [ id ])


    return (
        <main className="min-h-screen bg-white">
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-6 mb-6">
                    <img 
                        className="w-24 h-24 rounded-full object-cover shadow-lg" 
                        src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" 
                        alt="" 
                    />

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2" title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="text-gray-600 flex items-center gap-2" title="Address">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="flex gap-8 mb-6" role="list" aria-label="Stats">
                    <div className="text-center" role="listitem">
                        <div className="text-2xl font-bold text-gray-900">{profile?.totalMeals}</div>
                        <div className="text-sm text-gray-600">total meals</div>
                    </div>
                    <div className="text-center" role="listitem">
                        <div className="text-2xl font-bold text-gray-900">{profile?.customersServed}</div>
                        <div className="text-sm text-gray-600">customers served</div>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" />

            <section className="max-w-4xl mx-auto px-4 py-8" aria-label="Videos">
                <div className="grid grid-cols-3 gap-1">
                    {videos.map((v) => (
                        <div key={v.id} className="aspect-square bg-gray-100 relative overflow-hidden">
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