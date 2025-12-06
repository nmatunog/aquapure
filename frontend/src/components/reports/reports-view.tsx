'use client'

// Reports View Component
// Following coding standards: Rule 30, Rule 31, Rule 58, Rule 104

import { useState, useEffect } from 'react'
import { TrendingUp, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { auditsService, metricsService } from '@/services'
import type { SavedAudit, WeeklyMetrics, UserProfile } from '@/types'

interface ReportsViewProps {
  profile: UserProfile
}

export function ReportsView({ profile }: ReportsViewProps): JSX.Element {
  const [audits, setAudits] = useState<SavedAudit[]>([])
  const [metrics, setMetrics] = useState<WeeklyMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const [auditsData, metricsData] = await Promise.all([
        auditsService.findAll(),
        metricsService.getMetrics(),
      ])

      // Transform API response to SavedAudit format
      const transformedAudits: SavedAudit[] = auditsData.map((audit) => ({
        id: audit.id,
        type: audit.type as 'Dealer' | 'HOA' | 'Industrial',
        data: audit.data as SavedAudit['data'],
        summary: audit.summary,
        createdAt: audit.createdAt,
      }))

      setAudits(transformedAudits)
      setMetrics(metricsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports data')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = (): void => {
    window.print()
  }

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading reports...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 mb-4">
          {error}
        </div>
        <Button onClick={loadData} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  const totalActivity =
    (metrics?.dealerAudits || 0) +
    (metrics?.hoaSurveys || 0) +
    (metrics?.industrialMeetings || 0)

  const totalConversions =
    (metrics?.dealerConversions || 0) +
    (metrics?.newRefillStations || 0) +
    (metrics?.bulkContracts || 0)

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return 'Just now'
    }
  }

  const getAuditValue = (audit: SavedAudit): string => {
    if (audit.type === 'Dealer') {
      const data = audit.data as { netProfit?: number }
      return `Proj. Profit: ₱${(data.netProfit || 0).toLocaleString()}`
    }
    if (audit.type === 'HOA') {
      const data = audit.data as { units?: number; deliveriesPerUnit?: number }
      const entries = (data.units || 0) * (data.deliveriesPerUnit || 0)
      return `Risk: ${entries.toLocaleString()} entries`
    }
    if (audit.type === 'Industrial') {
      const data = audit.data as { risk?: number }
      return `Risk: ₱${(data.risk || 0).toLocaleString()}`
    }
    return 'N/A'
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Business Review Report</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-sm mt-1">
                Prepared for: <span className="font-bold">{profile.name}</span> ({profile.team})
              </CardDescription>
            </div>
            <Button variant="secondary" onClick={handlePrint}>
              <FileText className="w-4 h-4 mr-2" />
              Print PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardDescription className="text-primary font-bold text-xs uppercase">
              Total Activity (Week)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalActivity}</div>
            <p className="text-xs text-muted-foreground mt-1">Audits & Surveys Conducted</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardDescription className="text-primary font-bold text-xs uppercase">
              Total Conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalConversions}</div>
            <p className="text-xs text-muted-foreground mt-1">Closed Deals</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardDescription className="text-primary font-bold text-xs uppercase">
              Pipeline Depth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{audits.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active Opportunities</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Opportunity Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client Type</TableHead>
                  <TableHead>Summary / Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground italic">
                      No saved audits found. Use the Audit Tools to save opportunities.
                    </TableCell>
                  </TableRow>
                ) : (
                  audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{formatDate(audit.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            audit.type === 'Dealer'
                              ? 'default'
                              : audit.type === 'HOA'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {audit.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getAuditValue(audit)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-primary">
                          In Progress
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

