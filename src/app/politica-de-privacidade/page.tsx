import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Política de Privacidade | Felp Tattoo",
    description: "Política de Privacidade e Termos de Uso do site Felp Tattoo.",
    robots: "noindex, follow" // Geralmente não é necessário indexar política de privacidade com prioridade
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background text-foreground py-12 md:py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                            <ArrowLeft size={20} />
                            Voltar para o início
                        </Button>
                    </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary">Política de Privacidade</h1>

                <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300">
                    <p>
                        A sua privacidade é importante para nós. É política do <strong>Felp Tattoo</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://www.felptattoo.com" className="text-primary underline">felptattoo.com</a>, e outros sites que possuímos e operamos.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">1. Informações que coletamos</h2>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (como o agendamento de orçamento). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>
                    <p>
                        Os dados coletados em nosso formulário de contato incluem:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Nome completo;</li>
                        <li>Número de telefone / WhatsApp;</li>
                        <li>Informações sobre o projeto de tatuagem (local, tamanho, referências).</li>
                    </ul>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">2. Uso das Informações</h2>
                    <p>
                        Utilizamos as informações coletadas para:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Entrar em contato via WhatsApp ou E-mail para fornecer o orçamento solicitado;</li>
                        <li>Agendar avaliações e sessões de tatuagem;</li>
                        <li>Melhorar a experiência do usuário em nosso site.</li>
                    </ul>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">3. Compartilhamento de Dados</h2>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. Seus dados podem ser processados por ferramentas de terceiros que utilizamos para gestão do estúdio (como CRM e sistema de e-mail), que também seguem rigorosos padrões de segurança.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">4. Cookies</h2>
                    <p>
                        Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência.
                    </p>
                    <p>
                        Utilizamos cookies para analisar o tráfego do site (via Google Analytics/Tag Manager) e para campanhas de marketing (Google Ads/Meta Ads), visando alcançar pessoas interessadas em tatuagem realista. Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade do site.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">5. Seus Direitos</h2>
                    <p>
                        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. Você também tem o direito de solicitar a exclusão dos seus dados de nossa base a qualquer momento, bastando entrar em contato conosco.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6 mb-4">6. Contato</h2>
                    <p>
                        Para esclarecer dúvidas sobre esta Política de Privacidade ou sobre os dados pessoais que tratamos, entre em contato conosco através dos canais oficiais disponíveis no rodapé deste site.
                    </p>

                    <p className="text-sm text-zinc-500 mt-8 border-t border-zinc-800 pt-8">
                        Esta política é efetiva a partir de <strong>Janeiro/2026</strong>.
                    </p>
                </div>
            </div>
        </main>
    );
}
