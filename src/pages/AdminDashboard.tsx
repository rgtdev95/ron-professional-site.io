import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogs, Blog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, ExternalLink, Plus, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { blogs, addBlog, updateBlog, deleteBlog, isAuthenticated, logout } = useBlogs();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    externalUrl: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (editingId) {
      updateBlog(editingId, blogData);
      toast({ title: 'Blog updated successfully' });
    } else {
      addBlog(blogData);
      toast({ title: 'Blog added successfully' });
    }

    resetForm();
  };

  const handleEdit = (blog: Blog) => {
    setIsEditing(true);
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      description: blog.description,
      image: blog.image,
      tags: blog.tags.join(', '),
      externalUrl: blog.externalUrl,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
      toast({ title: 'Blog deleted successfully' });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: '',
      externalUrl: '',
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({ title: 'Logged out successfully' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Blog' : 'Add New Blog'}</CardTitle>
              <CardDescription>
                {isEditing ? 'Update the blog details' : 'Create a new blog post'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, Next.js, TypeScript"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="externalUrl">External Blog URL</Label>
                  <Input
                    id="externalUrl"
                    type="url"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    placeholder="https://yourblog.com/post"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {isEditing ? 'Update Blog' : 'Add Blog'}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Manage Blogs</h2>
            {blogs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No blogs yet. Add your first blog!
                </CardContent>
              </Card>
            ) : (
              blogs.map((blog) => (
                <Card key={blog.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      {blog.title}
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => window.open(blog.externalUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
