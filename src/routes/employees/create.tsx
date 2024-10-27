import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/create')({
  component: () => <div>Hello /employees/create!</div>,
})
