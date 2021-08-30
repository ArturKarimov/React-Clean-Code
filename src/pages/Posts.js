import React, {useEffect, useRef, useState} from 'react'
import {usePosts} from "../hooks/usePosts"
import {useFetching} from "../hooks/useFetching"
import PostService from "../API/PostService"
import {getPageCount} from "../utils/pages"
import MyButton from "../components/UI/button/MyButton"
import MyModal from "../components/UI/mymodal/MyModal"
import PostForm from "../components/PostForm"
import PostFilter from "../components/PostFilter"
import Loader from "../components/UI/Loader/Loader"
import PostList from "../components/PostList"
import Pagination from "../components/UI/pagination/Pagination"
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


const Posts = () => {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className='App'>
            <MyButton style={{width: '100%', margin: '30px auto 0', border: '3px double teal', fontWeight: 'bold'}}
                      onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter} limit={limit} setLimit={setLimit}/>
            { postError && <h1>An error occurred: {postError}</h1> }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List of posts 1'}/>
            { isPostsLoading && <Loader /> }
            <div ref={lastElement}/>
            <Pagination changePage={changePage} page={page} totalPages={totalPages}/>
        </div>
    )
}

export default Posts