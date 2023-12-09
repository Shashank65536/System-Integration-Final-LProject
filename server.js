const express = require('express');

const app = express();
const port = 3000;
const mainRoutes = require('./routes/mainRoutes');

app.use(express.json());
app.use('/azure-ai', mainRoutes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
