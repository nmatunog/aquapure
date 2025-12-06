'use client'

// Login View Component
// Following coding standards: Rule 27, Rule 30, Rule 31, Rule 104

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { authService } from '@/services'
import type { LoginRequest } from '@/types/api'

const loginSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  team: z.string().min(1, 'Team selection is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginViewProps {
  onLoginSuccess: () => void
}

export function LoginView({ onLoginSuccess }: LoginViewProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      team: 'Metro Manila North',
    },
  })

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const loginRequest: LoginRequest = {
        name: values.name,
        team: values.team,
      }

      await authService.login(loginRequest)
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Droplets className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Aquapure Sales Portal
            </CardTitle>
            <CardDescription>Consultative Selling & Reporting System</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Juan dela Cruz"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Team / Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Metro Manila North">Metro Manila North</SelectItem>
                        <SelectItem value="Metro Manila South">Metro Manila South</SelectItem>
                        <SelectItem value="Central Luzon">Central Luzon</SelectItem>
                        <SelectItem value="Cebu / Visayas">Cebu / Visayas</SelectItem>
                        <SelectItem value="Mindanao">Mindanao</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Accessing Portal...' : 'Enter Dashboard'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

