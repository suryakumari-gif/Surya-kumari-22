import React, { useEffect } from 'react'
import { useState } from 'react';
import {useTypewriter,Cursor} from 'react-simple-typewriter'
import {Link} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeListComponent() 
{
    const [text] = useTypewriter({
        words: ["List", "Details", "Info"],
        loop:true,
        typeSpeed:120,
        deleteSpeed:80
    })

  const [employees,setEmployees]= useState([]);

  useEffect(()=>{

    EmployeeService.getEmployees().then(res=>{
        setEmployees(res.data);
    })

  },[])

const deleteEmployee=(id)=>{
    EmployeeService.deleteEmployee(id).then(res=>{
        EmployeeService.getEmployees().then(res=>{
            setEmployees(res.data)
        }).catch(error=>{
            console.log(error);
        })
    })
}


  return (
    <div className='container mt-3'>
        <h4 className='text-center'> Employee {text}<Cursor/> </h4>
        <div className='row mt-5'>
            <Link to="/add-employee" className='btn btn-warning w-25 mb-3'> Add Employee</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name </th>
                        <th>DOJ</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>{
                            return <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.doj}</td>
                                        <td>{employee.dept.deptName}</td>
                                        <td>{employee.dept.designation}</td>
                                        <td>
<Link to={`/update-employee/${employee.id}`} className='btn btn-secondary'> update </Link> 

<button className='btn btn-danger' style={{marginLeft:"5px"}} onClick={()=> deleteEmployee(employee.id)}> delete </button>
                                        </td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EmployeeListComponent
