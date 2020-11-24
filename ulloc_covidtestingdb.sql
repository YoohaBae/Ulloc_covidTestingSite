-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 20-11-24 15:07
-- 서버 버전: 10.4.14-MariaDB
-- PHP 버전: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `ulloc_covidtestingdb`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `employee`
--

CREATE TABLE `employee` (
  `employeeID` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `passcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `employeetest`
--

CREATE TABLE `employeetest` (
  `testBarcode` varchar(50) NOT NULL,
  `employeeID` varchar(20) NOT NULL,
  `collectionTime` datetime DEFAULT NULL,
  `collectedBy` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `labemployee`
--

CREATE TABLE `labemployee` (
  `labID` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `pool`
--

CREATE TABLE `pool` (
  `poolBarcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `poolmap`
--

CREATE TABLE `poolmap` (
  `testBarcode` varchar(50) DEFAULT NULL,
  `poolBarcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `well`
--

CREATE TABLE `well` (
  `wellBarcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 테이블 구조 `welltesting`
--

CREATE TABLE `welltesting` (
  `poolBarcode` varchar(50) NOT NULL,
  `wellBarcode` varchar(50) DEFAULT NULL,
  `testingStartTime` datetime DEFAULT NULL,
  `testingEndTime` datetime DEFAULT NULL,
  `result` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeID`);

--
-- 테이블의 인덱스 `employeetest`
--
ALTER TABLE `employeetest`
  ADD PRIMARY KEY (`testBarcode`),
  ADD KEY `FK_employeeID` (`employeeID`),
  ADD KEY `FK_LabEmployee` (`collectedBy`);

--
-- 테이블의 인덱스 `labemployee`
--
ALTER TABLE `labemployee`
  ADD PRIMARY KEY (`labID`);

--
-- 테이블의 인덱스 `pool`
--
ALTER TABLE `pool`
  ADD PRIMARY KEY (`poolBarcode`);

--
-- 테이블의 인덱스 `poolmap`
--
ALTER TABLE `poolmap`
  ADD KEY `FK_testBarcode` (`testBarcode`),
  ADD KEY `FK_poolBarcode` (`poolBarcode`);

--
-- 테이블의 인덱스 `well`
--
ALTER TABLE `well`
  ADD PRIMARY KEY (`wellBarcode`);

--
-- 테이블의 인덱스 `welltesting`
--
ALTER TABLE `welltesting`
  ADD KEY `FK_poolBarcode2` (`poolBarcode`),
  ADD KEY `FK_wellBarcode` (`wellBarcode`);

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `employeetest`
--
ALTER TABLE `employeetest`
  ADD CONSTRAINT `FK_LabEmployee` FOREIGN KEY (`collectedBy`) REFERENCES `labemployee` (`labID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_employeeID` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `poolmap`
--
ALTER TABLE `poolmap`
  ADD CONSTRAINT `FK_poolBarcode` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_testBarcode` FOREIGN KEY (`testBarcode`) REFERENCES `employeetest` (`testBarcode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 테이블의 제약사항 `welltesting`
--
ALTER TABLE `welltesting`
  ADD CONSTRAINT `FK_poolBarcode2` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_wellBarcode` FOREIGN KEY (`wellBarcode`) REFERENCES `well` (`wellBarcode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
