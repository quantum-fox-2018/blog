const Article = require('../models/article-model')

module.exports = {
    create: (req, res) => {
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
        Article.find({
            userId: req.body.userId
        })
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

}