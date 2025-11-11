import React, { useState } from 'react';
import CommonTable from '../components/common/SharedTable/CommonTable';
import { Button, DatePicker, Input } from 'antd';

const Termination = () => {
        const [isModalOpen,setIsModalOpen] = useState(false)
    
     const tableColumns =[
        {
        key :'id',
        dataIndex:'id',
        title:"S/L"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Employee Name"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Subject"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Termination Type"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Notice Date"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Termination Date"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Terminated By"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Status"
    },
    {
        id:"id",
        dataIndex:"Action",
        title:"Action",
        render : (record,key) =>(record)
    }
]
const addTerminationButton = (<Button type="primary" onClick={()=> setIsModalOpen(true)} >Add New Termination</Button>)
 const handleSubmit = (values) => {
        console.log('Form values:', values);
        // addWarning(values);
        setIsModalOpen(false);
    };
const formModal ={
isModalOpen,
  setIsModalOpen,
  onSubmit: handleSubmit,
//   editingDept,
  title:'Add Warning',
 fieldLabel:[
    {
    name:'employee_name',
    isRequired:true,
    label:"Employee Name",
    component : <Input/>
  },
   {
    name:'warning_type',
    isRequired:true,
    label:"Termination Type*",
    component : <Input/>
  }, {
    name:'subject',
    isRequired:true,
    label:"subject",
    component : <Input/>
  }, {
    name:'warning_by',
    isRequired:true,
    label:"Terminated By",
    component : <Input/>
  }, {
    name:'warning_date',
    isRequired:true,
    label:"Notice Date",
    component : <DatePicker/>
  }, 
  {
    name:'warning_date',
    isRequired:true,
    label:"Termination Date",
    component : <DatePicker/>
  }, 
  {
    name:'Description',
    isRequired:true,
    label:"Description",
    component : <Input/>
  },
  ],}

    return (
        <CommonTable
            title=" Warning List"
            // data={warnings}
            columns={tableColumns}
            showSearch={true}
            showFilters={true}
            // filters={employeeFilters}
            // onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // onRefresh={handleRefresh}
            searchPlaceholder="Search.."
            extraButtons={addTerminationButton}
            deleteModal={null}
            formModal={formModal}
        />
    );
}

export default Termination;
