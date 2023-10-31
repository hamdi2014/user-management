const errorController = (err, req, res, next) => {
  try {
    if (err.name === 'ValidationError') {
      let errors = Object.values(err.errors).map((item) => item.message)
      let fields = Object.values(err.errors).map((item) => item.path)
      let code = 400
      if (errors.length > 1) {
        const formattedErrors = errors.join('')
        res.status(code).send({ messages: formattedErrors, fields: fields })
        console.log(errors)
        console.log(fields)
      } else {
        res.status(code).send({ messages: errors, fields: fields })
        console.log(errors)
        console.log(fields)
      }
      return
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)
      const code = 409
      const error = `User with ${field} already exist`
      res.status(code).send({ messages: error, fields: field })
      console.log(error)
      console.log(field)
      return
    }

    console.log(err)
    res.json(err)
  } catch (err) {
    res.status(500).send('An unknown error occurred')
  }
}

module.exports = errorController
