DROP DATABASE formulas;
CREATE DATABASE formulas;

\c formulas;

DROP SEQUENCE IF EXISTS executions_sequence CASCADE;
CREATE SEQUENCE executions_sequence;

DROP TABLE IF EXISTS execution;
CREATE TABLE execution (
    id BIGINT NOT NULL DEFAULT nextval('executions_sequence'),
    stepExecutionValues JSON NOT NULL
);
