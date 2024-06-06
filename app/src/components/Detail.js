import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentPost = savedPosts[id];
        setPost(currentPost);
    }, [id]);

    const handleImageClick = (index) => {
        const newHref = prompt('Enter new href for the image:', post.images[index]);
        if (newHref) {
            const updatedImages = [...post.images];
            updatedImages[index] = newHref;
            const updatedPost = { ...post, images: updatedImages };
            setPost(updatedPost);

            const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            savedPosts[id] = updatedPost;
            localStorage.setItem('posts', JSON.stringify(savedPosts));
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="detail-container">
            <h1 className="title">{post.title}</h1>
            <p className="post-content">{post.content}</p>
            <div className="images">
                {post.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`post-img-${index}`}
                        className="post-image"
                        onClick={() => handleImageClick(index)}
                        ref={(el) => (imageRefs.current[index] = el)}
                    />
                ))}
            </div>
            <Link to="/" className="back-button">
                Back to Main
            </Link>
        </div>
    );
};

export default Detail;
