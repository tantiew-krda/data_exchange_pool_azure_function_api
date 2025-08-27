CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL CHECK (username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,

    token TEXT UNIQUE, -- optional, can be generated after login or registration

    company_id UUID NOT NULL,
    team_id UUID NOT NULL,
    role_id UUID NOT NULL,
    
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Relationships
ALTER TABLE users ADD CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES company(id);
ALTER TABLE users ADD CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team(id);
ALTER TABLE users ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id);
