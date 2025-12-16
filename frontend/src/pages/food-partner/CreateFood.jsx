import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ videoFile, setVideoFile ] = useState(null);
    const [ videoURL, setVideoURL ] = useState('');
    const [ fileError, setFileError ] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [ videoFile ]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[ 0 ];
        if (!file) { setVideoFile(null); setFileError(''); return; }
        if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[ 0 ];
        if (!file) { return; }
        if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append("video", videoFile);

        const response = await axios.post("http://localhost:3000/api/food", formData, {
            withCredentials: true,
        })

        console.log(response.data);
        navigate("/"); // Redirect to home or another page after successful creation
        // Optionally reset
        // setName(''); setDescription(''); setVideoFile(null);
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [ name, videoFile ]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Food</h1>
                    <p className="text-gray-600">Upload a short video, give it a name, and add a description.</p>
                </header>

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="foodVideo" className="block text-sm font-medium text-gray-700">Food Video</label>
                        <input
                            id="foodVideo"
                            ref={fileInputRef}
                            className="hidden"
                            type="file"
                            accept="video/*"
                            onChange={onFileChange}
                        />

                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 hover:bg-red-50/50 transition-colors"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <svg className="w-10 h-10 text-gray-400" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" fill="currentColor" />
                                </svg>
                                <div className="text-gray-700">
                                    <strong>Tap to upload</strong> or drag and drop
                                </div>
                                <div className="text-sm text-gray-500">MP4, WebM, MOV • Up to ~100MB</div>
                            </div>
                        </div>

                        {fileError && <p className="text-red-600 text-sm mt-1" role="alert">{fileError}</p>}

                        {videoFile && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg" aria-live="polite">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-600" aria-hidden>
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                                </svg>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{videoFile.name}</div>
                                    <div className="text-sm text-gray-500">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium" onClick={openFileDialog}>Change</button>
                                    <button type="button" className="text-sm text-red-600 hover:text-red-700 font-medium" onClick={() => { setVideoFile(null); setFileError(''); }}>Remove</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="rounded-lg overflow-hidden bg-black">
                            <video className="w-full max-h-96 object-contain" src={videoURL} controls playsInline preload="metadata" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="foodName"
                            type="text"
                            placeholder="e.g., Spicy Paneer Wrap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="foodDesc" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="foodDesc"
                            rows={4}
                            placeholder="Write a short description: ingredients, taste, spice level, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors" type="submit" disabled={isDisabled}>
                            Save Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;