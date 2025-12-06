'use client'

// Audit Tools Component
// Following coding standards: Rule 30, Rule 31, Rule 58, Rule 104

import { useState, useCallback, useMemo, useRef } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auditsService } from '@/services'
import type { DealerAuditData, HOAAuditData, IndustrialAuditData, ClientType } from '@/types'

export function AuditTools(): JSX.Element {
  const [clientType, setClientType] = useState<ClientType>('dealer')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [dealer, setDealer] = useState<DealerAuditData>({
    dailyOutput: 50,
    sellingPrice: 25,
    electricity: 2500,
    rent: 5000,
    labor: 12000,
    maint: 3000,
    daysOpen: 26,
  })

  // Use refs to store input values without triggering re-renders
  // Only include actual input fields, not calculated fields like netProfit
  const dealerInputRefs = useRef<{
    dailyOutput: HTMLInputElement | null
    sellingPrice: HTMLInputElement | null
    electricity: HTMLInputElement | null
    rent: HTMLInputElement | null
    labor: HTMLInputElement | null
    maint: HTMLInputElement | null
    daysOpen: HTMLInputElement | null
  }>({
    dailyOutput: null,
    sellingPrice: null,
    electricity: null,
    rent: null,
    labor: null,
    maint: null,
    daysOpen: null,
  })

  const hoaInputRefs = useRef<Record<'units' | 'deliveriesPerUnit', HTMLInputElement | null>>({
    units: null,
    deliveriesPerUnit: null,
  })

  const indInputRefs = useRef<Record<'downtimeCost' | 'repairTime', HTMLInputElement | null>>({
    downtimeCost: null,
    repairTime: null,
  })

  const [hoa, setHoa] = useState<HOAAuditData>({
    units: 100,
    deliveryRisk: 'High',
    waterSource: 'delivery',
    wastePerUnit: 4,
    deliveriesPerUnit: 4,
    complaints: 3,
  })

  const [indInputs, setIndInputs] = useState<IndustrialAuditData>({
    type: 'Ice Plant',
    downtimeCost: 50000,
    reliability: 'Medium',
    repairTime: 4,
  })

  const saveAudit = async (
    data: DealerAuditData | HOAAuditData | IndustrialAuditData,
    type: 'Dealer' | 'HOA' | 'Industrial'
  ): Promise<void> => {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const summary =
        type === 'Dealer'
          ? `Profit Audit`
          : type === 'HOA'
            ? `Site Survey (${(data as HOAAuditData).units} units)`
            : `Risk Analysis (${(data as IndustrialAuditData).type})`

      await auditsService.create({
        type,
        data: data as unknown as Record<string, unknown>,
        summary,
      })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save audit. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDealerCommit = useCallback((field: keyof typeof dealerInputRefs.current): void => {
    // Get value directly from input ref - no state updates during typing
    const input = dealerInputRefs.current[field]
    if (!input) return
    
    const value = input.value.replace(/[^0-9.]/g, '')
    if (value === '' || value === '.') {
      input.value = '0'
      setDealer((prev) => ({ ...prev, [field]: 0 }))
    } else {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        input.value = numValue.toString()
        setDealer((prev) => ({ ...prev, [field]: numValue }))
      }
    }
  }, [])

  // Removed - using handleDealerCommit instead

  // Memoize calculations to prevent unnecessary re-renders
  const dealerCalculations = useMemo(() => {
    const totalOpEx = dealer.electricity + dealer.rent + dealer.labor + dealer.maint
    const netProfit = dealer.dailyOutput * dealer.daysOpen * dealer.sellingPrice - totalOpEx
    return { totalOpEx, netProfit, dealerWithProfit: { ...dealer, netProfit } }
  }, [dealer])

  const DealerCalc = (): JSX.Element => {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-primary/10 text-primary text-sm p-3 rounded-lg border border-primary/20">
            Audit saved to Pipeline Report!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Daily Output
              </Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.dailyOutput = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.dailyOutput.toString()}
                onBlur={() => handleDealerCommit('dailyOutput')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('dailyOutput')
                  }
                }}
                onChange={(e) => {
                  // Only allow numbers and decimal point
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Selling Price
              </Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.sellingPrice = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.sellingPrice.toString()}
                onBlur={() => handleDealerCommit('sellingPrice')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('sellingPrice')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Electricity
              </Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.electricity = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.electricity.toString()}
                onBlur={() => handleDealerCommit('electricity')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('electricity')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">Rent</Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.rent = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.rent.toString()}
                onBlur={() => handleDealerCommit('rent')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('rent')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">Labor</Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.labor = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.labor.toString()}
                onBlur={() => handleDealerCommit('labor')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('labor')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Maintenance
              </Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.maint = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.maint.toString()}
                onBlur={() => handleDealerCommit('maint')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('maint')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Days Open
              </Label>
              <Input
                ref={(el) => {
                  dealerInputRefs.current.daysOpen = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={dealer.daysOpen.toString()}
                onBlur={() => handleDealerCommit('daysOpen')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleDealerCommit('daysOpen')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div className="bg-destructive/10 p-3 rounded space-y-2">
              <Label className="block text-xs font-bold uppercase text-destructive">
                Total Monthly OpEx
              </Label>
              <div className="text-destructive font-bold">₱{dealerCalculations.totalOpEx.toLocaleString()}</div>
            </div>
          </div>
          <Card className="bg-slate-900 text-white p-6 flex flex-col justify-between">
            <div>
              <CardDescription className="text-slate-400 text-xs font-bold uppercase">
                Net Profit Projection
              </CardDescription>
              <div className="text-3xl font-bold text-green-400 mt-2">
                ₱{dealerCalculations.netProfit.toLocaleString()}
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => saveAudit(dealerCalculations.dealerWithProfit, 'Dealer')}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const handleHoaCommit = useCallback((field: 'units' | 'deliveriesPerUnit'): void => {
    const input = hoaInputRefs.current[field]
    if (!input) return

    const value = input.value.replace(/[^0-9.]/g, '')
    if (value === '' || value === '.') {
      input.value = '0'
      setHoa((prev) => ({ ...prev, [field]: 0 }))
    } else {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        input.value = numValue.toString()
        setHoa((prev) => ({ ...prev, [field]: numValue }))
      }
    }
  }, [])


  const HOACalc = (): JSX.Element => {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-primary/10 text-primary text-sm p-3 rounded-lg border border-primary/20">
            Audit saved to Pipeline Report!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Number of Units
              </Label>
              <Input
                ref={(el) => {
                  hoaInputRefs.current.units = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={hoa.units.toString()}
                onBlur={() => handleHoaCommit('units')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleHoaCommit('units')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Deliveries/Unit/Mo
              </Label>
              <Input
                ref={(el) => {
                  hoaInputRefs.current.deliveriesPerUnit = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={hoa.deliveriesPerUnit.toString()}
                onBlur={() => handleHoaCommit('deliveriesPerUnit')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleHoaCommit('deliveriesPerUnit')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
          </div>
          <Card className="bg-muted p-6 flex flex-col justify-between">
            <div>
              <CardDescription className="text-slate-600 text-xs font-bold uppercase">
                Security Risk Volume
              </CardDescription>
              <div className="text-3xl font-bold text-destructive mt-2">
                {(hoa.units * hoa.deliveriesPerUnit).toLocaleString()}{' '}
                <span className="text-sm text-muted-foreground">entries/mo</span>
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => saveAudit(hoa, 'HOA')}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const handleIndCommit = useCallback((field: 'downtimeCost' | 'repairTime'): void => {
    const input = indInputRefs.current[field]
    if (!input) return

    const value = input.value.replace(/[^0-9.]/g, '')
    if (value === '' || value === '.') {
      input.value = '0'
      setIndInputs((prev) => ({ ...prev, [field]: 0 }))
    } else {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        input.value = numValue.toString()
        setIndInputs((prev) => ({ ...prev, [field]: numValue }))
      }
    }
  }, [])

  const handleIndChange = useCallback((field: keyof IndustrialAuditData, value: string | number): void => {
    // For non-input fields (Select), update immediately
    if (field !== 'downtimeCost' && field !== 'repairTime') {
      setIndInputs((prev) => ({ ...prev, [field]: value }))
    }
  }, [])

  const IndCalc = (): JSX.Element => {
    const risk =
      (indInputs.reliability === 'Low' ? 6 : indInputs.reliability === 'Medium' ? 3 : 1) *
      (indInputs.downtimeCost * indInputs.repairTime)
    const indWithRisk = { ...indInputs, risk }

    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-primary/10 text-primary text-sm p-3 rounded-lg border border-primary/20">
            Audit saved to Pipeline Report!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Industry Type
              </Label>
              <Select
                value={indInputs.type}
                onValueChange={(value) => handleIndChange('type', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ice Plant">Ice Plant</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Food Proc">Food Proc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Downtime Cost (₱/hr)
              </Label>
              <Input
                ref={(el) => {
                  indInputRefs.current.downtimeCost = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={indInputs.downtimeCost.toString()}
                onBlur={() => handleIndCommit('downtimeCost')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleIndCommit('downtimeCost')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Reliability
              </Label>
              <Select
                value={indInputs.reliability}
                onValueChange={(value) => handleIndChange('reliability', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Repair Time (hrs)
              </Label>
              <Input
                ref={(el) => {
                  indInputRefs.current.repairTime = el
                }}
                type="text"
                inputMode="numeric"
                defaultValue={indInputs.repairTime.toString()}
                onBlur={() => handleIndCommit('repairTime')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur()
                    handleIndCommit('repairTime')
                  }
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, '')
                }}
                className="mt-1"
              />
            </div>
          </div>
          <Card className="bg-muted p-6 flex flex-col justify-between">
            <div>
              <CardDescription className="text-slate-600 text-xs font-bold uppercase">
                Annual Risk Exposure
              </CardDescription>
              <div className="text-3xl font-bold text-destructive mt-2">
                ₱{risk.toLocaleString()}
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => saveAudit(indWithRisk, 'Industrial')}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Tabs value={clientType} onValueChange={(value) => setClientType(value as ClientType)}>
        <TabsList className="mb-6">
          <TabsTrigger value="dealer">Dealer</TabsTrigger>
          <TabsTrigger value="hoa">HOA</TabsTrigger>
          <TabsTrigger value="industrial">Comm-Ind</TabsTrigger>
        </TabsList>

        <Card className="p-4 md:p-6">
          <TabsContent value="dealer">
            <DealerCalc />
          </TabsContent>
          <TabsContent value="hoa">
            <HOACalc />
          </TabsContent>
          <TabsContent value="industrial">
            <IndCalc />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}

