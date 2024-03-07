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

module.exports= {notRegistered};