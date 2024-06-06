import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', images: ['', '', ''] });

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleImageChange = (e, index) => {
        const { value } = e.target;
        setNewPost((prevPost) => {
            const updatedImages = [...prevPost.images];
            updatedImages[index] = value;
            return { ...prevPost, images: updatedImages };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setNewPost({ title: '', content: '', images: ['', '', ''] });
    };

    const handleDelete = (index) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="main-container">
            <h1 className="title1">  Soyun's Blog </h1>

            <form onSubmit={handleSubmit} className="post-form">
                <h2>New Post</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea name="content" value={newPost.content} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Image 1 :</label>
                    <input type="text" value={newPost.images[0]} onChange={(e) => handleImageChange(e, 0)} />
                </div>
                <div className="form-group">
                    <label>Image 2 :</label>
                    <input type="text" value={newPost.images[1]} onChange={(e) => handleImageChange(e, 1)} />
                </div>
                <div className="form-group">
                    <label>Image 3 :</label>
                    <input type="text" value={newPost.images[2]} onChange={(e) => handleImageChange(e, 2)} />
                </div>
                <button type="submit" className="submit-button">
                    Add Post
                </button>
            </form>

            <div className="posts-container">
                {posts.map((post, index) => (
                    <div key={index} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="images">
                            {post.images.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={image}
                                    alt={`post-${index}-img-${imgIndex}`}
                                    className="post-image"
                                />
                            ))}
                        </div>
                        <div className="button-container">
                            <button onClick={() => handleDelete(index)} className="delete-button">
                                Delete
                            </button>
                            <Link to={`/post/${index}`} className="read-more">
                                Read more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
