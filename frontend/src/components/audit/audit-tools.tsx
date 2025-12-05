'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
import {
  DealerAuditData,
  HOAAuditData,
  IndustrialAuditData,
  AuditType,
} from '@/types'
import { auditService } from '@/services/audit-service'
import { authStorage } from '@/lib/auth-storage'

export function AuditTools(): JSX.Element {
  const [clientType, setClientType] = useState<'dealer' | 'hoa' | 'industrial'>('dealer')
  const [saving, setSaving] = useState<boolean>(false)

  const [dealer, setDealer] = useState<DealerAuditData>({
    dailyOutput: 50,
    sellingPrice: 25,
    electricity: 2500,
    rent: 5000,
    labor: 12000,
    maint: 3000,
    daysOpen: 26,
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
    type: AuditType
  ): Promise<void> => {
    const token = authStorage.getToken()
    if (!token) {
      alert('Please login to save audits')
      return
    }

    setSaving(true)
    try {
      await auditService.saveAudit({ type, data }, token)
      alert('Audit saved to Pipeline Report!')
    } catch (error) {
      console.error('Error saving audit', error)
      alert('Failed to save audit. Please try again.')
    }
    setSaving(false)
  }

  const DealerCalc = (): JSX.Element => {
    const totalOpEx =
      dealer.electricity + dealer.rent + dealer.labor + dealer.maint
    const netProfit =
      dealer.dailyOutput * dealer.daysOpen * dealer.sellingPrice - totalOpEx

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Daily Output
              </Label>
              <Input
                type="number"
                value={dealer.dailyOutput}
                onChange={(e) =>
                  setDealer({ ...dealer, dailyOutput: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Selling Price
              </Label>
              <Input
                type="number"
                value={dealer.sellingPrice}
                onChange={(e) =>
                  setDealer({ ...dealer, sellingPrice: Number(e.target.value) })
                }
              />
            </div>
            <div className="bg-destructive/10 p-3 rounded space-y-2 border border-destructive/20">
              <Label className="block text-xs font-bold uppercase text-destructive-foreground">
                Total Monthly OpEx
              </Label>
              <div className="text-destructive-foreground font-bold">
                ₱{totalOpEx.toLocaleString()}
              </div>
            </div>
          </div>
          <Card className="bg-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-muted-foreground text-xs font-bold uppercase">
                Net Profit Projection
              </h3>
              <div className="text-3xl font-bold text-primary mt-2">
                ₱{netProfit.toLocaleString()}
              </div>
            </div>
            <Button
              variant="default"
              onClick={() =>
                saveAudit({ ...dealer, netProfit }, 'Dealer')
              }
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const HOACalc = (): JSX.Element => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Number of Units
              </Label>
              <Input
                type="number"
                value={hoa.units}
                onChange={(e) => setHoa({ ...hoa, units: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Deliveries/Unit/Mo
              </Label>
              <Input
                type="number"
                value={hoa.deliveriesPerUnit}
                onChange={(e) =>
                  setHoa({ ...hoa, deliveriesPerUnit: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <Card className="bg-muted p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-muted-foreground text-xs font-bold uppercase">
                Security Risk Volume
              </h3>
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
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const IndCalc = (): JSX.Element => {
    const riskMultiplier =
      indInputs.reliability === 'Low' ? 6 : indInputs.reliability === 'Medium' ? 3 : 1
    const risk = riskMultiplier * indInputs.downtimeCost * indInputs.repairTime

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Industry Type
              </Label>
              <Select
                value={indInputs.type}
                onValueChange={(value) => setIndInputs({ ...indInputs, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ice Plant">Ice Plant</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Food Proc">Food Proc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Downtime Cost (₱/hr)
              </Label>
              <Input
                type="number"
                value={indInputs.downtimeCost}
                onChange={(e) =>
                  setIndInputs({ ...indInputs, downtimeCost: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <Card className="bg-muted p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-muted-foreground text-xs font-bold uppercase">
                Annual Risk Exposure
              </h3>
              <div className="text-3xl font-bold text-destructive mt-2">
                ₱{risk.toLocaleString()}
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => saveAudit({ ...indInputs, risk }, 'Industrial')}
              disabled={saving}
              className="mt-4"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save to Pipeline'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={clientType === 'dealer' ? 'default' : 'secondary'}
          onClick={() => setClientType('dealer')}
        >
          Dealer
        </Button>
        <Button
          variant={clientType === 'hoa' ? 'default' : 'secondary'}
          onClick={() => setClientType('hoa')}
        >
          HOA
        </Button>
        <Button
          variant={clientType === 'industrial' ? 'default' : 'secondary'}
          onClick={() => setClientType('industrial')}
        >
          Comm-Ind
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          {clientType === 'dealer' && <DealerCalc />}
          {clientType === 'hoa' && <HOACalc />}
          {clientType === 'industrial' && <IndCalc />}
        </CardContent>
      </Card>
    </div>
  )
}

