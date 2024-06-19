const sequelize = require('./../../../config/sequelize');
const GuideMarks = require("./../../../models/GuideMarks")(sequelize);


const addParameterToGuideMakrs = async(req,res)=>{
    const { ColumnName } = req.body;
  try {
    
      await sequelize
      .query(
        `ALTER TABLE GuideMarks ADD COLUMN ${ColumnName} VARCHAR(200) DEFAULT "0";`
      )
      .then(() => {
        return res.status(201).json({ message: "Column added successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error:error.message});
      });

    
   return res.status(400).json({message:"unable to add the Column"});
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
}


module.exports = addParameterToGuideMakrs;