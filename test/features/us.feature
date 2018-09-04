#language: pt 
#encoding: utf-8 
Funcionalidade: [Página Inicial] Menu
Como profissional que quero conhecer a CWI
Desejo navegar no site
Para conhecer mais sobre a empresa

Esquema do Cenário: Validar acesso aos menus
 Dado que acessei a pagina inicial
 Quando selecionar o menu <menu>
 Então deve exibir a página de <menu> com as informações correspondentes
Exemplos:
 | menu |
 | Qualidade |
 | Tecnologia |
 | Oportunidades |
 | Contato |

