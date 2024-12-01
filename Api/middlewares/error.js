const errorHandler=(error,req,res,next)=>{
    console.log(error.stack);
    if(error instanceof CustomError){
        res.status(error.status).json({error:error.message});
    }
    return res.status(500).json({
        error:"Internal Server Error"
    });
}  

class  CustomError extends Error{
    constructor(message,status=500){
        super(message);
        this.status=status;
        this.name =this.constructor.name;
        Error.captureStackTrace(this,this.constructor);
}
}

export{errorHandler, CustomError}