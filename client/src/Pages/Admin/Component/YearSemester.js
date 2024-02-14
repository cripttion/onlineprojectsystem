import React, { useState } from 'react';
import Select from 'react-select';

function YearSemester({ studentData, setStudentData }) {

  const optionsYear = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];
  const [visibleSemesters,setVisibleSemesters] = useState([]);
  const handleChange = (value, field) => {
    let isYearSelected = false;


    if (field === 'Year') {
      isYearSelected = true;

      if (value === 1) {
        setVisibleSemesters([1, 2]);
       
      } else if (value === 2) {
        setVisibleSemesters([3, 4]);
      } else if (value === 3) {
        setVisibleSemesters([5, 6]);
      } else if (value === 4) {
        setVisibleSemesters([7, 8]);
      }

      setStudentData(prevData => ({
        ...prevData,
        [field]: value,
      
        visibleSemesters,
        Semester: null,
      }));
    } else {
      setStudentData(prevData => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const optionsSemester = visibleSemesters.map((sem) => ({
    value: sem,
    label: sem.toString(),
  }));

  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <label className="block mb-4 ">
        <span className="text-gray-700">Year:</span>
        <Select
          
          className="text-black w-60 border-gray-400"
          options={optionsYear}
          value={optionsYear.find(option => option.value === studentData.Year)}
          onChange={selectedOption => handleChange(selectedOption.value, 'Year')}
          isSearchable={false}
          styles={{
            control: (provided, state) => ({
              ...provided,
              height: '42px',
              outline: state.isFocused ? '2px solid black' : 'none',
              borderRadius: '7px',
              marginTop: '4px',
            }),
          }}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Semester:</span>
        <Select
         
          className="text-black w-60"
          options={optionsSemester}
          value={optionsSemester.find(option => option.value === studentData.Semester)}
          onChange={selectedOption => handleChange(selectedOption.value, 'Semester')}
          isSearchable={false}
          styles={{
            control: (provided, state) => ({
              ...provided,
              height: '42px',
              outline: state.isFocused ? '2px solid black' : 'none',
              borderRadius: '7px',
              marginTop: '4px',
            }),
          }}
        />
      </label>
    </div>
  );
}

export default YearSemester;
