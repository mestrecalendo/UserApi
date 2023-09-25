# UserApi

1. Camada de aplicação: controladores e serviços da API.
2. Camada de domínio: responsável pela implementação de classes/modelos, as quais serão mapeadas para o banco de dados, além de obter as declarações de interfaces e enums.
3. Camada de infraestrutura: persistência com o banco de dados, utilizando Entity Framework com banco de dados SQL Server.

### TECNOLOGIAS
As tecnologias utilizadas são:

- Microsoft .NET 6
- SQL Server
- Angular 16
- Nebular: Customizable Angular UI Kit
  
### COMO EXECUTAR O PROJETO

- Backend
  - executar 'dotnet ef database update'
  - substituir string de conexão  nos arquivos appsettings.json e \Infrastructure\Configuracao\ContextDb.cs
  - rodar projeto
 
- Frontend
  - Ir ao diretório src/frontend
  - executar 'npm i --force' (infelizmente o nebular não tem suporte total para o Angular 16, então é necessário utilizar a flag --force para instalar as dependências)
  - executar 'npm start'



### SQL Server


- Criar script DDL das tabelas Usuario e Escolaridade.
```
CREATE TABLE [Escolaridade](
    [IdEscolaridade] [int] IDENTITY(1,1) PRIMARY KEY not null,
    [escolaridade_name] [varchar](40) not null,
  ) ON [PRIMARY]

CREATE TABLE [Usuario](
    [IdUsuario] [int] IDENTITY(1,1) PRIMARY KEY not null,
    [nome] [varchar](20) not null, 
    [sobrenome] [varchar](100) not null,
    [email] [varchar](50) not null,
    [dataNascimento] [date] not null,
	[IdEscolaridade] [int],
	CONSTRAINT fk_Usuario_Escolaridade FOREIGN KEY (IdEscolaridade) REFERENCES escolaridade (IdEscolaridade)
	ON DELETE CASCADE
    ON UPDATE CASCADE
  ) ON [PRIMARY]
```

- Criar script de insert na tabela Escolaridade para domínio da aplicação.
```
INSERT INTO escolaridade
VALUES ('Infantil'),('Fundamental'),('Médio'),('Superior');
```

- Criar um comando Select que traga os 5 primeiros usuários cuja escolaridade seja igual a “Superior”.
```
  select top 5 * from Usuario where IdEscolaridade = 4 order by IdUsuario;
```
