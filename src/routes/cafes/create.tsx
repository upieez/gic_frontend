import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/create')({
  component: () => <div>Hello /cafes/create!</div>,
})
