import http2 from "http2";

const server = http2.createServer();

server.on("error", (err) => console.log(err));

server.on("stream", (stream, headers) => {
  stream.respond({ ":status": 200 });
  stream.write("Hello World");
  stream.end();
});

server.listen(8000);
