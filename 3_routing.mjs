import http2 from "http2";

const helloHander = (stream, headers) => {
  console.log({ headers });
  stream.respond({ ":status": 200 });
  stream.end("Jello world!");
};

const notFoundHandler = (stream, headers) => {
  stream.respond({ ":status": 404 });
  stream.end("Page not found!");
};

const server = http2.createServer();

const router = (stream, headers) => {
  const path = headers[":path"];
  const method = headers[":method"];

  let handler;

  if (path === "/" && method === "GET") {
    handler = helloHander;
  } else {
    handler = notFoundHandler;
  }

  handler(stream, headers);
};

server.on("stream", router);
server.listen(8000);
