/**
 * error handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} error 
 */

const errHandler = (error, req, res, next ) => {

    let errorStatus = error.status || 500;
    let errorMessage = error.message || 'Something went wrong!';
    
    res.status(errorStatus).json({
        status : errorStatus,
        message : errorMessage,
        stack : error.stack
    });

}

export default errHandler;
