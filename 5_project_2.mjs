import http2 from "http2";

const session = http2.connect("http://localhost:8000");

session.on("error", (err) => console.log(err));

const req = session.request({ ":path": "/", ":method": "POST" });
req.write(
  JSON.stringify({
    title: "Nice Guys Finish Last",
    author: "Frank Doe",
  }),
  "utf8",
);

req.end();

req.on("response", (headers) => {
  console.log(headers);
});

req.setEncoding("utf8");

req.on("data", (data) => {
  console.log(data);
});
