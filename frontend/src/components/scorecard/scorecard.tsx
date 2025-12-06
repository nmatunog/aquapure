'use client'

// Scorecard Component
// Following coding standards: Rule 30, Rule 31, Rule 58, Rule 104

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { metricsService } from '@/services'
import type { WeeklyMetrics } from '@/types'

interface MetricCardProps {
  title: string
  metricKey: keyof WeeklyMetrics
  value: number
  target: number
  color: string
  onIncrement: () => void
  onDecrement: () => void
}

function MetricCard({
  title,
  value,
  target,
  color,
  onIncrement,
  onDecrement,
}: MetricCardProps): JSX.Element {
  const percentage = Math.min(100, (value / target) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-3">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6"
              onClick={onDecrement}
              disabled={value === 0}
            >
              <span className="text-xs">-</span>
            </Button>
            <Button
              variant="default"
              size="icon"
              className="w-6 h-6"
              onClick={onIncrement}
            >
              <span className="text-xs">+</span>
            </Button>
          </div>
        </div>
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function Scorecard(): JSX.Element {
  const [metrics, setMetrics] = useState<WeeklyMetrics>({
    dealerAudits: 0,
    hoaSurveys: 0,
    industrialMeetings: 0,
    dealerConversions: 0,
    newRefillStations: 0,
    bulkContracts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await metricsService.getMetrics()
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics')
    } finally {
      setLoading(false)
    }
  }

  const updateMetric = async (key: keyof WeeklyMetrics, change: number): Promise<void> => {
    const newVal = Math.max(0, (metrics[key] || 0) + change)
    const newMetrics = { ...metrics, [key]: newVal }

    // Optimistic update
    setMetrics(newMetrics)
    setUpdating(key)

    try {
      await metricsService.updateMetric({
        metricKey: key,
        value: newVal,
      })
    } catch (err) {
      // Revert on error
      setMetrics(metrics)
      setError(err instanceof Error ? err.message : 'Failed to update metric')
    } finally {
      setUpdating(null)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Loading scorecard...</div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 mb-4">
          {error}
        </div>
        <Button onClick={loadMetrics} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Live Weekly Scorecard</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Auto-Saving
        </Badge>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-primary uppercase mb-3">Lead Measures (Activity)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Dealer Audits"
              metricKey="dealerAudits"
              value={metrics.dealerAudits}
              target={5}
              color="bg-primary"
              onIncrement={() => updateMetric('dealerAudits', 1)}
              onDecrement={() => updateMetric('dealerAudits', -1)}
            />
            <MetricCard
              title="HOA Surveys"
              metricKey="hoaSurveys"
              value={metrics.hoaSurveys}
              target={3}
              color="bg-primary"
              onIncrement={() => updateMetric('hoaSurveys', 1)}
              onDecrement={() => updateMetric('hoaSurveys', -1)}
            />
            <MetricCard
              title="Comm-Ind Consults"
              metricKey="industrialMeetings"
              value={metrics.industrialMeetings}
              target={2}
              color="bg-muted-foreground"
              onIncrement={() => updateMetric('industrialMeetings', 1)}
              onDecrement={() => updateMetric('industrialMeetings', -1)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-primary uppercase mb-3">Lag Measures (Results)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Dealer Wins"
              metricKey="dealerConversions"
              value={metrics.dealerConversions}
              target={1}
              color="bg-primary"
              onIncrement={() => updateMetric('dealerConversions', 1)}
              onDecrement={() => updateMetric('dealerConversions', -1)}
            />
            <MetricCard
              title="Stations Installed"
              metricKey="newRefillStations"
              value={metrics.newRefillStations}
              target={1}
              color="bg-primary"
              onIncrement={() => updateMetric('newRefillStations', 1)}
              onDecrement={() => updateMetric('newRefillStations', -1)}
            />
            <MetricCard
              title="Contracts Signed"
              metricKey="bulkContracts"
              value={metrics.bulkContracts}
              target={1}
              color="bg-primary"
              onIncrement={() => updateMetric('bulkContracts', 1)}
              onDecrement={() => updateMetric('bulkContracts', -1)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

