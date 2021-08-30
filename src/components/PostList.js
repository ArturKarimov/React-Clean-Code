import React from 'react'
import PostItem from "./PostItem"
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h2 style={{textAlign: 'center', marginTop: '15px'}}>Posts not found</h2>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames='post'
                    >
                        <PostItem post={post} number={index + 1} remove={remove}/>
                    </CSSTransition>
                    )}
            </TransitionGroup>
        </div>
    )
}

export default PostList