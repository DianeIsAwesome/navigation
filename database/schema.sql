DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;
\c listings;


CREATE TABLE searchListing (
    listingId SERIAL,
    title VARCHAR(50) NOT NULL,
    host VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    photoURL VARCHAR(70) NOT NULL
);

CREATE TABLE searchRecord (
    searchId SERIAL,
    title VARCHAR(100) NOT NULL,
    searchName VARCHAR(100) NOT NULL,
    recordText VARCHAR(200) NOT NULL,
    createdAt DATE NOT NULL
);


-- \COPY searchListing FROM './listingData0-10.csv' WITH (FORMAT csv);

-- \COPY searchRecord FROM './recordsData0-10.csv' WITH (FORMAT csv);

-- CREATE INDEX listingIndex on searchListing (listingId);

-- psql < ./data/schema.sql
