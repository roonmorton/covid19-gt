

-- Actualizacion de campo para que permita agregar campos nulos en el genero
ALTER TABLE esdavil1_covid19.tbl_personas MODIFY COLUMN id_genero int(11) NULL;
