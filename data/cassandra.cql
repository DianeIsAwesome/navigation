drop database

CREATE KEYSPACE listings WITH REPLICATION={'class':'SimpleStrategy', 'replication_factor':2};

CREATE TABLE searchListing (
    listingId VARINT, 
    title VARCHAR, 
    host VARCHAR, 
    city VARCHAR, 
    photoURL VARCHAR,
    PRIMARY KEY (listingId)
);

CREATE TABLE searchRecord (
    searchId VARINT, 
    title VARCHAR, 
    searchName VARCHAR, 
    recordText VARCHAR, 
    createdAt DATE,
    PRIMARY KEY (searchId)
);


COPY searchListing (listingId, title, host, city, photoURL) FROM 'data/listingsData0-10.csv';


COPY searchRecord (searchId, title, searchName, recordText, createdAt) FROM 'data/recordsData0-10.csv';

-- cqlsh -f ./data/cassandra.cql