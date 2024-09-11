import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
    try {
        const { user_id, title, description } = req.body
        console.log('inside create post')
        const newPost = await prisma.post.create({
            data: {
                user_id: Number(user_id)
                , title, description
            }
        })
        return res.status(201).json({ data: {...newPost, comment_count: Number(newPost.comment_count)}, message: "Post created successfully" })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (req, res) => {
    try {
        console.log('hey')
        const {title, description, comment_count} = req.body;
        const {id} = req.params
        const updatedPost = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title, description, comment_count
            }
        })
        const responseData = {...updatedPost, comment_count: Number(updatePost.comment_count)}
        console.log(responseData)
        return res.status(200).json({data: responseData})
    } catch (error) {
        console.log(error)
    }
}