import exprss from 'express'
import dotnev from 'dotenv'

dotnev.config()

const app = exprss()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Amit')
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`);
    
})