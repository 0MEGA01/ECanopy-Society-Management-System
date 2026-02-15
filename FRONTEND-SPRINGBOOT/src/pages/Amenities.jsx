import { useState, useEffect } from 'react';
import { amenityService } from '../services/amenityService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Check, X } from 'lucide-react';
import AmenityCard from '../components/amenities/AmenityCard';
import BookingModal from '../components/amenities/BookingModal';
import { confirmAction, notify } from '../utils/alerts';

export default function Amenities() {
    const { user } = useAuth();
    const isManager = user?.roles?.includes('ROLE_ADMIN') || user?.roles?.includes('ROLE_RWA_SECRETARY') || user?.roles?.includes('ROLE_RWA_PRESIDENT');

    const [activeTab, setActiveTab] = useState(isManager ? 'requests' : 'browse');

    // Data States
    const [amenities, setAmenities] = useState([]);
    const [bookings, setBookings] = useState([]); // All bookings (admin) OR My bookings (resident)
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedAmenity, setSelectedAmenity] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    // New Amenity Form State
    const [newAmenity, setNewAmenity] = useState({
        amenityName: '',
        description: '',
        capacity: '',
        rules: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'browse') {
                const data = await amenityService.getAllAmenities();
                setAmenities(Array.isArray(data) ? data : []);
            } else if (activeTab === 'my_bookings') {
                const data = await amenityService.getMyBookings();
                setBookings(Array.isArray(data) ? data : []);
            } else if (activeTab === 'requests') {
                const data = await amenityService.getAllBookings();
                setBookings(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const handleCreateAmenity = async (e) => {
        e.preventDefault();
        try {
            if (selectedAmenity) {
                await amenityService.updateAmenity(selectedAmenity.amenityId, newAmenity);
                notify.success("Amenity updated successfully");
            } else {
                await amenityService.addAmenity(newAmenity);
                notify.success("Amenity added successfully");
            }
            setShowAddForm(false);
            setSelectedAmenity(null);
            setNewAmenity({ amenityName: '', description: '', capacity: '', rules: '', imageUrl: '' });
            fetchData();
        } catch {
            notify.error(selectedAmenity ? "Failed to update amenity" : "Failed to add amenity");
        }
    };

    const handleDeleteAmenity = async (id) => {
        const result = await confirmAction({
            title: 'Remove Amenity?',
            text: 'Are you sure you want to delete this facility?',
            confirmText: 'Yes, Delete',
            color: '#ef4444'
        });

        if (result.isConfirmed) {
            try {
                await amenityService.deleteAmenity(id);
                notify.success('Amenity removed');
                fetchData();
            } catch {
                notify.error("Failed to delete amenity");
            }
        }
    };

    const handleBookSubmit = async (amenityId, { startTime, endTime }) => {
        setBookingLoading(true);
        try {
            await amenityService.bookAmenity(amenityId, user.id, { startTime, endTime });
            setIsBookingModalOpen(false);
            notify.success("Booking request submitted!");
            setActiveTab('my_bookings'); // Switch to bookings tab
        } catch (error) {
            notify.error("Failed to book: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setBookingLoading(false);
        }
    };

    const handleBookingStatus = async (bookingId, status) => {
        try {
            await amenityService.updateBookingStatus(bookingId, status);
            notify.success(`Booking ${status.toLowerCase()}ed`);
            fetchData(); // Refresh list
        } catch {
            notify.error(`Failed to ${status} booking`);
        }
    };

    // --- Render Helpers ---

    const renderBookingsList = () => {
        if (bookings.length === 0) {
            return <div className="p-8 text-center text-gray-500">No bookings found.</div>;
        }
        return (
            <div className="bg-white shadow rounded-lg">
                {bookings.map((booking) => (
                    <div key={booking.bookingId} className="p-6 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-bold">{booking.amenityName}</h4>
                                <span className={`px-2 py-1 text-xs rounded ${
                                    booking.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {booking.status}
                                </span>
                                <p className="text-sm text-gray-600 mt-1">
                                    {new Date(booking.startTime).toLocaleDateString()} • {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                {isManager && (
                                    <p className="text-sm text-gray-500">
                                        By: {booking.residentName} ({booking.flatNumber})
                                    </p>
                                )}
                            </div>

                            {isManager && booking.status === 'PENDING' && (
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-green-600 text-white"
                                        onClick={() => handleBookingStatus(booking.bookingId, 'APPROVED')}
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="text-red-600 border-red-200"
                                        onClick={() => handleBookingStatus(booking.bookingId, 'REJECTED')}
                                    >
                                        <X className="w-4 h-4" /> Deny
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Amenities</h1>
                    <p className="text-gray-500 mt-1">Book and manage society facilities</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {!isManager && (
                        <>
                            <button
                                onClick={() => setActiveTab('browse')}
                                className={`px-4 py-2 rounded text-sm ${activeTab === 'browse' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
                            >
                                Browse
                            </button>
                            <button
                                onClick={() => setActiveTab('my_bookings')}
                                className={`px-4 py-2 rounded text-sm ${activeTab === 'my_bookings' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
                            >
                                My Bookings
                            </button>
                        </>
                    )}
                    {isManager && (
                        <>
                            <button
                                onClick={() => setActiveTab('requests')}
                                className={`px-4 py-2 rounded text-sm ${activeTab === 'requests' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
                            >
                                Requests
                            </button>
                            <button
                                onClick={() => setActiveTab('browse')}
                                className={`px-4 py-2 rounded text-sm ${activeTab === 'browse' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
                            >
                                Manage Assets
                            </button>
                        </>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <>
                    {/* Browse / Manage View */}
                    {activeTab === 'browse' && (
                        <div className="space-y-6">
                            {isManager && (
                                <div className="flex justify-end">
                                    <Button onClick={() => {
                                        if (showAddForm) {
                                            setShowAddForm(false);
                                            setSelectedAmenity(null);
                                            setNewAmenity({ amenityName: '', description: '', capacity: '', rules: '', imageUrl: '' });
                                        } else {
                                            setShowAddForm(true);
                                        }
                                    }}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        {showAddForm ? 'Cancel' : 'New Amenity'}
                                    </Button>
                                </div>
                            )}

                            {showAddForm && (
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                        {selectedAmenity ? 'Edit Amenity' : 'Add New Amenity'}
                                    </h3>
                                    <form onSubmit={handleCreateAmenity} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input
                                                label="Name"
                                                placeholder="e.g. Swimming Pool"
                                                value={newAmenity.amenityName}
                                                onChange={e => setNewAmenity({ ...newAmenity, amenityName: e.target.value })}
                                                required
                                            />
                                            <Input
                                                label="Capacity"
                                                type="number"
                                                placeholder="Max people"
                                                value={newAmenity.capacity}
                                                onChange={e => setNewAmenity({ ...newAmenity, capacity: e.target.value })}
                                                required
                                            />
                                            <div className="col-span-2">
                                                <Input
                                                    label="Image URL"
                                                    type="url"
                                                    placeholder="https://example.com/image.jpg"
                                                    value={newAmenity.imageUrl}
                                                    onChange={e => setNewAmenity({ ...newAmenity, imageUrl: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                <textarea
                                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                                                    rows="2"
                                                    value={newAmenity.description}
                                                    onChange={e => setNewAmenity({ ...newAmenity, description: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rules</label>
                                                <textarea
                                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                                                    rows="2"
                                                    value={newAmenity.rules}
                                                    onChange={e => setNewAmenity({ ...newAmenity, rules: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-2 gap-3">
                                            {selectedAmenity && (
                                                <Button type="button" variant="outline" onClick={() => {
                                                    setShowAddForm(false);
                                                    setSelectedAmenity(null);
                                                    setNewAmenity({ amenityName: '', description: '', capacity: '', rules: '', imageUrl: '' });
                                                }}>
                                                    Cancel
                                                </Button>
                                            )}
                                            <Button type="submit">
                                                {selectedAmenity ? 'Update Amenity' : 'Add Amenity'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {amenities.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed text-gray-500">
                                    No amenities available.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {amenities.map(amenity => (
                                        <AmenityCard
                                            key={amenity.amenityId}
                                            amenity={amenity}
                                            userRole={user?.roles?.length > 0 ? user.roles[0] : 'ROLE_RESIDENT'}
                                            onBook={(a) => {
                                                setSelectedAmenity(a);
                                                setIsBookingModalOpen(true);
                                            }}
                                            onEdit={(a) => {
                                                setSelectedAmenity(a);
                                                setNewAmenity({
                                                    amenityName: a.amenityName,
                                                    description: a.description,
                                                    capacity: a.capacity,
                                                    rules: a.rules,
                                                    imageUrl: a.imageUrl
                                                });
                                                setShowAddForm(true);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            onDelete={handleDeleteAmenity}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bookings Lists */}
                    {(activeTab === 'requests' || activeTab === 'my_bookings') && renderBookingsList()}
                </>
            )}

            {/* Modals */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                amenity={selectedAmenity}
                onSubmit={handleBookSubmit}
                loading={bookingLoading}
            />
        </div>
    );
}
