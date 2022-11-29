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

## TODOS: fontEnd

### DONE

- **importante** concertar bugs nos links de redirecionamento em register e login [ok]
- **importante** concertar bugs do checkboxes [ok]
- concertar bugs do updatePost onde as img preview estão no tamanho errado e colocar close icon [ok]
- colocar close icon no deletePost do post [ok]
- **importante** criar usuários falsos [ok]
- **importante** criar posts falsos para o usuario logado [ok]
- **importante** adicionar função de redirecionamento para perfil no componente do post [ok]
- **importante** renderizar do profile do usuario logado os posts falsos criados [ok]
- **importante** renderizar os respectivos posts nos perfis dos respectivos usuários [ok]
- **importante** criar componente para página não encontrada [ok]
- **importante** filtragem de post por categoria [ok];
- **importante** ADICIONAR O DIVS PARA O GOOGLE ADS [ok]
- **importante** limitar a quantidade de categorias selecionadas nas configurações e na criação de post [ok]

---

### NOT DONE

- **importante** adicionar função de add ou remover revisão no like button

- criar função que pega o id dos elementos do componente category e o deixa selecionado (com um css diferente)
- colocar um dropdown no change email e senha

---

## TODOS: backEnd

### DONE

- **importante** verificar função para buscar usuário logado (ainda estava retornando undefined) [ok]
- **importante** função para atualizar informações do usuário como foto de perfil, nome, bio e categorias [ok]
- **importante** verificar função para deletar um usuário [ok]
- **importante** importar posts existentes para renderiza-los no explore [ok]
- **importante** importar usuários existentes para rederiza-los no filtro de busca (função semelhante ao getPosts); [ok]
- **importante** função para cadastrar post [ok]
- **importante** filtragem de post por uid; [ok]
- **verificar** verificar cadastro de url do storage (nao está cadastrando a url) [ok]
- **verificar** organizar nomes dos diretórios no storage (pasta profile com uid e nome do file e pasta postContent com uid e nome do file) [ok]
- criar query para importar posts de usuário logado atarves do uid [ok]
- **verificar** importar posts especificos, com uid do respectivo usuário passado pelo parametro da url, para renderiza-los ao seu perfil correspondente [ok]
- **verificar** filtrar categorias existentes (perfil do user) para ficar pré selecionadas no config e no componente categorys de pesquisa [ok]

---

### NOT DONE

- **importante** função para cadastrar revisão com as informações do respectivo post selecionado pelo usuário
- **importante** função para atualizar revisão com nova data de revisão

binho:

- adicionar a função sendPost ao context
- **importante** função para atualizar post
- **importante** função para deletar post
- **verificar** função para atualizar numero de likes de um posts quando likeados por um usuário;
- **verificar** função para filtrar posts likeados pelo usuário (se existe uma review com as inf. desse post);

---

- **verificar** como atualizar os diretórios storage
- **verificar** add google ads
- **verificar** fazer deploy

- **verificar** função para mudança de senha atravez de e-mail
- **verificar** função para mudança de e-mail
- **verificar** função para confirmação de e-mail

## POSSÍVEIS IMPLEMENTAÇÕES

- utilizar CryptoJs para criptografar tokens dos users

- criar paginas para os links do footer (estruturar lugar para os textos)

- criar paginas para ver quem segue e quem esta seguindo

- criar paginas para ver respondas do post

- criar página de notificações (quem esta seguinto ou quantas revisões tem um post por usuário (como um like))
