const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //Check if error is a mongoose error
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
       message = 'Resource not found'
       statusCode = 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler}