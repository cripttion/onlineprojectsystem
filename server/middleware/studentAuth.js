function isStudentValid(req, res, next) {
    const { isValidUser, role } = req.session || {};
    if (role === 'student' && isValidUser) {
        next();
    } else {
        return res.json({ message: "Unauthorized user! Forbidden" });
    }
}

module.exports = isStudentValid;
