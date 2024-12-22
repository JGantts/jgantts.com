const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const jgantts_com_Path = path.join(__dirname, '../jgantts-com')
const jgantts_conlangiii_Path = path.join(__dirname, '../conlangiii')

app.get('*', (req, res) => {
  res.sendStatus(500)
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
