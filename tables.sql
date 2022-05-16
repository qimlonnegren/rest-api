CREATE TABLE Projekt (
Projektkod text, 
Projektnamn text,
Projektledar_id serial,
Projektbudget int, 
CONSTRAINT projekt_pkey PRIMARY KEY (Projektkod), 
CONSTRAINT ProjektledarId_fkey FOREIGN KEY (Projektledar_id) REFERENCES Projektledare (projektledar_id)
)

CREATE TABLE Projektledare (
projektledar_id serial,
Projektledare text,
CONSTRAINT Projektledare_pkey PRIMARY KEY (projektledar_id)
)

CREATE TABLE Anställd (
Anställningsnr serial,
Anställd text,
Avdelningsnr,
CONSTRAINT anställningsnr_pkey PRIMARY KEY (Anställningsnr),
CONSTRAINT Avdelningsnr_fkey FOREIGN KEY (Avdelningsnr) REFERENCES Avdelning (Avdelningsnr)
)

CREATE TABLE Avdelning (
Avdelningsnr text,
Avdelningsnamn text,
CONSTRAINT avdelning_pkey PRIMARY KEY (Avdelningsnr)
)

CREATE TABLE Timdebitering (
Timdebitering_id serial,
Anställnings_id text, 
Projektkod text, 
Timdebitering int,
CONSTRAINT TimdebiteringId_pkey PRIMARY KEY (Timdebitering_id)
CONSTRAINT AnställningsId_fkey FOREIGN KEY (Anställnings_id) REFERENCES Anställd (Anställnings_id)
CONSTRAINT Projektkod_fkey FOREIGN KEY (Projektkod) REFERENCES Projekt (Projektkod)
)


