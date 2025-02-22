import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MembershipHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership History</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Et soluta animi ad quas quasi nam odit nihil ut consequatur explicabo.
        </p>
        <Button variant="secondary">View here</Button>
      </CardContent>
    </Card>
  )
}

