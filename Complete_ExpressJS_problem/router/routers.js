const express=require("express")
const router=express.Router();
const connection=require("../db/dbconnect")

router.get("/employee",function(req,resp){
    connection.query("select * from employee",(err,data)=>{
        if(err)
        {
            resp.status(500).send("data not found" + JSON.stringify(err))
        }else
        {
            resp.send(data)
        }
    })
})

router.get("/employees/employee/:empid",function(req,resp){
    connection.query("select * from employee where empid=?",[req.params.empid],(err,data)=>{
    
        if(err)
        {
            resp.status(500).send("id not found" + JSON.stringify(err))
        }
        else{
            resp.send(data[0])
        }
    }
    )
})

router.post("/employee/emps/:empid",function(req,resp){
    var empid=req.body.empid
    var ename=req.body.ename
    var sal=req.body.sal
    connection.query("insert into employee values (?,?,?)",[empid,ename,sal],(err,result)=>{
    if(err)
    {
        resp.status(500).send("employee not inserted" + JSON.stringify(err))
    }
    else{
        if(result.affectedRows>0)
        resp.send("inserted successfully")
        else
        resp.send("not inserted")
    }

})
})

router.put("/employee/update/:eid",function(req,resp){
    var empid=req.body.empid
    var ename=req.body.ename
    var sal=req.body.sal
    connection.query("update employee set sal=? , ename=? where empid=?" ,[sal,ename,empid],(err,result)=>{
    if(err)
    {
        resp.status(500).send("employee not updated" + JSON.stringify(err))
    }
    else{
         if(result.affectedRows>0)
        resp.send("updated successfully")
        else
        resp.send("not updated")
    }
})
    })

router.delete("/emplpyee/delete/:eid" ,function(req,resp){
    connection.query("delete from employee where empid=?",[req.params.eid],(err,result)=>{
    if(err)
    {
        resp.status(500).send("not deleted" + JSON.stringify(err))
    }
   else{
    if(result.affectedRows > 0)
    
        resp.send("delete succesfully")
    else
    resp.status(500).send("not deleted")

   }   
})

})
module.exports=router;