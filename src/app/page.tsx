"use client"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { TestDocument, TestQuery } from "@/graphql/generated//client/graphql"

export default function Home() {
  const { loading, data } = useQuery<TestQuery>(TestDocument)
  if (loading) return <p>Loading ...</p>
  return (
    <div>
      <h1>Home</h1>
      <p>{data.test.text}</p>
    </div>
  )
}
