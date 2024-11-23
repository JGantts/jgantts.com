const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const jgantts_com_Path = path.join(__dirname, '../jgantts-com')

// Serve static files from the dist directory
app.use(express.static(path.join(jgantts_com_Path, 'PUBLIC')));

// Serve the index.html file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(jgantts_com_Path, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
