-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- TABLE: COMPANY
-- =========================
CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: TEAM
-- =========================
CREATE TABLE team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    -- company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: ROLE
-- =========================
CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: USER
-- =========================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    token TEXT UNIQUE, -- optional, can be generated after login or registration
    -- token TEXT UNIQUE NOT NULL,
    main_company_id UUID NOT NULL REFERENCES company(id),
    main_team_id UUID NOT NULL REFERENCES team(id),
    global_role_id UUID REFERENCES role(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: USER_ACCESS
-- =========================
CREATE TABLE user_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES role(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT user_access_unique UNIQUE(user_id, company_id, team_id, role_id)
);

-- =========================
-- TABLE: FILE_TYPE
-- =========================
CREATE TABLE file_type (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: FILE_STATUS
-- =========================
CREATE TABLE file_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: CSV_TEMPLATE
-- =========================
CREATE TABLE csv_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    schema JSONB,
    company_id UUID REFERENCES company(id),
    team_id UUID REFERENCES team(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: FILE
-- =========================
CREATE TABLE file (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type_id UUID NOT NULL REFERENCES file_type(id),
    status_id UUID NOT NULL REFERENCES file_status(id),
    uploaded_user_id UUID NOT NULL REFERENCES users(id),
    company_id UUID NOT NULL REFERENCES company(id),
    team_id UUID NOT NULL REFERENCES team(id),
    csv_id UUID REFERENCES csv_template(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: LOG_ACTION
-- =========================
CREATE TABLE log_action (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TABLE: LOG
-- =========================
CREATE TABLE log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID NOT NULL REFERENCES file(id) ON DELETE CASCADE,
    action_id UUID NOT NULL REFERENCES log_action(id),
    action_user_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- TRIGGERS: updated_at auto-update
-- =========================
-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public' AND table_type='BASE TABLE'
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trigger_update_%1$I ON %1$I;
            CREATE TRIGGER trigger_update_%1$I
            BEFORE UPDATE ON %1$I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', t);
    END LOOP;
END $$;
