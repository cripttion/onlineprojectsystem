import axios from "axios";
import * as XLSX from "xlsx";

const studentNotRegistered = async (year, semester) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/s/studentNotRegistered?year=${year}&semester=${semester}`
    );
    return response.data.data;
  } catch (error) {
    return ["not get Data"];
  }
};

const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "ProjectData.xlsx");
  };
export  {studentNotRegistered,downloadExcel};
