import TodoList from '@/components/TodoList';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo App with Timers</h1>
      <TodoList />
      <Toaster />
    </main>
  );
}