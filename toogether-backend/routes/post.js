const express = require('express');
const router = express.Router();

async function createPost(req,body) {
    console.log(req.body);


}


router.post('', createPost);
module.exports = router;