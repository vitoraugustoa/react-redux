-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mymoney
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mymoney
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mymoney` DEFAULT CHARACTER SET latin1 ;
USE `mymoney` ;

-- -----------------------------------------------------
-- Table `mymoney`.`billingcycle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mymoney`.`billingcycle` (
  `CycleID` INT(11) NOT NULL AUTO_INCREMENT,
  `CycleName` VARCHAR(120) NULL DEFAULT NULL,
  `CycleMonth` INT(11) NULL DEFAULT NULL,
  `CycleYear` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`CycleID`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `mymoney`.`credit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mymoney`.`credit` (
  `CreditID` INT(11) NOT NULL AUTO_INCREMENT,
  `CreditName` VARCHAR(120) NULL DEFAULT NULL,
  `CreditValue` DECIMAL(6,0) NULL DEFAULT NULL,
  `CycleFK` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`CreditID`),
  INDEX `CycleFK` (`CycleFK` ASC) VISIBLE,
  CONSTRAINT `credit_ibfk_1`
    FOREIGN KEY (`CycleFK`)
    REFERENCES `mymoney`.`billingcycle` (`CycleID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `mymoney`.`debt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mymoney`.`debt` (
  `DebtID` INT(11) NOT NULL AUTO_INCREMENT,
  `DebtName` VARCHAR(120) NULL DEFAULT NULL,
  `DebtStatus` ENUM('PAGO', 'PENDENTE', 'AGENDADO') NULL DEFAULT NULL,
  `DebtValue` DECIMAL(6,0) NULL DEFAULT NULL,
  `CycleFK` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`DebtID`),
  INDEX `CycleFK` (`CycleFK` ASC) VISIBLE,
  CONSTRAINT `debt_ibfk_1`
    FOREIGN KEY (`CycleFK`)
    REFERENCES `mymoney`.`billingcycle` (`CycleID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
