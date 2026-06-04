import React, { useState, useEffect, useCallback } from 'react';

// Helper to draw simple ER relationship symbols
const ERDiagram = ({ type, leftEntity, rightEntity }) => {
  const getSymbol = () => {
    switch (type) {
      case '1:1': return '1 ─────────── 1';
      case '1:N': return '1 ─────────── N';
      case 'M:N': return 'M ─────────── N';
      default: return '• ─────────── •';
    }
  };
  return React.createElement('div', { style: { fontFamily: 'var(--mono)', background: 'var(--bg4)', padding: '8px', borderRadius: '8px', textAlign: 'center', margin: '8px 0' } },
    React.createElement('div', null, leftEntity),
    React.createElement('div', { style: { fontSize: '14px', fontWeight: 'bold', margin: '4px 0' } }, getSymbol()),
    React.createElement('div', null, rightEntity)
  );
};

// Sample table representation for relational schema
const RelationalSchema = ({ tables }) => {
  return React.createElement('div', { style: { background: 'var(--bg4)', padding: '10px', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '12px', margin: '8px 0' } },
    tables.map((t, idx) => React.createElement('div', { key: idx, style: { marginBottom: '8px' } },
      React.createElement('strong', null, t.name), '(', t.columns.map((col, i) => 
        React.createElement('span', { key: i, style: { color: col.isKey ? 'var(--accent)' : 'inherit' } }, 
          col.name, (col.isKey ? ' PK' : ''), (col.isFk ? ' FK' : ''), i < t.columns.length-1 ? ', ' : ''
        )
      ), ')'
    ))
  );
};

