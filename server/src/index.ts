import express from 'express';
import proxy from 'express-http-proxy'

const dotenv = require('dotenv')

const app = express();
const PORT = (process.env.PORT as any) || 3000;

app.use('/', (req, res, next) => {
    let segments = req.path.split('/');
    const id = segments[1];

    if(id.includes('api')) {
        console.log("yeet")
        next();
        return;
    }

    segments = segments.slice(2);
    let url = '/' + segments.join('/');
    console.log(req.url)
    proxy('grindr.mobi', {
        parseReqBody: false,
        proxyReqPathResolver: ((req) => {
            return url;
        }),
    })(req, res, next);
})

app.get('/api', (req, res) => {
    res.send({'yeer': 'yeet'})
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Is running at port: ${PORT}`)
});