import React, { useState } from "react";
import Modal from "../../generalComponents/Modal";
import { data, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import postService from "../../../app/services/post";
import { toast } from "react-toastify";
import EditPost from "./EditPost";
import UserProfile from "../../../assets/UserProfileEmpty.png";
import { SlOptions } from "react-icons/sl";

function PostTopCard({post}) {
    const [showAvatar, setShowAvatar] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const deletePost = async () => {
        try {
            const response = await postService.deletePost(post._id);
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex place-items-center w-full h-12 mb-3">
            <div className="aspect-square size-10 mr-4">
                <img
                    onClick={() => {
                        setShowAvatar(true);
                    }}
                    src={post.author.avatar ? post.author.avatar : UserProfile}
                    className="w-full h-full cursor-pointer rounded-full"
                />
            </div>

            <div className="w-full h-full flex place-items-center">
                <Link to={`/profile/${post.author.usn}`}>
                    <p className="cursor-pointer hover:text-gray-400 text-lg inline">
                        {" "}
                        <span className="font-bold">
                            {post.author.username}
                        </span>{" "}
                        [{post.author.usn}]{" "}
                    </p>
                </Link>
                <div></div>
            </div>

            {post.author.usn === useSelector((state) => state.auth.usn) && (
                <div
                    onClick={() => {
                        setShowOptions(true);
                    }}
                    className="aspect-square h-full p-3 flex justify-center place-items-center cursor-pointer"
                >
                    <SlOptions className="size-5" />
                </div>
            )}


{showAvatar && (
                <Modal
                    className="bg-opacity-60"
                    close={() => {
                        setShowAvatar(false);
                    }}
                >
                    <div className="aspect-square w-80">
                        <img
                            src={
                                post.author.avatar
                                    ? post.author.avatar
                                    : UserProfile
                            }
                            className="w-full h-full cursor-pointer rounded-full"
                        />
                    </div>
                </Modal>
            )}

            {showOptions && (
                <Modal
                    className="bg-opacity-30"
                    close={() => {
                        setShowOptions(false);
                    }}
                >
                    <div className="w-80 rounded-lg border border-gray-500 flex-col p-2 bg-gray-900">
                        <div
                            onClick={() => {
                                setShowOptions(false);
                                setShowEdit(true);
                            }}
                            className="w-full flex gap-2 justify-center place-items-center cursor-pointer border-b border-b-gray-700 rounded-md mb-2 hover:bg-gray-800 h-10"
                        >
                            <MdEdit className="size-5" />
                            <span className="font-semibold">Edit</span>
                        </div>

                        <div
                            onClick={() => {
                                setShowOptions(false);
                                setShowDelete(true);
                            }}
                            className="w-full flex gap-2 justify-center place-items-center cursor-pointer border-b border-b-gray-700 rounded-md mb-2 hover:bg-gray-800 text-red-500 h-10"
                        >
                            <FaTrash />
                            <span className="font-semibold">Delete</span>
                        </div>
                    </div>
                </Modal>
            )}

            {showDelete && (
                <Modal
                    className="bg-opacity-30"
                    close={() => {
                        setShowDelete(false);
                    }}
                >
                    <div className="w-80 bg-gray-900 rounded-md p-4 border border-gray-800 ">
                        <div className="text-2xl w-full mx-auto flex justify-center my-5 items-center">
                            Are you sure ?
                        </div>
                        <button
                            onClick={() => {
                                setShowDelete(false);
                                deletePost();
                            }}
                            className="p-2 w-40 mx-auto rounded-md bg-red-700 flex my-5 justify-center place-items-center"
                        >
                            <FaTrash />
                            <span className="font-semibold"> Delete</span>
                        </button>
                    </div>
                </Modal>
            )}

            {showEdit && (
                <Modal className="bg-opacity-30" close={() => {  setShowEdit(false); }} >
                    <EditPost post={post} />
                </Modal>
            )}
        </div>
    );
}

export default PostTopCard;
