const errorHandler = (err, req, res, next) => {
    let messageReturn=''
    let errorStatus

    switch(err.code){
        case 400:
            messageReturn = 'Bad request'
            errorStatus = 400
            break
        case 403:
            messageReturn = 'Forbidden'
            errorStatus = 403
            break
        case 404:
            messageReturn = 'Not found'
            errorStatus = 404
            break
        case 408:
            messageReturn = 'Timeout'
            errorStatus = 408
            break
        case 500:
            messageReturn = 'Internal server error'
            errorStatus = 500
            break
        default:
            messageReturn = 'Internal server error'
            errorStatus = 500
            break    
    }
    console.error(`Error Code: ${err.code}, Error Message: ${err.message}, Stack: ${err.stack}`);
    return res.status(errorStatus).json({ message: messageReturn, error: err.message });
}

module.exports = errorHandler