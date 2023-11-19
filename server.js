import http from 'http';

const port = 5000;

const users = [
  {
    email: 'admin@gmail.com',
    password: 'admin',
    id: 1,
  },
];

const findUser = (currEmail) => users.find(({ email }) => email === currEmail.toLowerCase());
const isMatchPassword = (user) => findUser(user.email).password === user.password;
const nextId = () => Math.max(...Object.keys(users));

// Мой первый сервер =) Надо дополнить JWT, отправлять его и делать для других путей проверку по нему. Сейчас просто пароль отправляется.
const router = {
  POST: {
    '/api/login': (req, res, matches, body) => {
      res.setHeader('Content-Type', 'application/json');
      const data = JSON.parse(body);

      const user = findUser(data.email);
      if (!user) {
        res.statusCode = 409;
        res.end(
          JSON.stringify({
            statusCode: res.statusCode,
            error: 'Conflict',
            message: 'Conflict',
          }),
        );
        return;
      }

      if (!isMatchPassword(data)) {
        res.statusCode = 403;
        res.end(
          JSON.stringify({
            statusCode: res.statusCode,
            error: 'Unauthorized',
            message: 'Unauthorized',
          }),
        );
        return;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ email: user.email, token: user.password }));
    },
    '/api/signup': (req, res, matches, body, users) => {
      res.setHeader('Content-Type', 'application/json');
      const data = JSON.parse(body);

      const user = findUser(data.email);

      if (user) {
        res.statusCode = 409;
        res.end(
          JSON.stringify({
            statusCode: res.statusCode,
            error: 'Conflict',
            message: 'Conflict',
          }),
        );
        return;
      }

      users.push({
        email: data.email.toLowerCase(),
        password: data.password,
        id: nextId(),
      });

      res.statusCode = 201;
      res.end(JSON.stringify({ email: data.email, token: data.password }));
    },
  },
};

const startServer = (router) => {
  const server = http.createServer((request, response) => {
    const body = [];

    request
      .on('data', (chunk) => body.push(chunk.toString()))
      .on('end', () => {
        const { pathname } = new URL(request.url, `http://${request.headers.host}`);

        const routes = router[request.method];
        const result =
          pathname &&
          Object.keys(routes).find((str) => {
            const regexp = new RegExp(`^${str}$`);
            const matches = pathname.match(regexp);
            if (!matches) {
              return false;
            }

            routes[str](request, response, matches, body, users);
            return true;
          });

        if (!result) {
          response.writeHead(404);
          response.end();
        }
      });
  });

  server.listen(port, () => console.log(`server start on ${port}`));
};

startServer(router);
