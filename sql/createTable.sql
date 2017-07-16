-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account` ;

CREATE TABLE IF NOT EXISTS `account` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `account_type` TINYINT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `account_UNIQUE` (`account` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expert`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expert` ;

CREATE TABLE IF NOT EXISTS `expert` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `account_ID` INT NOT NULL,
  `expert_credential_id` VARCHAR(45) NULL,
  `status` TINYINT(2) NULL,
  `expert_credential_expire` DATE NULL,
  `name` VARCHAR(45) NULL,
  `gender` TINYINT(2) NULL,
  `born_date` DATE NULL,
  `photo` VARCHAR(45) NULL,
  `political_status` TINYINT(2) NULL,
  `credential_type` TINYINT(2) NULL,
  `certificate_authority` VARCHAR(45) NULL,
  `credential_ID` VARCHAR(45) NULL,
  `academic_qualification` VARCHAR(45) NULL,
  `academic_degree` VARCHAR(45) NULL,
  `professional_rank` VARCHAR(45) NULL,
  `post` VARCHAR(45) NULL,
  `work_time` VARCHAR(45) NULL,
  `retired` TINYINT NULL,
  `part_time` TINYINT NULL,
  `work_unit` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `zip_code` INT NULL,
  `email` VARCHAR(45) NULL,
  `phone_number` BIGINT(12) NULL,
  `graduate_institution` VARCHAR(45) NULL,
  `speciality` VARCHAR(300) NULL,
  `achievement` VARCHAR(300) NULL,
  `supplement` VARCHAR(300) NULL,
  PRIMARY KEY (`ID`, `account_ID`),
  INDEX `fk_expert_account1_idx` (`account_ID` ASC),
  CONSTRAINT `fk_expert_account1`
    FOREIGN KEY (`account_ID`)
    REFERENCES `account` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qualification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qualification` ;

CREATE TABLE IF NOT EXISTS `qualification` (
  `ID` BIGINT(20) NOT NULL,
  `qualification_name` VARCHAR(45) NULL,
  `expert_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `expert_ID`),
  INDEX `fk_qualification_expert_idx` (`expert_ID` ASC),
  CONSTRAINT `fk_qualification_expert`
    FOREIGN KEY (`expert_ID`)
    REFERENCES `expert` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_area` ;

CREATE TABLE IF NOT EXISTS `review_area` (
  `area` TINYINT(2) NULL,
  `expert_ID` INT NOT NULL,
  PRIMARY KEY (`expert_ID`),
  CONSTRAINT `fk_review_area_expert1`
    FOREIGN KEY (`expert_ID`)
    REFERENCES `expert` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review_history` ;

CREATE TABLE IF NOT EXISTS `review_history` (
  `history` VARCHAR(100) NULL,
  `expert_ID` INT NOT NULL,
  PRIMARY KEY (`expert_ID`),
  CONSTRAINT `fk_review_history_expert1`
    FOREIGN KEY (`expert_ID`)
    REFERENCES `expert` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `avoidance_unit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `avoidance_unit` ;

CREATE TABLE IF NOT EXISTS `avoidance_unit` (
  `unit` VARCHAR(100) NULL,
  `expert_ID` INT NOT NULL,
  PRIMARY KEY (`expert_ID`),
  CONSTRAINT `fk_avoidance_unit_expert1`
    FOREIGN KEY (`expert_ID`)
    REFERENCES `expert` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `work_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `work_history` ;

CREATE TABLE IF NOT EXISTS `work_history` (
  `history` VARCHAR(100) NULL,
  `expert_ID` INT NOT NULL,
  PRIMARY KEY (`expert_ID`),
  CONSTRAINT `fk_work_history_expert1`
    FOREIGN KEY (`expert_ID`)
    REFERENCES `expert` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
