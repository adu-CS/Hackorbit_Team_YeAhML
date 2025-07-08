"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, CheckCircle, XCircle, MinusCircle } from "lucide-react"

export default function Component() {
  const [claim, setClaim] = useState("")
  const [evidence, setEvidence] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    verdict: "Supported" | "Refuted" | "Neutral"
    confidence: number
    explanation: string
    exactMatch: string
    sourceUrl?: string
  } | null>(null)

  const handleVerify = async () => {
    if (!claim.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResults({
        verdict: "Supported",
        confidence: 87,
        explanation:
          "The claim is well-supported by multiple credible sources. Scientific studies and official reports confirm the accuracy of this statement with strong evidence backing the core assertions made.",
        exactMatch:
          "According to recent studies, this particular claim has been verified through extensive research and peer-reviewed publications, showing consistent results across multiple independent investigations.",
        sourceUrl: "https://example.com/source-article",
      })
      setIsLoading(false)
    }, 2000)
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "Supported":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Refuted":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "Neutral":
        return <MinusCircle className="h-5 w-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "Supported":
        return "bg-green-50 text-green-700 border-green-200"
      case "Refuted":
        return "bg-red-50 text-red-700 border-red-200"
      case "Neutral":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Fact Checker</h1>
          <p className="text-gray-600">Verify claims with evidence-based analysis</p>
        </div>

        {/* Input Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Submit a Claim</CardTitle>
            <CardDescription>
              Enter a factual claim you'd like to verify. Supporting evidence is optional but can improve accuracy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="claim" className="text-sm font-medium">
                Enter a factual claim *
              </Label>
              <Input
                id="claim"
                placeholder="e.g., The Earth's average temperature has increased by 1.1°C since 1880"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence" className="text-sm font-medium">
                Supporting Evidence <span className="text-gray-500">(optional)</span>
              </Label>
              <Textarea
                id="evidence"
                placeholder="Provide any additional context, sources, or evidence that might help with verification..."
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                rows={4}
                className="text-base resize-none"
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={!claim.trim() || isLoading}
              className="w-full text-base py-6"
              size="lg"
            >
              {isLoading ? "Verifying Claim..." : "Verify Claim"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Verification Results</h2>

            {/* Verdict Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {getVerdictIcon(results.verdict)}
                  <div>
                    <CardTitle className="text-lg">Claim-Check Verdict</CardTitle>
                    <CardDescription>Overall assessment of the claim</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge
                  variant="outline"
                  className={`text-base px-4 py-2 font-medium ${getVerdictColor(results.verdict)}`}
                >
                  {results.verdict}
                </Badge>
              </CardContent>
            </Card>

            {/* Confidence Score Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Confidence Score</CardTitle>
                <CardDescription>How certain we are about this verdict</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-blue-600">{results.confidence}%</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${results.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explanation Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Explanation</CardTitle>
                <CardDescription>Reasoning behind the verdict</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{results.explanation}</p>
              </CardContent>
            </Card>

            {/* Exact Match Text Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Exact Match Text</CardTitle>
                <CardDescription>Relevant excerpt from source material</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700 bg-blue-50/50 py-3 rounded-r">
                  "{results.exactMatch}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Source URL Card */}
            {results.sourceUrl && (
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Source</CardTitle>
                  <CardDescription>Reference material used for verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={results.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Source Article
                  </a>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
