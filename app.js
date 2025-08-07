import express from 'express'
import path, { join } from 'path'
import { fileURLToPath } from 'url';
import si, { osInfo } from 'systeminformation'


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/view'));


app.use(express.static(path.join(__dirname,'src')))


app.get('/', async (req,res)=>{
    try{
        const cpuInfo = await si.cpu()
        const memoryInfo = await si.mem()
        const typeMemory = await si.memLayout()
        const osInfo = await si.osInfo()
        const nameOsInfo = await si.users() 
        const newtworkInfo = await si.networkInterfaces()

        res.render('index',{osInfo,cpuInfo,memoryInfo,typeMemory,osInfo,nameOsInfo,newtworkInfo})
    }catch(e){
        console.log(e)
        res.status(500).send(`Error al solicitar información del sistema`)
    }    
})

// app.use((req,res)=>{
//     res.status(404).render(path.join(__dirname, './src/view/404.ejs'))
// })

app.use((req,res)=>{
    res.status(404).sendFile(process.cwd() + '/src/view/404.html')
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running in PORT http://localhost:${PORT}`)
})