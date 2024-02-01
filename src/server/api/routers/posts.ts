import { z } from "zod";

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
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
