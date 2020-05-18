# Metadata Extractor

Metadata Extractors that pulls RDFs & update DB

## Prerequisites

What things you need to install the App

- MySQL
- Gutenberg Book files (https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip)
- Download & extract it

## Installing

```
> yarn install
> yarn db:migrate
> yarn run dev
```

On successful installation, program begin fetching all the RDF files, parse & validates it, then push everything to DB

```
DB Name: gutenbergdb
Table Name: books
```

## Running the tests

Test specs are written using Jasmine (Note: Babel not configured)

```
yarn test
```

## Undo Migration

Undo Migration, run the below command till you want

```
yarn db:migrate:undo
```

## Things done

- Reads RDF files from the given directory location
- Parse & Validates using XML2JS
- Map to Book model
- Save it to the DB
- Added Indexing
- Enabled FULL TEXT Search for Title & Authors fields

## Things handled

- Too many files reading at a time (Restriction by OS by default), handled using graceful-fs
- Increased Node Heap size from 2.4GB to 8.2GB
- Increased Connection Timeout & Idle limit for DB request

## Deployment

Add additional notes about how to deploy this on a live system

## Author

* **Renish B** (renishb10@gmail.com)

### Thanks!
