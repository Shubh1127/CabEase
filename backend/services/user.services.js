const userModel=require('../Models/user.Model')


module.exports.createUser=async ({
    firstname,lastname,email,password,phoneNumber,authProvider = 'local'
})=>{
    if(! firstname || !email ){
        throw new Error('Firstname and email are required');
    }
    if(authProvider=='local' && !password){
        throw new Error('Password is required');
    }
    const user=await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        phoneNumber:phoneNumber,
        authProvider
    })

    return user;
}