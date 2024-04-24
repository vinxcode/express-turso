const { createClient } = require("@libsql/client");
require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const URL_DB = process.env.TURSO_DATABASE_URL
const AUTH_DB_TOKEN = process.env.TURSO_AUTH_TOKEN

const client = createClient({
    url: URL_DB,
    authToken: AUTH_DB_TOKEN
});

const data = async () => {
    try {
        const rows = await client.execute("SELECT * FROM users")
        return rows.rows
    } catch (error) {
        console.log("Error en la recuperacion de datos ", error)
        return []
    }
}

app.get('/', async (req, res) => {
    try {
        const userData = await data()
        res.json(userData)
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo datos de usuario y gi" })
    }
})

app.listen(PORT, () => {
    console.log('Servidor activo en el puertooooo ', PORT)
})