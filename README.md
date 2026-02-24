<h1 align="center">Kanban Board Application</h1>

<p align="center">
A modern Kanban Board built with React, TypeScript, Material UI, and dnd-kit.
</p>

<hr/>

<h2> Project Overview</h2>

<p>
This project is a fully interactive Kanban Board application designed to manage tasks
using a multi-column workflow. It demonstrates modern frontend architecture,
server-state management, optimistic UI updates, and advanced drag-and-drop interactions.
</p>

<p>
The application separates <strong>server state</strong> from <strong>UI state</strong>
using React Query and Redux Toolkit following scalable frontend architecture principles.
</p>

<hr/>

<h2>Tech Stack</h2>

<ul>
<li><strong>React</strong></li>
<li><strong>TypeScript</strong></li>
<li><strong>Material UI (MUI)</strong></li>
<li><strong>dnd-kit</strong> — Multi-container drag & drop</li>
<li><strong>Redux Toolkit</strong> — UI interaction state</li>
<li><strong>React Query</strong> — Server state management</li>
<li><strong>json-server</strong> — Mock REST API</li>
</ul>

<hr/>

<h2>Features</h2>

<ul>
<li>Multi-column Kanban board</li>
<li>Drag & Drop between columns</li>
<li>Task reordering</li>
<li>Create Todo</li>
<li>Edit Todo</li>
<li>Delete Todo</li>
<li>Search todos by title</li>
<li>Responsive layout</li>
<li>Scrollable columns</li>
<li>Optimistic updates</li>
<li>Modern Material UI interface</li>
</ul>

<hr/>

<h2>Board Columns</h2>

<ul>
<li>Backlog</li>
<li>In Progress</li>
<li>Review</li>
<li>Done</li>
</ul>

<hr/>

<h2>Architecture</h2>

<h3>State Management Strategy</h3>

<ul>
<li>
<strong>React Query</strong>
<ul>
<li>Fetching todos from API</li>
<li>Handling mutations</li>
<li>Caching and invalidation</li>
<li>Optimistic updates</li>
</ul>
</li>

<li>
<strong>Redux Toolkit</strong>
<ul>
<li>Drag & drop interaction state to fit dnd library</li>
<li>Follow this example: <a href='https://codesandbox.io/p/sandbox/5qwvjf?file=%2Findex.js'>https://codesandbox.io/p/sandbox/5qwvjf?file=%2Findex.js</a></li>
<li>Column organization</li>
<li>UI-only state management</li>
</ul>
</li>
</ul>

<p><strong>Data Flow:</strong></p>

<pre>
Server → React Query Cache → UI State → Components
</pre>

<hr/>

<h2>Data Model</h2>

<pre>
Todo {
  id: string;
  title: string;
  description?: string;
  status: "backlog" | "inProgress" | "review" | "done";
}
</pre>

<hr/>

<h2>API Endpoints</h2>

<ul>
<li>GET /todos</li>
<li>POST /todos</li>
<li>PATCH /todos/:id</li>
<li>DELETE /todos/:id</li>
</ul>

<hr/>

<h2>Installation</h2>

<h3>1. Clone Repository</h3>

<pre>
git clone https://github.com/AhmedElselly/kanban_todolist
cd kanban-board
</pre>

<h3>2. Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>3. Run Mock Backend</h3>

<pre>
npx json-server --watch db.json --port 8000
</pre>

<h3>4. Start Development Server</h3>

<pre>
npm run dev
</pre>

<hr/>

<h2>🎯 Project Goals</h2>

<ul>
<li>Demonstrate modern frontend architecture</li>
<li>Show advanced drag-and-drop handling</li>
<li>Apply scalable state management patterns</li>
<li>Build production-ready UI workflows</li>
</ul>

<hr/>

<h2>👨‍💻 Author</h2>

<p>
<strong>Ahmed Elselly</strong><br/>
Frontend Developer
</p>
