//TabNine:: new way of multi-line commenting
/*** 
*NextJS setup custom server 
*to use cookie based auth system we need have both client and server running 
*on the same origin/domain. We need to use proxy for that because our client/nextjsis running on *3000 and our server is running on 8000
*/

/***
 * Use proxy in nextjs to use proxy we need to create custome server
 * this is only for development mode in production, we will use same origin/domain so we dont
 * have to worry about it. We can simply run build then start next app 
 * ***/


//Documentation: http://nextjs.org/docs/advanced-features/custom-server
//I used express instead of http because it just better
const express = require('express');
const next = require('next')
const {createProxyMiddleware} = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(()=>{ 
        const server = express()
        //apply proxy in dev mode
        if(dev){
            server.use('/api',createProxyMiddleware({
                target: 'http://localhost:8000',
                changeOrigin:true,
            }))
        }
        server.all('*',(req,res)=>{
            return handle(req,res)
        })
        server.listen(3000,(err)=>{
            if(err)throw err
            console.log("> Ready on http://localhost:8000")
        })
    })
    .catch((err) => {
        console.log('Error: ',err)
    })
