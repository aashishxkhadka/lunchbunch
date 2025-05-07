import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '../../ui/admin/dashboard';

export const Route = createFileRoute('/admin/dashboard')({
  component: Dashboard,
});
