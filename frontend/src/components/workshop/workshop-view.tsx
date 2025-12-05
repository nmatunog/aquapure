'use client'

import { useState } from 'react'
import { Droplets, Building2, Factory, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PivotItem } from '@/types'

const pivotItems: PivotItem[] = [
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: 'Water Dealers',
    from: 'Price per Liter',
    to: 'Zero Maintenance',
    strategy: 'The Hunter',
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: 'HOAs & Condos',
    from: 'Water Delivery',
    to: 'Community Amenity',
    strategy: 'The Developer',
  },
  {
    icon: <Factory className="w-8 h-8 text-primary" />,
    title: 'Commercial-Ind',
    from: 'Commodity',
    to: 'Ingredient Integrity',
    strategy: 'The Partner',
  },
]

export function WorkshopView(): JSX.Element {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="pivot" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pivot">The Concept Pivot</TabsTrigger>
        </TabsList>
        <TabsContent value="pivot" className="space-y-6">
          <div className="bg-muted p-6 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2">The Core Objective</h3>
            <p className="text-foreground">
              Shift from a <span className="font-bold text-destructive">Delivery Mindset</span>{' '}
              (Selling Water) to a{' '}
              <span className="font-bold text-primary">Consultative Mindset</span> (Selling
              Reliability, Convenience, & Profit).
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pivotItems.map((item, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="mb-3 w-8 h-8">{item.icon}</div>
                  <h4 className="font-bold text-lg text-card-foreground mb-2">{item.title}</h4>
                  <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <span className="line-through mr-2">{item.from}</span>
                    <ArrowRight className="inline w-3 h-3 mr-2" />
                    <span className="text-primary font-bold">{item.to}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

