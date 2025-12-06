'use client'

// Dashboard Layout Component
// Following coding standards: Rule 30, Rule 31, Rule 104

import { useState, useEffect } from 'react'
import { BookOpen, Calculator, BarChart3, Briefcase, LogOut, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authService } from '@/services'
import { LoginView } from '@/components/auth/login-view'
import { WorkshopView } from '@/components/workshop/workshop-view'
import { AuditTools } from '@/components/audit/audit-tools'
import { Scorecard } from '@/components/scorecard/scorecard'
import { ReportsView } from '@/components/reports/reports-view'
import type { ViewType, UserProfile } from '@/types'

interface NavItemProps {
  id: ViewType
  icon: JSX.Element
  label: string
  active: boolean
  onClick: () => void
}

function NavItem({ id, icon, label, active, onClick }: NavItemProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col md:flex-row items-center gap-2 px-4 py-3 rounded-lg transition-all ${
        active
          ? 'bg-primary text-primary-foreground shadow-lg'
          : 'text-primary-foreground/80 hover:bg-primary/80'
      }`}
    >
      {icon}
      <span className="font-medium text-sm md:text-base">{label}</span>
    </button>
  )
}

export function DashboardLayout(): JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('workshop')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      if (!authService.isAuthenticated()) {
        setProfile(null)
        return
      }
      const userProfile = await authService.getProfile()
      setProfile({
        id: userProfile.id,
        name: userProfile.name,
        team: userProfile.team,
        createdAt: userProfile.createdAt,
        updatedAt: userProfile.updatedAt,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = (): void => {
    loadProfile()
  }

  const handleLogout = async (): Promise<void> => {
    try {
      await authService.logout()
      setProfile(null)
      setCurrentView('workshop')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary font-bold">
        Initializing Aquapure Portal...
      </div>
    )
  }

  if (!profile) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/20 p-2 rounded-lg">
                  <Droplets className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Aquapure Sales</h1>
                  <p className="text-primary-foreground/80 text-xs hidden md:block">
                    Welcome, {profile.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex bg-primary/80 rounded-lg p-1 overflow-x-auto w-full lg:w-auto">
              <NavItem
                id="workshop"
                icon={<BookOpen className="w-4 h-4" />}
                label="Workshop"
                active={currentView === 'workshop'}
                onClick={() => setCurrentView('workshop')}
              />
              <NavItem
                id="audit"
                icon={<Calculator className="w-4 h-4" />}
                label="Audit Tools"
                active={currentView === 'audit'}
                onClick={() => setCurrentView('audit')}
              />
              <NavItem
                id="scorecard"
                icon={<BarChart3 className="w-4 h-4" />}
                label="Scorecard"
                active={currentView === 'scorecard'}
                onClick={() => setCurrentView('scorecard')}
              />
              <NavItem
                id="reports"
                icon={<Briefcase className="w-4 h-4" />}
                label="Biz Review"
                active={currentView === 'reports'}
                onClick={() => setCurrentView('reports')}
              />
            </nav>

            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="py-8">
        {error && (
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
              {error}
            </div>
          </div>
        )}

        {currentView === 'workshop' && <WorkshopView />}
        {currentView === 'audit' && <AuditTools />}
        {currentView === 'scorecard' && <Scorecard />}
        {currentView === 'reports' && <ReportsView profile={profile} />}
      </main>
    </div>
  )
}

