function notRegistered(year,semester){
    let query = `SELECT s.AdmissionNumber, s.Name ,s.Email,s.Phone  
    FROM Students AS s 
    WHERE s.AdmissionNumber `;

    
    query += `NOT IN (
        SELECT StudentID from 
        ProjectMembers)`
      

    if (year) {
        query += `AND s.Year = :year`;
    }

    if (semester&&year) {
        query += ` AND s.Semester = :semester`;
    }
  return query;
}


function allProjectDataQuery(year, semester, course, branch ){
    let query =
    "SELECT p.ProjectID,p.Year, p.ProjectTitle, g.Name as superviorName, g.TeacherID as SupervisorID , g.Position, g.Phone as SupervisorPhone ,g.Email as SupervisorEmail, g.Cabin as SupervisorCabin, s.Name, s.AdmissionNumber, s.Email, s.Phone FROM Projects AS p JOIN Teachers AS g ON p.GuideID = g.TeacherID JOIN ProjectMembers AS m ON p.ProjectID = m.ProjectID JOIN Students AS s ON m.StudentID = s.AdmissionNumber";
  let whereClause = [];
  let replacements = {};

  if (year) {
    whereClause.push("p.year = :year");
    replacements.year = year;
  }
  if (semester) {
    whereClause.push("p.semester = :semester");
    replacements.semester = semester;
  }
  if (course) {
    whereClause.push("s.course = :course");
    replacements.course = course;
  }
  if (branch) {
    whereClause.push("s.branch = :branch");
    replacements.branch = branch;
  }

  if (whereClause.length > 0) {
    query += " WHERE " + whereClause.join(" AND ");
  }
  return {query,replacements}

  }
module.exports= {notRegistered,allProjectDataQuery};