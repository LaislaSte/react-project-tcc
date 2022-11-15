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

- concertar bugs do input

---

- add links de redirecionamento do footer

---

- concertar bug da responsividade no navbar q aparece o q nao devia aparecer em determinado ponto do width

- criar uma classe no css globar para colocar nos elementos que tenha cursor pointer

- criar pagina para mostrar os resultados das pesquisa q o user for clicar

---

- diminuir tamanho da fonte e centraliza-la na primeira sessao do public quando estiver width -800px, podendo apagar a foto de fundo ou adicionar um fundo mais escuro nas levar para ficar legível, centralizar o memorizar nunca foi tão fácil

- adicionar logo na pagina de registro

- defazer arredondamento da div da foto do register

---

- limitar a quantidade de assuntos selecionados nas configurações e na criação de post

---

- criar pagina para ver perfis externos

---

- criar div para aparecer quando clicar nos 3 pontinhos (excluir, editar, remover das revisçoes) no post

- adicionar funções aos itens do show-more (3 pontinhos)

- fazer com q os popups sejam div q se abrem dentro do container do post

- criar popups para ver imagem de modo ampliado (diminuir o tamanho da imgem quando estiver +800px)

- criar opção de denuncia quando o post estiver na pagina de explore ou quando for um user externo

---

- colocar cursor pointer no x dos popups

---

- criar função que pega esse id dos elementos do componente category e o deixa selecionado (com um css diferente)

---

- ADICIONAR O DIVS PARA O GOOGLE ADS

## TODOS: backEnd

- função para atualizar informações do usuário como foto de perfil, nome, bio e categorias
- verificar função para deletar um usuário
- verificar função para mudança de senha atravez de e-mail
- verificar função para mudança de e-mail
- verificar função para confirmação de e-mail

---

- função para cadastrar post
- função para atualizar post
- função para deletar post

---

- organizar diretórios com o uid (e também id do post para registro de imagem de post) para registrar imagens no storage

---

- função para cadastrar revisão com as informações do respectivo post selecionado pelo usuário

---

- add google ads

---

- fazer deploy

## POSSÍVEIS IMPLEMENTAÇÕES

- criar paginas para os links do footer (estruturar lugar para os textos)

- criar paginas para ver quem segue e quem esta seguindo

- criar paginas para ver respondas do post

- criar página de notificações (quem esta seguinto ou quantas revisões tem um post por usuário (como um like))
