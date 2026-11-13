import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/routes/home';
import Generator from '@/routes/generator';
import Upload from '@/routes/upload';
import Submissions from '@/routes/submissions';
import Editor from '@/routes/editor';
import User from '@/routes/user';
import Directory from '@/routes/directory';
import Documents from '@/routes/documents';
import Login from '@/routes/login';
import SetPreview from '@/routes/setPreview';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/set Preview" element={<SetPreview />} />
          <Route path="/user" element={<User />} />
          <Route path="/directory" element={<Directory />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
