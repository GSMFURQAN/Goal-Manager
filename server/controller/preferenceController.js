import Preference from "../schema/preferencesSchema.js";
export const addPreferences = async (req, res) => {
    const data = req.body;
    try {
        let result = ''
        const existingId = await Preference.find({userId: data.userId})
        if(existingId[0].userId == data.userId){
             result = await Preference.updateOne({userId:data.userId}, {$set:data});
        }else{
            const userPref = new Preference(data)
            result = await userPref.save()
        }
      res.status(201).json(result);
    } catch (error) {
      console.log("error saving the data in db", error);
      res.status(409).json({ message: error.message });
    }
  };

export const getPreferences = async(req, res)=>{
    const params = req.query
    try{
        const result = await Preference.find({userId:params?.userId})
        res.status(201).json(result)
    }catch(error){
        console.log("error saving the data in db", error);
        res.status(409).json({ message: error.message });
    }
}

export const updateMany = async (req, res) => {
  const preference = req.body;
  try {
  const result =  await Preference.updateMany(
      { userId: preference?.userId, 'categories.label': preference.oldValue },
      { $set: { 'categories.$.label': preference?.newValue } }
    );
    res
      .status(201)
      .json({
        message: `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`,
        newValue: preference?.newValue,
      });
  } catch (error) {
    console.log("error saving the data in db", error);
    res.status(409).json({ message: error.message });
  }
};