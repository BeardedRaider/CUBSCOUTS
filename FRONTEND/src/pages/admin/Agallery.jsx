import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInformation from "../../UserInfo";
import { toast } from "react-hot-toast";

const Agallery = () => {
    const user = UserInformation();// Fetch user information from local storage
    const [gallery, setGallery] = useState([]);// State for fetching and managing existing gallery data
    const [isSubmitting, setIsSubmitting] = useState(false);// State for handling form submission


    // Fetch gallery data from the server and display it's WORKING
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/gallery');
                const galleryData = response.data;
                setGallery(galleryData);
            } catch (error) {
                console.error('Failed to fetch gallery', error);
            }
        };

        fetchGallery();
    }, []);

    // handle input changes for existing gallery data
    const handleInputChange = (e, imageId) => {
        const { name, value } = e.target;
        setGallery(gallery.map((image) => (image._id === imageId ? { ...image, [name]: value } : image)));
    };

    const handleUpdate = async (imageId) => {
        const galleryToUpdate = gallery.find(image => image._id === imageId);
        
        setIsSubmitting(true);
        try {
            const updateResponse = await axios.put(`http://localhost:5000/api/gallery/${imageId}`, { title: galleryToUpdate.title });
            toast.success('Gallery updated successfully');
    
            const updatedGallery = gallery.map(image => 
                image._id === imageId ? updateResponse.data : image
            );
            setGallery(updatedGallery);
        } catch (error) {
            console.error('Failed to update gallery', error);
            toast.error('Failed to update the gallery');
        } finally {
            setIsSubmitting(false);
        }
    };




    const handleDelete = async (imageId) => {
        try {
            await axios.delete(`http://localhost:5000/api/gallery/${imageId}`);
            toast.success('Image deleted successfully');
            setGallery(gallery.filter(image => image._id !== imageId));
        } catch (error) {
            console.error('Failed to delete image', error);
            toast.error('Failed to delete image');
        }
    };

return (
<div className="text-gray-900 bg-gray-200">
    <section className="heroAdd overlayAdd py-24 px-4 lg:px-16">
        <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]">
            <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome</h1>
            <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
                {user ? user.name : "Loading..."}
            </h2>
        </div>
    </section>

    {/*----------Gallery Review----------*/}
    <section className="bg-gray-300 px-4 lg:px-16">
                <div className="container mx-auto mb-20">
                    <h2 className="text-3xl flex items-center justify-center px-3 mb-4">Admin Gallery Uploads</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gallery.map((image) => (
                            <div key={image._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={image.title}
                                        onChange={(e) => handleInputChange(e, image._id)}
                                        className='w-full border rounded px-3 py-2'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Uploaded By User</label>
                                    <p className="border rounded px-3 py-2">
                                        {image.userUploaded || "Unknown User"}
                                    </p>
                                </div>
                                {image.image && (
                                    <img
                                        src={`http://localhost:5000/${image.image.replace('\\', '/')}`}
                                        alt={image.title}
                                        className='w-full h-48 object-cover mb-2 rounded'
                                    />
                                )}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleUpdate(image._id)}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    </div>
);  
};

export default Agallery;

