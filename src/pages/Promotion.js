import React, { useState } from 'react';
import CommonTable from '../components/common/SharedTable/CommonTable';
import { Button, DatePicker, Input } from 'antd';

const Promotion = () => {
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
        title:"Promotion Date"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Promoted Department"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Promoted Designation"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Promoted Pay Grade"
    },
     {
        key :'id',
        dataIndex:'id',
        title:"Promoted Salary"
    },
]
const addPromotionButton = (<Button type="primary" onClick={()=> setIsModalOpen(true)} >Add New Termination</Button>)
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
    label:"Current Department",
    component : <Input/>
  }, {
    name:'subject',
    isRequired:true,
    label:"Current Designation",
    component : <Input/>
  }, {
    name:'warning_by',
    isRequired:true,
    label:"Current Pay Grade",
    component : <Input/>
  }, {
    name:'warning_date',
    isRequired:true,
    label:"Current Salary",
    component : <DatePicker/>
  }, 
  {
    name:'warning_date',
    isRequired:true,
    label:"Promoted Pay Grade",
    component : <DatePicker/>
  }, 
  {
    name:'warning_date',
    isRequired:true,
    label:"promotion.new_salary",
    component : <DatePicker/>
  }, {
    name:'warning_date',
    isRequired:true,
    label:"Promoted Department",
    component : <DatePicker/>
  }, {
    name:'warning_date',
    isRequired:true,
    label:"Promoted Designation",
    component : <DatePicker/>
  }, {
    name:'warning_date',
    isRequired:true,
    label:"Promotion Date",
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
            title=" Add Employee Promotion"
            // data={warnings}
            columns={tableColumns}
            showSearch={true}
            showFilters={true}
            // filters={employeeFilters}
            // onSearch={handleSearch}
            // onFilterChange={handleFilterChange}
            // onRefresh={handleRefresh}
            searchPlaceholder="Search.."
            extraButtons={addPromotionButton}
            deleteModal={null}
            formModal={formModal}
        />
    );
}

export default Promotion;
