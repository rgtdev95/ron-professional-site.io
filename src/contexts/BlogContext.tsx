import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  externalUrl: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id'>) => void;
  updateBlog: (id: string, blog: Omit<Blog, 'id'>) => void;
  deleteBlog: (id: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // Change this password
const STORAGE_KEY = 'portfolio_blogs';
const AUTH_KEY = 'portfolio_auth';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedBlogs = localStorage.getItem(STORAGE_KEY);
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
    
    const authStatus = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const saveBlogs = (newBlogs: Blog[]) => {
    setBlogs(newBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBlogs));
  };

  const addBlog = (blog: Omit<Blog, 'id'>) => {
    const newBlog = { ...blog, id: Date.now().toString() };
    saveBlogs([...blogs, newBlog]);
  };

  const updateBlog = (id: string, blog: Omit<Blog, 'id'>) => {
    const updatedBlogs = blogs.map(b => b.id === id ? { ...blog, id } : b);
    saveBlogs(updatedBlogs);
  };

  const deleteBlog = (id: string) => {
    saveBlogs(blogs.filter(b => b.id !== id));
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, isAuthenticated, login, logout }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogs must be used within BlogProvider');
  }
  return context;
};
