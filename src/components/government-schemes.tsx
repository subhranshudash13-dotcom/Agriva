import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Shield, Building, FileText, ArrowUpRight } from "lucide-react"

export function GovernmentSchemes() {
  return (
    <div className="rounded-xl border bg-card shadow-sm p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Empowering Schemes
          </h2>
          <p className="text-muted-foreground mt-1">
            Verified federal and state schemes you are eligible for
          </p>
        </div>
        <Badge variant="secondary" className="w-fit bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900">
          <Building className="w-3 h-3 mr-1" /> Government Verified
        </Badge>
      </div>

      <Accordion className="w-full">
        <AccordionItem value="pm-kisan" className="border-b-0 border border-border/50 rounded-lg mb-4 bg-muted/10 px-4">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-1 items-center justify-between pr-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="font-bold text-orange-600 dark:text-orange-400">PM</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-foreground">PM-KISAN Samman Nidhi</h3>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200 shadow-none border-none">₹6,000 / year</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-6 border-t border-border/50">
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <p className="text-muted-foreground font-medium">Income support to all landholding farmer families with cultivable land.</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Eligibility:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                    <li>Must hold cultivable land</li>
                    <li>Bank account must be Aadhaar seeded</li>
                    <li>Not applicable for institutional land holders</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4">
                <div className="bg-card border rounded-lg p-4 text-sm flex gap-3">
                  <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <h5 className="font-medium text-foreground">Required Documents</h5>
                    <p className="text-muted-foreground text-xs mt-1">Aadhaar Card, Land Holding Papers, Bank Passbook, Passport Size Photo.</p>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full sm:w-fit rounded-md text-sm">
                  Apply Online <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pmfby" className="border-b-0 border border-border/50 rounded-lg mb-4 bg-muted/10 px-4">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-1 items-center justify-between pr-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="font-bold text-blue-600 dark:text-blue-400">BY</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-foreground">PM Fasal Bima Yojana</h3>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 hover:bg-blue-200 shadow-none border-none">Crop Insurance</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-6 border-t border-border/50">
            <p className="text-muted-foreground font-medium pt-4">End-to-end insurance cover against non-preventable natural risks.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shc" className="border-b-0 border border-border/50 rounded-lg bg-muted/10 px-4">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-1 items-center justify-between pr-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="font-bold text-amber-600 dark:text-amber-400">SC</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-foreground">Soil Health Card</h3>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 hover:bg-amber-200 shadow-none border-none">Yield Optimization</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-6 border-t border-border/50">
            <p className="text-muted-foreground font-medium pt-4">Provides information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients to be applied.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