const ALL_CARDS = [
  // ─────────────────────────────────────────────────────────────────
  // 1. DATABASE BASICS (from PDF pages 13-18)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Database Basics", q: "What is a database?", a: "A database is a collection of information that is organized so that it can easily be accessed, managed, and updated. It is a structure that can store information about multiple types of entities, attributes that describe those entities, and the relationships among the entities." },
  { cat: "Database Basics", q: "What is a Database Management System (DBMS)?", a: "A DBMS is a collection of software programs that are used to define, construct, maintain, and manipulate data in a database. It includes the database, the DBMS, and application programs." },
  { cat: "Database Basics", q: "List four advantages of a DBMS.", a: "1. Data consistency and integrity by controlling access and minimizing duplication. 2. Application program independence. 3. Data sharing among many users concurrently. 4. Backup and recovery, security, and multiple views of data." },
  { cat: "Database Basics", q: "What are the three main categories of models in a database?", a: "1. User or Conceptual Models – how users perceive the world. 2. Logical Models – logic of business operations. 3. Physical Models – how the database is actually implemented on a computer system." },
  { cat: "Database Basics", q: "According to the lecture, what are the three contents of a database?", a: "1. User Data, 2. Metadata, 3. Indexes. (Also application metadata in some definitions)." },
  { cat: "Database Basics", q: "What is metadata in a database?", a: "Data about data. It describes how user data are stored in terms of table name, column name, data type, length, primary keys, etc. Typically stored in system tables or system catalog." },
  { cat: "Database Basics", q: "What is an index in a database?", a: "An index provides an alternate means of accessing, sorting and searching data. It allows the database to access a record without searching through the entire table. An index consists of a keyword stored in order and a pointer to the rest of the information." },
  { cat: "Database Basics", q: "Give a brief history of database systems according to the lecture.", a: "Ancient: data not stored on disk, one data set per program. 1968: File-based (predecessor). 1970: Relational database era begins with Ted Codd. 1976: Peter Chen defined ER model. 1980s: Maturation of relational technology. 1985: OODBMS. 1990s: Data warehousing, OLAP, web. 1991: Microsoft Access ships. 1995: First internet DB applications. 1997: XML integrated." },
  { cat: "Database Basics", q: "What is a database schema?", a: "The structure of a database that captures data types, relationships, and constraints in data. It is independent of any application program and changes infrequently." },
  { cat: "Database Basics", q: "What is a database instance or state?", a: "The actual data contained in a database at a given time." },

  // ─────────────────────────────────────────────────────────────────
  // 2. DATA MODELING & ER MODEL (PDF pages 26-36)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Data Modeling", q: "What is data modeling?", a: "A conceptual representation of the data structures required by a database. It includes data objects, associations between data objects, and rules governing operations on the objects. Equivalent to an architect's building plans." },
  { cat: "Data Modeling", q: "What are the two major methodologies for creating a data model?", a: "1. Entity-Relationship (ER) approach. 2. Object Model." },
  { cat: "Data Modeling", q: "What are the five steps of database design according to the lecture?", a: "1. Planning and analysis, 2. Conceptual design, 3. Logical design, 4. Physical design, 5. Implementation." },
  { cat: "Data Modeling", q: "List 4 characteristics of a good data model.", a: "1. Completeness – supports all necessary data. 2. Non-redundancy – same fact not recorded more than once. 3. Enforcement of business rules. 4. Stability and flexibility – copes with changes in requirements. Also: data reusability, elegance, communication, integration." },
  { cat: "Data Modeling", q: "What is an entity in the ER model?", a: "A principal data object about which information is to be collected. Usually recognizable concepts, concrete or abstract (person, place, thing, event). Analogous to a table in the relational model." },
  { cat: "Data Modeling", q: "What is an entity occurrence (instance)?", a: "An individual occurrence of an entity. Analogous to a row in a relational table. Example: 'Bill Gates is an Employee of Microsoft'." },
  { cat: "Data Modeling", q: "What is an attribute in ER modeling?", a: "Properties used to distinguish one entity instance from another. Attributes describe the entity they are associated with. Example: EmployeeID, FirstName, LastName for entity EMPLOYEE." },
  { cat: "Data Modeling", q: "What is an identifier (key) in ER modeling?", a: "A special attribute used to uniquely identify a specific instance of an entity. Typically underlined in ER diagrams. Example: CustomerID uniquely identifies a CUSTOMER." },
  { cat: "Data Modeling", q: "What is a relationship in the ER model?", a: "An association between two or more entities. Relationships are classified by degree, connectivity, cardinality, direction, type, and existence. Example: 'employees are assigned to projects'." },
  { cat: "Data Modeling", q: "What is the degree of a relationship?", a: "The number of entities associated with the relationship. Binary (degree 2), Ternary (degree 3), etc. Many methodologies recognize only binary relationships." },
  { cat: "Data Modeling", q: "What is connectivity and cardinality in a relationship?", a: "Connectivity describes the mapping of associated entity instances – 'one' or 'many'. Cardinality is the actual number of related occurrences. Basic types: one-to-one (1:1), one-to-many (1:N), many-to-many (M:N)." },
  { cat: "Data Modeling", q: "Give an example of a one-to-one (1:1) relationship.", a: "Each employee is assigned their own office. For each employee there exists a unique office and for each office there exists a unique employee." },
  { cat: "Data Modeling", q: "Give an example of a one-to-many (1:N) relationship.", a: "A department has many employees; each employee is assigned to one department." },
  { cat: "Data Modeling", q: "Give an example of a many-to-many (M:N) relationship.", a: "Employees can be assigned to many projects; projects can have many employees assigned." },
  { cat: "Data Modeling", q: "What is a recursive relationship?", a: "A relationship where an entity is associated with itself. Example: An employee manages many employees; each employee is managed by one employee." },
  { cat: "Data Modeling", q: "What is a generalization hierarchy (supertype/subtype)?", a: "A form of abstraction where two or more entities that share common attributes can be generalized into a higher-level entity called a supertype. Lower-level entities become subtypes (categories). Example: EMPLOYEE as supertype, WAGES_EMPLOYEE and CLASSIFIED_EMPLOYEE as subtypes." },
  { cat: "Data Modeling", q: "What is an associative entity (intersection entity)?", a: "An entity used to associate two or more entities in order to resolve a many-to-many relationship. Example: ASSIGNMENT between EMPLOYEE and PROJECT." },

  // ─────────────────────────────────────────────────────────────────
  // 3. ATTRIBUTES & KEYS
  // ─────────────────────────────────────────────────────────────────
  { cat: "Attributes & Keys", q: "What is a composite attribute?", a: "An attribute that can be divided into smaller sub-parts (sub-attributes). Example: Address can be split into Street, City, State, Zip." },
  { cat: "Attributes & Keys", q: "What is a multi-valued attribute?", a: "An attribute that can have multiple values for a single entity instance. Example: A person can have multiple phone numbers or email addresses. In ER diagrams, it is often shown with a double oval." },
  { cat: "Attributes & Keys", q: "What is a derived attribute?", a: "An attribute whose value is calculated from other attributes. Example: Age calculated from DateOfBirth. May be included in the data model for documentation but often not stored." },
  { cat: "Attributes & Keys", q: "What is a candidate key?", a: "Any key or minimum set of keys that could serve as a primary key. An entity may have multiple candidate keys. Those not chosen become alternate keys." },
  { cat: "Attributes & Keys", q: "What is a primary key?", a: "An attribute or set of attributes that uniquely identifies a specific instance of an entity. It must have non-null values, be unique, and must not change during the entity's lifetime." },
  { cat: "Attributes & Keys", q: "What is a composite key?", a: "A primary key made up of more than one attribute. Example: (EmployeeID, ProjectID) uniquely identifies work assignment." },
  { cat: "Attributes & Keys", q: "What is an artificial key (surrogate key)?", a: "A key that has no meaning to the business or organization, introduced when no natural attribute has all primary key properties or when the primary key is large and complex. Often an auto-number." },
  { cat: "Attributes & Keys", q: "What is a foreign key?", a: "An attribute that completes a relationship by identifying the parent entity. It is formed by migrating the entire primary key from the parent entity to the child entity. Foreign keys enforce referential integrity." },
  { cat: "Attributes & Keys", q: "What is a primary attribute?", a: "An attribute that is part of the primary key. It uniquely identifies an entity instance." },

  // ─────────────────────────────────────────────────────────────────
  // 4. RELATIONAL MODEL & SCHEMA CONVERSION (PDF pages 62-74)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Relational Model", q: "What is a relational database?", a: "A collection of two-dimensional tables (relations). Each table represents a real-world person, place, thing, or event. The organization into tables is called the logical view." },
  { cat: "Relational Model", q: "What are the six properties of relational tables?", a: "1. Values are atomic. 2. Column values are of the same kind (domain). 3. Each row is unique. 4. The sequence of columns is insignificant. 5. The sequence of rows is insignificant. 6. Each column has a unique name." },
  { cat: "Relational Model", q: "What is a domain in the relational model?", a: "A set of values that a column may have. It includes data type, length, format, range, constraints, null support, and default value." },
  { cat: "Relational Model", q: "What is a NULL value in SQL?", a: "NULL represents the absence of any meaningful value. It is not the same as zero, false, or empty string. NULL does not equal NULL. NULL is used to indicate 'Unknown' or 'Not Applicable'." },
  { cat: "Relational Model", q: "What are the two basic rules of relational data integrity?", a: "1. Entity integrity: primary key value cannot be null. 2. Referential integrity: every foreign key value must either be null or match a primary key value in the related table." },
  { cat: "Relational Model", q: "How do you convert a one-to-many relationship to a relational schema?", a: "Insert a foreign key into the table on the 'many' side that references the primary key on the 'one' side." },
  { cat: "Relational Model", q: "How do you convert a many-to-many relationship to a relational schema?", a: "Create a new join (associative) table that contains foreign keys for each of the two related tables. The primary key of the join table is the combination of both foreign keys." },
  { cat: "Relational Model", q: "What is a join table? Give an example.", a: "A table created to resolve many-to-many relationships. Example: FILM_ACTOR with columns actor_id (FK) and film_id (FK) – primary key is (actor_id, film_id)." },
  { cat: "Relational Model", q: "What is a reflexive relationship and how is it converted?", a: "A relationship where an entity is related to itself. Foreign keys are placed in the same table but renamed. Example: CAT table with mother_tag_no as a foreign key referencing tag_no." },

  // ─────────────────────────────────────────────────────────────────
  // 5. NORMALIZATION (PDF pages 76-94)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Normalization", q: "What is normalization?", a: "A design technique that puts data into tabular form by removing repeating groups and then removes duplicated data from relational tables. The goal is to create a set of relational tables that are free of redundant data and can be consistently modified." },
  { cat: "Normalization", q: "What is data redundancy?", a: "A condition where a data environment contains unnecessarily duplicated data. It wastes space and causes update anomalies, insertion anomalies, and deletion anomalies." },
  { cat: "Normalization", q: "What is an update anomaly?", a: "An anomaly that occurs when changes must be made to existing records. Because of redundancy, the same information must be updated in multiple places, risking inconsistency." },
  { cat: "Normalization", q: "What is an insertion anomaly?", a: "An anomaly that occurs when entering new records. Certain facts cannot be inserted without the presence of other data (e.g., cannot add a new supplier without supplying a part)." },
  { cat: "Normalization", q: "What is a deletion anomaly?", a: "An anomaly that occurs when deleting records. Unintended loss of other data (e.g., deleting a part also deletes supplier information)." },
  { cat: "Normalization", q: "What is a functional dependency?", a: "Column Y is functionally dependent on column X if each value of X is associated with precisely one value of Y at any given time. Notation: R.X → R.Y." },
  { cat: "Normalization", q: "What is full functional dependency?", a: "Applies to composite keys. Column Y is fully functionally dependent on X if it is functionally dependent on X and not functionally dependent on any subset of X." },
  { cat: "Normalization", q: "What is first normal form (1NF)?", a: "A relation is in 1NF if all values of the columns are atomic (no repeating groups). All relational tables by definition are in 1NF." },
  { cat: "Normalization", q: "What is second normal form (2NF)?", a: "A relation is in 2NF if it is in 1NF and every non-key column is fully dependent upon the entire primary key (no partial dependencies). Applies only to tables with composite keys." },
  { cat: "Normalization", q: "What is third normal form (3NF)?", a: "A relation is in 3NF if it is in 2NF and every non-key column is non-transitively dependent on the primary key (no transitive dependencies)." },
  { cat: "Normalization", q: "What is a transitive dependency?", a: "Occurs when a non-key column that determines the primary key is the determinate of other columns. Example: City determines Status, and City is determined by Supplier#." },
  { cat: "Normalization", q: "What is Boyce-Codd Normal Form (BCNF)?", a: "A stricter version of 3NF. A relation is in BCNF if every determinant is a candidate key. Handles overlapping candidate keys." },
  { cat: "Normalization", q: "What is fourth normal form (4NF)?", a: "A relation is in 4NF if it is in BCNF and all multivalued dependencies are also functional dependencies. Resolves independent multivalued dependencies." },
  { cat: "Normalization", q: "What is a multivalued dependency (MVD)?", a: "Occurs when for a table with at least three columns, one column has multiple rows whose values match a value of a single row of another column, independent of the third column." },
  { cat: "Normalization", q: "What is fifth normal form (5NF)?", a: "A relation is in 5NF if it cannot have a lossless decomposition into any number of smaller tables (no join dependency). Also called projection-join normal form." },
  { cat: "Normalization", q: "What is denormalization?", a: "The process of intentionally adding redundancy to tables to improve performance. Done after normalizing, to reduce the number of joins needed for frequent queries." },

  // ─────────────────────────────────────────────────────────────────
  // 6. SQL BASICS (DDL, DML, Constraints)
  // ─────────────────────────────────────────────────────────────────
  { cat: "SQL", q: "What does SQL stand for and what is its purpose?", a: "Structured Query Language. It is a database computer language designed for managing data in relational database management systems (RDBMS). It includes data query, update, schema creation, and access control." },
  { cat: "SQL", q: "What are the two major parts of SQL?", a: "1. Data Definition Language (DDL) – used to create and define data structures like tables, indexes. 2. Data Manipulation Language (DML) – used to store, retrieve, and update data." },
  { cat: "SQL", q: "Write the SQL syntax to create a database named 'my_db'.", a: "CREATE DATABASE my_db;" },
  { cat: "SQL", q: "Write the SQL syntax to create a Persons table with columns: P_Id int, LastName varchar(255), FirstName varchar(255).", a: "CREATE TABLE Persons ( P_Id int, LastName varchar(255), FirstName varchar(255) );" },
  { cat: "SQL", q: "What is the NOT NULL constraint?", a: "Enforces that a column cannot accept NULL values. You cannot insert a new record or update a record without adding a value to that field." },
  { cat: "SQL", q: "What is the UNIQUE constraint?", a: "Uniquely identifies each record. Unlike PRIMARY KEY, you can have many UNIQUE constraints per table, and they can accept one NULL value." },
  { cat: "SQL", q: "What is the PRIMARY KEY constraint?", a: "Uniquely identifies each record. Primary keys must contain unique values and cannot contain NULL values. Each table can have only one PRIMARY KEY." },
  { cat: "SQL", q: "What is the FOREIGN KEY constraint?", a: "A key in one table that points to the PRIMARY KEY in another table. It prevents actions that would destroy links between tables and prevents invalid data from being inserted." },
  { cat: "SQL", q: "What is the purpose of the ALTER TABLE statement?", a: "To modify the structure of an existing table (add, delete, or modify columns, add or drop constraints)." },
  { cat: "SQL", q: "What does the DROP TABLE statement do?", a: "Permanently removes the entire table and its data from the database." },
  { cat: "SQL", q: "Write the SQL to add a column 'Email' to the Persons table.", a: "ALTER TABLE Persons ADD Email varchar(255);" },
  { cat: "SQL", q: "Write the SQL to insert a new record into Persons (P_Id, LastName, FirstName).", a: "INSERT INTO Persons (P_Id, LastName, FirstName) VALUES (1, 'Hansen', 'Ola');" },
  { cat: "SQL", q: "Write the SQL to update the LastName of person with P_Id=1 to 'Svendson'.", a: "UPDATE Persons SET LastName = 'Svendson' WHERE P_Id = 1;" },
  { cat: "SQL", q: "Write the SQL to delete the person with P_Id=1.", a: "DELETE FROM Persons WHERE P_Id = 1;" },
  { cat: "SQL", q: "What is the SELECT statement used for?", a: "To select data from a database. The result is stored in a result table (result-set)." },
  { cat: "SQL", q: "What does SELECT DISTINCT do?", a: "Returns only distinct (different) values in a column, removing duplicates." },
  { cat: "SQL", q: "What does the WHERE clause do?", a: "Extracts only those records that fulfill a specified condition." },
  { cat: "SQL", q: "What do the AND and OR operators do in SQL?", a: "AND displays a record if both conditions are true. OR displays a record if either condition is true." },
  { cat: "SQL", q: "What does ORDER BY do? Give default sort order.", a: "Sorts the result-set by a specified column. Default order is ascending (ASC). Use DESC for descending." },
  { cat: "SQL", q: "What does the LIKE operator do? Give an example.", a: "Searches for a specified pattern in a column using wildcards %. Example: WHERE City LIKE 's%' finds cities starting with 's'." },
  { cat: "SQL", q: "What does the IN operator do?", a: "Allows you to specify multiple values in a WHERE clause. Example: WHERE LastName IN ('Hansen','Pettersen')." },
  { cat: "SQL", q: "What does the BETWEEN operator do?", a: "Selects a range of data between two values (numbers, text, or dates). Example: WHERE Price BETWEEN 10 AND 20." },
  { cat: "SQL", q: "What is an SQL JOIN and why is it used?", a: "Used to query data from two or more tables based on a relationship between certain columns. It combines rows from tables." },
  { cat: "SQL", q: "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?", a: "INNER JOIN returns rows when there is at least one match in both tables. LEFT JOIN returns all rows from the left table even if no matches in the right. RIGHT JOIN returns all rows from the right table even if no matches in the left." },
  { cat: "SQL", q: "What does the UNION operator do?", a: "Combines the result-set of two or more SELECT statements. Each SELECT must have the same number of columns with similar data types." },

  // ─────────────────────────────────────────────────────────────────
  // 7. SQL FUNCTIONS (Aggregate & Scalar)
  // ─────────────────────────────────────────────────────────────────
  { cat: "SQL Functions", q: "What does the AVG() function do?", a: "Returns the average value of a numeric column." },
  { cat: "SQL Functions", q: "What does the COUNT() function do?", a: "Returns the number of rows that match specified criteria. COUNT(*) counts all rows; COUNT(column) counts non-null values; COUNT(DISTINCT column) counts distinct values." },
  { cat: "SQL Functions", q: "What does the MAX() function do?", a: "Returns the largest value of the selected column." },
  { cat: "SQL Functions", q: "What does the MIN() function do?", a: "Returns the smallest value of the selected column." },
  { cat: "SQL Functions", q: "What does the SUM() function do?", a: "Returns the total sum of a numeric column." },
  { cat: "SQL Functions", q: "What is the GROUP BY statement used for?", a: "Used with aggregate functions to group the result-set by one or more columns." },
  { cat: "SQL Functions", q: "What is the HAVING clause used for?", a: "Used to filter groups after GROUP BY because WHERE cannot be used with aggregate functions." },
  { cat: "SQL Functions", q: "What does the UCASE() function do?", a: "Converts a field to upper case." },
  { cat: "SQL Functions", q: "What does the LCASE() function do?", a: "Converts a field to lower case." },
  { cat: "SQL Functions", q: "What does the MID() function do?", a: "Extracts characters from a text field. Syntax: MID(column_name, start, length)." },
  { cat: "SQL Functions", q: "What does the LEN() function do?", a: "Returns the length of a text field." },
  { cat: "SQL Functions", q: "What does the ROUND() function do?", a: "Rounds a numeric field to the number of decimals specified. Syntax: ROUND(column_name, decimals)." },
  { cat: "SQL Functions", q: "What does the NOW() function do?", a: "Returns the current system date and time." },
  { cat: "SQL Functions", q: "What does the FORMAT() function do?", a: "Formats how a field is to be displayed. Example: FORMAT(Now(), 'YYYY-MM-DD')." },

  // ─────────────────────────────────────────────────────────────────
  // 8. TRANSACTION MANAGEMENT (ACID, Concurrency, Locking)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Transactions", q: "What is a transaction in DBMS?", a: "A logical unit of database processing that includes one or more database operations (insert, delete, update, retrieval). A transaction must be entirely completed or aborted – no intermediate states." },
  { cat: "Transactions", q: "What does ACID stand for?", a: "Atomic, Consistent, Isolated, Durable. Atomic: all work is treated as a single unit. Consistent: completed transaction leaves database in a consistent state. Isolated: transaction sees a consistent view; concurrent updates are serialized. Durable: results are permanently stored." },
  { cat: "Transactions", q: "What is the Lost Update problem (concurrent update)?", a: "When two transactions read the same data and then both write updates, one update overwrites the other, causing loss of the first update." },
  { cat: "Transactions", q: "What is the inconsistent read problem (dirty read)?", a: "When a transaction reads data that has been written by another transaction that has not yet committed, possibly reading stale or uncommitted data." },
  { cat: "Transactions", q: "What is a lock in database concurrency control?", a: "A logical flag set by a transaction to alert other transactions that a data item is in use. Locks can be exclusive (prevent others from reading/writing) or shared (allow reading but not writing)." },
  { cat: "Transactions", q: "What is two-phase locking (2PL)?", a: "A concurrency control mechanism that ensures serializability. It has a growing phase (acquiring locks) and a shrinking phase (releasing locks). Once a lock is released, no new locks can be acquired." },
  { cat: "Transactions", q: "What is a deadlock?", a: "A condition where two or more transactions are each waiting for the other to release a lock, causing all to be stuck forever." },
  { cat: "Transactions", q: "What is database recovery?", a: "The process of restoring the database and data to a consistent state after a failure (system crash, power failure, disk failure)." },
  { cat: "Transactions", q: "What are before image and after image in recovery?", a: "Before image: a copy of data before it was changed. After image: a copy of data after it was changed. Used for rollback and rollforward." },
  { cat: "Transactions", q: "What is an incremental backup?", a: "A backup that copies only those data changed or added since the last full backup. Also called delta backup." },

  // ─────────────────────────────────────────────────────────────────
  // 9. DATABASE SECURITY (GRANT & REVOKE)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Security", q: "What are the three goals of database security?", a: "1. Confidentiality (secrecy and privacy) – data only accessible to authorized users. 2. Integrity – data can only be modified by authorized users. 3. Availability – data accessible to authorized users." },
  { cat: "Security", q: "What are the two classifications of database security?", a: "1. Physical security – security of hardware and site (fire, floods, etc.). 2. Logical security – security measures in OS or DBMS to handle threats." },
  { cat: "Security", q: "What is the purpose of the SQL GRANT statement?", a: "To grant an action (privilege) on an object to a subject (user). The WITH GRANT OPTION allows the grantee to propagate the authorization." },
  { cat: "Security", q: "What is the purpose of the SQL REVOKE statement?", a: "To revoke authorizations from subjects." },
  { cat: "Security", q: "Write SQL to grant SELECT and INSERT on the Employees table to user 'salim'.", a: "GRANT SELECT, INSERT ON Employees TO salim;" },
  { cat: "Security", q: "Write SQL to revoke all privileges on Employees from user 'salim'.", a: "REVOKE ALL PRIVILEGES ON Employees FROM salim;" },

  // ─────────────────────────────────────────────────────────────────
  // 10. DATABASE ARCHITECTURES (Client/Server, ODBC)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Architectures", q: "What is a centralized database system?", a: "A database system where all data, DBMS, and applications reside on a single mainframe or server. Users access via dumb terminals. Example: Traditional mainframe architecture." },
  { cat: "Architectures", q: "What is a distributed database system?", a: "A database in which data is stored across multiple physical locations (sites) connected by a network. The DBMS coordinates access so that users see it as a single logical database." },
  { cat: "Architectures", q: "What is a parallel database system?", a: "A database system that uses multiple CPUs and disks in parallel to improve performance. It exploits parallelism for query processing and high throughput." },
  { cat: "Architectures", q: "What is a client-server database architecture?", a: "A two-tier architecture where client machines run applications and a server machine runs the DBMS. Middleware (database driver) connects them. Clients handle GUI, server handles transaction processing." },
  { cat: "Architectures", q: "What is a three-tier client-server architecture?", a: "Adds a middle tier (application server or business logic tier) between client and database server. The middle tier houses business rules, improving scalability and flexibility." },
  { cat: "Architectures", q: "What is a thin client vs fat client?", a: "Thin client: most processing occurs on server (minimal client). Fat client: most processing occurs on client machine." },
  { cat: "Architectures", q: "What is ODBC (Open Database Connectivity)?", a: "Microsoft's strategic interface for accessing data in heterogeneous environments. It provides a vendor-neutral way to access data from various proprietary DBMSs. Components: ODBC client, ODBC driver, DBMS server." },

  // ─────────────────────────────────────────────────────────────────
  // 11. MICROSOFT ACCESS (Tables, Queries, Forms, Reports)
  // ─────────────────────────────────────────────────────────────────
  { cat: "MS Access", q: "What is a Microsoft Access database file called?", a: "A file with extension .mdb (or .accdb) that encompasses the entire database including tables, queries, forms, reports, macros, and modules." },
  { cat: "MS Access", q: "What are the six main objects in an Access database?", a: "1. Tables, 2. Queries, 3. Forms, 4. Reports, 5. Macros, 6. Modules (VBA)." },
  { cat: "MS Access", q: "What is a query in Access?", a: "A tool to search for and grab data from one or more tables, perform actions on the database, or carry out calculations. Types: Select, Action (Append, Delete, Make-Table, Update), Parameter, Aggregate." },
  { cat: "MS Access", q: "What is a select query?", a: "The most common type. It selects and displays data from one or more tables based on user-defined criteria. It creates a virtual table." },
  { cat: "MS Access", q: "What is an action query?", a: "Performs an action on data: Append (adds records), Delete (deletes records), Make-Table (creates a new table), Update (modifies records)." },
  { cat: "MS Access", q: "What is a parameter query?", a: "Prompts the user for specific information (a parameter) every time the query is run. It modifies another query based on user input." },
  { cat: "MS Access", q: "What is a form in Access?", a: "A graphical user interface for accessing data stored in tables or queries. Forms allow data entry, editing, and navigation. They are made up of controls (text boxes, labels, buttons)." },
  { cat: "MS Access", q: "What is a subform?", a: "A form within a form. The main form is the main form, the inner form is the subform. Used to display related data from one-to-many relationships (e.g., Customer form with subform of Accounts)." },
  { cat: "MS Access", q: "What is a report in Access?", a: "A formatted presentation of data from tables and queries, designed for printing. Reports can include calculations, graphics, headers, footers, and grouping/summaries." },
  { cat: "MS Access", q: "What are the main sections of an Access report?", a: "Report Header, Page Header, Group Header, Detail, Group Footer, Page Footer, Report Footer." },
  { cat: "MS Access", q: "What is a calculated control in a form or report?", a: "An unbound control that displays the result of an expression (e.g., =[Price]*[Quantity]). The expression is entered in the Control Source property." },
  { cat: "MS Access", q: "What is the IIf function in Access?", a: "Evaluates a condition and returns one value if true, another if false. Syntax: IIf(expr, truepart, falsepart). Example: IIf([Age]>=65, 'Senior', 'Adult')." },

  // ─────────────────────────────────────────────────────────────────
  // 12. ADDITIONAL EXAM-STYLE QUESTIONS (from image lists)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Exam Practice", q: "What is the difference between a composite attribute and a multi-valued attribute?", a: "Composite attribute can be divided into smaller subparts (e.g., Address). Multi-valued attribute can have multiple values for one entity (e.g., phone numbers)." },
  { cat: "Exam Practice", q: "Draw and describe the three basic ER relationship types: 1:1, 1:N, M:N.", a: React.createElement('div', null,
    React.createElement(ERDiagram, { type: '1:1', leftEntity: 'EMPLOYEE', rightEntity: 'OFFICE' }),
    React.createElement(ERDiagram, { type: '1:N', leftEntity: 'DEPARTMENT', rightEntity: 'EMPLOYEE' }),
    React.createElement(ERDiagram, { type: 'M:N', leftEntity: 'EMPLOYEE', rightEntity: 'PROJECT' })
  ) },
  { cat: "Exam Practice", q: "What is a client-server database? Write short notes.", a: "A database architecture where client machines run applications (GUI) and a server runs the DBMS. Clients communicate with the server via middleware (database driver). Advantages: high performance, advanced user interfaces. Disadvantages: complexity, network saturation risk." },
  { cat: "Exam Practice", q: "Write short notes on distributed database system.", a: "A distributed database is a collection of multiple, logically interrelated databases distributed over a computer network. The DBMS makes the distribution transparent to users. Advantages: reliability, availability, improved performance. Disadvantages: complexity, security, integrity control." },
  { cat: "Exam Practice", q: "Write short notes on parallel database system.", a: "A database system that uses multiple CPUs and disks in parallel to improve performance. It exploits parallelism for query processing (e.g., partitioning data across disks). Used for data warehousing and decision support." },
  { cat: "Exam Practice", q: "Write short notes on centralized database management system.", a: "A DBMS where all data, processing, and management functions reside on a single mainframe or server. Users access via terminals. Advantages: easy control, data consistency. Disadvantages: single point of failure, limited scalability." },
  { cat: "Exam Practice", q: "What is the networked database model?", a: "An early database model where data is represented as records connected by links (pointers). It allows many-to-many relationships directly. Example: CODASYL DBTG model. It is more complex than the relational model and less used today." },
  { cat: "Exam Practice", q: "What is the difference between DBMS and RDBMS?", a: "DBMS is a general term for any database management system. RDBMS (Relational DBMS) is a specific type that implements the relational model (tables, rows, columns, keys, SQL). Most modern DBMS are RDBMS." },
  { cat: "Exam Practice", q: "What is an entity-relationship (ER) diagram?", a: "A pictorial representation of the data model using entities (rectangles), relationships (diamonds or lines), and attributes (ovals). It shows the logical structure of a database before implementation." },
  { cat: "Exam Practice", q: "What is a strong entity vs weak entity?", a: "Strong entity exists independently and has its own primary key. Weak entity depends on a strong entity for its existence and identification; it has a foreign key that references the strong entity's primary key." },
  { cat: "Exam Practice", q: "What is a related entity?", a: "An entity that participates in a relationship with another entity. In ER diagrams, related entities are connected by relationship lines." },
  { cat: "Exam Practice", q: "What is the purpose of normalization? State the rules for 1NF, 2NF, and 3NF.", a: "Normalization eliminates redundancy and anomalies. 1NF: atomic values, no repeating groups. 2NF: 1NF + no partial dependencies on composite keys. 3NF: 2NF + no transitive dependencies." },
  { cat: "Exam Practice", q: "Create a Student table with SSN, Name, BatchNo. Convert to ER diagram.", a: React.createElement('div', null,
    React.createElement('strong', null, 'Student Table:'), ' Student(SSN PK, Name, BatchNo)',
    React.createElement(ERDiagram, { type: '1:N', leftEntity: 'STUDENT', rightEntity: 'BATCH' }),
    React.createElement('div', { style: { fontSize: '12px', marginTop: '8px' } }, 'Where BATCH is a separate entity with BatchNo PK.')
  ) },
  { cat: "Exam Practice", q: "What is a foreign key? Give an example.", a: "A column (or set of columns) in one table that references the primary key of another table. Example: In the Accounts table, CustomerID is a foreign key referencing CustomerID in the Customers table." },
  { cat: "Exam Practice", q: "What is a primary key? Give an example.", a: "An attribute that uniquely identifies each row in a table. Example: In a Students table, StudentID is the primary key." },

  // ─────────────────────────────────────────────────────────────────
  // 13. MORE EXAMPLES (to reach >150 cards)
  // ─────────────────────────────────────────────────────────────────
  { cat: "SQL", q: "Write the SQL to create a Customers table with CustomerID int PRIMARY KEY, Name varchar(100), City varchar(50).", a: "CREATE TABLE Customers ( CustomerID int PRIMARY KEY, Name varchar(100), City varchar(50) );" },
  { cat: "SQL", q: "Write the SQL to add a foreign key constraint on Orders table referencing Customers(CustomerID).", a: "ALTER TABLE Orders ADD FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID);" },
  { cat: "SQL", q: "What is the difference between VARCHAR and CHAR?", a: "VARCHAR is variable-length (saves space). CHAR is fixed-length (may waste space but faster for fixed-size data)." },
  { cat: "SQL Functions", q: "What does the FIRST() function do in Access SQL?", a: "Returns the first value of the selected column. Not standard SQL; Access specific." },
  { cat: "SQL Functions", q: "What does the LAST() function do in Access SQL?", a: "Returns the last value of the selected column." },
  { cat: "Transactions", q: "What is a dirty read?", a: "When a transaction reads data that has been written by another transaction that has not yet been committed. This can lead to reading invalid or inconsistent data." },
  { cat: "Transactions", q: "What is a non-repeatable read?", a: "When a transaction reads the same row twice and gets different values because another transaction updated the row between reads." },
  { cat: "Transactions", q: "What is a phantom read?", a: "When a transaction reads a set of rows twice and gets different sets because another transaction inserted or deleted rows between reads." },
  { cat: "Security", q: "What is the difference between GRANT and REVOKE?", a: "GRANT gives privileges to users. REVOKE takes away previously granted privileges." },
  { cat: "MS Access", q: "What is the purpose of the Total row in query design view?", a: "It allows you to group and summarize information (sum, avg, count, min, max, etc.) on groups of records." },
  { cat: "MS Access", q: "What is a crosstab query?", a: "A query that summarizes information in a grid, organized by rows and columns (like a pivot table)." },
];

