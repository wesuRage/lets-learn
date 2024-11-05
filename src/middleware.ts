import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.role === "user";
    },
  },
});

export const config = {
  matcher: ["/home/:path*"],
};
