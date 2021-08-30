import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getPostById(id)
        setPost(response.data)
    })
    const [fetchCommentsByPostId, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsByPostId(params.id)
    }, [])

    const params = useParams()

    return (
        <div>
            <h1>This post with ID: {params.id}</h1>
            { error && <h1>An error occurred: {error}</h1> }
            { isLoading
            ? <Loader />
            : <div>{post.id}: {post.title}</div>
            }
            <h1>
                Comments
            </h1>
            { commentsError && <h1>An error occurred: {commentsError}</h1> }
            { isCommentsLoading
                ? <Loader />
                : <div style={{margin: '15px'}}>
                    { comments.map(comment =>
                        <div key={comment.id}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    ) }
                </div>
            }
        </div>
    );
};

export default PostIdPage;