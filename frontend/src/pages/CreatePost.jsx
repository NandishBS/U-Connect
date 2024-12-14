import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FileInput from '../components/input/FileInput'
import TextInput from '../components/input/TextInput'
import RadioInput from '../components/input/RadioInput'
import TextAreaInput from '../components/input/TextAreaInput'
import BlueButton from '../components/generalComponents/BlueButton'
import postService from '../app/services/post'
import { toast } from 'react-toastify'
import uploading from "../assets/uploading.webp"

function CreatePost() {
  const { control , handleSubmit , reset } = useForm()
  const [isProject, setIsProject] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if(!data.content){
      toast.error("Content is required!",{
        position : "top-right"
      })
      return
    }

    setLoading(true)
    try {
      const response = await postService.uploadPost(data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    setLoading(false)
    reset()
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <>
      <div className='w-96 lg:w-full lg:max-w-screen-md'>
      <div className='h-16 w-screen md:hidden bottom-0'></div>
      <form className='w-full' onSubmit={ handleSubmit(onSubmit) }>
        <div className='w-full flex justify-center place-items-center flex-wrap gap-3'>
        <div>
        <Controller
          name='content'
          control={control}
          defaultValue={null}
          render={({field}) => (
            <FileInput className={"w-80 h-96 flex-shrink-0"} placeHolderText="Upload the content" required={true} accept="image/*"
            onChange={field.onChange}/>
          )}
        />
        </div>
        <div>
        <Controller
          name='description'
          control={control}
          defaultValue={''}
          render={({field}) => (
            <TextAreaInput className={"max-h-80 min-h-80 text-md p-5"} placeholder ="Description......" required={true} value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name='type'
          control={control}
          defaultValue={'post'}
          render={({field}) => (
            <div className='flex justify-center mt-2 bg-gray-900 border-2 border-transparent active:border-cyan-400  hover:border-cyan-400 transition-all rounded-md place-items-center p-2'>
              <RadioInput label={'Post'} radioValue={"post"} required={true} value={field.value} onChange={(event)=>{
                setIsProject( prev => !prev )
                field.onChange(event)
                }}/>
              <RadioInput label={"Project"} radioValue={"project"} required={true}  value={field.value} 
              onChange={(event)=>{
                setIsProject( prev => !prev )
                field.onChange(event)
                }}/>
            </div>
          )}
        />
        </div>
        </div>
        <div className={`${isProject ? "block" : "hidden"} w-full flex justify-center place-items-center mt-3 flex-wrap gap-3`} >
          <div>
          <Controller
          name='coverImage'
          control={control}
          defaultValue={null}
          render={({field}) => (
            <FileInput className={"w-80 h-80 flex-shrink-0"} placeHolderText="Upload the CoverImage" accept="image/*" onChange={field.onChange} />
          )}
        />
          </div>

          <div>
          <Controller
          name='title'
          control={control}
          defaultValue={''}
          render={({field}) => (
            <TextInput className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300" placeholder="Title" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name='sourceCode'
          control={control}
          defaultValue={''}
          render={({field}) => (
            <TextInput className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300" placeholder="Source Code" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name='projectLink'
          control={control}
          defaultValue={''}
          render={({field}) => (
            <TextInput className="min-w-80 bg-gray-900 mb-5 placeholder:text-gray-300" placeholder="Project Link" value={field.value} onChange={field.onChange} />
          )}
        />
        </div>
        </div>
        <div className='flex px-7 justify-center place-items-center mt-4 '>
          <BlueButton  className={"max-w-screen-sm"} disabled = {loading} > Upload </BlueButton>
        </div>
      </form>
      {loading && 
      <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center place-items-center'>
      <div className='absolute z-50 w-80 h-80 flex justify-center place-items-center'>
        <img src={uploading} alt='Uploading....'/>
      </div>
    </div>}
      <div className='h-16 w-screen md:hidden '></div>
      </div>
    </>
  )
}

export default CreatePost
