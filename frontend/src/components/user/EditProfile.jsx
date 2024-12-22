import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import profileService from '../../app/services/profile';
import { toast } from 'react-toastify';
import TextAreaInput from '../input/TextAreaInput';
import FileInput from '../input/FileInput';
import TextInput from '../input/TextInput';
import BlueButton from '../generalComponents/BlueButton';


function EditProfile({profile}) {
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data)=>{ 
        try {
            const response = await profileService.editProfile(profile._id , data);
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className="bg-gray-800 rounded-md p-2">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)} >
                            <div className="w-full flex justify-center place-items-center flex-wrap gap-3">
                                <div>
                                    <Controller name="bio" control={control} 
                                    defaultValue={profile.bio} render={({ field }) => (
                                            <TextAreaInput className={ "max-h-80 min-h-80 text-md p-5" }
                                                placeholder="your bio.."
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div
                                className={`w-full flex justify-center place-items-center mt-3 flex-wrap gap-3`}
                            >
                                <div>
                                    <Controller
                                        name="avatar"
                                        control={control}
                                        defaultValue={""}
                                        render={({ field }) => (
                                            <FileInput
                                                className={
                                                    "w-80 h-80 flex-shrink-0"
                                                }
                                                prevImage={profile.avatar}
                                                placeHolderText="Upload your image"
                                                accept="image/*"
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <Controller
                                        name="username"
                                        control={control}
                                        defaultValue={profile.username}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Username.."
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="github"
                                        control={control}
                                        defaultValue={profile.github}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Github link"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="linkedin"
                                        control={control}
                                        defaultValue={profile.linkedin}
                                        render={({ field }) => (
                                            <TextInput
                                                className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300"
                                                placeholder="Linkedin Link"
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

export default EditProfile
