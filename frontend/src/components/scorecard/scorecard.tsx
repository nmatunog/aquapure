'use client'

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WeeklyMetrics, MetricCardProps } from '@/types'
import { metricsService } from '@/services/metrics-service'
import { authStorage } from '@/lib/auth-storage'

function MetricCard({ title, metricKey, target, color, metrics, onUpdate }: MetricCardProps): JSX.Element {
  const progressPercentage = Math.min(100, ((metrics[metricKey] || 0) / target) * 100)

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-bold text-card-foreground text-sm mb-2">{title}</h4>
        <div className="flex justify-between items-end">
          <span className="text-3xl font-bold text-foreground">{metrics[metricKey] || 0}</span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => onUpdate(metricKey, -1)}
            >
              -
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-6 w-6"
              onClick={() => onUpdate(metricKey, 1)}
            >
              +
            </Button>
          </div>
        </div>
        <div className="w-full bg-muted h-1.5 mt-3 rounded-full overflow-hidden">
          <div
            className={`h-full ${color}`}
            style={{ width: `${progressPercentage}%` }}
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
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadMetrics = async (): Promise<void> => {
      const token = authStorage.getToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await metricsService.getMetrics(token)
        setMetrics(data)
      } catch (error) {
        console.error('Error loading metrics', error)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  const updateMetric = async (key: keyof WeeklyMetrics, change: number): Promise<void> => {
    const token = authStorage.getToken()
    if (!token) return

    const newVal = Math.max(0, (metrics[key] || 0) + change)
    const newMetrics: WeeklyMetrics = { ...metrics, [key]: newVal }

    setMetrics(newMetrics) // Optimistic update

    try {
      await metricsService.updateMetric({ metricKey: key, value: newVal }, token)
    } catch (error) {
      console.error('Error updating metric', error)
      // Revert on error
      setMetrics(metrics)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Loading scorecard...</div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <h2 className="text-2xl font-bold text-foreground">Live Weekly Scorecard</h2>
        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Auto-Saving
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-primary uppercase mb-3">Lead Measures (Activity)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Dealer Audits"
              metricKey="dealerAudits"
              target={5}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
            <MetricCard
              title="HOA Surveys"
              metricKey="hoaSurveys"
              target={3}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
            <MetricCard
              title="Comm-Ind Consults"
              metricKey="industrialMeetings"
              target={2}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary uppercase mb-3">Lag Measures (Results)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Dealer Wins"
              metricKey="dealerConversions"
              target={1}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
            <MetricCard
              title="Stations Installed"
              metricKey="newRefillStations"
              target={1}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
            <MetricCard
              title="Contracts Signed"
              metricKey="bulkContracts"
              target={1}
              color="bg-primary"
              metrics={metrics}
              onUpdate={updateMetric}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

