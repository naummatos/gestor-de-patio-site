# Gestor de Pátio e Catálogo — site

Landing page estática (`index.html` + `favicon.svg`), pronta para publicar no
GitHub Pages.

## Publicar pela primeira vez

1. Confirme o nome do repositório no GitHub (sugestão: `gestor-de-patio-site`).
2. No terminal, dentro desta pasta:

   ```bash
   gh repo create NOME-DO-REPO --public --source=. --remote=origin --push
   ```

3. No GitHub, vá em **Settings → Pages** do repositório e confirme que a
   fonte é a branch `main`, pasta `/ (root)`. O GitHub Pages ativa
   automaticamente em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Quando registrar um domínio próprio (ex: `.com.br`)

1. Registre o domínio em [registro.br](https://registro.br) (para `.com.br`)
   ou em um registrador como Namecheap/GoDaddy (para `.com`).
2. Crie o arquivo `CNAME` nesta pasta com o domínio escolhido, por exemplo:

   ```text
   gestordepatio.com.br
   ```

3. Configure o DNS do domínio:
   - Registro `A` apontando para os IPs do GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - Ou, para um subdomínio (`www`), um registro `CNAME` apontando para
     `SEU-USUARIO.github.io`.
4. No GitHub, em **Settings → Pages**, adicione o domínio customizado e
   aguarde a verificação de DNS e o certificado HTTPS automático.

## Atualizar o site depois de publicado

Edite `index.html`, depois:

```bash
git add index.html
git commit -m "Atualiza conteúdo do site"
git push
```

As mudanças ficam no ar em alguns minutos.

## Pendências conhecidas

- `og:url` e `canonical` em `index.html` estão com o placeholder
  `SEU-DOMINIO-AQUI` — atualize para a URL final assim que o domínio ou a
  URL do GitHub Pages estiver definida.
- Não há imagem de pré-visualização (`og:image`) para compartilhamento em
  redes sociais/WhatsApp ainda; pode ser adicionada depois.
- Sem analytics/rastreamento de conversão configurado, por escolha do
  cliente nesta fase.
