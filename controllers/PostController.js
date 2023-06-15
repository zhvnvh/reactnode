import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить данные'
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndUpdate({
            _id: postId
        },{
            $inc: { viewsCount: 1 }
        },{
            returnDocument: 'after'
        })
        
        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }
        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить данные'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndDelete({
            _id: postId
        })
        
        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }
        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить данные'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.updateOne({
            _id: postId
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.body.user,
            tags: req.body.tags,
        })
        
        if (post.modifiedCount == 0) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }
        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить данные'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            user: req.userId,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags
        });

        const post = await doc.save();

        res.json(post)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалость создать пост'
        })
    }
}