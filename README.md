# solution-fullstack-starter

## 代码架构

```mermaid
flowchart TB
  libs

  graphql.yml

  subgraph Frontend
    angular
  end

  subgraph Backend
    nestjs
  end
  nest-cli -- create graphql resources--> nestjs
  nestjs -- generate from entities/resolvers --> graphql.yml

  graphql.yml -- generate entities/service --> angular

  libs -.-> nestjs
  libs -.-> angular

```

## 技术栈/工具

- pnpm
- <https://www.graphql-code-generator.com/>
