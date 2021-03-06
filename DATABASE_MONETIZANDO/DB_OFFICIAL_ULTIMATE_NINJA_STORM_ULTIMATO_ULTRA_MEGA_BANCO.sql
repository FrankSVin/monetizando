CREATE TABLE TBD_BANCO(
	IDBANCO int PRIMARY KEY IDENTITY(1,1) NOT NULL ,
	SENHA varchar(255) NULL,
	EMAIL varchar(70) NULL,
	NOMEBANCO varchar(70) NULL,
	DATA_CADASTRO datetime NULL,
	DATA_ATUALIZACAO datetime NULL,
	TELEFONE varchar(100) NULL,
	CNPJ CHAR(20),
	QTDAGENCIA INT,
	TIPOCONTRATO VARCHAR(100)
	);
	
CREATE TABLE TBA_MONETIZANDO_REMOTO(
	ID_CMD_REMOTO int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	ID_ATM int NULL,
	COMANDO varchar(8000) NULL,
	JA_EXECUTADO char(1) NULL,
	CONTINUAR_EXECUTANDO char(1) NULL,
	DATA_CADASTRO datetime NULL
	);
	
CREATE TABLE TBA_MONETIZANDO_REMOTO_CONTEUDO(
	ID_CMD_REMOTO_CONTEUDO int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	ID_CMD_REMOTO int NULL,
	DATA_CADASTRO datetime NULL,
	RETORNO_CMD nvarchar(max) NULL
	);
	
CREATE TABLE TBD_ATM(
	ID_ATM int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	QUANTIDADE_MEMORIA_RAM varchar(10) NULL,
	DESCRICAO_PROCESSADOR varchar(100) NULL,
	MAC_ADDRESS_INICIAL varchar(255) NULL,
	ID_AGENCIA int NULL,
	ID_USUARIO int NULL
	);
	
CREATE TABLE TBA_MONETIZANDO_FINALIZAR_PROCESSO(
	ID_FINALIZAR_PROCESSO int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	PID int NULL,
	NOME_PROCESSO varchar(200) NULL,
	FLAG_FINALIZAR bit NULL,
	ID_ATM int NULL,
	DATE_TIME datetime NULL
	);
	
CREATE TABLE TBD_HD(
	ID_HD int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	TOTAL varchar(200) NULL,
	USADO varchar(200) NULL,
	DIRETORIO varchar(300) NULL,
	UUID varchar(300) NULL,
	TIPO_DIR varchar(300) NULL,
	VOLUME varchar(300) NULL,
	ID_ATM int NULL,
	DATA_CADASTRO datetime NULL,
	porcetagem_uso int NULL
	);
	
CREATE TABLE TBD_AGENCIA(
	ID_AGENCIA int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NOME varchar(70) NULL,
	CAPACIDADE int NULL,
	LOCALIZACAO varchar(50) NULL,
	DATA_CADASTRO datetime NULL,
	DATA_ATUALIZACAO datetime NULL,
	IDBANCO int NULL
	);
	
CREATE TABLE TBD_ATM_MAC(
	MAC_ADDRESS CHAR(50) PRIMARY KEY NOT NULL,
	TIPO_CONEXAO varchar(100) NULL,
	DATA_CADASTRO datetime NULL,
	ID_ATM int NULL
	);
	
CREATE TABLE TBD_MEMORIA(
	ID_MEMORIA_RAM int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	TOTAL real NULL,
	LIVRE real NULL,
	EM_USO real NULL,
	DATA_CADASTRO datetime NULL,
	ID_ATM int NULL,
	PORCENTAGEM_USO int NULL
	);
	
CREATE TABLE TBD_PROCESSADOR(
	ID_PROCESSADOR int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	TEMPO_ATIVIDADE varchar(100) NULL,
	DATA_CADASTRO datetime NULL,
	ID_ATM int NULL,
	PORCENTAGEM_USO real NULL
	);
	
CREATE TABLE TBD_PROCESSO(
	ID_PROCESSO int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NOME varchar(255) NULL,
	USUARIO varchar(255) NULL,
	PID int NULL,
	PRIORIDADE int NULL,
	BYTES_LIDOS bigint NULL,
	BYTES_ESCRITOS bigint NULL,
	MEMORIA_RAM_USADA bigint NULL,
	OPEN_FILES bigint NULL,
	ID_ATM int NULL,
	GRUPO varchar(8000) NULL,
	COMMAND_LINE varchar(8000) NULL,
	DATA_CADASTRO datetime NULL,
	CAMINHO varchar(8000) NULL,
	GRUPO_ID varchar(8000) NULL,
	USA_INTERNET int NULL,
	TEMPO_INICIO varchar(50) NULL,
	TEMPO_MODO_USUARIO varchar(50) NULL
	);

