const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

let threads = []; // In-memory storage for threads (no database)

app.get('/api/threads', (req, res) => {
    res.json(threads);
});

app.post('/api/threads', (req, res) => {
    const { title, content } = req.body;
    const newThread = { id: threads.length + 1, title, content };
    threads.push(newThread);
    res.json(newThread);
});

app.get('/thread/:id', (req, res) => {
    const thread = threads.find(t => t.id === parseInt(req.params.id));
    if (thread) {
        res.json(thread);
    } else {
        res.status(404).send('Thread not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
