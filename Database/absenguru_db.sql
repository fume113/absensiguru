-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 07:49 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absenguru_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_absensi`
--

CREATE TABLE `data_absensi` (
  `id_absensi` int(11) NOT NULL,
  `id_jam` int(11) DEFAULT NULL,
  `id_guru` int(11) DEFAULT NULL,
  `tanggal` date NOT NULL,
  `nip` varchar(25) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jammasuk` time DEFAULT NULL,
  `jamkeluar` time DEFAULT NULL,
  `keteranganmasuk` varchar(30) DEFAULT NULL,
  `keterangankeluar` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_absensi`
--

INSERT INTO `data_absensi` (`id_absensi`, `id_jam`, `id_guru`, `tanggal`, `nip`, `nama`, `jammasuk`, `jamkeluar`, `keteranganmasuk`, `keterangankeluar`) VALUES
(1, NULL, NULL, '2023-10-29', '10120709', 'Rijal', '15:57:52', NULL, 'Jam Ke-10', NULL),
(2, NULL, NULL, '2023-10-29', '19660508 198903 2 003', ' Hj. AI NURHAYATI,S.Pd., M.Pd.', '15:58:12', NULL, 'Jam Ke-10', NULL),
(3, NULL, NULL, '2023-10-29', '19700508 202321 1 001', ' ASEP SAEPULLAH, S.Pd.I.', '15:58:29', NULL, 'Jam Ke-10', NULL),
(14, NULL, NULL, '2023-10-31', '10120709', 'Rijal', '04:39:40', NULL, 'Jam Ke-0', NULL),
(33, NULL, NULL, '2023-11-03', '10120709', 'Rijal', '01:39:37', '01:39:47', 'Jam Ke-2', 'Jam ke-2'),
(34, NULL, NULL, '2023-11-03', '19660508 198903 2 003', ' Hj. AI NURHAYATI,S.Pd., M.Pd.', '01:40:20', NULL, 'Jam Ke-2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_admin`
--

CREATE TABLE `data_admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_admin`
--

