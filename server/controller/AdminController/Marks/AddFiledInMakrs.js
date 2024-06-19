const sequelize = require('./../../../config/sequelize');
const ReviewerMarks = require("./../../../models/GuideMarks")(sequelize);


const addParameterToMakrs = async(req,res)=>{
    const { ColumnName} = req.body;
  try {
    
      await sequelize
      .query(
        `ALTER TABLE Marks ADD COLUMN ${ColumnName} VARCHAR(200) DEFAULT "0";`
      )
      .then(() => {
        return res.status(201).json({ message: "Column added successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error });
      });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
}


module.exports = addParameterToMakrs;