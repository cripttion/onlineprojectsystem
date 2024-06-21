import student from './../assests/images/Icons/student.png';
import teacher from './../assests/images/Icons/teacher.png';
import teacher2 from './../assests/images/Icons/teacher(1).png';
import project from './../assests/images/Icons/solution.png';

const homeData = [
    {src: student, title: 'Add Student', toRoute: '/a/addStudent' ,category:['Admin'],relatedTo:['Student']},
    // {src: student, title: 'Update Student Data', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Student']},
    {src: student, title: 'Not Registered', toRoute: '/a/not-registered' ,category:['Admin'],relatedTo:['Student']},

    {src: teacher, title: 'Add teacher', toRoute: '/a/addTeacher',category:['Admin'],relatedTo:['Teacher']},
    {src: teacher, title: 'Supervisor details', toRoute: '/a/allocated-guide',category:['Admin'],relatedTo:['Teacher']},

    // {src: teacher2, title: 'Update Teacher Data', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Teacher']},
    {src: project, title: 'Create Project Group', toRoute: '/project/createProject',category:['Admin','Student','Guide'],relatedTo:['Projects']},
    {src: student, title: 'Projects Data', toRoute: '/projects/projectData',category:['Admin'],relatedTo:['Projects']},
    {src: student, title: 'Research papers', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Projects']},
    {src: student, title: 'Marks Setting', toRoute: '/a/marks-setting',category:['Admin'],relatedTo:['Projects']},

    // {src: teacher2, title: 'Allocate Guide', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Guide']},
    // {src: teacher, title: 'Allocate Reviewer', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Reviewer']},
    {src: teacher, title: 'Project Guides', toRoute: '/g/allProjects',category:['Teacher'],relatedTo:['Guide']},
    {src: teacher, title: 'Project Reviewes ', toRoute: '/r/allProjects',category:['Teacher'],relatedTo:['Reviewer']},
    {src: teacher, title: 'Update Guide', toRoute: '/a/updateGuide',category:['Admin'],relatedTo:['Guide']},

    {src: teacher, title: 'Update Reviewer ', toRoute: '/s/addStudeent',category:['Admin'],relatedTo:['Reviewer']},

    {src:project,title:'My project',toRoute:'/projects/myProject/Student',category:['Student'],relatedTo:['Students']}
  ];
  
  export default homeData;