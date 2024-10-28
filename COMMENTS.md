## Documentação do Frontend (Vue.js)

### Introdução

Esta aplicação frontend foi desenvolvida utilizando o framework Vue.js em conjunto com o Vuetify para a interface do usuário.

Endereço da aplicação = https://maisaedu.netlify.app

- Usuario teste: admin@edtech.com
- Senha: admin123

### Arquitetura

- **Vue Router:** Responsável por gerenciar as rotas da aplicação, controlando o acesso às diferentes páginas e definindo os links.
- **Views:**
  - **Login:** Tela de autenticação do usuário.
  - **Register:** Tela de cadastro de novos usuários.
  - **StudentView:** Lista paginada de alunos com funcionalidades de busca e cadastro.
  - **CreateStudentView:** Formulário para cadastro ou edição de alunos.
  - **TeamView:** Lista paginada de turmas com funcionalidades de busca e cadastro.
  - **CreateTeamView:** Formulário para cadastro, edição ou associação de alunos da turma.
- **Components:**
  - **Tabela:** Componente reutilizável para exibir listas paginadas de dados.
  - **SnackBar:** Componente para exibir mensagens de sucesso ou erro.
- **Plugins:**
  - **Axios:** Biblioteca para realizar requisições HTTP.
  - **Vuetify:** Framework UI que fornece componentes e estilos pré-definidos.
- **State Management:**
  - **Pinia:** Biblioteca utilizada para gerenciar o estado da aplicação, armazenando dados como o usuário logado.

### Qualidade e Testes

- **Vitest:** Framework de testes utilizado para garantir a qualidade do código.
- **ESLint:** Ferramenta para aplicar padrões de codificação e evitar erros comuns.

### Deploy

- **[Netlify](https://www.netlify.com):** Plataforma utilizada para realizar o deploy da aplicação e configurar builds automáticos.

### Melhorias Futuras

- **Exportação:** Implementar a funcionalidade de exportar dados dos alunos em formato de planilha.
- **Upload de imagens:** Permitir o upload de fotos de perfil para os alunos.
- **Filtros e ordenação:** Adicionar filtros e opções de ordenação na lista de alunos.
- **Internacionalização:** Implementar a tradução da aplicação para outros idiomas.

### Bibliotecas e Ferramentas

- **[Vuetify](https://vuetifyjs.com/):** Framework UI baseado no Material Design.
- **[Vue Router](https://router.vuejs.org/guide):** Roteador oficial para Vue.js.
- **[Axios](https://www.npmjs.com/package/axios):** Biblioteca HTTP client baseada em promisses.
- **[Pinia](https://pinia.vuejs.org/):** Store de estado global para Vue.js.
- **[Vitest](https://vitest.dev/):** Framework de testes JavaScript.
- **[ESLint](https://eslint.vuejs.org/):** Ferramenta de lint para JavaScript e TypeScript.
- **[Vue the mask](https://www.npmjs.com/package/vue-the-mask):** Máscaras nos imputs dos formulários
