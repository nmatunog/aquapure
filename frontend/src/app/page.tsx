'use client'

import { useState, useEffect } from 'react'
import { LoginView } from '@/components/auth/login-view'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { WorkshopView } from '@/components/workshop/workshop-view'
import { AuditTools } from '@/components/audit/audit-tools'
import { Scorecard } from '@/components/scorecard/scorecard'
import { ReportsView } from '@/components/reports/reports-view'
import { UserProfile, LoginData } from '@/types'
import { authService } from '@/services/auth-service'
import { authStorage } from '@/lib/auth-storage'
import { ProfileResponse } from '@/types/api'

export default function HomePage(): JSX.Element {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentView, setCurrentView] = useState<string>('workshop')
  const [init, setInit] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const token = authStorage.getToken()
        const storedProfile = authStorage.getProfile<UserProfile>()

        if (token && storedProfile) {
          // Verify token is still valid by fetching profile
          try {
            const profileData = await authService.getProfile(token)
            const userProfile: UserProfile = {
              name: profileData.name,
              team: profileData.team,
            }
            setProfile(userProfile)
            authStorage.setProfile(userProfile)
          } catch (err) {
            // Token invalid, clear storage
            authStorage.clear()
            setProfile(null)
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
        setError('Failed to initialize authentication')
      } finally {
        setInit(false)
      }
    }

    initializeAuth()
  }, [])

  const handleProfileCreate = async (data: LoginData): Promise<void> => {
    try {
      setError(null)
      const response = await authService.login(data)

      // Store token and profile
      authStorage.setToken(response.token)
      if (response.refreshToken) {
        authStorage.setRefreshToken(response.refreshToken)
      }

      const userProfile: UserProfile = {
        name: response.user.name,
        team: response.user.team,
      }
      authStorage.setProfile(userProfile)
      setProfile(userProfile)
    } catch (err) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err
          ? String(err.message)
          : 'Failed to login. Please check your credentials.'
      setError(errorMessage)
      throw err
    }
  }

  const handleLogout = async (): Promise<void> => {
    try {
      const token = authStorage.getToken()
      if (token) {
        await authService.logout(token)
      }
    } catch (err) {
      console.error('Error during logout:', err)
    } finally {
      authStorage.clear()
      setProfile(null)
    }
  }

  if (init) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary font-bold">
        Initializing Aquapure Portal...
      </div>
    )
  }

  // Show Login if no Profile
  if (!profile) {
    return <LoginView onLogin={handleProfileCreate} error={error} />
  }

  // Main Dashboard
  return (
    <DashboardLayout
      profile={profile}
      currentView={currentView}
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    >
      {currentView === 'workshop' && <WorkshopView />}
      {currentView === 'audit' && <AuditTools />}
      {currentView === 'scorecard' && <Scorecard />}
      {currentView === 'reports' && <ReportsView profile={profile} />}
    </DashboardLayout>
  )
}
