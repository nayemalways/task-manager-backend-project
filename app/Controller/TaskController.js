import TaskModel from "../model/TaskModel.js";

// Create Task
export const createTask = async (req, res) => {
    const user_id = req.headers["user_id"];
    const reqBody = req.body;
    reqBody.user_id = user_id; // Set user id to Data Model
    const data = await TaskModel.create(reqBody); // Inserted data in the DB
 
    if(!data || data.length === 0){
        res.json({status: "Failed", message: "Couldn't create task!"});
    }else{
        res.json({status: "Success", data: data});
    }
};

// Update Task
export const updateTaskStatus = async (req, res) => {
    try {
        const user_id = req.headers["user_id"];
        const id = req.params.id;
        const status = req.params.status;
        const data = await  TaskModel.updateOne({_id: id, user_id: user_id},  {status: status});
 
        if (!data || data.modifiedCount === 0) {
            res.json({status: "failed", message: "Couldn't update task!"});
        }else{
        res.json({status: "Success", data: data});
        }
    }catch (e) {
         res.json({status: "Error", error: e.toString()});
    }
}

// Update Task
export const taskListByStatus = async (req, res) => {
    try {
        const status = req.params["status"];
        const user_id = req.headers["user_id"];
        const data = await TaskModel.find({user_id: user_id, status: status});

        if(data.length === 0){
            res.json({status: "failed", message: "No data found!"});
        }else{
            res.json({status: "Success", data: data})
        }
    }catch(e) {
        res.json({status: "Error", error: e.toString()});
    }
};

//  Delete Task
export const DeleteTask = async (req, res) => {
    try {
        const user_id = req.headers["user_id"];
        const id = req.params["id"];
        const data = await TaskModel.deleteOne({_id: id, user_id: user_id});

        if(data.deletedCount === 0) {
            res.json({status: "failed", message: "Couldn't deleted!"});
        }else{
            res.json({status: "Success", data: data});

        }
    }catch(e) {
        res.json({status: "Error", error: e.toString()});
    }
};

// Count Task
export const CountTask = async (req, res) => {
    res.json({status:"Success", message: "user countTask successful"});
}