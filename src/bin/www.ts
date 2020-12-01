import http from "http";
import app from "../app";

const getMultiLine = (f: any) => {
  var lines = f.toString();
  return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
};

var console_text = function () {
  /*



                                   |~~~~~~~|
                                   |       |
                                   |       |
                                   |       |
                                   |       |
                                   |       |
        |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
        |  \  o \_         ,XXXXX),                         _..-~ o /  |
        |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
         ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
                  `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
                    ~-.       `:;;/;; \          _..-~~
                       ~-._      `''        /-~-~
                           `\              /  /
                             |         ,   | |
                              |  '        /  |
                               \/;          |
                                ;;          |
                                `;   .       |
                                |~~~-----.....|
                               | \             \
                              | /\~~--...__    |
                              (|  `\       __-\|
                              ||    \_   /~    |
                              |)     \~-'      |
                               |      | \      '
                               |      |  \    :
                                \     |  |    |
                                 |    )  (    )
                                  \  /;  /\  |
                                  |    |/   |
                                  |    |   |
                                   \  .'  ||
                                   |  |  | |
                                   (  | |  |
                                   |   \ \ |
                                   || o `.)|
                                   |`\\) |
                                   |       |
                                   |       |



   */
};

const port = 3000;
const server = http.createServer(app.callback());

const onListening = () => {
  console.log("服务成功启动 ~");
};

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " 需要提升的权限");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " 已经在使用中");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
