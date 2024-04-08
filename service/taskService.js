const { where } = require("sequelize");
const db = require("../models");
const newTask= async (data)=>{
    let task =  await db.task.create({userId: data.userId, taskName: data.taskName, taskDescription: data.taskDescription, taskDeadline: data.taskDeadline});
    
    return task;

}
const deleteTask = async(taskId)=>{
    console.log("mai kruga delete");
    try {
        const result = await db.task.findOne({ where: { taskId: taskId } });
        console.log(result);
        if (result) {
            console.log(result);
            await result.destroy();
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
    
}
const updateTaskStatus= async(taskId)=>{
    console.log("mai kruga delete");
    try {
        const result = await db.task.findOne({ where: { taskId: taskId } });
        console.log(result);
        if (result) {
            console.log("Koi to hai bhai yaha");
            const up = await result.update({ taskStatus: "Done" });
            if(up) { console.log("Updated Done");}
            else { console.log("Koi Gadgad hai ");}
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
        
    } 

const getAllTask= async (userId)=>{
    console.log("try to fetch all data");
     return await db.task.findAll({where: {userId:userId}, order: [
        ['taskId', 'DESC']]});

}

module.exports = {newTask, getAllTask, updateTaskStatus, deleteTask};

    


