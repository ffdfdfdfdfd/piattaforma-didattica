import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}