"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Copy, Share2 } from "lucide-react"

interface VerificationResult {
  verdict: "Supported" | "Refuted" | "Neutral"
  confidence: number
  explanation: string
  extractedText: string
  source: string
  sourceUrl: string
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const claim = searchParams.get("claim") || ""
  const evidence = searchParams.get("evidence") || ""

  useEffect(() => {
    // Simulate API call to get results
    setTimeout(() => {
      setResult({
        verdict: "Refuted",
        confidence: 87,
        explanation:
          "There is no credible scientific evidence linking vaccines to autism. Multiple large-scale studies involving millions of children have consistently found no causal relationship between vaccination and autism spectrum disorders. The original study suggesting this link was retracted due to fraudulent data and methodological flaws.",
        extractedText:
          "There is currently no evidence that vaccines cause autism spectrum disorders. The weight of currently available evidence does not support the hypothesis that vaccines cause autism or are associated with increased risk of autism spectrum disorders.",
        source: "CDC / WHO / AAP",
        sourceUrl: "https://www.cdc.gov/vaccinesafety/concerns/autism.html",
      })
      setIsLoading(false)
    }, 1500)
  }, [])

  const getVerdictEmoji = (verdict: string) => {
    switch (verdict) {
      case "Supported":
        return "✅"
      case "Refuted":
        return "❌"
      case "Neutral":
        return "⚖️"
      default:
        return "❓"
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "Supported":
        return "text-green-600 bg-green-50 border-green-200"
      case "Refuted":
        return "text-red-600 bg-red-50 border-red-200"
      case "Neutral":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Analyzing your claim...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Claim Display */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">CLAIM ANALYZED</h2>
              <p className="text-lg font-medium text-gray-800 leading-relaxed">"{claim}"</p>
            </CardContent>
          </Card>

          {/* Results Grid */}
          {result && (
            <div className="grid gap-6">
              {/* Verdict */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getVerdictEmoji(result.verdict)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Verdict</h3>
                      <div
                        className={`inline-flex px-4 py-2 rounded-full border-2 font-semibold text-lg ${getVerdictColor(result.verdict)}`}
                      >
                        {result.verdict}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Score */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📊</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Confidence Score</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-blue-600">{result.confidence}%</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Explanation */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">🧠</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Explanation</h3>
                      <p className="text-gray-700 leading-relaxed text-base">{result.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">📚</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Source</h3>
                      <p className="text-base font-medium text-gray-800">{result.source}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Link */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">🔗</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Reference Link</h3>
                      <a
                        href={result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors text-base"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {result.sourceUrl}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracted Text */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">🧾</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Extracted Text</h3>
                      <blockquote className="border-l-4 border-blue-300 pl-6 py-4 bg-blue-50/50 rounded-r-lg">
                        <p className="text-gray-700 italic leading-relaxed text-base">"{result.extractedText}"</p>
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Check Another Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
