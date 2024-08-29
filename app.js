// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'; // For PUT and DELETE methods

const app = express();
const port = 3000;

// Resolve __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride('_method')); // Override HTTP methods
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import and use routes
import indexRouter from './routes/index.js';
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
