const express = require('express');
const router = express();
const fs = require('fs');

router.get('/crush', (req, res) => {
  fs.readFile('./crush.json', 'utf8', async (err, data) => {
    return res.send(data)
    
  })
})



module.exports = router