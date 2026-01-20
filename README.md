# 🚀 Template Landing Page - Alta Conversão (Next.js)

Este é um projeto **Next.js 14+ (App Router)** otimizado para Landing Pages de alta conversão, com foco em Tatuadores/Estúdios. Ele já inclui integrações prontas para CRM, Banco de Dados, E-mail e WhatsApp.

## 🛠️ Tecnologias Usadas
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion (animações).
- **Formulário:** React Hook Form + Zod (validação), React Phone Number Input.
- **Backend:** Next.js API Routes (Serverless).
- **Banco de Dados:** Neon (PostgreSQL) - *Multi-Tenant*.
- **E-mails:** Nodemailer (SMTP).
- **SEO/GEO:** Metadata Otimizada + JSON-LD (Schema.org) para Negócios Locais.
- **Deploy:** Vercel.

---

## 🏗️ Como Replicar para um Novo Cliente

### 1. Clonar e Instalar
```bash
git clone <url-do-repo> novo-projeto-cliente
cd novo-projeto-cliente
npm install
```

### 2. Configurar Variáveis de Ambiente (`.env.local`)
Crie um arquivo `.env.local` na raiz e preencha:

```bash
# --------------------------------------------------------
# 1. Banco de Dados (Neon PostgreSQL)
# --------------------------------------------------------
DATABASE_URL="postgresql://user:pass@host:port/dbname?sslmode=require"

# --------------------------------------------------------
# 2. Configuração Multi-Cliente (IMPORTANTE)
# --------------------------------------------------------
# ID único para separar os leads deste cliente no banco
NEXT_PUBLIC_TENANT_ID="nome-cliente-slug"
# Nome legível que vai para o CRM
NEXT_PUBLIC_TENANT_NAME="Nome do Estúdio ou Tatuador"

# --------------------------------------------------------
# 3. Integração CRM (Webhook)
# --------------------------------------------------------
# URL do CRM Próprio para receber o JSON do lead
CRM_WEBHOOK_URL="https://casaldotrafego.vercel.app//api/webhooks..."

# --------------------------------------------------------
# 4. Configuração de E-mail (SMTP - Nodemailer)
# --------------------------------------------------------
EMAIL_HOST="smtp.hostinger.com" # ou gmail, zoho, etc
EMAIL_PORT="587"
EMAIL_USER="noreply@seu-dominio.com"
EMAIL_PASS="sua-senha-segura"
EMAIL_TO="felipe@felptattoo.com"
```

### 3. Configurar o Banco de Dados (Neon)
Rode este script SQL no **SQL Editor** do Neon para criar a tabela pronta para múltiplos clientes:
...
```

### 4. Exemplos de SMTP (E-mail)
Aqui estão configurações comuns para preencher no `.env.local`:

**Opção A: Gmail (Requer "Senha de App")**
- Host: `smtp.gmail.com`
- Port: `465`
- User: `seu@gmail.com`
- Pass: *Não é a senha do login!* Crie uma em: Conta Google > Segurança > Verificação em 2 etapas > Senhas de app.

**Opção B: Hostinger (Titan Email)**
- Host: `smtp.hostinger.com` (ou `smtp.titan.email`)
- Port: `465` (SSL) ou `587` (TLS)
- User: `seu@dominio.com`
- Pass: `Sua senha de login do email`

**Opção C: Zoho Mail**
- Host: `smtp.zoho.com`
- Port: `465`
- User: `seu@dominio.com`
- Pass: `Sua senha`

---

## 🔄 Fluxo de Dados (Integrações)

```sql
-- Cria a tabela Leads se não existir
CREATE TABLE IF NOT EXISTS public."Leads" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    client_id TEXT NOT NULL DEFAULT 'default', -- Separa os clientes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permite o mesmo telefone em clientes diferentes (Remove restrição antiga se houver)
ALTER TABLE public."Leads" DROP CONSTRAINT IF EXISTS "Leads_phone_key";

