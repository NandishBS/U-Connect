[
    {
        $match: {
            _id: ObjectId('67535e6514297ac869694bd1')
        }
    },
    {
        $lookup: {
            from: "connections",
            localField: "_id",
            foreignField: "connectedUsers",
            as: "connections",
            pipeline: [
                {
                    $unwind: { path: "$connectedUsers" }
                },
                {
                    $match: {
                        connectedUsers: { $ne: ObjectId('67535e6514297ac869694bd1') }
                    }
                },
                {
                    $project: {
                        createdAt: 0, updatedAt: 0, __v: 0
                    }
                }
            ]
        }
    },
    {
        $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "author",
            as: "posts",
            pipeline:
                [
                    {
                        $lookup: {
                            from: "users",
                            localField: "author",
                            foreignField: "_id",
                            as: "author",
                            pipeline: [
                                {
                                    $project: {
                                        usn: 1, username: 1, _id: 1, avatar: 1
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields: {
                            author: {
                                $arrayElemAt: ["$author", 0]
                            }
                        }
                    }
                    ,
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "post",
                            as: "likes",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "author",
                                        foreignField: "_id",
                                        as: "author",
                                        pipeline: [
                                            {
                                                $project: {
                                                    _id: 1,
                                                    usn: 1,
                                                    username: 1,
                                                    avatar: 1
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    $addFields: {
                                        author: {
                                            $arrayElemAt: ["$author", 0]
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        author: 1,
                                        _id: 0
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            likes: {
                                $map: {
                                    input: "$likes",
                                    as: "like",
                                    in: {
                                        _id: "$$like.author._id",
                                        usn: "$$like.author.usn",
                                        username:
                                            "$$like.author.username",
                                        avatar: "$$like.author.avatar"
                                    }
                                }
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "post",
                            as: "comments",
                        }
                    },
                    {
                        $addFields: {
                            numberOfComments: {
                                $size: "$comments"
                            },
                            numberOfLikes: {
                                $size: "$likes"
                            }
                        }
                    },
                    {
                        $project: {
                            comments: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    },
                ]
        }
    },
    {
        $project: {
            password: 0, refreshToken: 0, updatedAt: 0, __v: 0
        }
    }
]