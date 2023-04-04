const fallback = require('express-history-api-fallback');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));
app.use(fallback(__dirname + '/dist/index.html'))

app.listen(PORT, () => {
  console.log(`Chat app listening on port ${PORT}!`);
});
