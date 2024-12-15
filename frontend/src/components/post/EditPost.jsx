import React from 'react'
import { Controller, useForm } from "react-hook-form";
import FileInput from "../input/FileInput.jsx";
import TextAreaInput from "../input/TextAreaInput.jsx";
import postService from '../../app/services/post.js';
import { toast } from 'react-toastify';
import TextInput from '../input/TextInput.jsx';
import BlueButton from '../generalComponents/BlueButton.jsx';



function EditPost({post}) {
    const { control, handleSubmit, reset } = useForm();
    
    
    const editPost = async (data) => {
        try {
            const response = await postService.editPost(post._id, data);
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data)=>{ 
        try {
            const response = await postService.editPost(post._id, data);
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="bg-gray-800 rounded-md p-2">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)} >
                            <div className="w-full flex justify-center place-items-center flex-wrap gap-3">
                                <div>
                                    <Controller name="description" control={control} 
                                    defaultValue={post.description} render={({ field }) => (
                                            <TextAreaInput className={ "max-h-80 min-h-80 text-md p-5" }
                                                placeholder="Description......"
                                                required={true}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div
                                className={`${post.type === "project" ? "block" : "hidden"} w-full flex justify-center place-items-center mt-3 flex-wrap gap-3`}
                            >
                                <div>
                                    <Controller
                                        name="coverImage"
                                        control={control}
                                        defaultValue={""}
                                        render={({ field }) => (
                                            <FileInput
                                                className={
                                                    "w-80 h-80 flex-shrink-0"
                                                }
                                                prevImage={post.coverImage}
                                                placeHolderText="Upload the CoverImage"
                                                accept="image/*"
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={post.title}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Title"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="sourceCode"
                                        control={control}
                                        defaultValue={post.sourceCode}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Source Code"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="projectLink"
                                        control={control}
                                        defaultValue={post.projectLink}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Project Link"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex px-7 justify-center place-items-center mt-4 ">
                                <BlueButton
                                    className={"max-w-screen-sm"}
                                >
                                    edit
                                </BlueButton>
                            </div>
                        </form>
                    </div>
  )
}

export default EditPost
