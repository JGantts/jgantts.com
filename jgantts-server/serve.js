const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const jgantts_com_Path = path.join(__dirname, '../jgantts-com')
const jgantts_conlangiii_Path = path.join(__dirname, '../conlangiii')


app.use('/conlangiii/assets', express.static(path.join(jgantts_conlangiii_Path, 'dist', 'assets')));
app.use('/conlangiii/', express.static(path.join(jgantts_conlangiii_Path, 'dist')));
app.get('/conlangiii*', (req, res) => {
  res.sendFile(path.join(jgantts_conlangiii_Path, 'dist', 'index.html'));
});

// Serve static files from the dist directory
app.use('/assets', express.static(path.join(jgantts_com_Path, 'dist', 'assets')));
app.use(express.static(path.join(jgantts_com_Path, 'PUBLIC')));


// Serve the index.html file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(jgantts_com_Path, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