INSERT INTO `data_admin` (`id_admin`, `username`, `password`) VALUES
(1, 'admin', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `data_guru`
--

CREATE TABLE `data_guru` (
  `id_guru` int(11) NOT NULL,
  `nip` varchar(25) DEFAULT NULL,
  `nama` varchar(50) NOT NULL,
  `golongan` varchar(6) DEFAULT NULL,
  `mata_pelajaran` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_guru`
--

INSERT INTO `data_guru` (`id_guru`, `nip`, `nama`, `golongan`, `mata_pelajaran`) VALUES
(1, '12345678 123456 1 007', ' AMELISA SARINAYASA, S.Pd', '-', 'Bahasa Sunda'),
(2, '19700508 202321 1 001', ' ASEP SAEPULLAH, S.Pd.I.', 'IX', 'PAI'),
(3, '19710212 199903 2 003', ' DEDEH KURAESIN, S.Pd.', 'IV/b', 'IPA'),
(4, '19750124 200701 2 005', ' DEMIYANTI, S.Pd.', 'IV/a', 'Matematika'),
(5, '19850830 202221 2 023', ' DINNA DANIATI, S.Pd.', 'IX', 'IPS'),
(6, '19670608 199702 2 002', ' Dra. AI SUHAETI', 'IV/b', 'BK'),
(7, '19680715 202221 2 005', ' Dra. EBAH SUAEBAH', 'IX', 'Bahasa Inggris'),
(8, '19640204 199512 2 004', ' Dra. Hj. NENI ROHAYATI, M.Pd.', 'IV/b', 'PKn'),
(9, '19640304 199303 2 003', ' Dra. SRI MULYATI', 'IV/a', 'BK'),
(10, '19660818 199703 2 002', ' Dra. TINI KARTINI', 'IV/b', 'BK'),
(11, '19641216 198903 2 004', ' Dra. TITIN ROSTIKA', 'IV/a', 'Bahasa Inggris'),
(12, '19641124 199403 2 002', ' Dra. YAYAH SYAMSIAH, M.Ag.', 'IV/b', 'PAI'),
(13, '19660804 199803 1 005', ' Drs. CECEP HASANUDIN', 'IV/b', 'Matematika'),
(14, '19650214 199503 1 002', ' Drs. SUKARDI, M.Pd.', 'IV/b', 'IPA'),
(15, '19810205 200501 2 011', ' EMA SUKAESIH, M.Pd.', 'IV/b', 'IPA'),
(16, '19940508 202221 1 005', ' ERI RAHMAN, S.Pd.', 'IX', 'PKn'),
(17, '19670617 198903 2 003', ' EULIS TUTIASIH, S.Pd.', 'IV/b', 'Seni Budaya'),
(18, '12345678 123456 1 005', ' FATIN FAUZIYYAH TIRAS P. S.Pd.', '-', 'Bahasa Inggris'),
(19, '19960512 202321 2 011', ' FAUZIAH NUR ACHMAD, S.Pd.', 'IX', 'Prakarya'),
(20, '19890408 201903 2 002', ' HANIFAH, S.Pd.', 'III/a', 'IPA'),
(21, '12345678 123456 1 008', ' HARUM SARI, S.Pd', '-', 'Bahasa Sunda'),
(22, '19800429 202321 2 005', ' HENI HENDRAYANI, S.S.', 'IX', 'Bahasa Inggris'),
(23, '19891116 202321 1 005', ' HERRI SETIAWAN, S.Pd., Gr.', '-', 'Bahasa Indonesia'),
(24, '19640131 198903 1 003', ' HERY KUSMANTORO, S.Pd.', 'IV/b', 'PJOK'),
(25, '19660508 198903 2 003', ' Hj. AI NURHAYATI,S.Pd., M.Pd.', 'IV/b', 'KEPALA SEKOLAH'),
(26, '19660110 198903 2 009', ' Hj. ENTIN SUMARTINI, S.Pd.', 'IV/c', ''),
(27, '19650209 198412 2 002', ' Hj. INA HERLINA, S.Pd.', 'IV/b', 'Matematika'),
(28, '19690926 199802 2 001', ' Hj. JUSTIKA PELITASARI, S.Pd.', 'IV/b', 'PKn'),
(29, '19680819 199302 2 002', ' Hj. N. RINI RAHMATIN, S.Pd.', 'IV/b', 'Bahasa Sunda'),
(30, '19680728 199403 2 009', ' Hj. YANTI SRI RAHAYU, M.Pd.', 'IV/b', 'Bahasa Indonesia'),
(31, '19700813 199512 2 002', ' Hj. YULIA KARAHMATIKA, M.Pd.', 'IV/b', 'IPS'),
(32, '19800108 201412 1 001', ' INDRA BUDIAJI, M.Pd.', 'III/c', 'Seni Budaya'),
(33, '19870424 202221 1 018', ' INDRA NURDIANSAH, S.Pd.', 'IX', 'IPS'),
(34, '19800917 200801 2 012', ' IRA RAHAYUNINGSIH, S.Pd', 'IV/a', 'Matematika'),
(35, '12345678 123456 1 006', ' IRMA SUCI DESTIA, S.Pd.', '-', 'Bahasa Inggris'),
(36, '19760820 200801 1 005', ' IYAN MULYANA, S.Pd.', 'IV/a', 'PJOK'),
(37, '19661007 198903 2 004', ' LILIS HENDRAWATI, M.Pd.', 'IV/b', 'IPA'),
(38, '19740515 199903 2 006', ' MAMAY CUMAETI , S.Pd.', 'IV/b', 'BK'),
(39, '19740409 200801 1 006', ' MAMUN NAWAWI, S.Ag., M.Pd.', 'IV/a', 'PAI'),
(40, '19680210 199802 2 002', ' MIMIN TITA MARLIANI, S.Pd.', 'IV/b', 'Bahasa Indonesia'),
(41, '19950220 202321 2 025', ' MITTA PRATAMA, M.Pd.', 'IX', 'PJOK'),
(42, '12345678 123456 1 001', ' MUHAMAD KASYFIL AZIZI, S.Pd.', '-', 'PAI'),
(43, '19710303 199903 2 007', ' N. YUYUN YUNIARTI, S.Pd.', 'IV/b', 'IPS'),
(44, '19911123 202321 2 026', ' NOVA SILVIA, S.Pd.', 'IX', 'Seni Budaya'),
(45, '12345678 123456 1 004', ' NOVIA AMALLINDA, S.Pd., Gr.', '-', 'IPA'),
(46, '19680329 199601 2 001', ' NUNUNG SUKAESIH, S.Pd, M.Pd.', 'IV/b', 'Seni Budaya'),
(47, '19660215 198903 1 005', ' OCENG RUM KARNODI, M.Pd.', 'IV/a', 'Bahasa Inggris'),
(48, '19650828 199002 1 002', ' ONO SUHARYONO, M.Ag.', 'IV/b', 'IPA'),
(49, '19660814 198903 2 010', ' RINA AGUSTINI, M.M.Pd.', 'IV/b', 'Bahasa Indonesia'),
(50, '19770508 202221 2 009', ' RINA SITI PATIMAH, S.Pd.', '-', '-'),
(51, '19640116 198412 2 003', ' RINI RIYANI, S.Pd.', 'IV/b', 'Prakarya'),
(52, '19880425 202321 2 011', ' SITI SAADAH, S.Pd.', 'IX', 'PKn'),
(53, '19850606 201101 2 003', ' SUCI INTAN SARI, M.Pd.', 'III/d', 'Matematika'),
(54, '12345678 123456 1 002', ' SUHERMAN, S.Pd', '-', 'PAI'),
(55, '19830120 201412 2 002', ' SUSI SOMADI, M.Pd.', 'III/c', 'Bahasa Indonesia'),
(56, '19680327 199203 2 002', ' TARSAH SUMIATI, S.Pd.', 'IV/b', 'Matematika'),
(57, '12345678 123456 1 003', ' TINA GUSTINI, S.Pd.', '-', 'Bahasa Indonesia'),
(58, '19930512 202321 2 026', ' YESSI AANUR RAYINA, S.Pd.', 'IX', 'Prakarya'),
(59, '19970306 202221 2 014', ' YULYANTI RIZKIA, S.Pd.', 'IX', 'Bahasa Indonesia'),
(60, '12345678 123456 1 011', 'ASEP NURJAMAN', '-', 'TAS'),
(61, '19631118 198703 1 004', 'AYUB', 'IV/a', 'Prakarya'),
(62, '12345678 123456 1 019', 'EULIS CICAH ', '-', 'Caraka'),
(63, '19760304 201412 2 002', 'HETI RAHMAWATI, A.Ma.Pust', 'II/b', 'TAS'),
(64, '19710305 199308 2 001', 'IMAS KOMALA', 'III/b', 'TAS'),
(65, '12345678 123456 1 012', 'JAJANG SUDIA', '-', 'TAS'),
(66, '12345678 123456 1 015', 'KAHRI SUPRIADI', '-', 'Caraka'),
(67, '12345678 123456 1 016', 'KOSASIH', '-', 'TAS'),
(68, '12345678 123456 1 013', 'NENGSIH YULIANINGSIH, S.I.Pust', '-', 'TAS'),
(69, '12345678 123456 1 017', 'OTONG RUSMANA', '-', 'Satpam'),
(70, '10120709', 'Rijal', 'Ganten', 'Informatika'),
(71, '12345678 123456 1 009', 'TATA SUTISNA', '-', 'Caraka'),
(72, '12345678 123456 1 018', 'TATI IRMA DAMAYANTI, A.Md', '-', 'TAS'),
(73, '12345678 123456 1 010', 'USEP', '-', 'TAS'),
(74, '12345678 123456 1 014', 'WIDYA AGUSTINA, A.Md', '-', 'PERPUSTAKAAN');

-- --------------------------------------------------------

--
-- Table structure for table `data_jam`
--

CREATE TABLE `data_jam` (
  `id_jam` int(11) NOT NULL,
  `hari` varchar(10) NOT NULL,
  `Jam Ke-0` time NOT NULL,
  `Jam Ke-1` time NOT NULL,
  `Jam Ke-2` time NOT NULL,
  `Jam Ke-3` time NOT NULL,
  `Jam Ke-4` time NOT NULL,
  `Istirahat 1` time NOT NULL,
  `Jam Ke-5` time NOT NULL,
  `Jam Ke-6` time NOT NULL,
  `Jam Ke-7` time NOT NULL,
  `Istirahat 2` time NOT NULL,
  `Jam Ke-8` time NOT NULL,
  `Jam Ke-9` time NOT NULL,
  `Jam Ke-10` time NOT NULL,
  `Jam Ke-TU` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_jam`
--

INSERT INTO `data_jam` (`id_jam`, `hari`, `Jam Ke-0`, `Jam Ke-1`, `Jam Ke-2`, `Jam Ke-3`, `Jam Ke-4`, `Istirahat 1`, `Jam Ke-5`, `Jam Ke-6`, `Jam Ke-7`, `Istirahat 2`, `Jam Ke-8`, `Jam Ke-9`, `Jam Ke-10`, `Jam Ke-TU`) VALUES
(102, 'senin', '05:30:00', '07:20:00', '08:00:00', '08:40:00', '09:20:00', '10:00:00', '10:15:00', '10:55:00', '11:35:00', '12:15:00', '12:45:00', '13:25:00', '14:05:00', '16:00:00'),
(103, 'selasa', '05:30:00', '07:00:00', '07:40:00', '08:20:00', '09:00:00', '09:40:00', '09:55:00', '10:35:00', '11:15:00', '11:55:00', '12:25:00', '13:05:00', '13:45:00', '16:00:00'),
(104, 'rabu', '05:30:00', '07:00:00', '07:40:00', '08:20:00', '09:00:00', '09:40:00', '09:55:00', '10:35:00', '11:15:00', '11:55:00', '12:25:00', '13:05:00', '13:45:00', '16:00:00'),
(105, 'kamis', '05:30:00', '07:00:00', '07:40:00', '08:20:00', '09:00:00', '09:40:00', '09:55:00', '10:35:00', '11:15:00', '11:55:00', '12:25:00', '13:05:00', '13:45:00', '16:00:00'),
(106, 'jumat', '05:30:00', '07:15:00', '07:55:00', '08:35:00', '09:15:00', '09:55:00', '10:10:00', '10:50:00', '11:30:00', '11:55:00', '12:25:00', '13:05:00', '13:45:00', '16:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_absensi`
--
ALTER TABLE `data_absensi`
  ADD PRIMARY KEY (`id_absensi`),
  ADD UNIQUE KEY `id_jam` (`id_jam`),
  ADD UNIQUE KEY `id_guru` (`id_guru`);

--
-- Indexes for table `data_admin`
--
ALTER TABLE `data_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `data_guru`
--
ALTER TABLE `data_guru`
  ADD PRIMARY KEY (`id_guru`);

--
-- Indexes for table `data_jam`
--
ALTER TABLE `data_jam`
  ADD PRIMARY KEY (`id_jam`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_absensi`
--
ALTER TABLE `data_absensi`
  MODIFY `id_absensi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `data_admin`
--
ALTER TABLE `data_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_guru`
--
ALTER TABLE `data_guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `data_jam`
--
ALTER TABLE `data_jam`
  MODIFY `id_jam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_absensi`
--
ALTER TABLE `data_absensi`
  ADD CONSTRAINT `data_absensi_ibfk_1` FOREIGN KEY (`id_jam`) REFERENCES `data_jam` (`id_jam`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `data_absensi_ibfk_2` FOREIGN KEY (`id_guru`) REFERENCES `data_guru` (`id_guru`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
