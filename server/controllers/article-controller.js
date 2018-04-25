const Article = require('../models/article-model')

module.exports = {
    create: (req, res) => {
        console.log(req.body)
        Article.create({
            title: req.body.title,
            article_content: req.body.article_content,
            userId: req.body.userId
        })
        .then(dataArticle => {
            res.status(200).json({
                message: 'Add Data Success',
                data: dataArticle
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Add Data Error',
                error: err
            })
        })
    },

    findAll: (req, res) => {
        console.log('=REQ======',req.body)
        Article.find()
        .populate('userId')
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Get Data Success',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get Data Error',
                error: err
            })
        })
    },

    findByUser: (req, res) => {
        console.log('=REQ PRAMS======',req.params)
        Article.find({
            userId: req.params.id
        })
        .populate('userId')
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Get Data Success',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get Data Error',
                error: err
            })
        })
    },

    delete: (req, res) => {
        console.log(req.params)
        Article.findByIdAndRemove(req.params.id)
        .then(response => {
            res.status(200).json({
                message: 'Delete Data Success',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete Data Error',
                error: err
            })
        })
    },

    update: (req, res) => {
        console.log('BODY===',req.body)
        console.log('PARAMS===',req.params)
        Article.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            article_content: req.body.article_content
        })
        .then(response => {
            res.status(200).json({
                message: 'Update Data Suucess',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Update Data Error',
                error: err
            })
        })
    }

}