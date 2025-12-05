'use client'

import { useState } from 'react'
import { BookOpen, Calculator, BarChart3, Briefcase, LogOut, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/types'

interface DashboardLayoutProps {
  profile: UserProfile
  currentView: string
  onViewChange: (view: string) => void
  onLogout: () => void
  children: React.ReactNode
}

function NavItem({
  id,
  icon,
  label,
  isActive,
  onClick,
}: {
  id: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}): JSX.Element {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      onClick={onClick}
      className="flex flex-col md:flex-row items-center gap-2 px-4 py-3 w-full md:w-auto"
    >
      {icon}
      <span className="font-medium text-sm md:text-base">{label}</span>
    </Button>
  )
}

export function DashboardLayout({
  profile,
  currentView,
  onViewChange,
  onLogout,
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Droplets className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Aquapure Sales</h1>
                  <p className="text-primary-foreground/80 text-xs hidden md:block">
                    Welcome, {profile.name}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout} className="lg:hidden">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex bg-primary/20 rounded-lg p-1 overflow-x-auto w-full lg:w-auto gap-1">
              <NavItem
                id="workshop"
                icon={<BookOpen className="w-4 h-4" />}
                label="Workshop"
                isActive={currentView === 'workshop'}
                onClick={() => onViewChange('workshop')}
              />
              <NavItem
                id="audit"
                icon={<Calculator className="w-4 h-4" />}
                label="Audit Tools"
                isActive={currentView === 'audit'}
                onClick={() => onViewChange('audit')}
              />
              <NavItem
                id="scorecard"
                icon={<BarChart3 className="w-4 h-4" />}
                label="Scorecard"
                isActive={currentView === 'scorecard'}
                onClick={() => onViewChange('scorecard')}
              />
              <NavItem
                id="reports"
                icon={<Briefcase className="w-4 h-4" />}
                label="Biz Review"
                isActive={currentView === 'reports'}
                onClick={() => onViewChange('reports')}
              />
            </nav>
            <Button variant="ghost" onClick={onLogout} className="hidden lg:flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  )
}

