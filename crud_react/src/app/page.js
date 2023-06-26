"use client"

import Table from "../components/Table"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 py-12">
      <div className="container flex-col px-40">
        <Table></Table>
      </div>
    </main>
  )
}
