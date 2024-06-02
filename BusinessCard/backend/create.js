// validation.js
const { z } = require('zod');

const createCard = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  linkedIn: z.string().url().optional(),
  twitter: z.string().url().optional(),
  otherSocial: z.string().url().optional(),
  interests: z.array(z.string()).nonempty(),
});

const updateCard = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  linkedIn: z.string().url().optional(),
  twitter: z.string().url().optional(),
  otherSocial: z.string().url().optional(),
  interests: z.array(z.string()).optional(),
});

module.exports = { createCard, updateCard };
