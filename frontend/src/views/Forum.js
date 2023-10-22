import React, { useEffect, useState } from 'react';
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import styles from "../styles/Forum.module.css";
import Banner from "../components/banner";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEdit } from '@fortawesome/free-solid-svg-icons';

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
            const postResponse = await fetch('http://localhost:7001/posts');
            const commentResponse = await fetch('http://localhost:7001/comments');

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
        fetchPosts();
        fetchTopics();
    }, []);

    // Function to sort posts by date
    const sortPosts = (order) => {
        const sortedPosts = [...posts];
        if (order === 'newest') {
            sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (order === 'oldest') {
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
                body: JSON.stringify(newPost),
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
                        <h2>Posts</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="Search posts"
                                value={searchQuery}
                                onChange={(e) => filterPostsBySearch(e.target.value)}
                            />
                        </div>
                        <div>
                            Sort by:
                            <button onClick={() => sortPosts('newest')}>Newest</button>
                            <button onClick={() => sortPosts('oldest')}>Oldest</button>
                        </div>

                        {posts.map((post) => (
                            <div key={post.id}>
                                <h2>Posts</h2>
                                <ul>
                                    <li>{post.title}</li>
                                    <li>{post.created_at}</li>
                                    <li>{post.author_name}</li>
                                    <li>{post.body}</li>
                                </ul>
                                <div>
                                    <h2>Comments</h2>
                                    {post.comments.map((comment) => (
                                        <div key={comment.id}>
                                                <ul>
                                                    <li>{comment.created_at}</li>
                                                    <li>{comment.author_name}</li>
                                                    <li>{comment.body}</li>
                                                </ul>
                                        </div>
                                    ))}

                                    {commentForms[post.id] ? (
                                    <div>
                                        <h2>Create a New Comment</h2>
                                        <form>
                                            <div>
                                                <label>Body:</label>
                                                <textarea
                                                    name="body"
                                                    value={newComment.body}
                                                    onChange={handleCommentChange}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => submitNewComment(post.id)}
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => toggleCommentForm(post.id)}
                                    >
                                        Add Comment
                                    </button>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PassageAuthGuard>
    );
}

export default Forum;
