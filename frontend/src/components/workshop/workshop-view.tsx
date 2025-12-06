'use client'

// Workshop View Component
// Following coding standards: Rule 30, Rule 31, Rule 104

import { Droplets, Building2, Factory, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function WorkshopView(): JSX.Element {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="pivot" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pivot">The Concept Pivot</TabsTrigger>
        </TabsList>

        <TabsContent value="pivot" className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">The Core Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Shift from a{' '}
                <span className="font-bold text-destructive">Delivery Mindset</span> (Selling Water)
                to a{' '}
                <span className="font-bold text-primary">Consultative Mindset</span> (Selling
                Reliability, Convenience, & Profit).
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="water-dealers" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <Droplets className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground">Water Dealers</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="line-through mr-2">Price per Liter</span>
                      <ArrowRight className="inline w-3 h-3 mr-2" />
                      <span className="text-primary font-bold">Zero Maintenance</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Strategy: The Hunter</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4 text-sm text-foreground">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Pivot</h4>
                    <p className="text-muted-foreground">
                      Move away from competing on price per liter. Instead, position your water
                      refill station as a{' '}
                      <span className="font-semibold text-primary">zero-maintenance profit center</span>{' '}
                      that eliminates operational headaches and maximizes dealer profitability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Key Value Propositions</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                      <li>
                        <strong className="text-foreground">Eliminate Maintenance Costs:</strong> No
                        more filter replacements, equipment repairs, or technical expertise needed
                      </li>
                      <li>
                        <strong className="text-foreground">Reduce Labor Overhead:</strong> Automated
                        system means less staff time managing water quality
                      </li>
                      <li>
                        <strong className="text-foreground">Increase Profit Margins:</strong> Higher
                        selling price without the operational complexity
                      </li>
                      <li>
                        <strong className="text-foreground">Reliability Guarantee:</strong> Consistent
                        water quality builds customer trust and repeat business
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Hunter Approach</h4>
                    <p className="text-muted-foreground">
                      Focus on dealers who are{' '}
                      <span className="font-semibold text-primary">actively struggling</span> with
                      maintenance costs, equipment downtime, or quality complaints. These pain points
                      make them ready to invest in a solution that eliminates operational burden.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hoa-condos" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground">HOAs & Condos</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="line-through mr-2">Water Delivery</span>
                      <ArrowRight className="inline w-3 h-3 mr-2" />
                      <span className="text-primary font-bold">Community Amenity</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Strategy: The Developer</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4 text-sm text-foreground">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Pivot</h4>
                    <p className="text-muted-foreground">
                      Transform water from a{' '}
                      <span className="font-semibold text-destructive">logistical burden</span> into
                      a{' '}
                      <span className="font-semibold text-primary">premium community amenity</span>{' '}
                      that enhances property value and resident satisfaction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Key Value Propositions</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                      <li>
                        <strong className="text-foreground">Reduce Security Risks:</strong> Eliminate
                        frequent delivery truck entries and reduce unauthorized access points
                      </li>
                      <li>
                        <strong className="text-foreground">Enhance Property Value:</strong> On-site
                        water refill station becomes a selling point for new residents
                      </li>
                      <li>
                        <strong className="text-foreground">Convenience for Residents:</strong> 24/7
                        access to purified water without leaving the property
                      </li>
                      <li>
                        <strong className="text-foreground">Lower HOA Costs:</strong> Reduce delivery
                        coordination, security concerns, and resident complaints
                      </li>
                      <li>
                        <strong className="text-foreground">Community Building:</strong> Shared amenity
                        that brings residents together
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Developer Approach</h4>
                    <p className="text-muted-foreground">
                      Position the water refill station as part of a{' '}
                      <span className="font-semibold text-primary">long-term community development</span>{' '}
                      strategy. Focus on HOAs and condos that prioritize resident amenities, security,
                      and property value enhancement. Emphasize the permanent infrastructure investment
                      that benefits all stakeholders.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="commercial-industrial" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <Factory className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground">Commercial-Ind</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="line-through mr-2">Commodity</span>
                      <ArrowRight className="inline w-3 h-3 mr-2" />
                      <span className="text-primary font-bold">Ingredient Integrity</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Strategy: The Partner</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4 text-sm text-foreground">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Pivot</h4>
                    <p className="text-muted-foreground">
                      Shift from treating water as a{' '}
                      <span className="font-semibold text-destructive">generic commodity</span> to
                      positioning it as a{' '}
                      <span className="font-semibold text-primary">critical ingredient</span> that
                      directly impacts product quality, operational reliability, and business
                      continuity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Key Value Propositions</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                      <li>
                        <strong className="text-foreground">Product Quality Assurance:</strong> Consistent
                        water purity ensures consistent product quality (ice, beverages, food processing)
                      </li>
                      <li>
                        <strong className="text-foreground">Operational Reliability:</strong> On-site
                        system eliminates dependency on external deliveries and reduces downtime risk
                      </li>
                      <li>
                        <strong className="text-foreground">Cost Predictability:</strong> Fixed
                        infrastructure costs vs. variable delivery costs
                      </li>
                      <li>
                        <strong className="text-foreground">Compliance & Safety:</strong> Meet health
                        and safety standards with documented water quality
                      </li>
                      <li>
                        <strong className="text-foreground">Business Continuity:</strong> Reduce risk
                        of production stoppages due to water supply issues
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">The Partner Approach</h4>
                    <p className="text-muted-foreground">
                      Position yourself as a{' '}
                      <span className="font-semibold text-primary">strategic partner</span> in their
                      business operations, not just a water supplier. Focus on industries where water
                      quality directly impacts product quality (ice plants, hotels, food processing).
                      Emphasize risk mitigation, operational efficiency, and long-term cost savings
                      through reliable infrastructure.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}

