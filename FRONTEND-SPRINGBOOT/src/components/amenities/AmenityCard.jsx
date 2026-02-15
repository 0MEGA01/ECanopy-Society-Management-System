import React from 'react';
import { Clock, Users, Trash2, ArrowRight, ShieldCheck, Info, Edit3 } from 'lucide-react';

const AmenityCard = ({ amenity, userRole, onBook, onEdit, onDelete }) => {
    // Helper to transform Unsplash page links to direct image links
    const fixImageUrl = (url) => {
        if (!url) return null;
        // Handle Unsplash page links: https://unsplash.com/photos/ID
        const unsplashMatch = url.match(/unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/);
        if (unsplashMatch && unsplashMatch[1]) {
            const parts = unsplashMatch[1].split('-');
            const id = parts[parts.length - 1]; // Get the ID part
            return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1080`;
        }
        return url;
    };

    // Dynamic Unsplash images based on common keywords
    const getUnsplashUrl = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('gym') || lowerName.includes('fitness')) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800';
        if (lowerName.includes('pool') || lowerName.includes('swim')) return 'https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        if (lowerName.includes('club') || lowerName.includes('hall')) return 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800';
        if (lowerName.includes('garden') || lowerName.includes('park')) return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800';
        if (lowerName.includes('tennis') || lowerName.includes('court')) return 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800';
        return `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800`; // Default Architecture
    };

    const imageUrl = fixImageUrl(amenity.imageUrl) || getUnsplashUrl(amenity.amenityName);
    const isManager = ['ROLE_ADMIN', 'ROLE_RWA_SECRETARY', 'ROLE_RWA_PRESIDENT'].includes(userRole);

    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm flex flex-col h-full">

            {/* Image/Header Section */}
            <div className="h-48 relative overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={amenity.amenityName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = getUnsplashUrl(amenity.amenityName);
                    }}
                />

                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full
                            ${amenity.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {amenity.isActive ? 'Available' : 'Closed'}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-white text-xl font-bold">
                            {amenity.amenityName}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Body Section */}
            <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-4">
                    {amenity.description || "Society facility for residents."}
                </p>

                <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4">
                    <div className="flex flex-col items-center flex-1">
                        <Users className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-xs text-gray-500">Capacity</span>
                        <span className="text-sm font-medium text-gray-900">{amenity.capacity || 'Flexible'}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200"></div>
                    <div className="flex flex-col items-center flex-1">
                        <Clock className="w-4 h-4 text-purple-500 mb-1" />
                        <span className="text-xs text-gray-500">Timings</span>
                        <span className="text-sm font-medium text-gray-900">6 AM - 10 PM</span>
                    </div>
                </div>

                <div className="flex items-center text-xs text-blue-600 mb-4 bg-blue-50 p-2 rounded-lg">
                    <Info className="w-3 h-3 mr-2" />
                    Residents Only
                </div>

                {/* Actions */}
                <div className="mt-auto">
                    {isManager ? (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onEdit(amenity)}
                                className="flex items-center justify-center p-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
                            >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(amenity.amenityId)}
                                className="flex items-center justify-center p-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onBook(amenity)}
                            disabled={!amenity.isActive}
                            className={`w-full flex items-center justify-center p-3 text-sm font-medium rounded-lg
                                ${amenity.isActive
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            {amenity.isActive ? (
                                <>
                                    Book Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            ) : 'Under Maintenance'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AmenityCard;
