import express from 'express'
import ejs from 'ejs'
import os, { platform } from 'os'
import path, { join } from 'path'
import { fileURLToPath } from 'url';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/view'));

app.use(express.static(path.join(__dirname,'src')))

app.get('/',(req,res)=>{
    
    const osInfo = {
        nameOS: os.type(),
        platformOS: os.platform(),
        archOS: os.arch(),
        releaseOS: os.release(),
    }
    res.render('index',{osInfo: osInfo })

})


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running in PORT http://localhost:${PORT}`)
})