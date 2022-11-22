# Projeto Memorize Studio:

    Desenvolvimento de projeto de tcc, MemorizeStudio, um site de memorização de conteúdos didáticos básicos.

# Contrubua para o projeto:

> ```
> tag: descrição
> ```
>
> A **tag** deve ser o tipo de alteração, seguindo a referencia que estará abaixo com checkbox;\
> E a **descrição** deve ser uma mensagem de commit simples, que abranja todas as alterações dentro do PR;

### Que tipo de alteração esta revisão de código introduz? (Tag)

- [ ] `feat` Nova funcionalidade
- [ ] `fix` Correção de um bug
- [ ] `docs` Atualização de documentação
- [ ] `refact` Alteração no código que não é funcionalidade nova nem correção de bug
- [ ] `perf` Melhoria de performance
- [ ] `test` Adição, alteração ou remoção de testes
- [ ] `build` Alteração no processo de build ou em dependencias externas
- [ ] `ci` Alteração de pipeline ou fluxo de publicação
- [ ] `chore` Outras alterações que não modificam arquivos base ou arquivos de teste
- [ ] `revert` Reversão de commits anteriores

**Exemplo**: `fix/deleteaccount route: concerto de bug no botão delete`

# TODOS: fontEnd

- **importante** add links de redirecionamento do footer

- **importante** concertar bugs nos links de redirecionamento em register e login

- **importante** concertar bugs do checkboxes

- limitar a quantidade de categorias selecionadas nas configurações e na criação de post

- concertar bugs do updatePost onde as img preview estão no tamanho errado e colocar close icon

- colocar close icon no deletePost do post

- criar dados para aparecer nos perfis externos

- criar função que pega o id dos elementos do componente category e o deixa selecionado (com um css diferente)

- **importante** ADICIONAR O DIVS PARA O GOOGLE ADS

## TODOS: backEnd

- **importante** verificar função para buscar usuário logado (ainda está retornando undefined)

---

- **importante** função para atualizar informações do usuário como foto de perfil, nome, bio e categorias
- verificar função para mudança de senha atravez de e-mail
- verificar função para mudança de e-mail
- **importante** verificar função para confirmação de e-mail
- importar usuários existentes para rederiza-los no filtro de busca

---

- **importante** função para cadastrar post
- função para atualizar post
- **importante** função para deletar post
- importar posts do usuario logado do firestore e adicionalos a um estado no perfil para ser renderizados
- **importante** importar posts existentes para renderiza-los no explore
- importar posts de usuario atraves do seu uid (query com uid forenecido)

---

- **importante** função para cadastrar revisão com as informações do respectivo post selecionado pelo usuário

---

- **verificar** organizar diretórios com o uid (e também id do post para registro de imagem de post) para registrar imagens no storage

---

- **verificar** add google ads

---

- **verificar** fazer deploy

## POSSÍVEIS IMPLEMENTAÇÕES

- criar paginas para os links do footer (estruturar lugar para os textos)

- criar paginas para ver quem segue e quem esta seguindo

- criar paginas para ver respondas do post

- criar página de notificações (quem esta seguinto ou quantas revisões tem um post por usuário (como um like))
