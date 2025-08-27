-- Insert company
INSERT INTO company (name)
VALUES
    ('skc'),
    ('krda');

-- Insert team
INSERT INTO team (name)
VALUES
    ('sell'),
    ('marketing'),
    ('service'),
    ('iot');

-- Insert role
INSERT INTO role (name)
VALUES
    ('admin'),
    ('user'),
    ('dev'),
    ('download'),
    ('upload');

-- Insert file_type
INSERT INTO file_type (name)
VALUES
    ('csv');

-- Insert file_status
INSERT INTO file_status (name)
VALUES
    ('active'),
    ('archive'),
    ('unarchive');

-- Insert log_action
INSERT INTO log_action (name)
VALUES
    ('download'),
    ('upload'),
    ('delete'),
    ('archive'),
    ('unarchive');

