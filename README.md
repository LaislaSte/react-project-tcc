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
- **importante** adicionar função de add ou remover revisão no like button [ok]

---

### NOT DONE

- criar função que pega o id dos elementos do componente category e o deixa selecionado (com um css diferente)
- colocar um dropdown no change email e senha

- arrumar estilo dos selects do filter, ou criar um select
- verificar bug onde foto de perfil dos seguidores e seguindo não estão aparecendo no modal
- mostrar o componente page not found nas paginas que nao existem

- ajustar o layout de biografia dos perfis [ok]
- mudar de lugar os google ads para antes do filter [ok]
- **verificar** o botao seguir e deixar de seguir não está como esperado [ok]

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
- **importante** função para cadastrar revisão com as informações do respectivo post selecionado pelo usuário [ok]
- **verificar** função para filtrar posts likeados pelo usuário (se existe uma review com as inf. desse post); [ok]
- **importante** função para deletar post [ok]
- **verificar** função para atualizar revisão com nova data de revisão [ok]
- **verificar** funções de adicionar e remover seguidor [ok]
- **importante** verificar se o arrayRemove do removerFollower remove da maneira correta [ok]
- **verificar** função para atualizar numero de likes de um posts quando likeados por um usuário [ok]

---

### NOT DONE

#### ARRUMAR BUGS ANTES DO DEPLOY:

- **verificar** função para atualizar post
- **verificar** cadastro de imagem no storage
- **verificar** adicionar a função sendPost ao context
- mudança de estilo no botao like na pagina explore
- **verificar** testar cadastrar um email inesistente no app
- ajustar o filter de perfis ou remover do navbar (já que vai ser possivel procurar em explore) os ids se confundem com a query
- atualizar as querys para mudar os componentes toda vez que houver alguma mudança

**todos da documentação**

- **verificar** se não estiver logado reenvia para o login e não o public
- tirar a função de deletar flashcard do botão já revisei e deixar apenas no btn de like [ok]

- **verificar** excluir todos os posts que o usuário fez quando ele obtar por excluir sua conta

- depois que edita uma nova senha (manda um email com o link, ele é redirecionado para a pagina do config novamente com um alert de email enviado)
- achar uma função, ou ver como funciona a parte de mudnça de e-mail [é viável, mas testar se ele cadastra um e-mail válido]
  `import { getAuth, updateEmail } from "firebase/auth"; const auth = getAuth(); updateEmail(auth.currentUser, "user@example.com").then(() => { // Email updated! // ... }).catch((error) => { // An error occurred // ... });`
- retirar funcionalidade de seguir e parar de seguir (não tem necessidade e não atende aos requisitos)
  OU

- **verificar** fazer deploy

---

- **verificar** add google ads
- **verificar** função para mudança de senha atravez de e-mail
- **verificar** função para mudança de e-mail
- **verificar** função para confirmação de e-mail

## POSSÍVEIS IMPLEMENTAÇÕES

- criar um feed de seguindo para renderizar posts de quem o usuário segue.

- criar paginas para ver quem segue e quem esta seguindo
- criar um feed de seguindo para renderizar posts de quem o usuário segue.
- mudança de estilo no botao de seguir e para de seguir na pagina de usuario externo
  s
- criar página de notificações (quem esta seguinto ou quantas revisões tem um post por usuário (como um like))

- utilizar CryptoJs para criptografar tokens dos users

- criar paginas para os links do footer (estruturar lugar para os textos)

- criar paginas para ver respondas do post
