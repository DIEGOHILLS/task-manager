// routes/index.js
import express from 'express';
const router = express.Router();

// Sample data for tasks
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3' }
];

// GET /tasks - List all tasks
router.get('/tasks', (req, res) => {
  res.render('index', { action: '', tasks, task: {} });
});

// GET /tasks/new - Show form to create a new task
router.get('/tasks/new', (req, res) => {
  res.render('index', { action: 'new', tasks, task: {} });
});

// GET /tasks/:id - Show details of a specific task
router.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === Number(id));
  res.render('index', { action: 'show', tasks, task });
});

// GET /tasks/:id/edit - Show form to edit an existing task
router.get('/tasks/:id/edit', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === Number(id));
  res.render('index', { action: 'edit', tasks, task });
});

// POST /tasks - Create a new task
router.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.redirect('/tasks');
});

// PUT /update/:id - Update an existing task
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = {
    id: Number(id),
    title: req.body.title,
    description: req.body.description,
  };
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index !== -1) tasks[index] = updatedTask;
  res.redirect(`/tasks/${id}`);
});

// DELETE /delete/:id - Delete a specific task
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index !== -1) tasks.splice(index, 1);
  res.redirect('/tasks');
});

export default router;
