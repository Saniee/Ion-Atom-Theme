-- Users and their login sessions.
CREATE TABLE users (
    id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username      text NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_username_lower_idx ON users (lower(username));

CREATE TABLE sessions (
    token_hash bytea PRIMARY KEY,
    user_id    bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at timestamptz NOT NULL
);

SELECT u.username, count(*) AS active
FROM users u
JOIN sessions s ON s.user_id = u.id
WHERE s.expires_at > now() AND u.username LIKE 'cmdr%'
GROUP BY u.username
LIMIT 50;