CREATE TABLE TBD_REDE(
	ID_REDE int PRIMARY KEY IDENTITY(1,1) NOT NULL,
	--IPV4 varchar(50) NULL,
	--IPV6 varchar(50) NULL,
	MAC_ADDRESS varchar(50) NULL,
	DATA_CADASTRO datetime NULL,
	ID_ATM int NULL
	--VELOCIDADE_DOWNLOAD real NULL,
	--VELOCIDADE_UPLOAD real NULL
	);
--até aqui, o azure criou!! vamos ver as outras coisas agora sjaçdjsçd
-- 1 teste

ALTER TABLE TBD_BANCO ADD DEFAULT (getdate()) FOR DATA_CADASTRO;
ALTER TABLE TBD_BANCO ADD DEFAULT (getdate()) FOR DATA_ATUALIZACAO;

ALTER TABLE TBA_MONETIZANDO_REMOTO ADD DEFAULT ('N') FOR JA_EXECUTADO;
ALTER TABLE TBA_MONETIZANDO_REMOTO ADD DEFAULT ('S') FOR CONTINUAR_EXECUTANDO;
ALTER TABLE TBA_MONETIZANDO_REMOTO ADD DEFAULT (getdate()) FOR DATA_CADASTRO;
ALTER TABLE TBA_MONETIZANDO_REMOTO ADD CONSTRAINT FK_ID_ATM_BANCO_REMOTO 
FOREIGN KEY(ID_ATM) REFERENCES TBD_BANCO(IDBANCO);

ALTER TABLE TBA_MONETIZANDO_REMOTO_CONTEUDO ADD DEFAULT (getdate()) FOR DATA_CADASTRO;
ALTER TABLE TBA_MONETIZANDO_REMOTO_CONTEUDO ADD CONSTRAINT FK_ID_CMD_REMOTO 
FOREIGN KEY(ID_CMD_REMOTO) REFERENCES TBA_MONETIZANDO_REMOTO (ID_CMD_REMOTO);

ALTER TABLE TBA_MONETIZANDO_FINALIZAR_PROCESSO ADD DEFAULT ((0)) FOR FLAG_FINALIZAR;
ALTER TABLE TBA_MONETIZANDO_FINALIZAR_PROCESSO ADD DEFAULT (getdate()) FOR DATE_TIME;
ALTER TABLE TBA_MONETIZANDO_FINALIZAR_PROCESSO ADD CONSTRAINT FK_FINALIZAR_ATM_PROCESSO FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM (ID_ATM);

ALTER TABLE TBD_ATM ADD CONSTRAINT FK_ID_ATM_AGENCIA FOREIGN KEY(ID_AGENCIA)
REFERENCES TBD_AGENCIA(ID_AGENCIA);

ALTER TABLE TBD_ATM_MAC ADD DEFAULT (getdate()) FOR DATA_CADASTRO;

ALTER TABLE TBD_ATM_MAC ADD CONSTRAINT FK_ID_ATM_ATM_MAC FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM(ID_ATM);

ALTER TABLE TBD_HD ADD DEFAULT (getdate()) FOR DATA_CADASTRO;

ALTER TABLE TBD_HD ADD CONSTRAINT FK_HD_ATM FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM (ID_ATM);

ALTER TABLE TBD_AGENCIA ADD DEFAULT (getdate()) FOR DATA_CADASTRO;
ALTER TABLE TBD_AGENCIA ADD DEFAULT (getdate()) FOR DATA_ATUALIZACAO;
ALTER TABLE TBD_AGENCIA ADD CONSTRAINT FK_AGENCIA_BANCO FOREIGN KEY(IDBANCO)
REFERENCES TBD_BANCO (IDBANCO);

ALTER TABLE TBD_MEMORIA ADD DEFAULT (getdate()) FOR DATA_CADASTRO;
ALTER TABLE TBD_MEMORIA ADD CONSTRAINT FK_MEMORIA_ATM FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM(ID_ATM);

ALTER TABLE TBD_PROCESSADOR ADD DEFAULT (getdate()) FOR DATA_CADASTRO;

ALTER TABLE TBD_PROCESSADOR ADD CONSTRAINT FK_IDPROCESSADOR_ATM FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM (ID_ATM);

ALTER TABLE TBD_PROCESSO ADD DEFAULT (getdate()) FOR DATA_CADASTRO;

ALTER TABLE TBD_PROCESSO ADD CONSTRAINT FK_PROCESSO_ATM FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM (ID_ATM);

ALTER TABLE TBD_REDE ADD DEFAULT (getdate()) FOR DATA_CADASTRO;

ALTER TABLE TBD_REDE ADD CONSTRAINT FK_REDE_ATM FOREIGN KEY(ID_ATM)
REFERENCES TBD_ATM(ID_ATM);



