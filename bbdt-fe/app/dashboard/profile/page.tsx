'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const profileFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username harus minimal 3 karakter.",
  }),
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  location: z.string().optional(),
  avatar: z
    .any()
    .refine((files) => {
      if (!(files instanceof FileList) || files.length === 0) return true
      return files[0]?.size <= MAX_FILE_SIZE
    }, `Ukuran maksimal file adalah 5MB.`)
    .refine((files) => {
      if (!(files instanceof FileList) || files.length === 0) return true
      return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
    }, "Hanya file .jpg, .jpeg, .png dan .webp yang diperbolehkan."),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This would come from your backend in a real app
const defaultValues: Partial<ProfileFormValues> = {
  username: "johndoe",
  name: "John Doe",
  email: "john@example.com",
  location: "Jakarta, Indonesia",
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("/placeholder-user.jpg")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true)
      // Here you would typically upload the image and update the profile
      console.log(data)
      
      toast({
        title: "Profil Diperbarui",
        description: "Profil Anda telah berhasil diperbarui.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui profil. Silakan coba lagi.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profil</h2>
        <p className="text-muted-foreground">
          Kelola informasi profil dan preferensi akun Anda.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Profil</CardTitle>
          <CardDescription>
            Perbarui informasi profil Anda di sini. Klik simpan setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto Profil</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarPreview} alt="Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => {
                              handleAvatarChange(e)
                              onChange(e.target.files)
                            }}
                            {...field}
                          />
                          <FormDescription>
                            Pilih foto profil. JPG, PNG atau WebP (maks. 5MB)
                          </FormDescription>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormDescription>
                        Username yang akan ditampilkan di profil Anda.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nama lengkap Anda.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email yang akan digunakan untuk komunikasi.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input placeholder="Kota, Negara" {...field} />
                      </FormControl>
                      <FormDescription>
                        Lokasi Anda (opsional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

