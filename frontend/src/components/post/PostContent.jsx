import React from "react";

function PostContent({post}) {
    return (
        <div className="w-full h-full border border-gray-700 rounded-xl flex justify-center place-items-center">
            <img
                src={post.content}
                alt=""
                loading="lazy"
                className="w-full h-full object-contain"
            />
        </div>
    );
}

export default PostContent;
