import React from 'react'

function StudentDetailsCard({ name, admissionNumber, email, phone }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <div className="text-center sm:text-left sm:flex-grow">
          <div className="mb-4">
            <p className="text-xl leading-tight text-gray-900">{name}</p>
            <p className="text-sm leading-tight text-gray-600">Admission Number: {admissionNumber}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-800">Email: {email}</p>
            <p className="text-gray-800">Phone: {phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailsCard
