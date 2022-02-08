const express = require('express');
const path = __dirname + '/app/views';
const app = express();
app.use(express.static(path));
const port = 3001;

app.get('/', (req, res) => {
    res.sendFile(path + "index.html")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})