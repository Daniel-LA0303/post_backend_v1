const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require("path");
const multer = require('multer');
// const routes = require('./routes')

//1.crear servidor
const app = express();

//5. Conectar a la Db
conectarDB();

//HABILITAR LA CARPETA PUBLICA
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

//41. hanilitar cors
app.use(cors());

//2.puerto de la app
const port = process.env.PORT || 4000;

//10. habilitar leer los valores de un body
app.use(express.json());

//configuracion de imagenes
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads")
    }, filename:(req, file, cb) =>{
        cb(null, req.body.name);
    }  
});
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("imagen"), (req, res) => {
    res.status(200).json("File has been uploaded")
})
//rutas de la app
//6.
app.use('/api/gallery', require('./routes/images'));

//3.arrancar la app
app.listen(port,'0.0.0.0', () => {
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
})
