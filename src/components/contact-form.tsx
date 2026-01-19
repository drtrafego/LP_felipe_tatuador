"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import 'react-phone-number-input/style.css'
// @ts-ignore
import PhoneInput from 'react-phone-number-input'

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
    phone: z.string().min(1, "Telefone é obrigatório.").min(10, "Telefone inválido."),
})

export function ContactForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground/90">WhatsApp / Telefone</FormLabel>
                                    <FormControl>
                                        <div className="phone-input-container">
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                value={field.value}
                                                onChange={field.onChange}
                                                defaultCountry="BR"
                                                className="flex h-12 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground items-center gap-2"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full font-bold text-sm md:text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all md:uppercase tracking-wider" disabled={loading}>
                            {loading ? "Enviando..." : "✅ Pedir orçamento"}
                        </Button>
                    </form>
                </Form>
                <style jsx global>{`
                    .PhoneInputInput {
                        background: transparent;
                        border: none;
                        outline: none;
                        color: inherit;
                        width: 100%;
                        height: 100%;
                    }
                    .PhoneInputCountrySelect {
                        background: black;
                        color: white;
                    }
                    .PhoneInputCountryIcon {
                         width: 24px;
                         height: 24px;
                    }
                `}</style>
            </CardContent>
        </Card>
    )
}
