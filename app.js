require('dotenv').config()
const express= require('express')
const app=express()
const authRoute= require('./routes/auth')
const resourceRoute= require('./routes/resources')
const reservationsRoute= require('./routes/reservation')
const createDB= require('./db/createDb')

(async ()=>{
    await createDB().catch((err)=>{
        console.error("error creating database",err);
    })
})
const {initDb}= require('./db/pgDbInIt')
const { authorize, authenticate } = require('./middleware/auth')
// (async ()=>{
//     await createUser();
// })();

// (async ()=>{
//     await initDb().catch((e)=>{
//         console.log(e);
        
//     })
// })
initDb();
app.use(express.json())

app.use('/auth', authRoute)
app.use('/reservations',authenticate,reservationsRoute)
app.use('/resouces',authenticate,authorize,resourceRoute)

app.get('/',(req,res)=>{
    res.send("HIII")
})
const PORT= process.env.PORT||3000
app.listen(PORT, console.log(`Server is listening at port ${PORT}`))