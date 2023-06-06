CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `userName` VARCHAR(50) NOT NULL,
   `userLastName` VARCHAR(100) NOT NULL,
   `dateOfBirth` DATE NOT NULL,
   `email` VARCHAR(80) NOT NULL,
   `password` VARCHAR(50) NOT NULL,
   `roleid` INT NOT NULL,
   `userImage` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT AUTO_INCREMENT,
   `product` VARCHAR(150) NOT NULL,
   `rate` FLOAT NOT NULL,
   `beforePrice` INT NOT NULL,
   `afterPrice` INT NOT NULL,
   `discount` INT NOT NULL,
   `description` TEXT NOT NULL,
   `colorid` INT NOT NULL,
   `productImage` VARCHAR(255) NOT NULL,
   `categoryid` INT NOT NULL,
   `size` VARCHAR(25) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT AUTO_INCREMENT,
   `category` VARCHAR(50),
   PRIMARY KEY (`id`)
);

CREATE TABLE `productcart` (
   `id` INT AUTO_INCREMENT,
   `productid` INT NOT NULL,
   `quantity` INT NOT NULL,
   `afterPrice` DECIMAL NOT NULL,
   `discount` INT NOT NULL,
   `total` DECIMAL NOT NULL,
   `userid` INT NOT NULL,
   `address` VARCHAR(255) NOT NULL,
   `city` VARCHAR(50) NOT NULL,
   `state` VARCHAR(50) NOT NULL,
   `postalCode` INT NOT NULL,
   `cardName` VARCHAR(255) NOT NULL,
   `cardNumber` INT NOT NULL,
   `expeditionMonth` VARCHAR(255) NOT NULL,
   `expeditionYear` INT NOT NULL,
   `cvv` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT AUTO_INCREMENT,
   `role` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `color` (
   `id` INT AUTO_INCREMENT,
   `color` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_78ee6c91-d4ef-42f8-bc91-46fd998ee7e3` FOREIGN KEY (`roleid`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_52d873b5-d7af-4bcc-aa70-2942a8dd97be` FOREIGN KEY (`categoryid`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_188d1143-c03d-49a3-b224-8a9469abeb17` FOREIGN KEY (`colorid`) REFERENCES `color`(`id`)  ;

ALTER TABLE `productcart` ADD CONSTRAINT `FK_a7e784f2-9288-4691-bcd4-4f25f918f209` FOREIGN KEY (`userid`) REFERENCES `users`(`id`)  ;

ALTER TABLE `productcart` ADD CONSTRAINT `FK_5869ee92-47fc-40c6-821f-b651eec4b421` FOREIGN KEY (`productid`) REFERENCES `products`(`id`)  ;
