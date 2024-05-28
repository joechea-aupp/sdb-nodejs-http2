import http2 from "http2";

// create an empty array to store books records
let books = [];
const server = http2.createServer();

// handler that will be called when a POST request is made
const postBook = (stream, headers) => {
  let body = "";
  stream.on("data", (data) => {
    body += data;
  });

  stream.on("end", () => {
    let responseMessage = "";

    // when parse stream to json, it will be an object
    body = JSON.parse(body);

    // check if the book is already exist
    books.find(
      (book) => book.title === body.title && book.author === body.author,
    )
      ? (responseMessage = "Book already exist")
      : books.push(body);

    stream.respond({ ":status": 200 });

    stream.end(responseMessage);
    console.log(books);
  });
};

// handler that will be called when a GET request is made
const notFoundHandler = (stream, headers) => {
  stream.respond({ ":status": 404 });
  stream.end("Page not found!");
};

// logic to determine which handler to call
const router = (stream, headers) => {
  console.log(headers);
  const path = headers[":path"];
  const method = headers[":method"];
  let handler;

  if (path === "/" && method === "POST") {
    handler = postBook;
  } else {
    handler = notFoundHandler;
  }

  handler(stream, headers);
};

// action for server to take when stream event is emitted
server.on("stream", router);

// start server on port 8000
server.listen(8000);
