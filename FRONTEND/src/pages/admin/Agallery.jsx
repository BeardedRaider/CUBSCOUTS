import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInformation from "../../UserInfo";
import {toast} from "react-hot-toast";

const Agallery = () => {
    const user = UserInformation();
    const [gallery, setGallery] = useState([]);
    const [userNames, setUserNames] = useState({});



    const fetchUserNames = async (galleryData) => {
        const userIds = galleryData.map((image) => image.user_id).filter(Boolean); // Filter out undefined user_ids
        const userNamesData = {};
        for (const userId of userIds) {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);                userNamesData[userId] = response.data.name;
            } catch (error) {
                console.error(`Failed to fetch user with ID ${userId}`, error);
                userNamesData[userId] = 'Unknown User';
            }
        }
        console.log('User names:', userNamesData); // Log user names
        setUserNames(userNamesData);
    };
    


    // Add this logging statement after setting the userNames state
    console.log('User names after setting state:', userNames);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/gallery');
                const galleryData = response.data;
                console.log('Gallery data:', galleryData); // Log gallery data
                setGallery(galleryData);
                await fetchUserNames(galleryData);
            } catch (error) {
                console.error('Failed to fetch gallery', error);
            }
        };
        
        fetchGallery();
    }, []);


    

    const handleDelete = async (imageId) => {
        try {
        await axios.delete(`http://localhost:5000/api/gallery/${imageId}`);
        // After deleting, fetch gallery again to update the UI
        const response = await axios.get('http://localhost:5000/api/gallery');
        setGallery(response.data);
        await fetchUserNames(response.data);
        } catch (error) {
        console.error('Failed to delete image', error);
        }
    };

return (
    <>
        <div className="text-gray-900 bg-gray-200">
        <section className=" heroAdd overlayAdd py-24 px-4 lg:px-16">
            <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]">
                <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">
                {" "}
                Welcome
                </h1>
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
                                    {userNames[image.user_id] || "Unknown User"}
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
    </>
);};

export default Agallery;
