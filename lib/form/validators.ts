import { z } from "zod";
import { MessageInput } from "@/lib/types";
import fieldMaxLengths from "@/config/fieldMaxLengths";


const EmailSchema = z.email().toLowerCase().max(fieldMaxLengths.email);

const ContactSchema = z.object({
    email: EmailSchema,
    firstName: z.string().trim().min(1).max(fieldMaxLengths.firstName),
    lastName: z.string().trim().min(1).max(fieldMaxLengths.lastName),
    company: z.string().trim().min(1).max(fieldMaxLengths.company),
    category: z.string().trim().min(1).max(fieldMaxLengths.category),
    content: z.string().transform(v => v.replace(/\r/g, ''))
        .pipe(z.string().trim().min(1).max(fieldMaxLengths.content))
});


export function getValidEmail(formData: FormData): string
{
    const email = formData.get("email");
    return EmailSchema.parse(email);
}


export function getValidContactData(formData: FormData): MessageInput
{
    return ContactSchema.parse({
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        company: formData.get("company"),
        category: formData.get("category"),
        content: formData.get("content"),
    });
}