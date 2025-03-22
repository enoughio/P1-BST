import FindClub from "@/components/find-club"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find a Club Near You</h1>
        <p className="text-muted-foreground mb-8">
          Search for clubs in your city and connect with like-minded individuals
        </p>
        <FindClub />
      </div>
    </main>
  )
}

