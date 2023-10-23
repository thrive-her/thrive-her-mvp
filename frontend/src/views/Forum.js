import React, { useEffect, useState } from 'react';
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import styles from "../styles/Forum.module.css";
import Banner from "../components/banner";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Forum() {
    const { userInfo } = usePassageUserInfo();
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [commentForms, setCommentForms] = useState({});
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [isTopicsOpen, setIsTopicsOpen] = useState(false);
    const [isNewest, setIsNewest] = useState(true);
    const [newPost, setNewPost] = useState({
        topic_id: '',
        title: '',
        body: '',
        author_name: userInfo? `${userInfo.first_name} ${userInfo.last_name ? userInfo.last_name.charAt(0) : ''}`: '', // Use the logged-in user's name
    });

    const [newComment, setNewComment] = useState({
        post_id: '', // populated with post
        body: '',
        author_name: userInfo? `${userInfo.first_name} ${userInfo.last_name ? userInfo.last_name.charAt(0) : ''}`: '', // Use the logged-in user's name
    });

    function formatDate(date_string) {
        let date = new Date(date_string)
        return date.toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "long", day: "numeric"})
    }

    // Function to fetch data from the backend API
    const fetchData = async (endpoint, setState, errorText) => {
        try {
            const response = await fetch(`http://localhost:7001/${endpoint}`);
            if (response.ok) {
                const data = await response.json();
                setState(data[endpoint]);
            } else {
                console.error(`Failed to fetch ${endpoint}`);
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    const fetchPosts = async () => {
        try {
            const userID = userInfo?.id;
            const postResponse = await fetch(`http://localhost:7001/posts/${userID}`);
            const commentResponse = await fetch(`http://localhost:7001/comments/${userID}`);

            if (postResponse.ok && commentResponse.ok) {
                const postData = await postResponse.json();
                const commentData = await commentResponse.json();

                // Map comments to their respective posts
                const postsWithComments = postData.posts.map((post) => ({
                    ...post,
                    comments: commentData.comments.filter(comment => comment.post_id === post.id)
                }));

                setPosts(postsWithComments); // Update the posts with comments
                setOriginalPosts(postsWithComments); // Save the original posts
            } else {
                console.error('Failed to fetch posts or comments');
            }
        } catch (error) {
            console.error('Error fetching posts or comments:', error);
        }
    };

    const fetchTopics = () => {
        fetchData('topics', setTopics, 'topics');
    };

    // Fetch data when the component mounts
    useEffect(() => {
        if (userInfo?.id) {
            fetchPosts();
            fetchTopics();
        }
    }, [userInfo?.id]);

    // Function to sort posts by date
    const sortPosts = () => {
        setIsNewest(!isNewest);
        const sortedPosts = [...posts];
        if (isNewest) {
            sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
            sortedPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        setPosts(sortedPosts);
    };

    // Function to filter posts by topic
    const filterPostsByTopic = (topicId) => {
        setSelectedTopic(topicId);

        if (topicId) {
            // Filter the posts based on the selected topic
            const filteredPosts = originalPosts.filter((post) => post.topic_id === topicId);
            setPosts(filteredPosts);
        } else {
            // If no topic is selected, return to the original posts
            setPosts(originalPosts);
        }
    };

    // Function to filter posts by search query
    const filterPostsBySearch = (query) => {
        setSearchQuery(query);
        const lowerCaseQuery = query.toLowerCase();

        const filteredPosts = originalPosts.filter((post) => {
            // Check if the post's title or body contains the query
            const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
            const bodyMatch = post.body.toLowerCase().includes(lowerCaseQuery);

            // Check if any of the post's comments contain the query
            const commentsMatch = post.comments.some((comment) =>
                comment.body.toLowerCase().includes(lowerCaseQuery)
            );

            // Include the post in the result if either the title/body or comments match
            return titleMatch || bodyMatch || commentsMatch;
        });

        setPosts(filteredPosts);
    };


    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value,
        });
    };

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };

    // Function to handle comment form state
    const toggleCommentForm = (postId) => {
        setCommentForms((prevForms) => ({
            ...prevForms,
            [postId]: !prevForms[postId],
        }));
    };

    const handleTopicChange = (e) => {
        const selectedTopicId = parseInt(e.target.value); // Parse the selected value to an integer
        newPost.topic_id = selectedTopicId;
        setSelectedTopic(selectedTopicId);
    };

    // Function to toggle the visibility of the create post form
    const toggleCreatePostForm = () => {
        setShowCreatePostForm(!showCreatePostForm);
    };

    const submitNewPost = async () => {
        try {
            const response = await fetch('http://localhost:7001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newPost, userID: userInfo?.id }),
            });

            if (response.ok) {
                // Fetch posts again to update the list with the new post
                fetchPosts();
                // Clear the input fields
                setNewPost({
                    topic_id: '', // Set an initial topic ID if needed
                    title: '',
                    body: '',
                    author_name: userInfo?.email, // Use the logged-in user's email as the author
                });
            } else {
                console.error('Failed to create a new post');
            }
        } catch (error) {
            console.error('Error creating a new post:', error);
        }
    };

    const submitNewComment = async (postId) => {
        try {
            const postToComment = posts.find(post => post.id === postId);
            if (!postToComment) {
                console.error('Post not found for comment');
                return;
            }

            const response = await fetch('http://localhost:7001/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: postId,
                    body: newComment.body,
                    author_name: newComment.author_name,
                }),
            });

            if (response.ok) {
                // Fetch posts again to update the list with the new comment
                fetchPosts();
                // Clear the input fields
                setNewComment({
                    post_id: '', // Reset post_id
                    body: '',
                    author_name: userInfo?.email, // Use the logged-in user's email as the author
                });
                // Close the comment form
                toggleCommentForm(postId);
            } else {
                console.error('Failed to create a new comment');
            }
        } catch (error) {
            console.error('Error creating a new comment:', error);
        }
    };

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
            <Banner />
            <div className={styles.wrapper}>
                <div className={styles.leftCol}>
                    <ul className={styles.topicList}>
                        <li
                            key="all"
                            onClick={() => {
                                filterPostsByTopic(null);
                                setIsTopicsOpen(!isTopicsOpen);
                            }}
                            className={selectedTopic === null ? styles.selected : ''}
                        >
                           Topics{' '}
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={isTopicsOpen ? `${styles.toggleIcon} ${styles.open}` : styles.toggleIcon}
                            />
                        </li>
                        <ul className={`${styles.subTopics} ${isTopicsOpen ? styles.open : ''}`}>
                        {topics.map((topic) => (
                            <li
                            key={topic.id}
                            onClick={() => filterPostsByTopic(topic.id)}
                            className={selectedTopic === topic.id ? styles.selected : ''}
                            >
                            {topic.name}
                            </li>
                        ))}
                        </ul>
                    </ul>
                </div>
                <div className={styles.rightCol}>
                    <Button onClick={toggleCreatePostForm} text={<><FontAwesomeIcon icon={faEdit} />   New forum post</>} />

                    {showCreatePostForm && (
                        <div className={styles.postForm}>
                            <form className={styles.postForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="topic">Topic:</label>
                                    <select
                                    id="topic"
                                    onChange={handleTopicChange}
                                    value={selectedTopic || ''}
                                    >
                                    <option value="">Select a topic</option>
                                    {topics.map((topic) => (
                                        <option key={topic.id} value={topic.id}>
                                        {topic.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newPost.title}
                                    onChange={handlePostChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="body">Body:</label>
                                    <textarea
                                    id="body"
                                    name="body"
                                    value={newPost.body}
                                    onChange={handlePostChange}
                                    />

                                </div>
                                <div style={{ width: 230 }}>
                                    <Button onClick={submitNewPost} text="Submit" />
                                </div>
                            </form>
                        </div>
                    )}

                    <div>
                        <div className={styles.search}>
                            <input
                                type="text"
                                placeholder="Search forum"
                                value={searchQuery}
                                onChange={(e) => filterPostsBySearch(e.target.value)}
                            />
                        </div>
                        <div>
                            Sort by:
                            <div style={{display:'inline', marginLeft: 10, cursor: 'pointer'}} onClick={() => sortPosts()}>Newest</div>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                style={{marginLeft:10}}
                                className={isNewest ? `${styles.toggleIcon} ${styles.open}` : styles.toggleIcon}
                            />
                        </div>
                    </div>

                        {posts.map((post) => (
                            <div key={post.id} className={styles.postContainer}>
                                <div className={styles.authorName}>{post.author_name} * {formatDate(post.created_at)}</div>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                                {commentForms[post.id] ? (
                                    <div style={{ marginTop: 10 }} className={styles.postForm}>
                                        <div style={{width:230, marginTop: 20, marginBottom: 20}}><Button onClick={() => toggleCommentForm(post.id)} text='Add comment'/></div>
                                        <form className={styles.postForm}>
                                            <div className={styles.formGroup}>
                                                <textarea
                                                    name="body"
                                                    value={newComment.body}
                                                    onChange={handleCommentChange}
                                                />
                                            </div>
                                            <div style={{width:230}}><Button onClick={() => submitNewComment(post.id)} text='Submit'/></div>
                                        </form>
                                    </div>
                                ) : (
                                    <div style={{width:230, marginTop: 20, marginBottom: 20}}>
                                        <Button onClick={() => toggleCommentForm(post.id)} text='Add comment' />
                                    </div>
                                )}
                                <div>
                                    <h3>Comments</h3>
                                    {post.comments.map((comment) => (
                                        <div key={comment.id} style={{marginLeft:20}}>
                                            <div className={styles.authorName}>{comment.author_name} * {formatDate(comment.created_at)}</div>
                                            <p style={{fontSize:24}}>{comment.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </PassageAuthGuard>
    );
}

export default Forum;
