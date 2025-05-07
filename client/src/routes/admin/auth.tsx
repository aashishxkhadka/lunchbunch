import { createFileRoute } from '@tanstack/react-router'
import Login from '../../ui/auth/login'

export const Route = createFileRoute('/admin/auth')({
  component: () => <>
    <Login/>
  </>,
})
