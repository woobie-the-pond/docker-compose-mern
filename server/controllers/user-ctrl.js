const User = require('../models/user-model')

createUser = (req, res) => {
  const { body } = req

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Unprocessable credentials'
    })
  }

  const user = new User(body)

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'User created',
      })
    })
    .catch(err => {
      return res.status(400).json({
        err,
        message: 'User failed to create',
      })
    })
}

updateUser = async (req, res) => {
  const { body } = req

  if(!body){
    return rest.status(400).json({
      success: false,
      error: 'You must provide a new value for user login'
    })
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if(err){
      return rest.status(404).json({
        err,
        message: 'User not found',
      })
    }

    user.email = body.email
    user.password = body.password

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: 'User credentials updated successfully',
        })
      })
      .catch(err => {
        return res.status(404).json({
          err,
          message: 'User failed to update',
        })
      })
  })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}
