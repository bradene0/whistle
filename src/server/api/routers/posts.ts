//import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id, name: user.username, profilePicture: user.profileImageUrl
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
          take: 100,
  });

  const users = (
    await clerkClient.users.getUserList({
    userId: posts.map((post) => post.authorID),
    limit: 100 
  })
  ).map(filterUserForClient);

  return posts.map(post => ({
    post,
    author: users.find((user)) => user.id === post.authorId),
   }));
  }),
});

// export const postRouter = createTRPCRouter({
//   getAll: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return ctx.db.post.create({
//         data: {
//           name: input.name, 
//         },
//       });
//     }),

//   getLatest: publicProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//     });
//   }),
// });))))
