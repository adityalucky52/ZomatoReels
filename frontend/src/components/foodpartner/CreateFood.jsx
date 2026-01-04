import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ videoFile, setVideoFile ] = useState(null);
    const [ videoURL, setVideoURL ] = useState('');
    const [ fileError, setFileError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
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
        setIsLoading(true);

        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append("video", videoFile);

            const response = await axios.post("http://localhost:3000/api/food", formData, {
                withCredentials: true,
            })

            console.log(response.data);
            navigate("/food-partner/dashboard");
        } catch (error) {
            console.error('Error uploading food:', error);
            setFileError(error.response?.data?.message || 'Failed to upload food');
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile || isLoading, [ name, videoFile, isLoading ]);

    return (
        <div className="min-h-screen flex items-start justify-center p-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 border border-orange-100">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-1">Create Food</h1>
                    <p className="text-sm text-gray-700">Upload a short video, give it a name, and add a description.</p>
                </header>

                <form className="space-y-4" onSubmit={onSubmit}>
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
                            className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 transition-all"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-8 h-8 text-orange-500" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" fill="currentColor" />
                                </svg>
                                <div className="text-sm text-gray-700">
                                    <strong>Tap to upload</strong> or drag and drop
                                </div>
                                <div className="text-xs text-gray-500">MP4, WebM, MOV • Up to ~100MB</div>
                            </div>
                        </div>

                        {fileError && <p className="text-red-600 text-sm mt-1" role="alert">{fileError}</p>}

                        {videoFile && (
                            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg" aria-live="polite">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-orange-600" aria-hidden>
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                                </svg>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{videoFile.name}</div>
                                    <div className="text-sm text-gray-500">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-semibold" onClick={openFileDialog}>Change</button>
                                    <button type="button" className="text-sm text-red-600 hover:text-red-700 font-semibold" onClick={() => { setVideoFile(null); setFileError(''); }}>Remove</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="rounded-lg overflow-hidden bg-black">
                            <video className="w-full max-h-48 object-contain" src={videoURL} controls playsInline preload="metadata" />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="foodName"
                            type="text"
                            placeholder="e.g., Spicy Paneer Wrap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="foodDesc" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="foodDesc"
                            rows={3}
                            placeholder="Write a short description: ingredients, taste, spice level, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button 
                            className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none text-sm flex items-center gap-2" 
                            type="submit" 
                            disabled={isDisabled}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    🍽️ Save Food
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;