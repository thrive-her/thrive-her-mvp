import React, { useEffect, useState } from 'react';
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import LogoutButton from "../components/LogoutButton";
import styles from "../styles/Forum.module.css";

function Events() {
    const { userInfo } = usePassageUserInfo();
    const [posts, setPosts] = useState([]); // State to store the fetched posts

    // Function to fetch posts from the backend API
    const fetchPosts = async () => {
        try {
        const response = await fetch('http://localhost:7001/posts'); // Make a GET request to your backend API endpoint
        if (response.ok) {
            const data = await response.json();
            setPosts(data.events); // Update the state with the fetched data
        } else {
            console.error('Failed to fetch posts');
        }
        } catch (error) {
        console.error('Error fetching posts:', error);
        }
    };

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PassageAuthGuard
            unAuthComp={
                <div className={styles.loginDashboard}>
                    <div className={styles.title}>You must be logged in</div>
                    <div className={styles.message}>
                        <a className={styles.login} href="/">Login</a>
                    </div>
                </div>
            }
        >
            <div>This is Forum Page</div>
            <p>Welcome, {userInfo?.email} </p>
            <LogoutButton />

            <div>
                <h2>Posts</h2>
                <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li> // Render your post data here
                ))}
                </ul>
            </div>

        </PassageAuthGuard>
    );
}

export default Events;