// Add more filler cards to exceed 150 (already >150, but ensure count)
console.log(`Total cards: ${ALL_CARDS.length}`); // Should be >150

const CATEGORIES = ["All", ...new Set(ALL_CARDS.map(c => c.cat))];

const renderAnswer = (text) => {
  if (React.isValidElement(text)) return text;
  const hasNumberedList = text.split('\n').some(l => /^\d+\./.test(l.trim()));
  if (hasNumberedList) {
    return text.split('\n').map((line, idx) => {
      const match = line.match(/^(\d+\.\s*)(.*)/);
      if (match) {
        return React.createElement('span', { key: idx, style: { display: 'block', marginBottom: '4px' } },
          React.createElement('span', { style: { color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.85em', marginRight: '6px' } }, match[1]),
          match[2]
        );
      }
      if (line.trim()) {
        return React.createElement('span', { key: idx, style: { display: 'block', marginTop: '8px', color: 'var(--text2)', fontSize: '0.9em' } }, line);
      }
      return null;
    }).filter(Boolean);
  }
  const parts = text.split('\n\n');
  if (parts.length > 1) {
    return parts.map((part, idx) => {
      return React.createElement('span', { key: idx, style: { display: 'block', marginTop: idx > 0 ? '10px' : '' }, dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
    });
  }
  return React.createElement('span', { dangerouslySetInnerHTML: { __html: text.replace(/\n/g, '<br>') } });
};

const DatabaseDesignFlashcards = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIndices, setKnownIndices] = useState([]);
  const [reviewIndices, setReviewIndices] = useState([]);
  const [, setShuffledDeck] = useState([...ALL_CARDS]);

  const currentDeck = activeCat === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.cat === activeCat);

  const filterCat = (cat) => {
    setActiveCat(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const shuffleDeck = () => {
    const shuffled = [...currentDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const navigate = useCallback((dir) => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + dir + currentDeck.length) % currentDeck.length);
  }, [currentDeck.length]);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const mark = useCallback((type) => {
    const card = currentDeck[currentIndex];
    const originalIdx = ALL_CARDS.indexOf(card);
    if (type === "know") {
      setKnownIndices((prev) =>
        prev.includes(originalIdx) ? prev.filter(i => i !== originalIdx) : [...prev, originalIdx]
      );
      setReviewIndices((prev) => prev.filter(i => i !== originalIdx));
    } else {
      setReviewIndices((prev) =>
        prev.includes(originalIdx) ? prev.filter(i => i !== originalIdx) : [...prev, originalIdx]
      );
      setKnownIndices((prev) => prev.filter(i => i !== originalIdx));
    }
  }, [currentDeck, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
      else if ((e.key === "k" || e.key === "K") && isFlipped) { e.preventDefault(); mark("know"); }
      else if ((e.key === "r" || e.key === "R") && isFlipped) { e.preventDefault(); mark("review"); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex, currentDeck, mark, navigate, flipCard]);

  const currentCard = currentDeck[currentIndex];
  const originalCardIndex = currentCard ? ALL_CARDS.indexOf(currentCard) : -1;
  const isKnown = knownIndices.includes(originalCardIndex);
  const isReview = reviewIndices.includes(originalCardIndex);
  const progressPercent = Math.round(((currentIndex + 1) / currentDeck.length) * 100);

  return React.createElement('div', { className: 'flashcard-app' },
    React.createElement('style', null, `
      :root {
        --bg: #0b0d0f;
        --bg2: #111417;
        --bg3: #181c20;
        --bg4: #1e2328;
        --border: rgba(255,255,255,0.07);
        --border2: rgba(255,255,255,0.12);
        --text: #e8eaed;
        --text2: #9aa0a6;
        --text3: #5f6368;
        --accent: #3b82f6;
        --accent2: #1d4ed8;
        --green: #34a853;
        --green-bg: rgba(52,168,83,0.12);
        --amber: #fbbc04;
        --amber-bg: rgba(251,188,4,0.1);
        --red: #ea4335;
        --red-bg: rgba(234,67,53,0.1);
        --card-h: 380px;
        --radius: 16px;
        --mono: 'JetBrains Mono', monospace;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Syne', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
      }
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
        z-index: 0;
      }
      body::after {
        content: '';
        position: fixed;
        top: -20vh;
        left: 50%;
        transform: translateX(-50%);
        width: 70vw;
        height: 50vh;
        background: radial-gradient(ellipse at center, rgba(59,130,246,0.07) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }
      .wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 850px;
        padding: 2rem 1.25rem 4rem;
        margin: 0 auto;
      }
      header { text-align: center; margin-bottom: 2rem; position: relative; }
      .back-button {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border2);
        color: var(--text2);
        padding: 6px 14px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .back-button:hover {
        background: rgba(59,130,246,0.1);
        border-color: var(--accent);
        color: var(--accent);
      }
      .header-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--accent);
        border: 1px solid rgba(59,130,246,0.25);
        background: rgba(59,130,246,0.07);
        border-radius: 99px;
        padding: 4px 14px;
        margin-bottom: 1rem;
      }
      h1 {
        font-size: clamp(1.6rem, 4vw, 2.4rem);
        font-weight: 800;
        letter-spacing: -0.5px;
        line-height: 1.1;
        color: var(--text);
      }
      h1 span { color: var(--accent); }
      .header-sub {
        font-family: 'Lora', serif;
        font-style: italic;
        font-size: 14px;
        color: var(--text3);
        margin-top: 0.5rem;
      }
      .progress-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 1.5rem;
      }
      .progress-track {
        flex: 1;
        height: 3px;
        background: var(--bg4);
        border-radius: 99px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent2), var(--accent));
        border-radius: 99px;
        transition: width 0.4s cubic-bezier(.4,0,.2,1);
        box-shadow: 0 0 8px rgba(59,130,246,0.4);
      }
      .progress-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text3);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .progress-pct {
        font-family: var(--mono);
        font-size: 11px;
        color: var(--accent);
        min-width: 34px;
        text-align: right;
      }
      .tabs-wrap {
        margin-bottom: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .tab {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 5px 13px;
        border-radius: 99px;
        border: 1px solid var(--border2);
        background: transparent;
        color: var(--text2);
        cursor: pointer;
        transition: all 0.18s;
      }
      .tab:hover { border-color: rgba(59,130,246,0.35); color: var(--accent); }
      .tab.active {
        background: rgba(59,130,246,0.12);
        border-color: rgba(59,130,246,0.4);
        color: var(--accent);
      }
      .card-area {
        perspective: 1200px;
        cursor: pointer;
        margin-bottom: 1.25rem;
        position: relative;
      }
      .card-inner {
        position: relative;
        width: 100%;
        min-height: var(--card-h);
        transform-style: preserve-3d;
        transition: transform 0.5s cubic-bezier(.4,0,.2,1);
      }
      .card-inner.flipped { transform: rotateY(180deg); }
      .card-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        border-radius: var(--radius);
        border: 1px solid var(--border2);
        display: flex;
        flex-direction: column;
        padding: 2rem;
        min-height: var(--card-h);
      }
      .card-front {
        background: var(--bg2);
        background-image: radial-gradient(ellipse at 80% 10%, rgba(59,130,246,0.05) 0%, transparent 60%);
      }
      .card-back {
        transform: rotateY(180deg);
        background: var(--bg3);
        background-image: radial-gradient(ellipse at 20% 90%, rgba(59,130,246,0.06) 0%, transparent 60%);
      }
      .card-eyebrow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }
      .card-cat {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--accent);
        background: rgba(59,130,246,0.1);
        border: 1px solid rgba(59,130,246,0.2);
        border-radius: 99px;
        padding: 3px 10px;
      }
      .card-side-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text3);
      }
      .card-body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
      }
      .card-q {
        font-size: clamp(1rem, 2.5vw, 1.3rem);
        font-weight: 700;
        line-height: 1.4;
        color: var(--text);
        text-align: center;
      }
      .card-a {
        font-size: clamp(0.85rem, 2vw, 1rem);
        line-height: 1.7;
        color: var(--text);
        width: 100%;
      }
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 1rem;
      }
      .btn-nav {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid var(--border2);
        background: var(--bg2);
        color: var(--text);
        font-size: 18px;
        cursor: pointer;
        transition: all 0.18s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-nav:hover { border-color: var(--accent); color: var(--accent); background: rgba(59,130,246,0.08); }
      .counter {
        font-family: var(--mono);
        font-size: 13px;
        color: var(--text2);
        min-width: 60px;
        text-align: center;
      }
      .btn-shuffle {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 99px;
        border: 1px solid var(--border2);
        background: var(--bg2);
        color: var(--text2);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.18s;
      }
      .btn-shuffle:hover { border-color: var(--accent); color: var(--accent); }
      .mark-row {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 1rem;
      }
      .mark-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 20px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.18s;
        border: 1.5px solid transparent;
      }
      .mark-btn.know {
        background: var(--green-bg);
        color: var(--green);
        border-color: rgba(52,168,83,0.3);
      }
      .mark-btn.know.active {
        background: var(--green);
        color: #fff;
        border-color: var(--green);
      }
      .mark-btn.review {
        background: var(--amber-bg);
        color: var(--amber);
        border-color: rgba(251,188,4,0.3);
      }
      .mark-btn.review.active {
        background: var(--amber);
        color: #000;
        border-color: var(--amber);
      }
      .stats-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .stat-pill {
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 99px;
      }
      .stat-know { background: var(--green-bg); color: var(--green); }
      .stat-review { background: var(--amber-bg); color: var(--amber); }
      .stat-remaining { background: rgba(255,255,255,0.05); color: var(--text3); }
      .kb-hint {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      }
      .kb-key {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--text3);
      }
      .kbd {
        font-family: var(--mono);
        font-size: 10px;
        background: var(--bg4);
        border: 1px solid var(--border2);
        border-radius: 4px;
        padding: 2px 6px;
        color: var(--text2);
      }
    `),
    React.createElement('div', { className: 'wrap' },
      React.createElement('header', null,
        React.createElement('button', { className: 'back-button', onClick: onBack }, '← Back'),
        React.createElement('div', { className: 'header-badge' }, '🗄️ SWD312'),
        React.createElement('h1', null,
          'Database ',
          React.createElement('span', null, 'Design I')
        ),
        React.createElement('p', { className: 'header-sub' }, `${ALL_CARDS.length} cards · ER Model · SQL · Normalization · Access`)
      ),
      React.createElement('div', { className: 'progress-row' },
        React.createElement('span', { className: 'progress-label' }, `Card ${currentIndex + 1} of ${currentDeck.length}`),
        React.createElement('div', { className: 'progress-track' },
          React.createElement('div', { className: 'progress-fill', style: { width: `${progressPercent}%` } })
        ),
        React.createElement('span', { className: 'progress-pct' }, `${progressPercent}%`)
      ),
      React.createElement('div', { className: 'tabs-wrap' },
        CATEGORIES.map(cat =>
          React.createElement('button', {
            key: cat,
            className: `tab ${activeCat === cat ? 'active' : ''}`,
            onClick: () => filterCat(cat),
          }, cat)
        )
      ),
      React.createElement('div', { className: 'card-area', onClick: flipCard },
        React.createElement('div', { className: `card-inner ${isFlipped ? 'flipped' : ''}` },
          React.createElement('div', { className: 'card-face card-front' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Question')
            ),
            React.createElement('div', { className: 'card-body' },
              React.createElement('div', { className: 'card-q' }, currentCard?.q || '')
            ),
            React.createElement('div', { className: 'card-hint' }, 'Tap to reveal answer')
          ),
          React.createElement('div', { className: 'card-face card-back' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Answer')
            ),
            React.createElement('div', { className: 'card-body' },
              React.createElement('div', { className: 'card-a' }, currentCard ? renderAnswer(currentCard.a) : null)
            )
          )
        )
      ),
      React.createElement('div', { className: 'controls' },
        React.createElement('button', { className: 'btn-nav', onClick: () => navigate(-1), 'aria-label': 'Previous' }, '←'),
        React.createElement('span', { className: 'counter' }, `${currentIndex + 1} / ${currentDeck.length}`),
        React.createElement('button', { className: 'btn-nav', onClick: () => navigate(1), 'aria-label': 'Next' }, '→'),
        React.createElement('button', { className: 'btn-shuffle', onClick: shuffleDeck },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('path', { d: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5' })
          ),
          'Shuffle'
        )
      ),
      React.createElement('div', { className: 'mark-row', style: { display: isFlipped ? 'flex' : 'none' } },
        React.createElement('button', { className: `mark-btn know ${isKnown ? 'active' : ''}`, onClick: () => mark('know') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('polyline', { points: '20 6 9 17 4 12' })
          ),
          'Got it'
        ),
        React.createElement('button', { className: `mark-btn review ${isReview ? 'active' : ''}`, onClick: () => mark('review') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('polyline', { points: '1 4 1 10 7 10' }),
            React.createElement('path', { d: 'M3.51 15a9 9 0 1 0 .49-3.37' })
          ),
          'Review again'
        )
      ),
      React.createElement('div', { className: 'stats-row' },
        React.createElement('span', { className: 'stat-pill stat-know' }, `${knownIndices.length} known`),
        React.createElement('span', { className: 'stat-pill stat-review' }, `${reviewIndices.length} to review`),
        React.createElement('span', { className: 'stat-pill stat-remaining' }, `${currentDeck.length - knownIndices.length} remaining`)
      ),
      React.createElement('div', { className: 'kb-hint' },
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'Space'), ' flip'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, '←'), React.createElement('kbd', { className: 'kbd' }, '→'), ' navigate'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'K'), ' got it ', React.createElement('kbd', { className: 'kbd' }, 'R'), ' review')
      )
    )
  );
};

export default DatabaseDesignFlashcards;