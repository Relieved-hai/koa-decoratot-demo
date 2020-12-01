import { ctxType, nextType } from "../../conf/type/route";
import { get, controller } from "../../decorator";

@controller('/')
export class ViewPage {
  @get('/')
  getData(ctx: ctxType, next: nextType) {
    ctx.body = `<html>
          <body>
            <form method="post" action="/login">
              <input type="password" name="password">
              <button>登录</button>
            </form>
          </body>
        </html>`
  }

  @get('/jwt-login')
  jwtLogin(ctx: ctxType, next: nextType) {
    ctx.body = `<html>
                  <head>
                    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
                    </script>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                  </head>
                  <body>
                    <div id="app">
                      <div>
                        <input v-model="username"/>
                        <input v-model="password"/>
                      </div>
                      <div>
                        <button v-on:click="login">Login</button>
                        <button v-on:click="logout">Logout</button>
                        <button v-on:click="getUser">GetUser</button>
                      </div>
                      <div>
                        <button @click="logs=[]">Clear Log</button>
                      </div>
                      <!-- ⽇日志 -->
                      <ul>
                        <li v-for="(log,idx) in logs" :key="idx">
                          {{ log }}
                        </li>
                      </ul>
                    </div>
                    <script>
                      axios.interceptors.request.use(
                        config => {
                          const token = window.localStorage.getItem("token");
                          if (token) {
                            // 判断是否存在token，如果存在的话，则每个http header都加上token // Bearer是JWT的认证头部信息
                            config.headers.common["Authorization"] = "Bearer " + token;
                          }
                          return config;
                        },
                        err => {
                          return Promise.reject(err);
                        });
                    
                      axios.interceptors.response.use(
                        response => {
                          app.logs.push(JSON.stringify(response.data));
                          return response;
                        },
                        err => {
                          app.logs.push(JSON.stringify(response.data));
                          return Promise.reject(err);
                        });
                      
                      var app = new Vue({
                        el: "#app",
                        data: {
                          username: "test",
                          password: "test",
                          logs: []
                        }, 
                        methods: {
                          login: async function () {
                            const res = await axios.post("/jwt/login-token", {
                              username: this.username,
                              password: this.password
                            });
                            console.log(res.data);
                            localStorage.setItem("token", res.data.token);
                          },
                          logout: async function () {
                            localStorage.removeItem("token");
                          },
                          getUser: async function () {
                            await axios.get("/jwt/getUser-token");
                          }
                        }
                      });
                    </script>
                  </body>
                </html>
`}


  @get('/oauth-login')
  getOAuth(ctx: ctxType, next: nextType) {
    ctx.body = `<html>
                  <head>
                    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                  </head>
                  <body>
                    <div id="app">
                      <a href='/oauth/github/login'>login with github</a>
                    </div>
                  </body>
                </html>`
  }
}
