CREATE TABLE to_do (
    task text,
    complete boolean
);

SELECT * FROM to_do;

INSERT INTO to_do (task, complete)
VALUES ('Homework', false);

DROP TABLE to_do;
