import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInformation from "../../UserInfo";
import { toast } from "react-hot-toast";

const Agallery = () => {
    // Fetch user information from local storage
    const user = UserInformation();
    // Create state variables for gallery data
    const [gallery, setGallery] = useState([]);


    // Fetch gallery data from the server and display it WORKING
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

    const handleDelete = async (imageId) => {
        try {
            console.log(`Attempting to delete image with ID: ${imageId}`); // Add this line for debugging
            await axios.delete(`http://localhost:5000/api/gallery/${imageId}`);
            setGallery((prevGallery) => prevGallery.filter((image) => image._id !== imageId));
            toast.success('Image deleted successfully');
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
                <div className="container mx-auto">
                    <h2 className="text-3xl flex items-center justify-center px-3 mb-4">Admin Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gallery.map((image) => (
                            <div key={image._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <p className="border rounded px-3 py-2">{image.title}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Image</label>
                                    <img
                                        src={`http://localhost:5000/${image.image.replace("\\", "/")}`}
                                        alt={image.title}
                                        className="w-full h-48 object-cover mb-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">User Uploaded</label>
                                    <p className="border rounded px-3 py-2">
                                        {[image.userUploaded] || "Unknown User"}
                                    </p>
                                </div>
                                <div className="flex justify-between mt-4">
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