-- Cria índice único composto (Cliente + Telefone)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_leads_client_phone" ON public."Leads" (client_id, phone);

-- Índice para busca rápida por cliente
CREATE INDEX IF NOT EXISTS "idx_leads_client" ON public."Leads" (client_id);
```

---

## ⚙️ Detalhamento do Backend (API)

O backend é construído com **Next.js API Routes** (`src/app/api/contact/route.ts`). Ele opera no modelo Serverless.

### 1. Lógica da Rota (`POST /api/contact`)
O fluxo exato de processamento é:
1.  **Validação Básica:** Verifica se `name` e `phone` existem.
2.  **Formatação de Telefone:** Remove `+` e caracteres não numéricos para salvar limpo no banco (Ex: `5512988887777`).
3.  **Identificação do Cliente (Tenant):** Lê o `NEXT_PUBLIC_TENANT_ID` para saber a quem pertence o lead.
4.  **Upsert no Banco (PostgreSQL):**
    *   Tenta inserir o lead.
    *   Se já existir um lead com mesmo `phone` E `client_id`, ele **atualiza** o nome e a data (`updated_at`), evitando duplicatas.
5.  **Envio para CRM (Webhook):** Dispara o JSON para o Zapier/n8n (se `CRM_WEBHOOK_URL` estiver configurado).
    *   **Falha Silenciosa:** Se o CRM falhar, o erro é logado mas **não trava** o retorno de sucesso para o usuário.
6.  **Envio de E-mail (Nodemailer):** Envia notificação para o dono do site.

### 2. Conexão com Banco de Dados (`src/lib/db.ts`)
O projeto usa um *Singleton Pattern* para conectar ao Postgres. Isso evita abrir muitas conexões simultâneas em ambiente Serverless/Dev.
*   Arquivo: `src/lib/db.ts`
*   Biblioteca: `pg` (Native Postgres Client)
*   **Importante:** Certifique-se de que a string de conexão `DATABASE_URL` no `.env` termine com `?sslmode=require` para segurança no Neon.

### 3. Modelo de E-mail (Notificação)

Quando um lead se cadastra, o sistema envia um e-mail para o endereço definido em `EMAIL_TO`.

**Onde editar:** `src/app/api/contact/route.ts` (linhas ~85-100).

**Variáveis Disponíveis para uso no Template:**
- `${name}`: Nome do cliente.
- `${formattedPhone}`: Telefone (somente números, ex: 5512999999999).
- `${process.env.NEXT_PUBLIC_TENANT_NAME}`: Nome do estúdio.
*Nota: O campo e-mail foi removido do formulário por opção.*

**Template Atual (HTML):**
O código já possui estilos inline para garantir que abra bem no Gmail/Outlook.

```html
<div style="font-family: sans-serif; color: #333; max-width: 600px;">
    <h2>🚀 Novo Lead Capturado</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Telefone:</strong> <a href="https://wa.me/${formattedPhone}" style="color: #2563eb;">${formattedPhone} (WhatsApp)</a></p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 14px; color: #666;">
        <em>Origem: ${process.env.NEXT_PUBLIC_TENANT_NAME}</em><br/>
        <em>Enviado para CRM: ${crmWebhookUrl ? '✅ Sim' : '❌ Não Configurado'}</em>
    </p>
