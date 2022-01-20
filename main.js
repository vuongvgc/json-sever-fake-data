const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const queryString = require('query-string');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  switch (req.method) {
    case 'POST':
      req.body.createdAt = Date.now();
      req.body.updatedAt = Date.now();
      break;
    case 'PATCH':
      req.body.updatedAt = Date.now();
    default:
      break;
  }
  next();
});

// Custom response
router.render = (req, res) => {
  // Get header
  let header = res.getHeaders();
  const totalCountHeader = header['x-total-count'];
  // return data and pagination
  if (req.method === 'GET' && totalCountHeader) {
    // check if method get have _limit or _page => get query
    const query = queryString.parse(req._parsedUrl.query);
    let result = {
      data: res.locals.data,
      pagination: {
        pageSize: Number.parseInt(query._limit) || 1,
        current: Number.parseInt(query._page) | 1,
        total: Number.parseInt(totalCountHeader) | 0,
      },
    };
    return res.jsonp(result);
  }
  // Otherwise return default
  res.jsonp({
    data: res.locals.data,
  });
};

// Use default router
const PORT = process.env.PORT || 3000;
server.use('/api', router);
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
