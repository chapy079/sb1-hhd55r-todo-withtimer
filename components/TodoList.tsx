'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Clock } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  note: string;
  completed: boolean;
  dueDate: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const checkDueDates = setInterval(() => {
      const now = new Date();
      todos.forEach((todo) => {
        if (!todo.completed && todo.dueDate <= now) {
          sendNotification(todo.title);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkDueDates);
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '' && dueDate) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        note: newNote,
        completed: false,
        dueDate: new Date(dueDate),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNewNote('');
      setDueDate('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const sendNotification = (title: string) => {
    toast({
      title: 'Todo Due!',
      description: `It's time to complete: ${title}`,
    });
    // Here you would implement the logic to send a notification to a mobile device or email
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Enter todo title"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Enter note (optional)"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mb-2"
          />
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mb-2"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={addTodo}>Add Todo</Button>
        </CardFooter>
      </Card>

      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                <Label
                  htmlFor={`todo-${todo.id}`}
                  className={todo.completed ? 'line-through' : ''}
                >
                  {todo.title}
                </Label>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {todo.dueDate.toLocaleString()}
              </div>
            </CardTitle>
          </CardHeader>
          {todo.note && (
            <CardContent>
              <p className="text-sm text-gray-600">{todo.note}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}