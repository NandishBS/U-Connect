import React, { useState } from "react";
import PostTopCard from "./PostTopCard.jsx";
import PostContent from "./PostContent.jsx";
import PostDownBar from "./PostDownBar.jsx";
import PostDescription from "./PostDescription.jsx";
import ProjectCard from "./ProjectCard.jsx";

function Post({post}) {
    return (
        <div className={`max-w-md w-full mx-auto mb-7 ${post.type === 'post' ? 'aspect-[10/16]' : ""} p-1 border border-transparent border-b-gray-700`}>
            <PostTopCard post={post} />
            {post.type === "post" && <PostContent post={post}/>}
            {post.type === "project" && <ProjectCard post={post}/>}
            <PostDownBar post={post}/>
            <PostDescription post={post}/>
        </div>
    );
}

export default Post;
