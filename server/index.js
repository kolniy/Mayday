const path = require('path');
const express = require('express');
const app = express();
const DistPath = path.join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000

app.use(express.static(DistPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(DistPath, 'index.html'))
})

app.listen(port, () => {
    console.log('App is running on port 3000');
});