const jwt = require('jsonwebtoken')
const token = process.env.TOKEN

module.exports = {
  generate: function (data) {
    return jwt.sign(data, token)
  },

  verify(req, res, next) {
    if(!req.headers.token) return res.status(401).json({message: 'User does not have the necessary credentials'})

    try {
      let decode = jwt.verify(req.headers.token, token)
      req.body.id = decode.id
      req.body.username = decode.username
      req.body.email = decode.email
      next()
    } catch(err) {
      return res.status(403).json({ message: 'The user might not have the necessary permissions for a resource'})
    }
  }
}
