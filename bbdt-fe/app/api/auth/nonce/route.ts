import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      )
    }

    // Generate a random nonce
    const nonce = randomBytes(32).toString('hex')

    // In a real application, you would:
    // 1. Store the nonce in your database along with the wallet address
    // 2. Set an expiration time for the nonce
    // 3. Clean up expired nonces periodically

    return NextResponse.json({ nonce })
  } catch (error) {
    console.error('Nonce generation error:', error)
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    )
  }
}

