import { NextResponse } from "next/server"
import { ethers } from "ethers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { walletAddress, signature, message } = body

    if (!walletAddress || !signature || !message) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }

    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signature)

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      )
    }

    // In a real application, you would:
    // 1. Verify the nonce from the message matches the stored nonce
    // 2. Create a session or JWT token
    // 3. Store the user's information in your database
    // 4. Invalidate the used nonce

    return NextResponse.json({
      success: true,
      token: "your-jwt-token", // Generate a real JWT token in production
    })
  } catch (error) {
    console.error('Signature verification error:', error)
    return NextResponse.json(
      { error: "Failed to verify signature" },
      { status: 500 }
    )
  }
}

