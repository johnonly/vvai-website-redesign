import { redirect } from 'next/navigation'

// The middleware will redirect to /en before this ever renders,
// but keep as a fallback.
export default function RootPage() {
  redirect('/en')
}


