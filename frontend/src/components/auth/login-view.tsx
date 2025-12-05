'use client'

import { useState } from 'react'
import { Droplets } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoginData } from '@/types'

interface LoginViewProps {
  onLogin: (data: LoginData) => Promise<void>
  error?: string | null
}

export function LoginView({ onLogin, error }: LoginViewProps): JSX.Element {
  const [name, setName] = useState<string>('')
  const [team, setTeam] = useState<string>('Metro Manila North')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await onLogin({ name, team })
    } catch (err) {
      // Error is handled by parent component
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Droplets className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Aquapure Sales Portal</CardTitle>
          <CardDescription>Consultative Selling & Reporting System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold">
                Agent Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="e.g. Juan dela Cruz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team" className="font-bold">
                Sales Team / Region
              </Label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger id="team" className="w-full">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Metro Manila North">Metro Manila North</SelectItem>
                  <SelectItem value="Metro Manila South">Metro Manila South</SelectItem>
                  <SelectItem value="Central Luzon">Central Luzon</SelectItem>
                  <SelectItem value="Cebu / Visayas">Cebu / Visayas</SelectItem>
                  <SelectItem value="Mindanao">Mindanao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive-foreground p-3 rounded-lg text-sm border border-destructive/20">
                {error}
              </div>
            )}
            <Button variant="default" className="w-full py-6 text-lg" disabled={loading}>
              {loading ? 'Accessing Portal...' : 'Enter Dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

