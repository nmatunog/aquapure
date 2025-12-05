'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { SavedAudit, WeeklyMetrics, UserProfile } from '@/types'
import { auditService } from '@/services/audit-service'
import { metricsService } from '@/services/metrics-service'
import { authStorage } from '@/lib/auth-storage'

interface ReportsViewProps {
  profile: UserProfile | null
}

export function ReportsView({ profile }: ReportsViewProps): JSX.Element {
  const [audits, setAudits] = useState<SavedAudit[]>([])
  const [metrics, setMetrics] = useState<WeeklyMetrics>({
    dealerAudits: 0,
    hoaSurveys: 0,
    industrialMeetings: 0,
    dealerConversions: 0,
    newRefillStations: 0,
    bulkContracts: 0,
  })

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const token = authStorage.getToken()
      if (!token) return

      try {
        const [auditsData, metricsData] = await Promise.all([
          auditService.getAudits(token),
          metricsService.getMetrics(token),
        ])

        // Convert API response to SavedAudit format
        const convertedAudits: SavedAudit[] = auditsData.map((audit) => ({
          id: audit.id,
          type: audit.type,
          data: audit.data as SavedAudit['data'],
          timestamp: audit.createdAt
            ? {
                seconds: Math.floor(new Date(audit.createdAt).getTime() / 1000),
                nanoseconds: 0,
              }
            : null,
          summary: audit.summary,
        }))

        setAudits(convertedAudits)
        setMetrics(metricsData)
      } catch (error) {
        console.error('Error loading reports data', error)
      }
    }

    loadData()
  }, [])

  const totalActivity =
    (metrics.dealerAudits || 0) +
    (metrics.hoaSurveys || 0) +
    (metrics.industrialMeetings || 0)

  const totalConversions =
    (metrics.dealerConversions || 0) +
    (metrics.newRefillStations || 0) +
    (metrics.bulkContracts || 0)

  const getAuditValue = (audit: SavedAudit): string => {
    if (audit.type === 'Dealer' && 'netProfit' in audit.data) {
      return `Proj. Profit: ₱${(audit.data.netProfit || 0).toLocaleString()}`
    }
    if (audit.type === 'HOA' && 'units' in audit.data && 'deliveriesPerUnit' in audit.data) {
      return `Risk: ${((audit.data.units || 0) * (audit.data.deliveriesPerUnit || 0)).toLocaleString()} entries`
    }
    if (audit.type === 'Industrial' && 'risk' in audit.data) {
      return `Risk: ₱${(audit.data.risk || 0).toLocaleString()}`
    }
    return 'N/A'
  }

  const formatDate = (timestamp: SavedAudit['timestamp']): string => {
    if (!timestamp || !timestamp.seconds) return 'Just now'
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Business Review Report</h2>
            <p className="text-muted-foreground text-sm">
              Prepared for: <span className="text-foreground font-bold">{profile?.name}</span> (
              {profile?.team})
            </p>
          </div>
          <Button variant="secondary" onClick={() => window.print()}>
            <FileText className="w-4 h-4" /> Print PDF
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-primary font-bold text-xs uppercase mb-2">Total Activity (Week)</h3>
            <div className="text-3xl font-bold text-primary">{totalActivity}</div>
            <p className="text-xs text-primary/80 mt-1">Audits & Surveys Conducted</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-primary font-bold text-xs uppercase mb-2">Total Conversions</h3>
            <div className="text-3xl font-bold text-primary">{totalConversions}</div>
            <p className="text-xs text-primary/80 mt-1">Closed Deals</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-primary font-bold text-xs uppercase mb-2">Pipeline Depth</h3>
            <div className="text-3xl font-bold text-primary">{audits.length}</div>
            <p className="text-xs text-primary/80 mt-1">Active Opportunities</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-card-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Recent Opportunity Pipeline
          </h3>
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
                    <TableCell colSpan={4} className="text-center text-muted-foreground italic py-8">
                      No saved audits found. Use the Audit Tools to save opportunities.
                    </TableCell>
                  </TableRow>
                ) : (
                  audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium text-foreground">
                        {formatDate(audit.timestamp)}
                      </TableCell>
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
                      <TableCell className="text-muted-foreground">{getAuditValue(audit)}</TableCell>
                      <TableCell>
                        <span className="text-primary font-bold text-xs">In Progress</span>
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

