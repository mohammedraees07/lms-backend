import{z} from "zod"


export const titleValidateSchema = z.object ({
  body: z.object({
    title: z.string().min(1,"Title is required").trim()
  })
})



