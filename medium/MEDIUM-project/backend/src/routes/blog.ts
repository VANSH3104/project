import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createblogInput, updateblog } from "@vanshnpm/medium-commonn";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Middleware for authorization
blogRoute.use('/*', async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    c.status(401);
    return c.json({ msg: 'Missing token' });
  }

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    //@ts-ignore
    c.set('userId', response.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ msg: "Error in authorization" });
  }
});

// Create a blog post
blogRoute.post('/', async (c) => {
  try {
    const body = await c.req.json();

    // Validate the request body against the createblogInput schema
    const result = createblogInput.safeParse(body);
    if (!result.success) {
      return c.json({ msg: "Invalid input", errors: result.error.errors }, 400);
    }
    //@ts-ignore
    const userId = c.get('userId');
    console.log(userId);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.Context,
        authorId: userId as string, 
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Error creating post' });
  }
});

// Update a blog post
blogRoute.put('/', async (c) => {
  try {
    const body = await c.req.json();
    // Validate the request body against the createblogInput schema
    const result = updateblog.safeParse(body);
    if (!result.success) {
      return c.json({ msg: "Invalid input", errors: result.error.errors }, 400);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: {
        id: result.data.id,
      },
      data: {
        title: result.data.title,
        content: result.data.Context,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Error updating post' });
  }
});

// Fetch all blog posts
blogRoute.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    return c.json(blogs);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Error fetching posts' });
  }
});
blogRoute.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findUnique({
      where: { id },
    });

    if (!blog) {
      c.status(404);
      return c.json({ msg: 'Post not found' });
    }

    return c.json(blog);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Error fetching post' });
  }
});
blogRoute.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log(id)
    await prisma.post.delete({
      where: { id },
    });

    return c.json({ msg: 'Post deleted successfully' });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Error deleting post' });
  }
});
