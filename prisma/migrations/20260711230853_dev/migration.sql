/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `product` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_productId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "orderId",
DROP COLUMN "productId",
DROP COLUMN "totalPrice",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
DROP COLUMN "imageUrl",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
