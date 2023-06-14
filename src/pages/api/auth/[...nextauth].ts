import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: typeof process.env.GITHUB_ID === "string" ? process.env.GITHUB_ID : "",
            clientSecret: typeof process.env.GITHUB_SECRET === "string" ? process.env.GITHUB_SECRET : "",
        }),
        // ...add more providers here
    ],
}
export default NextAuth(authOptions)