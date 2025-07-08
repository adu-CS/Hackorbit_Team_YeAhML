"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Sparkles, Shield, Zap } from "lucide-react"

export default function HomePage() {
  const [claim, setClaim] = useState("")
  const [evidence, setEvidence] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleVerify = async () => {
    if (!claim.trim()) return

    setIsLoading(true)

    // Simulate API processing time
    setTimeout(() => {
      // Navigate to results page with the claim data
      const encodedClaim = encodeURIComponent(claim)
      const encodedEvidence = encodeURIComponent(evidence)
      router.push(`/results?claim=${encodedClaim}&evidence=${encodedEvidence}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Fact Verification
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Truth Finder
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Verify any claim with our advanced AI system. Get instant, evidence-based analysis with confidence scores
              and reliable sources.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Reliable Sources</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Search className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Deep Research</span>
              </div>
            </div>
          </div>

          {/* Main Input Card */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Submit Your Claim</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Enter any factual statement you'd like us to verify with evidence-based research
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 p-8">
              <div className="space-y-3">
                <Label htmlFor="claim" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Enter a factual claim *
                </Label>
                <Input
                  id="claim"
                  placeholder="e.g., Vaccines cause autism in children"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  className="text-base py-6 px-4 border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="evidence" className="text-base font-semibold text-gray-700">
                  Supporting Evidence <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="evidence"
                  placeholder="Provide any additional context, sources, or background information that might help with the verification process..."
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  rows={5}
                  className="text-base p-4 border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none transition-all duration-200"
                />
              </div>

              <Button
                onClick={handleVerify}
                disabled={!claim.trim() || isLoading}
                className="w-full text-lg py-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing Claim...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Search className="h-5 w-5" />
                    Verify Claim
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Trust indicators */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">Trusted by researchers, journalists, and fact-checkers worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-medium text-gray-400">REUTERS</div>
              <div className="text-xs font-medium text-gray-400">AP NEWS</div>
              <div className="text-xs font-medium text-gray-400">SNOPES</div>
              <div className="text-xs font-medium text-gray-400">FACTCHECK.ORG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
