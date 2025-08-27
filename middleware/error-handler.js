const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError={
      statusCode:err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Something went wrong please try later'
    }
    if(err.code&& err.code===11000){

    customError.statusCode=400
      customError.msg= `Duplicate value entered for ${Object.keys(err.keyValue)}  field, please eneter different value`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

  return res.status(customError.statusCode).send(customError.msg)
}

module.exports = errorHandlerMiddleware
