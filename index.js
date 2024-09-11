import express from 'express'
import 'dotenv/config'
const app = express();
import userRoutes from "./routes/index.js"

const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("hey postgres...")
})

app.use(userRoutes)

app.listen(PORT, () => console.log(`Server listening to http://localhost:${PORT}`))