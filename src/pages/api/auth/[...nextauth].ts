import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : ""
        }),
        GithubProvider({
            clientId: typeof process.env.GITHUB_ID === "string" ? process.env.GITHUB_ID : "",
            clientSecret: typeof process.env.GITHUB_SECRET === "string" ? process.env.GITHUB_SECRET : "",
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID?process.env.DISCORD_CLIENT_ID:"",
            clientSecret: process.env.DISCORD_CLIENT_SECRET?process.env.DISCORD_CLIENT_SECRET:""
        })
    ],
    pages:{
            signIn: '/signin',
    }
}
export default NextAuth(authOptions)