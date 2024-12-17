import React, { useEffect, useState } from 'react'
import { Navigate, useParams} from 'react-router-dom'
import profileService from '../app/services/profile'
import UserProfile from "../assets/UserProfileEmpty.png";
import Modal from '../components/generalComponents/Modal.jsx';
import { IoMdSettings } from "react-icons/io";
import { FaGithub , FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile, setPosts, setProfile } from '../app/profileSlice';
import ProfilePosts from '../components/user/ProfilePosts';
import ProfileProjects from '../components/user/ProfileProjects';

const profile1 = {
  "_id": "67535e6514297ac869694bd1",
  "usn": "4UB21CS032",
  "username": "12345678901234567890",
  "fullName": "NANDISH B S",
  "email": "nandishbs11@gmail.com",
  "avatar": "",
  "role": "student",
  "bio": "iam nandish bs anime lover and i studied in university bdt college of engineering in computer science engineering i like to watch anime and my faviourite anime is naruto",
  "github": "",
  "linkedin": "",
  "connections": [],
  "posts": [
      {
          "_id": "675ca7d7bbeb8277c1fc0fa5",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125525/u-connect/v0zqpk2a7c4y8pytilhi.png",
          "description": "nandish is greatalskjdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffj",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734288839/u-connect/wutmo694vmqscplvwaor.jpg",
          "title": "new title yaay",
          "sourceCode": "https://www.google.com/",
          "projectLink": "",
          "createdAt": "2024-12-13T21:32:07.053Z",
          "comments": [
              {
                  "_id": "676071f4708336ab8bc34d0d",
                  "post": "675ca7d7bbeb8277c1fc0fa5",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  },
                  "text": "lkasdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;j",
                  "replies": []
              },
              {
                  "_id": "675f2a1ff76fc46d5ce841c9",
                  "post": "675ca7d7bbeb8277c1fc0fa5",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  },
                  "text": "this time it should work",
                  "replies": [
                      {
                          "author": {
                              "_id": "67535e6514297ac869694bd1",
                              "usn": "4UB21CS032",
                              "username": "nandishbs11",
                              "avatar": "",
                              "id": "67535e6514297ac869694bd1"
                          },
                          "text": "this is new comment tested",
                          "_id": "675f2ee670009aa39d5f77d4"
                      },
                      {
                          "author": {
                              "_id": "67535e6514297ac869694bd1",
                              "usn": "4UB21CS032",
                              "username": "nandishbs11",
                              "avatar": "",
                              "id": "67535e6514297ac869694bd1"
                          },
                          "text": "new text",
                          "_id": "675f2e0791a835f74fed389e"
                      },
                      {
                          "author": {
                              "_id": "67535e6514297ac869694bd1",
                              "usn": "4UB21CS032",
                              "username": "nandishbs11",
                              "avatar": "",
                              "id": "67535e6514297ac869694bd1"
                          },
                          "text": "alskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfdalskfd",
                          "_id": "67607206708336ab8bc34d13"
                      }
                  ]
              }
          ],
          "likes": [
              {
                  "_id": "675f24ce4e58b9b01e299c25",
                  "post": "675ca7d7bbeb8277c1fc0fa5",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              },
              {
                  "_id": "675f25d85d2167bd765d2353",
                  "post": "675ca7d7bbeb8277c1fc0fa5",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca7d7bbeb8277c1fc0fa5"
      },
      {
          "_id": "675ca7c1bbeb8277c1fc0f9e",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125505/u-connect/bpj3td0pisrnuealubj2.jpg",
          "description": "welcome to new post",
          "createdAt": "2024-12-13T21:31:45.823Z",
          "comments": [
              {
                  "_id": "675f2a45f76fc46d5ce841d3",
                  "post": "675ca7c1bbeb8277c1fc0f9e",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  },
                  "text": "let me comment this one too",
                  "replies": []
              }
          ],
          "likes": [
              {
                  "_id": "67606d73e80816c0589bcbc8",
                  "post": "675ca7c1bbeb8277c1fc0f9e",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca7c1bbeb8277c1fc0f9e"
      },
      {
          "_id": "675ca76abbeb8277c1fc0f97",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125418/u-connect/qaqhpsob2vybxvpbla82.jpg",
          "description": "asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs ",
          "createdAt": "2024-12-13T21:30:18.766Z",
          "comments": [],
          "likes": [
              {
                  "_id": "67606d71e80816c0589bcbc2",
                  "post": "675ca76abbeb8277c1fc0f97",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca76abbeb8277c1fc0f97"
      },
      {
          "_id": "675ca75fbbeb8277c1fc0f90",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125406/u-connect/iqa7xewjqfc4fuhtx93q.jpg",
          "description": "sdfasdasassasdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs ",
          "createdAt": "2024-12-13T21:30:07.033Z",
          "comments": [],
          "likes": [
              {
                  "_id": "67606d80e80816c0589bcbd9",
                  "post": "675ca75fbbeb8277c1fc0f90",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca75fbbeb8277c1fc0f90"
      },
      {
          "_id": "675ca6d1bbeb8277c1fc0f89",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125264/u-connect/rgdl6gowk7xb1vl2k123.png",
          "description": "new edit",
          "createdAt": "2024-12-13T21:27:45.529Z",
          "comments": [],
          "likes": [
              {
                  "_id": "675f26434e58b9b01e299c7b",
                  "post": "675ca6d1bbeb8277c1fc0f89",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca6d1bbeb8277c1fc0f89"
      },
      {
          "_id": "675ca65bbbeb8277c1fc0f80",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125146/u-connect/xdtknstrfigv1hhd9yue.png",
          "description": "sadfgsadf",
          "createdAt": "2024-12-13T21:25:47.374Z",
          "comments": [],
          "likes": [
              {
                  "_id": "67607514fd80dad2af722239",
                  "post": "675ca65bbbeb8277c1fc0f80",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675ca65bbbeb8277c1fc0f80"
      },
      {
          "_id": "675ca649bbeb8277c1fc0f7d",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734125129/u-connect/jyib0ifh3ssodzlsh7ta.jpg",
          "description": "taqfrsw4ftr",
          "createdAt": "2024-12-13T21:25:29.783Z",
          "comments": [],
          "likes": [],
          "id": "675ca649bbeb8277c1fc0f7d"
      },
      {
          "_id": "675ca5b5bbeb8277c1fc0f72",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124981/u-connect/xxkmyy3ckl5fywi3cufr.jpg",
          "description": "asdfsdf",
          "createdAt": "2024-12-13T21:23:01.499Z",
          "comments": [],
          "likes": [],
          "id": "675ca5b5bbeb8277c1fc0f72"
      },
      {
          "_id": "675ca572bbeb8277c1fc0f6f",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124914/u-connect/edrwakdzcrwwf3rdfntm.jpg",
          "description": "asdf",
          "createdAt": "2024-12-13T21:21:54.797Z",
          "comments": [],
          "likes": [],
          "id": "675ca572bbeb8277c1fc0f6f"
      },
      {
          "_id": "675ca547bbeb8277c1fc0f6c",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124871/u-connect/x88nrh9ij4lffl5lwbiq.png",
          "description": "wsfrsdaf",
          "createdAt": "2024-12-13T21:21:11.884Z",
          "comments": [],
          "likes": [],
          "id": "675ca547bbeb8277c1fc0f6c"
      },
      {
          "_id": "675ca494bbeb8277c1fc0f69",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124692/u-connect/pc2fizjypktdueurpx7a.png",
          "description": "sfgdfs",
          "createdAt": "2024-12-13T21:18:12.866Z",
          "comments": [],
          "likes": [],
          "id": "675ca494bbeb8277c1fc0f69"
      },
      {
          "_id": "675ca466bbeb8277c1fc0f62",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124645/u-connect/cybsbfvo4nuurkzs3nvk.png",
          "description": "sdf",
          "createdAt": "2024-12-13T21:17:26.167Z",
          "comments": [],
          "likes": [],
          "id": "675ca466bbeb8277c1fc0f62"
      },
      {
          "_id": "675ca432bbeb8277c1fc0f5f",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124593/u-connect/dlcekhbimexcglzkhtmc.jpg",
          "description": "sdffdasf",
          "createdAt": "2024-12-13T21:16:34.409Z",
          "comments": [],
          "likes": [],
          "id": "675ca432bbeb8277c1fc0f5f"
      },
      {
          "_id": "675ca3eebbeb8277c1fc0f5c",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124525/u-connect/tmrmqf1ljzg1yva97pge.jpg",
          "description": "asdfdsf",
          "createdAt": "2024-12-13T21:15:26.005Z",
          "comments": [],
          "likes": [],
          "id": "675ca3eebbeb8277c1fc0f5c"
      },
      {
          "_id": "675ca1ffbbeb8277c1fc0f55",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734124030/u-connect/ybbpwdi9xcwactnte6lu.jpg",
          "description": "asdasdasd",
          "createdAt": "2024-12-13T21:07:11.102Z",
          "comments": [],
          "likes": [],
          "id": "675ca1ffbbeb8277c1fc0f55"
      },
      {
          "_id": "675ca12ec7b73fc1108d50d6",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734123821/u-connect/f44vjvalod3xlkueozaj.jpg",
          "description": "asdfsdf",
          "createdAt": "2024-12-13T21:03:42.367Z",
          "comments": [],
          "likes": [],
          "id": "675ca12ec7b73fc1108d50d6"
      },
      {
          "_id": "675ca067c7b73fc1108d50cf",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734123622/u-connect/rmcir3vdeut8guvmja9l.jpg",
          "description": "asdfsdfa",
          "createdAt": "2024-12-13T21:00:23.212Z",
          "comments": [],
          "likes": [],
          "id": "675ca067c7b73fc1108d50cf"
      },
      {
          "_id": "675c9fb5c7b73fc1108d50cc",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734123445/u-connect/kiuruoypiohgeqmwvmeg.jpg",
          "description": "asdfsadf",
          "createdAt": "2024-12-13T20:57:25.939Z",
          "comments": [],
          "likes": [],
          "id": "675c9fb5c7b73fc1108d50cc"
      },
      {
          "_id": "675c69863a4e4ec98f76cacc",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734109574/u-connect/ri28ylkkzm3xchthurkh.png",
          "description": "ashfdkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkasdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs ",
          "createdAt": "2024-12-13T17:06:14.646Z",
          "comments": [],
          "likes": [
              {
                  "_id": "67613ad278808a1a2ac1bf8a",
                  "post": "675c69863a4e4ec98f76cacc",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              }
          ],
          "id": "675c69863a4e4ec98f76cacc"
      },
      {
          "_id": "675c67e631942646a093f07b",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1734109158/u-connect/chkmilxr6epi0mgcfiu1.jpg",
          "description": "afeasfd",
          "createdAt": "2024-12-13T16:59:18.980Z",
          "comments": [],
          "likes": [],
          "id": "675c67e631942646a093f07b"
      },
      {
          "_id": "6759e904cb88a5ce6c453690",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733945603/u-connect/iuey48ougoskaqgclovt.jpg",
          "description": "asfdssssssssssssssssssssssssssssssssssssssssssssasdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs asdfsdfsdfs ",
          "createdAt": "2024-12-11T19:33:24.710Z",
          "comments": [],
          "likes": [],
          "id": "6759e904cb88a5ce6c453690"
      },
      {
          "_id": "6759e2ea0d13ca75c4cc8520",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733944041/u-connect/pexxmskidmqsfd8dvg7l.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T19:07:22.439Z",
          "comments": [],
          "likes": [],
          "id": "6759e2ea0d13ca75c4cc8520"
      },
      {
          "_id": "6759e20f89719d0ffe974ea3",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733943822/u-connect/oyxwwotgzhkzihlpsqvb.jpg",
          "description": "asfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfd",
          "createdAt": "2024-12-11T19:03:43.376Z",
          "comments": [],
          "likes": [],
          "id": "6759e20f89719d0ffe974ea3"
      },
      {
          "_id": "6759bdd553cbcc4a62249a1c",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733934547/j2wk172fmsj8thprbudc.jpg",
          "description": "asdfasdfasdfsadfsdfsdfvsvcxcvxcvxzcvxcvxcvxcvzxcvxcvxcvxcvzxcvzxcvxcvzxcvcvzxcvxcvxcvxcvxcvxcvxcvxcvxczvxcvzxcvxzcvzxcvxcvzxvzxcvxcvxcv",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733934549/vpdmzavwzbsgsgvkya85.jpg",
          "createdAt": "2024-12-11T16:29:09.753Z",
          "projectLink": "",
          "sourceCode": "",
          "title": "",
          "comments": [],
          "likes": [],
          "id": "6759bdd553cbcc4a62249a1c"
      },
      {
          "_id": "6759bdb453cbcc4a62249a19",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733934515/akcws0fquldmeqvvg6em.jpg",
          "description": "testing purpost description",
          "createdAt": "2024-12-11T16:28:36.471Z",
          "comments": [],
          "likes": [],
          "id": "6759bdb453cbcc4a62249a19"
      },
      {
          "_id": "6759bd9253cbcc4a62249a14",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733934481/vodgddjfn0xxt7pgaopf.jpg",
          "description": "testing purpost description",
          "createdAt": "2024-12-11T16:28:02.584Z",
          "comments": [],
          "likes": [],
          "id": "6759bd9253cbcc4a62249a14"
      },
      {
          "_id": "6759ba6480206de6c8a75fc3",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933666/mtb6o5mjekuxuzktlc7b.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933667/hx6a6foyqz74l4dvarth.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T16:14:28.421Z",
          "comments": [],
          "likes": [],
          "id": "6759ba6480206de6c8a75fc3"
      },
      {
          "_id": "6759ba6080206de6c8a75fc0",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933662/eghbouwnnu98ahhjwepu.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933663/awllexo49fawexnicgpp.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T16:14:24.025Z",
          "comments": [],
          "likes": [],
          "id": "6759ba6080206de6c8a75fc0"
      },
      {
          "_id": "6759ba5b80206de6c8a75fbd",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933658/yfc22o4egjjohkgqpff1.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933659/k9px2wv9xhflbhsg5xlh.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T16:14:19.722Z",
          "comments": [],
          "likes": [],
          "id": "6759ba5b80206de6c8a75fbd"
      },
      {
          "_id": "6759ba5780206de6c8a75fba",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933653/imnyrlyp0eu9cj3etoun.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933654/cmypbqfljmikcmbo8qga.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T16:14:15.198Z",
          "comments": [],
          "likes": [],
          "id": "6759ba5780206de6c8a75fba"
      },
      {
          "_id": "6759ba4880206de6c8a75fb7",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933638/kywgrhuevyqc07ics9kq.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933639/mhl9kpluysvrjwmwe7ip.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T16:14:00.447Z",
          "comments": [],
          "likes": [],
          "id": "6759ba4880206de6c8a75fb7"
      },
      {
          "_id": "6759b9afb0d25dfd577e0e4e",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933486/oav1tdkhzaevmovbqal9.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T16:11:27.117Z",
          "comments": [],
          "likes": [],
          "id": "6759b9afb0d25dfd577e0e4e"
      },
      {
          "_id": "6759b89c6e76701f81e735b5",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933212/yphdv0e7gobwpguasmen.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T16:06:52.774Z",
          "comments": [],
          "likes": [],
          "id": "6759b89c6e76701f81e735b5"
      },
      {
          "_id": "6759b8856e76701f81e735b2",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933188/kfviiavfq5aqwodnnfnd.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T16:06:29.017Z",
          "comments": [],
          "likes": [],
          "id": "6759b8856e76701f81e735b2"
      },
      {
          "_id": "6759b83b8056116dcb31db35",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733933114/attkxpy3gg6ju9zwkkx0.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T16:05:15.142Z",
          "comments": [],
          "likes": [],
          "id": "6759b83b8056116dcb31db35"
      },
      {
          "_id": "6759b6e98056116dcb31db32",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733932776/awvbxfm7krpxjjki0bwx.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T15:59:37.402Z",
          "comments": [],
          "likes": [],
          "id": "6759b6e98056116dcb31db32"
      },
      {
          "_id": "6759a6f124a01dc747c50dbf",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928689/ojlzjopgx8kdqziqw2ta.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:51:29.678Z",
          "comments": [],
          "likes": [],
          "id": "6759a6f124a01dc747c50dbf"
      },
      {
          "_id": "6759a6c724a01dc747c50dba",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928645/tjsh2oq2ik3entaln3df.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928646/vsobokuhjkjt73c89ahv.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:50:47.380Z",
          "comments": [],
          "likes": [],
          "id": "6759a6c724a01dc747c50dba"
      },
      {
          "_id": "6759a60224a01dc747c50db7",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928448/ni2lgr3kkcyvjhidsxm6.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928449/bclxnxfwswp5qmgyfgsp.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:47:30.489Z",
          "comments": [],
          "likes": [],
          "id": "6759a60224a01dc747c50db7"
      },
      {
          "_id": "6759a5ed24a01dc747c50db4",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733928429/cggy3vwfpug4rbyjjdau.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:47:09.811Z",
          "comments": [],
          "likes": [],
          "id": "6759a5ed24a01dc747c50db4"
      },
      {
          "_id": "6759a4378e9b7f6e359e8fcd",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927990/xjxnhfryp0w0pgfnovrg.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:39:51.463Z",
          "comments": [],
          "likes": [],
          "id": "6759a4378e9b7f6e359e8fcd"
      },
      {
          "_id": "6759a3b4c7bbbc59b26ef4da",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927858/fvgtvbddq8rillurpioh.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927859/tcazj3irtawcoodjok7n.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:37:40.375Z",
          "comments": [],
          "likes": [],
          "id": "6759a3b4c7bbbc59b26ef4da"
      },
      {
          "_id": "6759a3aec7bbbc59b26ef4d7",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927852/trcqro40jezuzy3ucbsi.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927853/vwims7sr9thvt3zssaie.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:37:34.011Z",
          "comments": [],
          "likes": [],
          "id": "6759a3aec7bbbc59b26ef4d7"
      },
      {
          "_id": "6759a3a2c7bbbc59b26ef4d4",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927840/jrfe2vbyrywsyybx5pig.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927841/m8btdhys9rb3odrebork.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:37:22.619Z",
          "comments": [],
          "likes": [],
          "id": "6759a3a2c7bbbc59b26ef4d4"
      },
      {
          "_id": "6759a0d1c634af6bf82eb1c6",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927115/kdx2ayt7t3qbkbxv0x1m.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927120/qjxbocoe7s56x79akcgn.jpg",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:25:21.259Z",
          "comments": [],
          "likes": [],
          "id": "6759a0d1c634af6bf82eb1c6"
      },
      {
          "_id": "6759a0b1c634af6bf82eb1c2",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927088/hmisfuo4ehgh6k0bsi6v.jpg",
          "description": "testing purpose",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:24:49.529Z",
          "comments": [],
          "likes": [],
          "id": "6759a0b1c634af6bf82eb1c2"
      },
      {
          "_id": "6759a086c634af6bf82eb1bd",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927045/stehno1evmo2qxgv7ltk.jpg",
          "description": "testing purpose",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T14:24:06.349Z",
          "comments": [],
          "likes": [],
          "id": "6759a086c634af6bf82eb1bd"
      },
      {
          "_id": "6759a064c634af6bf82eb1ba",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733927011/ozasjdtpi8h8hfkkwx8p.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:23:32.594Z",
          "comments": [],
          "likes": [],
          "id": "6759a064c634af6bf82eb1ba"
      },
      {
          "_id": "6759a01bc634af6bf82eb1b6",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733926939/obkhgmtoyfjerh6dmg6a.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:22:19.780Z",
          "comments": [],
          "likes": [],
          "id": "6759a01bc634af6bf82eb1b6"
      },
      {
          "_id": "67599f9d3f9b641410ea8814",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733926812/xpmlfzhqsacnkczjwctl.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-11T14:20:13.320Z",
          "comments": [],
          "likes": [],
          "id": "67599f9d3f9b641410ea8814"
      },
      {
          "_id": "6759792e1d1707d5d44afd06",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916971/rtvpuwyaxmpxevqxfjq7.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916973/dph2siu0b8uyx9px8ur2.png",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T11:36:14.487Z",
          "comments": [],
          "likes": [],
          "id": "6759792e1d1707d5d44afd06"
      },
      {
          "_id": "675976f9d2d8a628c63c5ae3",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916406/uwthkxyq2dygwipcy5zv.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916409/z6norpkl5u3bn3voz2wn.png",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T11:26:49.776Z",
          "comments": [],
          "likes": [],
          "id": "675976f9d2d8a628c63c5ae3"
      },
      {
          "_id": "675975a6d2d8a628c63c5ae0",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916064/imlpm5enmyhdi8w154jz.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733916067/muj6vryeclix752ickzt.png",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-11T11:21:10.298Z",
          "comments": [],
          "likes": [],
          "id": "675975a6d2d8a628c63c5ae0"
      },
      {
          "_id": "6758281f82addbc9d7c05267",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733830683/y8qdhyorl0iybsd53bu8.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733830685/kemys9lp1e5err2cn68j.png",
          "title": "sample title",
          "sourceCode": "alkjdsfalkjdsflajskdflkjsdlkjf",
          "projectLink": "qewretreyttytrytryuytu",
          "createdAt": "2024-12-10T11:38:07.405Z",
          "comments": [],
          "likes": [],
          "id": "6758281f82addbc9d7c05267"
      },
      {
          "_id": "6758279082addbc9d7c05264",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "project",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733830540/ej4zrh0shivnwde92cfi.jpg",
          "description": "testing purpose",
          "coverImage": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733830543/p3fsp3amcidg6iuqkebq.png",
          "createdAt": "2024-12-10T11:35:44.588Z",
          "comments": [],
          "likes": [],
          "id": "6758279082addbc9d7c05264"
      },
      {
          "_id": "6758276e82addbc9d7c05261",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "post",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733830509/qwpfiukj6cahyjwyxkoj.jpg",
          "description": "testing purpose",
          "createdAt": "2024-12-10T11:35:10.491Z",
          "comments": [],
          "likes": [],
          "id": "6758276e82addbc9d7c05261"
      },
      {
          "_id": "6755fdec327a48aa2d1e5206",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "public",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733675043/qa19cne5zbf6s5vz6rgd.jpg",
          "description": "discription text 0",
          "createdAt": "2024-12-08T20:13:32.726Z",
          "comments": [],
          "likes": [
              {
                  "_id": "675691d1c78eb7ac043d1dc2",
                  "post": "6755fdec327a48aa2d1e5206",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              },
              {
                  "_id": "6756921be03afe83f4640d3c",
                  "post": "6755fdec327a48aa2d1e5206",
                  "author": {
                      "_id": "675562a773537bd8cf62e40a",
                      "usn": "4UBTEACHCS001",
                      "username": "teacher_nandish",
                      "avatar": "",
                      "id": "675562a773537bd8cf62e40a"
                  }
              }
          ],
          "id": "6755fdec327a48aa2d1e5206"
      },
      {
          "_id": "6755fddd327a48aa2d1e51db",
          "author": {
              "_id": "67535e6514297ac869694bd1",
              "usn": "4UB21CS032",
              "username": "nandishbs11",
              "avatar": "",
              "id": "67535e6514297ac869694bd1"
          },
          "type": "public",
          "content": "https://res.cloudinary.com/dd2qbbabx/image/upload/v1733675043/qa19cne5zbf6s5vz6rgd.jpg",
          "description": "discription text 0",
          "createdAt": "2024-12-08T20:13:17.531Z",
          "comments": [],
          "likes": [
              {
                  "_id": "675691d1c78eb7ac043d1db9",
                  "post": "6755fddd327a48aa2d1e51db",
                  "author": {
                      "_id": "67535e6514297ac869694bd1",
                      "usn": "4UB21CS032",
                      "username": "nandishbs11",
                      "avatar": "",
                      "id": "67535e6514297ac869694bd1"
                  }
              },
              {
                  "_id": "6756921be03afe83f4640d33",
                  "post": "6755fddd327a48aa2d1e51db",
                  "author": {
                      "_id": "675562a773537bd8cf62e40a",
                      "usn": "4UBTEACHCS001",
                      "username": "teacher_nandish",
                      "avatar": "",
                      "id": "675562a773537bd8cf62e40a"
                  }
              }
          ],
          "id": "6755fddd327a48aa2d1e51db"
      }
  ],
  "invitations": [],
  "invitationSent": [],
  "id": "67535e6514297ac869694bd1"
}

function Profile() {
    const {usn} = useParams()
    const user = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.profile)
    const posts = useSelector(state => state.profile.posts)
    const [showAvatar, setShowAvatar] = useState(false);
    const [loading , setLoading] = useState(true)
    const dispatch = useDispatch()
    const [togglePosts, setTogglePosts] = useState(true);

    const fetchProfile = async ()=>{
      try {
        setLoading(true)
        const profile = await profileService.getProfile(usn);
        dispatch(setProfile(profile))
        dispatch(setPosts(profile.posts))
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        fetchProfile()
        return () =>{
            dispatch(clearProfile())
        }
    },[])
 
    return (
    <div className='max-w-xl lg:max-w-2xl w-full place-self-start flex-col'>
      {!usn && <Navigate to={`/profile/${user.usn}`}/>}
      {!loading && 
      <div className='w-full h-fit'>
        <div className='w-full h-fit flex mt-5 border-b-2 border-b-gray-700 pb-4'>
        <div className='w-2/5 flex justify-center place-items-center'>
        <div className={`aspect-square w-40 px-1`}>
                <img onClick={() => { setShowAvatar(true); }}
                    src={profile?.avatar ? profile?.avatar : UserProfile}
                    className="w-full h-full cursor-pointer rounded-full"/>

                {showAvatar && ( <Modal className="bg-opacity-60" close={() => {setShowAvatar(false);}}>
                    <div className="aspect-square w-80">
                        <img src={ profile?.avatar ? profile?.avatar : UserProfile }
                            className="w-full h-full cursor-pointer rounded-full"/>
                    </div>
                </Modal>)}
          </div>
        </div>

          <div className='w-3/5'>
            <div className='flex justify-between place-items-center break-words gap-2'>
              <p className='text-xl px-2 max-w-full line-clamp-1 break-words overflow-clip'>{profile.username}</p>
              <div className='h-full px-2'>
                <IoMdSettings className='hover:animate-spin' size={30}/>
              </div>
            </div>


            <div className='px-2 max-w-full'>
              <p className='overflow-clip break-words line-clamp-1'>{profile.usn}</p>
              <p className='overflow-clip break-words line-clamp-1'> {profile.fullName} </p>
              <p className='overflow-clip break-words line-clamp-1'> {profile.email} </p>
              <p className='overflow-clip break-words my-2 line-clamp-3'>{profile.bio}</p>
            </div>
            
            <div className='flex gap-2'>
              <div className='text-md bg-gray-950 rounded-md py-1 px-2'> <span>{profile.posts.length} </span> posts </div>
              <div className='text-md bg-gray-950 rounded-md py-1 px-2'> <span>{profile.connections.length}</span> connections </div>
              <div className='text-md  rounded-md py-1 px-2 flex place-items-center gap-2'> <FaGithub size={30}/></div>
              <div className='text-md  rounded-md py-1 px-2 flex place-items-center gap-2'> <FaLinkedin size={30} /></div>
            </div>
          </div>
        </div>
        <div className='flex justify-evenly place-items-center text-xl'>
           <div onClick={()=>{setTogglePosts(true)}} className={`flex border-t-2 border-transparent cursor-pointer transition-all place-items-center justify-center pb-3 px-5 ${togglePosts && 'border-white font-bold'} `}>posts</div>
           <div onClick={()=>{setTogglePosts(false)}} className={`flex border-t-2 border-transparent cursor-pointer transition-all place-items-center justify-center pb-3 px-5 ${!togglePosts && 'border-white font-bold'} `}>projects</div>
        </div>
        <div className='flex flex-wrap w-full'>
            {togglePosts && <ProfilePosts posts = {posts} />}
            {!togglePosts && <ProfileProjects/>}
        </div>
      </div>}
    </div>
  )
}

export default Profile
