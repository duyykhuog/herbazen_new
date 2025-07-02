CREATE DATABASE  IF NOT EXISTS `herbatea` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `herbatea`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: herbatea
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'1','1');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_order_items`
--

DROP TABLE IF EXISTS `guest_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `guest_order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `guest_orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `guest_order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_order_items`
--

LOCK TABLES `guest_order_items` WRITE;
/*!40000 ALTER TABLE `guest_order_items` DISABLE KEYS */;
INSERT INTO `guest_order_items` VALUES (1,1,3,1,150000.00),(2,1,2,1,150000.00);
/*!40000 ALTER TABLE `guest_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_orders`
--

DROP TABLE IF EXISTS `guest_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` tinytext NOT NULL,
  `note` tinytext,
  `total` decimal(10,2) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `status` int DEFAULT NULL,
  `date_received` datetime(6) DEFAULT NULL,
  `date_cancel` datetime(6) DEFAULT NULL,
  `reason_cancel` tinytext,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_orders`
--

LOCK TABLES `guest_orders` WRITE;
/*!40000 ALTER TABLE `guest_orders` DISABLE KEYS */;
INSERT INTO `guest_orders` VALUES (1,'ádasd','sadsa','ádas, Phường Ngọc Hà, Quận Ba Đình, Thành phố Hà Nội','ad',330000.00,'2025-06-13 13:16:56.866000',2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `guest_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` longtext,
  `price` decimal(10,2) NOT NULL,
  `image_url` tinytext,
  `ingredient` longtext,
  `uses` longtext,
  `user_manual` longtext,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Hoa cúc táo đỏ kỳ tử - Cúc Ngọc Dưỡng Huyết','06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên\nĐối tượng sử dụng\nTrọng lượng 10g',150000.00,'https://i.postimg.cc/5NqB22db/hoacuctaodokytu.png','Trà hoa cúc táo đỏ kỷ tử được ép từ những bông hoa cúc tự nhiên, táo đỏ, kỷ tử được phơi hoặc sấy khô kết hợp với đường phèn và cốt trà bên trong viên trà.\nNguyên liệu được trồng ở vùng núi cao Tây Bắc với khí hậu mát mẻ và nhập khẩu với nguồn gốc xuất xứ rõ ràng, chế biến theo phương pháp truyền thống kết hợp hiện đại.','Những loại trà thảo mộc đường phèn ở đây đều rất tốt cho sức khỏe và mỗi loại cho ta 1 công dụng khác nhau. \n- Là thức uống tự nhiên uống thơm ngon tốt cho sức khỏe thay các loại nước ngọt hóa học \n- Tăng cường sức khỏe, tăng khả năng miễn dịch\n- Làm đẹp da, sáng mắt, thanh nhiệt, thải độc\n- Hỗ trợ ngủ ngon, tốt cho người huyết áp thấp','Pha 250ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nLưu ý:\n Nên uống sau khi ăn sáng và trước khi ngủ 30 phút để đạt hiệu quả tốt nhất.\nKhông dùng khi đói hoặc thay thế hoàn toàn nước uống hàng ngày.\nPhụ nữ mang thai và người mắc bệnh mãn tính nên tham khảo ý kiến bác sĩ trước khi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.'),(2,'Sâm bí đao hạt chia - Thanh Lọc Sâm Hương','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên\nĐối tượng sử dụng\nTrọng lượng 10g',150000.00,'https://i.postimg.cc/PrLgg9BW/sambidaohatchia.png','Trà sâm bí đao hạt chia được cô đặc từ bí đao, sâm và hạt chia tự nhiên được phơi hoặc sấy khô kết hợp với đường phèn và cốt trà bên trong viên trà.\nNguyên liệu được trồng ở vùng núi cao Tây Bắc với khí hậu mát mẻ và nhập khẩu với nguồn gốc xuất xứ rõ ràng, chế biến theo phương pháp truyền thống kết hợp hiện đại.','Những loại trà thảo mộc đường phèn ở đây đều rất tốt cho sức khỏe và mỗi loại cho ta 1 công dụng khác nhau. \n- Là thức uống tự nhiên uống thơm ngon tốt cho sức khỏe thay các loại nước ngọt hóa học \n- Tăng cường sức khỏe, tăng khả năng miễn dịch\n- Làm đẹp da, sáng mắt, thanh nhiệt, thải độc\n- Hỗ trợ ngủ ngon, tốt cho người huyết áp thấp','Pha 250ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nLưu ý:\n Nên uống sau khi ăn sáng và trước khi ngủ 30 phút để đạt hiệu quả tốt nhất.\nKhông dùng khi đói hoặc thay thế hoàn toàn nước uống hàng ngày.\nPhụ nữ mang thai và người mắc bệnh mãn tính nên tham khảo ý kiến bác sĩ trước khi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.'),(3,'Hoa nhài đường phèn - Nhài Hoa Tịnh Tâm','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên\nĐối tượng sử dụng:\nTrọng lượng 10g',150000.00,'https://i.postimg.cc/pLLsNF9g/hoanhaiduongphen.png','Trà hoa nhài đường phèn được ép từ những bông hoa nhài tự nhiên được phơi hoặc sấy khô kết hợp với đường phèn và cốt trà bên trong viên trà.\nNguyên liệu được trồng ở vùng núi cao Tây Bắc với khí hậu mát mẻ và nhập khẩu với nguồn gốc xuất xứ rõ ràng, chế biến theo phương pháp truyền thống kết hợp hiện đại.','Những loại trà thảo mộc đường phèn ở đây đều rất tốt cho sức khỏe và mỗi loại cho ta 1 công dụng khác nhau. \n- Là thức uống tự nhiên uống thơm ngon tốt cho sức khỏe thay các loại nước ngọt hóa học \n- Tăng cường sức khỏe, tăng khả năng miễn dịch\n- Làm đẹp da, sáng mắt, thanh nhiệt, thải độc\n- Hỗ trợ ngủ ngon, tốt cho người huyết áp thấp','Pha 250ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nLưu ý:\n Nên uống sau khi ăn sáng và trước khi ngủ 30 phút để đạt hiệu quả tốt nhất.\nKhông dùng khi đói hoặc thay thế hoàn toàn nước uống hàng ngày.\nPhụ nữ mang thai và người mắc bệnh mãn tính nên tham khảo ý kiến bác sĩ trước khi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.'),(4,'Hoa hồng đường phèn - Hồng Tâm An','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên\nĐối tượng sử dụng\nTrọng lượng 10g',150000.00,'https://i.postimg.cc/pTsd64gN/hoahongdp.png','Trà hoa hồng đường phèn được ép từ những bông hoa hồng tự nhiên được phơi hoặc sấy khô kết hợp với đường phèn và cốt trà bên trong viên trà.\nNguyên liệu được trồng ở vùng núi cao Tây Bắc với khí hậu mát mẻ và nhập khẩu với nguồn gốc xuất xứ rõ ràng, chế biến theo phương pháp truyền thống kết hợp hiện đại.','Những loại trà thảo mộc đường phèn ở đây đều rất tốt cho sức khỏe và mỗi loại cho ta 1 công dụng khác nhau. \n- Là thức uống tự nhiên uống thơm ngon tốt cho sức khỏe thay các loại nước ngọt hóa học \n- Tăng cường sức khỏe, tăng khả năng miễn dịch\n- Làm đẹp da, sáng mắt, thanh nhiệt, thải độc\n- Hỗ trợ ngủ ngon, tốt cho người huyết áp thấp','Pha 500ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.'),(6,'Hoa cúc đường phèn - Trà an nhiên','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên\nĐối tượng sử dụng\nTrọng lượng 10g',150000.00,'https://i.postimg.cc/CKmYhDJk/hoacucduongphen.png','Trà hoa cúc đường phèn được ép từ những bông hoa cúc tự nhiên được phơi hoặc sấy khô kết hợp với đường phèn và cốt trà bên trong viên trà.\nNguyên liệu được trồng ở vùng núi cao Tây Bắc với khí hậu mát mẻ và nhập khẩu với nguồn gốc xuất xứ rõ ràng, chế biến theo phương pháp truyền thống kết hợp hiện đại.','Những loại trà thảo mộc đường phèn ở đây đều rất tốt cho sức khỏe và mỗi loại cho ta 1 công dụng khác nhau. \n- Là thức uống tự nhiên uống thơm ngon tốt cho sức khỏe thay các loại nước ngọt hóa học \n- Tăng cường sức khỏe, tăng khả năng miễn dịch\n- Làm đẹp da, sáng mắt, thanh nhiệt, thải độc\n- Hỗ trợ ngủ ngon, tốt cho người huyết áp thấp','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nLưu ý:\n Nên uống sau khi ăn sáng và trước khi ngủ 30 phút để đạt hiệu quả tốt nhất.\nKhông dùng khi đói hoặc thay thế hoàn toàn nước uống hàng ngày.\nPhụ nữ mang thai và người mắc bệnh mãn tính nên tham khảo ý kiến bác sĩ trước khi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.'),(7,'Trà cam quế đường phèn','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên',150000.00,'https://i.postimg.cc/jj5qJZDZ/camqueduongphen.png','Vỏ cam khô\nQuế khô (thanh quế hoặc quế vụn)\nĐường phèn','Làm ấm cơ thể, tăng cường tuần hoàn máu\nHỗ trợ tiêu hóa, giảm đầy hơi, lạnh bụng\nThanh lọc cơ thể, giúp tinh thần tỉnh táo\nHỗ trợ giảm ho, đau họng nhờ tính kháng khuẩn nhẹ của quế','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.\nLưu ý:\nKhông nên uống quá nhiều vào buổi tối vì quế có thể gây kích thích nhẹ\nNgười có vấn đề về dạ dày, nóng trong hoặc huyết áp cao nên dùng với liều lượng nhỏ\nPhụ nữ mang thai cần hỏi ý kiến bác sĩ trước khi dùng'),(8,'Trà an mộng ngủ ngon','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên',150000.00,'https://i.postimg.cc/7YmpTDSr/traanmongngungon.png','Hoa nhài, Hoa cúc, Táo đỏ, Lá sen, Lạc tiên','Giúp thư giãn thần kinh, giảm stress\n\n\nHỗ trợ an thần, cải thiện chất lượng giấc ngủ\n\n\nGiảm triệu chứng lo âu, hồi hộp','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nKhông nên uống khi lái xe, cần tỉnh táo\n\n\nKhông nên dùng cùng lúc với thuốc an thần (có thể gây buồn ngủ quá mức)\n\n\nPhụ nữ đang cho con bú nên tham khảo ý kiến bác sĩ trước khi sử dụng\n\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.'),(9,'Hoa hồng đường nâu - Trà dịu hồng','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên',150000.00,'https://i.postimg.cc/C5K4yy5b/hoahongduongnau.png','Nụ hoa hồng sấy khô, đường nâu','Làm đẹp da, điều hòa nội tiết tố nữ\n\n\nCải thiện tâm trạng, giảm stress\n\n\nHỗ trợ giảm đau bụng kinh nhẹ, điều hòa kinh nguyệt','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.\nLưu ý:\nKhông dùng cho người đang bị cảm nóng, sốt\n\n\nNgười có cơ địa nóng trong nên hạn chế đường nâu\n\n\nNgười bị huyết áp thấp nên thận trọng khi dùng thường xuyên'),(10,'Gừng táo đỏ - Khương túc dưỡng khí','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên',150000.00,'https://i.postimg.cc/XNtx1GJb/505055373-1230162974942590-4391489103012898047-n.png','Gừng tươi hoặc khô, Táo đỏ, Đường phèn','Làm ấm cơ thể, tăng sức đề kháng\n\n\nHỗ trợ tiêu hóa, giảm đầy hơi, buồn nôn\n\n\nCải thiện tuần hoàn máu, chống lạnh tay chân','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.\nLưu ý:\nKhông dùng khi đang sốt cao hoặc người có cơ địa nhiệt\n\n\nNgười bị đau dạ dày nên uống sau khi ăn no\n\n\nKhông dùng gừng bị mốc, thối để tránh độc tố'),(11,'Trà dưỡng nhan','HSD: 06 tháng kể từ ngày sản xuất \nSố lượng: 12 viên',150000.00,'https://tamviettra.com/wp-content/uploads/2024/03/duong-nhan-7-vi-3-1.jpg','Hoa hồng, kỷ tử, táo đỏ, long nhãn, hạt sen, mật ong','Làm sáng da, chống lão hóa, dưỡng khí huyết\n\n\nCân bằng nội tiết tố nữ\n\n\nTăng cường sinh lực, giảm mệt mỏi','Pha 5000ml nước nóng hơn 90 độ C, đợi 7-10 phút rồi sử dụng.\nCách bảo quản: \nĐể nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.\nĐậy kín sau khi sử dụng.\nLưu ý:\nKhông nên uống khi đang có dấu hiệu nóng trong (nổi mụn, nhiệt miệng)\n\n\nNgười bị tiểu đường nên hạn chế hoặc bỏ các thành phần chứa đường\n\n\nUống vào buổi sáng hoặc đầu giờ chiều để hấp thụ tốt nhất');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'herbatea'
--

--
-- Dumping routines for database 'herbatea'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 10:59:01
