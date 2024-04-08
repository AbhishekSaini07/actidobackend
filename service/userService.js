const db = require("../models");
const {hashPass,comparePass} = require("./bcrypttest");
const newUser= async (user)=>{
    let newhashpassword = await hashPass(user.password);
    console.log(user.password + " " + newhashpassword); 
    user.hashPassword = newhashpassword;
    let dbuser =  await db.user.create({name: user.name, userName: user.userName,
         email: user.email, hashPassword: newhashpassword,
        userDescription: user.userDescription});
   
    return dbuser;

}

const checklogin = async (email,password) => {
    console.log(`Email is ${email} and Password is ${password} `);
    let user = await db.user.findOne({where : {email: email}});
    
    // console.log(user.password== password + "::::");

    //let h = await hashPass(password);
    
    // console.log(h + " and " + t);
    if(user){
        let t = await comparePass(password,user.hashPassword);
        if(t) return user;
        //console.log("dsnfhiohiewhwieohfewioh");
       
    }
    return false;
}
const checkConnection = async (uid,fid)=>{
    await db.connections.findOne({
        where: {
            uid: uid,
            fid: fid
        }
    }).then((response)=> {
        if(response) return true;
        else return false;
    }).catch((e)=> {
        console.log("Error");
        return false;

    }); }

const checkfollower = async(uid,fid)=>{
    return await checkConnection(fid,uid);
}
const checkfollowing = async(uid,fid)=>{
    return await checkConnection(uid,fid);
}
const getAllFollower = async(uid,fid)=>{
    await db.connections.findOne({
        where: {
            uid: uid,
            fid: fid
        }
    }).then((response)=> {
        if(response) return true;
        else return false;
    }).catch((e)=> {
        console.log("Error");
        return false;

    });
}
    


module.exports= {checklogin,newUser};