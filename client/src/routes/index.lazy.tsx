import { createLazyFileRoute } from '@tanstack/react-router'
import { Homepage } from '../ui/pages/landing-page/homepage'

export const Route = createLazyFileRoute('/')({
  component: () => <>
    <Homepage />
  </>,
})
