"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"




const FormSchema = z.object({
  email_address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})






export function SendToMail() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        email_address: "",
    },
  })
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL! || 'http://localhost:3000';
  const apiURL = `${baseURL}/api/sendMail`;

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        toast({
            title: result.message,
           
        });
    } catch (error) {
        console.error(error);
        toast({
            title: "Failed to send email",
            
        });
    }
    form.reset();
   
  }


//    <FormField
//   control={form.control}
//   name="username" this is the name that is going in the json format 
//   render={({ field }) => (
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input  type="email" id="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                This is a form that sends automatic msg to the email provided .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
