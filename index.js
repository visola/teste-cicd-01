const express = require('express')
const app = express()
const port = 3000

const calculator = require('./calculator');

app.use(express.static('public'))

app.get('/calculate', (req, res) => {
    console.log(req.query, req.query.operand1, req.query.operand2, req.query.operator);
    const result = calculator.calculate(req.query.operand1, req.query.operand2, req.query.operator);
    console.log(result);
    res.json({
        result
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
