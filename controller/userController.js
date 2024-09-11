import prisma from "../DB/db.config.js";



export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(userExists) {
        return res.status(404).json({ message: "Email already taken."})
    }
    
    const user = await prisma.user.create({   
        data: {
            name: name, 
            email: email,
            password: password
        }
    })
    return res.status(201).json({message: "User created successfully."})
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(req.params, "paramssss")
        const {name, email, password} = req.body;

        await prisma.user.update({
            where: {id: Number(id)},
            data: {
                name, email, password
            }
        })
        return res.status(201).json({message: "User data updated successfully."})
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                // posts: {
                //     select: {
                //         title: true,
                //         description: true
                //     }
                // }
                _count: {
                    select: {
                        posts: true,
                        comment: true
                    }
                }
            }
        })
        return res.status(200).json({data: users})
    } catch (error) {
        console.log(error)
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await prisma.user.findFirst({
            where: {id: Number(id)}
        })
        if(!user){
            return res.status(404).json({message: "User not found!"})
        }
        return res.status(200).json({data: user})
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async( req, res) => {
    try {
        const {id} = req.params;
        await prisma.user.delete({
            where: {id: Number(id)}
        })
        return res.status(200).json({message: "User deleted successfully."})
    } catch (error) {
        console.log(error)
    }
}