import { createFileRoute } from '@tanstack/react-router'
import { UserAuthentication } from '../ui/auth/user-auth'

export const Route = createFileRoute('/auth')({
  component: () => <UserAuthentication />,
})
