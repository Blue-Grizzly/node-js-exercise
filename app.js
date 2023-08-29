import http from "node:http";
import fs from "fs/promises";

const app = http.createServer(async (request, response) => {
    if (request.url === "/" && request.method === "GET"){
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");    
        response.end("Home");
    } else if (request.url === "/posts" && request.method === "GET"){
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");    
        const json = await fs.readFile("data/posts.json");
        response.end(json);
    } else if (request.url === "/users" && request.method === "GET"){
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");    
        const json = await fs.readFile("data/users.json");
        response.end(json);
    } else if (request.url === "/users" && request.method === "POST"){

        const newUser = {id: new Date().getTime(), image: "url", mail: "email", name: "name", title: "title"}

        const json = await fs.readFile("data/users.json");

        const users = JSON.parse(json);

        users.push(newUser);

        const newList = JSON.stringify(users);

        await fs.writeFile("data/log.txt", newList);
        
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");    
        response.end(newList);
    }
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`The server is live on http://localhost:${port}`);
});