</div>
```

> **Dica:** Para adicionar mais campos (ex: "E-mail" ou "Ideia da Tatuagem"), você precisa:
> 1. Adicionar o campo no `contact-form.tsx`.
> 2. Adicionar no `POST` do `route.ts`.
> 3. Inserir a variável `${variavel}` neste HTML acima.
 
 ---
 
 ## 🔄 Fluxo de Dados (Integrações)
 
 ### 1. Webhook CRM (JSON Payload)
 Quando um lead se cadastra, o sistema envia este JSON para o `CRM_WEBHOOK_URL`:
 
 ```json
 {
   "name": "Nome do Lead",
   "email": "", // Campo vazio (removido do formulário)
   "whatsapp": "5511999999999",
   "company": "", // Em branco
   "notes": "",   // Em branco
   "campaignSource": "Site Orgânico / Landing Page",
   "message": "Solicitação de orçamento via formulário."
 }
 ```

### 2. Redirecionamento WhatsApp
Após o cadastro, o usuário vai para `/obrigado`, aguarda 3 segundos e é redirecionado para:
`https://wa.me/SEU_NUMERO?text=Olá...`
*(Lembre de alterar o número e a mensagem no arquivo `src/app/obrigado/page.tsx`)*.

---

## ⚠️ Solução de Problemas Comuns (Troubleshooting)

### 1. Botões não funcionam (Links âncora)
**Problema:** Ao usar `<Link href="#contato">` do Next.js, a rolagem suave falha ou dá erro de hidratação.
**Solução:** Substitua por tags nativas `<a>`:
```tsx
<a href="#contato">
  <Button>Orçamento</Button>
</a>
```

### 2. Erro "Hydration failed" no Formulário
**Problema:** O componente de input de telefone (`react-phone-number-input`) renderiza diferente no servidor e cliente.
**Solução:** O formulário já trata isso usando `useState` e `useEffect` para carregar o país via API (`ipapi.co`) apenas no cliente.

### 3. SEO Local (Geo Tags)
Para alterar a cidade/localização, edite:
1.  **`src/app/layout.tsx`**: Metadata global (keywords, geo tags).
2.  **`src/app/page.tsx`**: JSON-LD (`TattooParlor`) com endereço e coordenadas.

---

---

## 📂 Estrutura do Projeto

Para ajudar na navegação, aqui está onde ficam os arquivos principais:

```
src/
├── app/
│   ├── api/contact/route.ts  # Backend (API do formulário)
│   ├── tattoorealismo/       # Página secundária (antiga teste2)
│   ├── obrigado/             # Página pós-cadastro
│   ├── layout.tsx            # Layout Global (Fonts, SEO Metadata)
│   └── page.tsx              # Página Principal (Home)
├── components/
│   ├── ui/                   # Componentes base (Botões, Inputs - Shadcn/UI)
│   ├── contact-form.tsx      # Lógica do Formulário (Frontend)
│   └── hero-section.tsx      # Seção Hero (Topo da página)
├── lib/
│   └── db.ts                 # Conexão com Banco de Dados (Postgres)
└── .env.local                # Variáveis de Ambiente (Não comitar!)
```

---

## 🎨 Guia de Personalização

Quer adaptar para outro cliente? Veja onde mexer:

### 1. Cores e Estilo
*   **Cores do Tema:** Edite `src/app/globals.css` (variáveis `:root`).
*   **Configuração Tailwind:** Veja `tailwind.config.ts`.

### 2. Fontes
*   **Tipografia:** O projeto usa `Inter` e `Outfit`. Para trocar, edite `src/app/layout.tsx`.

### 3. Conteúdos e Textos
*   Aterar textos da Home: `src/app/page.tsx` ou os componentes em `src/components/`.
*   Aterar textos de "Tattoo Realismo": `src/app/tattoorealismo/page.tsx`.

---

## 🚀 Comandos Úteis

```bash
npm run dev   # Roda localmente (localhost:3000)
npm run build # Gera build de produção
npm run start # Roda o build
npm run lint  # Verifica erros de código
```

## ✅ Checklist de Replicação
1. [ ] Clonar repositório.
2. [ ] Criar `.env.local` com as credenciais do novo cliente.
3. [ ] Rodar script SQL no banco Neon do novo cliente.
4. [ ] Atualizar textos e imagens nas páginas.
5. [ ] Subir no Vercel e configurar as mesmas variáveis de ambiente lá.

---
**Desenvolvido com foco em Alta Performance e Conversão.**
