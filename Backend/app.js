import express from "express";
import bodyParser from "body-parser";
import pets from "./src/routes/pets.router.js"
import users from "./src/routes/users.router.js"
import cors from "cors"
import path, { dirname, join } from 'path'
import { fileURLToPath } from "url";
import validar from "./src/routes/validator.router.js"

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use('/public', express.static(path.join(__dirname, 'src/public/uploads/')));

console.log('Serving static files from:', path.join(__dirname, 'public/uploads/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/pets", pets);
app.use("/users", users)
app.use("/", validar)


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.get('/document', (req, res) => {
    res.render('document.ejs');
});




app.listen(3000, () => {
  console.log("Funcionando en el puerto 3000");
});
