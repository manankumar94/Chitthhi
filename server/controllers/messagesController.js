import messageModel from "../models/messageModel.js";

class MessageController{
    static addMessage = async (req, res, next)=>{
        try {
            const{from, to, message } = req.body;
            const data= await messageModel.create({
                message: {text: message},
                users: [from, to],
                sender: from,
            })

            if(data) {
                return res
                        .status(200)
                        .json({msg: "Message Added Successfully"});
            } else return res
                            .status(400)
                            .json({msg: "Failed to Add Messages to Database"});
        } catch (error) {
            next(error);
        }
    }

    static getAllMessage = async (req, res, next)=> {
        try {
            const {from, to}= req.body;
            const messages = await messageModel.find({
                users: {
                    $all: [from, to],
                },
            }).sort({updatedAt: 1});

            const projectedMessages = messages.map((msg) =>{
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                }
            })
            return res.status(200)
                      .json(projectedMessages);
        } catch (error) {
            next(error);
        }
    }
}

export default MessageController;