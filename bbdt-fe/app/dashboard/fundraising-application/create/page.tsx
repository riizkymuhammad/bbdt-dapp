"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  coverImage: z.any(),
  endDate: z
    .date({
      required_error: "Please select an end date.",
    })
    .min(new Date(), {
      message: "End date cannot be in the past.",
    }),
  targetAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0.",
  }),
 
})

type FormData = z.infer<typeof formSchema>

export default function FundraisingSubmissionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      targetAmount: "",
      coverImage: undefined,
    },
  })

  async function onSubmit(values: FormData) {
    try {
      setIsSubmitting(true)

      const walletAddress = (session?.user as any)?.walletAddress
      if (!walletAddress) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No wallet address found. Please connect your wallet.",
        })
        return
      }

      if (!selectedFile) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a cover image",
        })
        return
      }

      const formData = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        endDate: values.endDate.toISOString(),
        targetAmount: values.targetAmount,
        coverImage: selectedFile,
        walletAddress: walletAddress,
      };
      
      console.log("Form values:", values)
      console.log("Wallet address:", walletAddress)



      console.log("Form Data apa aja1 :", formData)
      const response = await fetch("http://localhost:3002/api/cases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create fundraising case")
      }

      const data = await response.json()
      console.log("API Response:", data)

      toast({
        title: "Success",
        description: "Fundraising case has been created successfully.",
      })

      router.push("/dashboard/fundraising-application")
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create fundraising case. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue("title", title)

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    form.setValue("slug", slug)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("coverImage", {
          message: "Image size must be less than 1MB",
        })
        return
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError("coverImage", {
          message: "Only .jpg, .jpeg, .png and .webp formats are supported",
        })
        return
      }

      setSelectedFile(file)
      form.setValue("coverImage", file)

      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      return () => URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Fundraising Case</CardTitle>
          <CardDescription>Fill in the details for your fundraising case.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter fundraising case title" {...field} onChange={handleTitleChange} />
                    </FormControl>
                    <FormDescription>A clear and descriptive title for your fundraising case.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="fundraising-case-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the title. Auto-generated but can be customized.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your fundraising case..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormDescription>Provide detailed information about your fundraising case.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={handleImageChange}
                          {...field}
                        />
                        {previewUrl && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Cover preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Upload a cover image (max 1MB). Supported formats: JPG, PNG, WebP</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>The end date for your fundraising case.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount (ETH)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormDescription>The amount of ETH you aim to raise.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Fundraising Case
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

