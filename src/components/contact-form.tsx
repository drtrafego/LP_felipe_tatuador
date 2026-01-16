"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().min(10, {
        message: "Telefone deve ter pelo menos 10 dígitos (DDD + Número).",
    }),
})

export function ContactForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (response.ok) {
                router.push("/obrigado")
            } else {
                const data = await response.json()
                console.error("Erro ao enviar:", data)
                alert("Erro ao enviar formulário. Tente novamente.")
            }
        } catch (error) {
            console.error(error)
            alert("Erro de conexão. Verifique sua internet.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-card/10 border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="text-3xl text-primary font-heading tracking-wide text-center">Agendamento</CardTitle>
                <CardDescription className="text-center text-muted-foreground/80">
                    Vamos transformar sua ideia em arte.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground/90">Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Felipe Silva" {...field} className="bg-black/20 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/30 h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground/90">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="seu@email.com" {...field} type="email" className="bg-black/20 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/30 h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground/90">WhatsApp / Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(11) 99999-9999" {...field} className="bg-black/20 border-white/10 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/30 h-12" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full font-bold text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-wider" disabled={loading}>
                            {loading ? "Enviando..." : "✅ Pedir orçamento agora"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
