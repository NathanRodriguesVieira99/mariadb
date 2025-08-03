# Meus estudos de MariaDB + Docker + Prisma

Configuração MariaDB com Docker e Prisma: usuário root ou customizado.

## 🔧 Configurações do MariaDB

### Opção 1: Usuário Root (Desenvolvimento)

**Mais simples para estudos e desenvolvimento local.**

#### `.env`

```env
MYSQL_ROOT_PASSWORD=sua_senha_root
MYSQL_DATABASE=nome_do_banco
MYSQL_PORT=3306
HOST=localhost

DATABASE_URL="mysql://root:sua_senha_root@localhost:3306/nome_do_banco"
```

#### `docker-compose.yml`

```yaml
version: "3.9"

services:
  mariadb:
    image: mariadb:10.11
    container_name: mariadb_dev
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "${MYSQL_PORT}:3306"
    volumes:
      - mariadb_data:/var/lib/mysql

volumes:
  mariadb_data:
```

#### DBeaver

- **Host:** `localhost`
- **Porta:** `3306`
- **Database:** `nome_do_banco`
- **Username:** `root`
- **Password:** `sua_senha_root`

---

### Opção 2: Usuário Customizado (Produção)

**Mais seguro, seguindo boas práticas.**

#### `.env`

```env
MYSQL_ROOT_PASSWORD=senha_root_forte
MYSQL_DATABASE=nome_do_banco
MYSQL_USER=usuario_app
MYSQL_PASSWORD=senha_usuario_forte
MYSQL_PORT=3306
HOST=localhost

DATABASE_URL="mysql://usuario_app:senha_usuario_forte@localhost:3306/nome_do_banco"
```

#### `docker-compose.yml`

```yaml
version: "3.9"

services:
  mariadb:
    image: mariadb:10.11
    container_name: mariadb_dev
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "${MYSQL_PORT}:3306"
    volumes:
      - mariadb_data:/var/lib/mysql

volumes:
  mariadb_data:
```

#### DBeaver

- **Host:** `localhost`
- **Porta:** `3306`
- **Database:** `nome_do_banco`
- **Username:** `usuario_app`
- **Password:** `senha_usuario_forte`
