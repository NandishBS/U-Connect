import React from 'react'


let post = 
    {
        "_id": "6755fd8b327a48aa2d1e51b5",
        "author": {
            "_id": "67535e6514297ac869694bda",
            "usn": "4UB21CS041",
            "username": "kelly_evans",
            "avatar": ""
        },
        "type": "public",
        "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733675043/qa19cne5zbf6s5vz6rgd.jpg",
        "description": "discription text 5",
        "createdAt": "2024-12-08T20:11:55.464Z",
        "comments": [
            {
                "_id": "6756970280dd846bcd448086",
                "post": "6755fd8b327a48aa2d1e51b5",
                "author": {
                    "_id": "67557beefa233f31a561a7e9",
                    "usn": "4UB21CS002",
                    "username": "silent_anil",
                    "avatar": ""
                },
                "text": "hellow this is comment 5",
                "replies": []
            },
            {
                "_id": "675696e80d274231cddfbfa3",
                "post": "6755fd8b327a48aa2d1e51b5",
                "author": {
                    "_id": "675562a773537bd8cf62e40a",
                    "usn": "4UBTEACHCS001",
                    "username": "teacher_nandish",
                    "avatar": ""
                },
                "text": "hellow this is comment 5",
                "replies": []
            },
            {
                "_id": "6756968e5c451719559a3bed",
                "post": "6755fd8b327a48aa2d1e51b5",
                "author": {
                    "_id": "67535e6514297ac869694bdd",
                    "usn": "4UB21CS044",
                    "username": "ryan_hughes",
                    "avatar": ""
                },
                "text": "hellow this is comment 5",
                "replies": [
                    {
                        "_id": "675b5db9fd3021eab51a4ac0",
                        "author": {
                            "_id": "67535e6514297ac869694bd1",
                            "usn": "4UB21CS032",
                            "username": "nandishbs11",
                            "avatar": "",
                            "id": "67535e6514297ac869694bd1"
                        },
                        "text": "inserted using mongo db"
                    }
                ]
            }
        ],
        "likes": [
            {
                "_id": "675692e7ded27b2bcfbe9bf4",
                "post": "6755fd8b327a48aa2d1e51b5",
                "author": {
                    "_id": "67535e6514297ac869694bdd",
                    "usn": "4UB21CS044",
                    "username": "ryan_hughes",
                    "avatar": ""
                }
            }
        ],
        "id": "6755fd8b327a48aa2d1e51b5"
    }

function Post() {
  return (
    <div className=' max-w-md bg-gray-900 mx-auto my-2 aspect-[9/16] p-2 border border-transparent border-b-gray-500'>
        
    </div>
  )
}

export default Post
