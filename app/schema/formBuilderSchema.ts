import { z } from "zod";

const baseQuizSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Field question must not be empty."),
  inlineImg: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Only image files are accepted."
    ),
});

const textQuizSchema = baseQuizSchema.extend({
  type: z.literal("text"),
  correctAnswer: z.string().min(1, "Correct Answer must not be empty."),
});

const optionSchema = z.object({
  id: z.string(),
  value: z.string().min(1, "Option must not be empty."),
});

const multipleChoiceQuizSchema = baseQuizSchema.extend({
  type: z.literal("multipleChoice"),
  options: z
    .array(optionSchema)
    .min(2, "There must be at least 2 multiple choice options."),
  correctAnswer: z
    .string()
    .min(
      1,
      "At least one multiple choice option must be selected to mark it as correct answer."
    ),
});

const fillInBlankQuizSchema = baseQuizSchema.extend({
  type: z.literal("fillInBlank"),
  correctAnswer: z.string().min(1, "Correct Answer must not be empty."),
});

const matchAnswerPairSchema = z.object({
  id: z.string(),
  prompt: z.string().min(1, "Match answer prompt must not be empty."),
  description: z.string().min(1, "Match answer description must not be empty."),
});

const matchQuizSchema = baseQuizSchema.extend({
  type: z.literal("match"),
  correctAnswer: z
    .array(matchAnswerPairSchema)
    .min(2, "There must be at least 2 match answer pairs."),
});

const itemSchema = z.discriminatedUnion("type", [
  textQuizSchema,
  multipleChoiceQuizSchema,
  fillInBlankQuizSchema,
  matchQuizSchema,
]);

export const mainSchema = z.object({
  title: z.string().min(1, "Form title must not be empty."),
  quizFields: z
    .array(itemSchema)
    .min(1, "There must be at least 1 quiz field."),
});
