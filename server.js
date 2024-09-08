// Import required modules
import pkg from 'json-server';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Destructure necessary functions from the json-server package
const { create, defaults, rewriter, router: _router } = pkg;

// Get the current directory path in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the server
const server = create();
const middlewares = defaults();

// Read and parse the db.json file
const data = JSON.parse(readFileSync(join(__dirname, 'db.json'), 'utf-8'));
const router = _router(data);

// Use default middlewares
server.use(middlewares);

// Use rewriter to customize routes if needed
server.use(
  rewriter({
    "/api/*": "/$1",
  })
);

// Use the router with the in-memory data
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the server for external use
export default server;
