-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2020 at 01:17 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ulloc_covidtestingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `passcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeID`, `email`, `firstName`, `lastName`, `passcode`) VALUES
('111', 'ulloc1@gmail.com', 'ulloc1', 'stony1', 'asdf'),
('222', 'ulloc2@gmail.com', 'ulloc2', 'stony2', 'asdf'),
('333', 'ulloc3@gmail.com', 'ulloc3', 'stony3', 'asdf'),
('444', 'ulloc4@gmail.com', 'ulloc4', 'stony4', 'asdf'),
('555', 'ulloc5@gmail.com', 'ulloc5', 'stony5', 'asdf'),
('666', 'ulloc6@gmail.com', 'ulloc6', 'stony6', 'asdf'),
('777', 'ulloc7@gmail.com', 'ulloc7', 'stony7', 'asdf'),
('888', 'ulloc8@gmail.com', 'ulloc8', 'stony8', 'asdf'),
('999', 'ulloc9@gmail.com', 'ulloc9', 'stony9', 'asdf'),
('101010', 'ulloc10@gmail.com', 'ulloc10', 'stony10', 'asdf'),
('111111', 'ulloc11@gmail.com', 'ulloc11', 'stony11', 'asdf'),
('121212', 'ulloc12@gmail.com', 'ulloc12', 'stony12', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `employeetest`
--

CREATE TABLE `employeetest` (
  `testBarcode` varchar(50) NOT NULL,
  `employeeID` varchar(20) NOT NULL,
  `collectionTime` datetime DEFAULT NULL,
  `collectedBy` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employeetest`
--

INSERT INTO `employeetest` (`testBarcode`, `employeeID`, `collectionTime`, `collectedBy`) VALUES
('t1', '111', NOW(), 'ulloc1@gmail.com'),
('t2', '222', NOW(), 'ulloc1@gmail.com'),
('t3', '333', NOW(), 'ulloc1@gmail.com'),
('t4', '444', NOW(), 'ulloc1@gmail.com'),
('t5', '555', NOW(), 'ulloc1@gmail.com'),
('t6', '666', NOW(), 'ulloc1@gmail.com');


-- --------------------------------------------------------

--
-- Table structure for table `labemployee`
--

CREATE TABLE `labemployee` (
  `labID` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `labemployee`
--

INSERT INTO `labemployee` (`labID`, `password`) VALUES
('ulloc1@gmail.com', 'asdf'),
('ulloc2@gmail.com', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `pool`
--

CREATE TABLE `pool` (
  `poolBarcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--------------------------------------------

--
-- Table structure for table `poolmap`
--

CREATE TABLE `poolmap` (
  `testBarcode` varchar(50) DEFAULT NULL,
  `poolBarcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `well`
--

CREATE TABLE `well` (
  `wellBarcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `welltesting`
--

CREATE TABLE `welltesting` (
  `poolBarcode` varchar(50) NOT NULL,
  `wellBarcode` varchar(50) DEFAULT NULL,
  `testingStartTime` datetime DEFAULT NULL,
  `testingEndTime` datetime DEFAULT NULL,
  `result` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeID`);

--
-- Indexes for table `employeetest`
--
ALTER TABLE `employeetest`
  ADD PRIMARY KEY (`testBarcode`),
  ADD KEY `FK_employeeID` (`employeeID`),
  ADD KEY `FK_LabEmployee` (`collectedBy`);

--
-- Indexes for table `labemployee`
--
ALTER TABLE `labemployee`
  ADD PRIMARY KEY (`labID`);

--
-- Indexes for table `pool`
--
ALTER TABLE `pool`
  ADD PRIMARY KEY (`poolBarcode`);

--
-- Indexes for table `poolmap`
--
ALTER TABLE `poolmap`
  ADD KEY `FK_testBarcode` (`testBarcode`),
  ADD KEY `FK_poolBarcode` (`poolBarcode`);

--
-- Indexes for table `well`
--
ALTER TABLE `well`
  ADD PRIMARY KEY (`wellBarcode`);

--
-- Indexes for table `welltesting`
--
ALTER TABLE `welltesting`
  ADD KEY `FK_poolBarcode2` (`poolBarcode`),
  ADD KEY `FK_wellBarcode` (`wellBarcode`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employeetest`
--
ALTER TABLE `employeetest`
  ADD CONSTRAINT `FK_LabEmployee` FOREIGN KEY (`collectedBy`) REFERENCES `labemployee` (`labID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_employeeID` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `poolmap`
--
ALTER TABLE `poolmap`
  ADD CONSTRAINT `FK_poolBarcode` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_testBarcode` FOREIGN KEY (`testBarcode`) REFERENCES `employeetest` (`testBarcode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `welltesting`
--
ALTER TABLE `welltesting`
  ADD CONSTRAINT `FK_poolBarcode2` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_wellBarcode` FOREIGN KEY (`wellBarcode`) REFERENCES `well` (`wellBarcode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
