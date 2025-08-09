-- Transfer schema ownership
ALTER SCHEMA public OWNER TO exam_user;

-- Transfer ownership of all tables
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' OWNER TO exam_user';
    END LOOP;
END $$;

-- Transfer ownership of all sequences
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT sequencename FROM pg_sequences WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ALTER SEQUENCE public.' || quote_ident(r.sequencename) || ' OWNER TO exam_user';
    END LOOP;
END $$;

-- Transfer ownership of all views
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT viewname FROM pg_views WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ALTER VIEW public.' || quote_ident(r.viewname) || ' OWNER TO exam_user';
    END LOOP;
END $$;
