import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import type { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "metamask",
      name: "MetaMask",
      credentials: {
        walletAddress: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.walletAddress || !credentials?.signature) return null

        try {
          // Make API call to your backend to verify the wallet and get user data
          const response = await fetch("http://localhost:3002/api/users/loginWallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              walletAddress: credentials.walletAddress,
              signature: credentials.signature,
            }),
          })

          if (!response.ok) {
            throw new Error("Authentication failed")
          }

          const data = await response.json()
          return {
            id: data.user.id,
            walletAddress: data.user.walletAddress,
            role: data.user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token when signing in
      if (user) {
        token.walletAddress = user.walletAddress
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add token data to session
      if (session.user) {
        ;(session.user as any).walletAddress = token.walletAddress
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

