const PROXY_CONFIG = [{
  context: [
    '/api',
    '/token'
  ],
  target: "http://localhost:37000",
  secure: false,
}];

module.exports = PROXY_CONFIG;
